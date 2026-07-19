<script lang="ts">
import _ from "lodash";
import { defineComponent, computed } from "vue";
import { withBase, useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import useDateTime from "@@/utils/useDateTime";
import PostItem from "./components/PostItem.vue";
import BlogPagination from "./components/Pagination.vue";

export default defineComponent({
	name: "List",
	components: { PostItem, BlogPagination },
	setup() {
		const { parseFromTZ } = useDateTime();
		const periods = _.groupBy(posts, ({ frontmatter: { date } }) => parseFromTZ(date).year);

		const { params } = useData();
		const currentPeriod = computed(() => params?.value?.period);
		const pages = computed(() =>
			_.chunk(periods[currentPeriod.value] ?? posts, import.meta.env.VITE_LIST_PAGINATION ?? 20)
		);
		const currentPage = computed(() => params?.value?.page ?? 1);
		const currentPosts = computed(() => pages.value[currentPage.value - 1] ?? []);

		return { withBase, posts, periods, currentPeriod, params, currentPage, pages, currentPosts };
	},
});
</script>

<template>
	<div>
		<nav
			class="flex flex-wrap gap-x-[20px] gap-y-[8px] mb-[clamp(24px,4vw,40px)] font-mono text-[13px] tracking-[0.08em]"
		>
			<a
				v-for="(periodPosts, period) in periods"
				:key="period"
				:href="withBase('/list/' + period + '/')"
				class="flex items-center gap-[6px] text-ivory-dim no-underline transition-colors duration-200 hover:text-olive-bright"
				:class="{ 'text-olive-bright': currentPeriod == period }"
			>
				{{ period }}
				<span
					class="text-[11px] text-ivory-faint"
					:class="{ 'text-olive-bright': currentPeriod == period }"
					>{{ periodPosts.length }}</span
				>
			</a>
		</nav>

		<div class="flex items-baseline justify-between mb-[6px]">
			<h3 class="font-newsreader italic font-medium text-[clamp(22px,2.6vw,30px)] text-ivory m-0">
				目次 · Contents
			</h3>
			<span class="font-mono text-[12px] text-ivory-faint tracking-[0.1em]"
				>{{ currentPosts.length }} entries</span
			>
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
			/>
		</ul>

		<BlogPagination
			:current-page="currentPage"
			:total="pages.length"
			:prefix="'/list/' + (currentPeriod == 'index' ? '' : currentPeriod)"
		></BlogPagination>
	</div>
</template>
