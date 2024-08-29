<script lang="ts">
import _ from "lodash";
import { defineComponent, computed, PropType } from "vue";
import { withBase, useData } from "vitepress";
import PostItem from "./PostItem.vue";
import BlogPagination from "./Pagination.vue";
import type { Data as Post } from "@@/data/routes.data.ts";

export default defineComponent({
	name: "PostItemsGroup",
	components: { PostItem, BlogPagination },
	props: {
		posts: {
			type: Array as PropType<Post[]>,
			default: () => [{}],
		},
		prefix: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const { params } = useData();
		const pages = computed(() => _.chunk(props.posts, import.meta.env.VITE_PAGINATION ?? 10));

		const currentPage = computed(() => params?.value?.page ?? 1);
		return { withBase, currentPage, pages };
	},
});
</script>

<template>
	<div>
		<ul class="grid gap-4 grid-cols-1">
			<PostItem
				v-for="(
					{ url, frontmatter: { title, description, category, tags, date, lastUpdated, ogUrl } }, key
				) in pages[currentPage - 1]"
				:key="key"
				:title="title"
				:description="description"
				:url="url"
				:category="category"
				:tags="tags"
				:date="date"
				:last-updated="lastUpdated"
				:og-url="ogUrl"
			>
			</PostItem>
		</ul>
		<BlogPagination
			:current-page="currentPage"
			:total="pages.length"
			:prefix="prefix"
		></BlogPagination>
	</div>
</template>
