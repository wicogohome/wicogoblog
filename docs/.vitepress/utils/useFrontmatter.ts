import { reactive, computed } from "vue";
import { useData } from "vitepress";
import useDataTime from "@@/utils/useDateTime.ts";
import type { DateTime } from "luxon";

export interface ArticleFrontmatter {
	title: string;
	tags: Array<string>;
	date: DateTime | null;
	ogUrl: string;
	lastUpdated: DateTime | null;
	category: string;
	url: string;
}

export default function useFrontmatter() {
	const { parseFromTZ } = useDataTime();

	const { frontmatter } = useData();

	const articleFrontmater: ArticleFrontmatter = reactive({
		title: frontmatter.value.title,
		tags: frontmatter.value.tags,
		date: computed(() => {
			if ("date" in frontmatter.value) {
				return parseFromTZ(frontmatter.value.date);
			}

			return null;
		}),
		ogUrl: frontmatter.value.og_url,
		lastUpdated: computed(() => {
			if ("last_updated" in frontmatter.value) {
				return parseFromTZ(frontmatter.value.last_updated);
			}

			return null;
		}),
		category: frontmatter.value.category,
		url: frontmatter.value.url,
	});
	return { articleFrontmater };
}
