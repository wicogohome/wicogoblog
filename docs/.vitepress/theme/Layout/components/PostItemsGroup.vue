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
		showHeader: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const { params } = useData();
		const pageSize = import.meta.env.VITE_PAGINATION ?? 10;
		const pages = computed(() => _.chunk(props.posts, pageSize));
		const currentPage = computed(() => params?.value?.page ?? 1);
		const currentPosts = computed(() => pages.value[currentPage.value - 1] ?? []);

		const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
		const countLabel = computed(() => {
			const n = props.posts.length;
			const word = words[n] ?? n;
			return `${word} ${n === 1 ? "entry" : "entries"}`;
		});

		return { withBase, currentPage, pages, currentPosts, countLabel };
	},
});
</script>

<template>
	<div>
		<div
			v-if="showHeader"
			class="flex items-baseline justify-between mb-[6px]"
		>
			<h3 class="font-newsreader italic font-medium text-[clamp(22px,2.6vw,30px)] text-ivory m-0">
				目次 · Contents
			</h3>
			<span class="font-mono text-[12px] text-ivory-faint tracking-[0.1em]">{{ countLabel }}</span>
		</div>
		<ul class="mt-[10px] p-0">
			<PostItem
				v-for="({ url, frontmatter: { title, category, tags, date } }, key) in currentPosts"
				:key="key"
				:folio="key + 1"
				:title="title"
				:url="url"
				:category="category"
				:tags="tags"
				:date="date"
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
