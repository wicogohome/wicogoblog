<script lang="ts">
import _ from "lodash";
import { defineComponent, computed } from "vue";
import { useData, withBase } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import ArticleItem from "./components/ArticleItem.vue";
import BlogPagination from "./components/Pagination.vue";
export default defineComponent({
	name: "Home",
	components: { ArticleItem, BlogPagination },
	setup() {
		const { params } = useData();
		const pages = _.chunk(posts, import.meta.env.VITE_PAGINATION ?? 10);

		const currentPage = computed(() => params?.value?.page);
		return { posts, withBase, currentPage, pages };
	},
});
</script>

<template>
	<div class="px-6">
		<ul class="grid gap-4">
			<ArticleItem
				v-for="({ url, frontmatter: { title, category, tags, date, lastUpdated, ogUrl } }, key) in pages[
					currentPage - 1
				]"
				:key="key"
				:title="title"
				:url="url"
				:category="category"
				:tags="tags"
				:date="date"
				:last-updated="lastUpdated"
				:og-url="ogUrl"
			>
			</ArticleItem>
		</ul>
		<BlogPagination
			:current-page="currentPage"
			:total="pages.length"
		></BlogPagination>
	</div>
</template>
