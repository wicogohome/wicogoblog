import _ from "lodash";
import { computed } from "vue";
import { useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import useDataTime from "@@/utils/useDateTime.ts";

import type { DateTime } from "luxon";
import type { ComputedRef } from "vue";

export interface ArticleFrontmatter {
	title: string;
	tags: Array<string>;
	date: DateTime | null;
	ogUrl: string;
	lastUpdated: DateTime | null;
	category: string;
	url: string;
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

	// TODO 統一url格式
	const articleFrontmatter: ComputedRef<ArticleFrontmatter> = computed(() => {
		const currentIndex = _.findIndex(posts, ({ frontmatter: { title } }) => title === frontmatter.value.title);
		const next = currentIndex > -1 ? posts[currentIndex - 1] ?? null : null;
		const prev = currentIndex > -1 ? posts[currentIndex + 1] ?? null : null;

		let date = null;
		if ("date" in frontmatter.value) {
			date = parseFromTZ(frontmatter.value.date);
		}

		let lastUpdated = null;
		if ("last_updated" in frontmatter.value) {
			lastUpdated = parseFromTZ(frontmatter.value.last_updated);
		}
		return {
			title: frontmatter.value.title,
			tags: frontmatter.value.tags,
			date,
			ogUrl: frontmatter.value.og_url,
			lastUpdated,
			category: frontmatter.value.category,
			url: frontmatter.value.url,
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
