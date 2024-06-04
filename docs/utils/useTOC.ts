import { onMounted, onUnmounted, onUpdated, type Ref } from "vue";
import { getScrollOffset } from "vitepress";

// https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/composables/outline.ts
export interface Header {
	element: HTMLHeadElement;
	/**
	 * The level of the header
	 *
	 * `1` to `6` for `<h1>` to `<h6>`
	 */
	level: number;
	/**
	 * The title of the header
	 */
	title: string;

	/**
	 * Link of the header
	 *
	 * Typically using `#${slug}` as the anchor hash
	 */
	link: string;

	children?: Header[];
}

export default function useTOC() {
	function getHeaders() {
		const headers: Header[] = [...document.querySelectorAll(".article-content :where(h1,h2,h3,h4,h5,h6)")]
			.filter((el) => el.id && el.hasChildNodes())
			.map((el) => {
				const level = Number(el.tagName[1]);
				return {
					element: el as HTMLHeadElement,
					title: serializeHeader(el),
					link: "#" + el.id,
					level,
				};
			});

		return resolveHeaders(headers, [2, 3]);
	}

	function serializeHeader(h: Element): string {
		let ret = "";
		for (const node of h.childNodes) {
			if (node.nodeType === 1) {
				ret += node.textContent;
			} else if (node.nodeType === 3) {
				ret += node.textContent;
			}
		}
		return ret.trim();
	}

	const resolvedHeaders: { element: HTMLHeadElement; link: string }[] = [];

	function resolveHeaders(headers: Header[], range: [number, number]) {
		const [high, low]: [number, number] = range;

		headers = headers.filter((h) => h.level >= high && h.level <= low);
		// clear previous caches
		resolvedHeaders.length = 0;
		// update global header list for active link rendering
		for (const { link, element } of headers) {
			resolvedHeaders.push({ link, element });
		}

		const ret = [];
		outer: for (let i = 0; i < headers.length; i++) {
			const cur = headers[i];
			if (i === 0) {
				ret.push(cur);
			} else {
				for (let j = i - 1; j >= 0; j--) {
					const prev = headers[j];
					if (prev.level < cur.level) {
						(prev.children || (prev.children = [])).push(cur);
						continue outer;
					}
				}
				ret.push(cur);
			}
		}

		return ret;
	}

	function throttleAndDebounce(fn: () => void, delay: number): () => void {
		let timeoutId: NodeJS.Timeout;
		let called = false;

		return () => {
			if (timeoutId) clearTimeout(timeoutId);

			if (!called) {
				fn();
				(called = true) && setTimeout(() => (called = false), delay);
			} else timeoutId = setTimeout(fn, delay);
		};
	}

	function useActiveAnchor(container: Ref<HTMLElement>, marker: Ref<HTMLElement>) {
		const onScroll = throttleAndDebounce(setActiveLink, 100);

		let prevActiveLink: HTMLAnchorElement | null = null;

		onMounted(() => {
			requestAnimationFrame(setActiveLink);
			window.addEventListener("scroll", onScroll);
		});

		onUpdated(() => {
			// sidebar update means a route change
			activateLink(location.hash);
		});

		onUnmounted(() => {
			window.removeEventListener("scroll", onScroll);
		});
		function setActiveLink() {
			const scrollY = window.scrollY;
			const innerHeight = window.innerHeight;
			const offsetHeight = document.body.offsetHeight;
			const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;

			// resolvedHeaders may be repositioned, hidden or fix positioned

			const headers = resolvedHeaders
				.map(({ element, link }) => ({
					link,
					top: getAbsoluteTop(element),
				}))
				.filter(({ top }) => !Number.isNaN(top))
				.sort((a, b) => a.top - b.top);

			// no headers available for active link
			if (!headers.length) {
				activateLink(null);
				return;
			}

			// page top
			if (scrollY < 1) {
				activateLink(null);
				return;
			}

			// page bottom - highlight last link
			if (isBottom) {
				activateLink(headers[headers.length - 1].link);
				return;
			}

			// find the last header above the top of viewport
			let activeLink: string | null = null;
			for (const { link, top } of headers) {
				if (top > scrollY + getScrollOffset() + 4) {
					break;
				}
				activeLink = link;
			}
			activateLink(activeLink);
		}

		function activateLink(hash: string | null) {
			if (prevActiveLink) {
				prevActiveLink.classList.remove("active");
			}

			if (hash == null) {
				prevActiveLink = null;
			} else {
				prevActiveLink = container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`);
			}

			const activeLink = prevActiveLink;

			if (activeLink) {
				activeLink.classList.add("active");
				marker.value.style.top = activeLink.offsetTop + "px";
				marker.value.style.opacity = "1";
			} else {
				marker.value.style.top = "33px";
				marker.value.style.opacity = "0";
			}
		}
	}

	function getAbsoluteTop(element: HTMLElement): number {
		let offsetTop = 0;
		while (element !== document.body) {
			if (element === null) {
				// child element is:
				// - not attached to the DOM (display: none)
				// - set to fixed position (not scrollable)
				// - body or html element (null offsetParent)
				return NaN;
			}
			offsetTop += element.offsetTop;
			element = element.offsetParent as HTMLElement;
		}
		return offsetTop;
	}

	return { getHeaders, useActiveAnchor };
}
