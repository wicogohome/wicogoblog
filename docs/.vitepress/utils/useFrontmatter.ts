import _ from "lodash";
import { computed } from "vue";
import { useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import useDataTime from "@@/utils/useDateTime.ts";
import useBasicFrontmatter from "./useBasicFrontmatter";
import type { DateTime } from "luxon";
import type { ComputedRef } from "vue";

export interface ArticleFrontmatter {
	title: string;
	description: string | null;
	tags: Array<string>;
	date: DateTime | null;
	ogUrl: string;
	lastUpdated: DateTime | null;
	category: string;
	url: string | null;
	next: {
		title: string;
		url: string;
	} | null;
	prev: {
		title: string;
		url: string;
	} | null;
}

export default function useFrontmatter() {
	const { parseFromTZ } = useDataTime();
	const { frontmatter } = useData();
	const { formatWithDefault } = useBasicFrontmatter();

	const articleFrontmatter: ComputedRef<ArticleFrontmatter> = computed(() => {
		const formattedFrontmatter = formatWithDefault({
			title: frontmatter.value.title,
			description: frontmatter.value.description,
			tags: frontmatter.value.tags,
			date: frontmatter.value.date,
			ogUrl: frontmatter.value.ogUrl ?? frontmatter.value.og_url,
			lastUpdated: frontmatter.value.lastUpdated ?? frontmatter.value.last_updated,
			category: frontmatter.value.category,
			url: frontmatter.value.url,
		});

		const currentIndex = _.findIndex(
			posts,
			({ frontmatter: { title, url } }) =>
				title === formattedFrontmatter.title && url === formattedFrontmatter.url
		);
		const next = currentIndex > -1 ? posts[currentIndex - 1] ?? null : null;
		const prev = currentIndex > -1 ? posts[currentIndex + 1] ?? null : null;

		let date = null;
		if ("date" in frontmatter.value) {
			date = parseFromTZ(formattedFrontmatter.date);
		}

		let lastUpdated = null;
		if ("last_updated" in frontmatter.value) {
			lastUpdated = parseFromTZ(formattedFrontmatter.lastUpdated);
		}

		return {
			title: formattedFrontmatter.title,
			description: formattedFrontmatter.description,
			tags: formattedFrontmatter.tags,
			date,
			ogUrl: formattedFrontmatter.ogUrl,
			lastUpdated,
			category: formattedFrontmatter.category,
			url: formattedFrontmatter.url,
			next: next
				? {
						title: next.frontmatter.title,
						url: next.url,
					}
				: null,
			prev: prev
				? {
						title: prev.frontmatter.title,
						url: prev.url,
					}
				: null,
		};
	});

	return { articleFrontmatter };
}
