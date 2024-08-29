<script lang="ts">
import _ from "lodash";
import { defineComponent, computed } from "vue";
import { withBase, useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import useDateTime from "@@/utils/useDateTime";
import BlogPagination from "./components/Pagination.vue";
export default defineComponent({
	name: "List",
	components: { BlogPagination },
	setup() {
		const { parseFromTZ, toDateString } = useDateTime();
		const periods = _.groupBy(posts, ({ frontmatter: { date } }) => parseFromTZ(date).year);

		const { params } = useData();
		const currentPeriod = computed(() => params?.value?.period);
		const pages = computed(() =>
			_.chunk(periods[currentPeriod.value] ?? posts, import.meta.env.VITE_LIST_PAGINATION ?? 20)
		);

		const currentPage = computed(() => params?.value?.page ?? 1);

		return { withBase, posts, periods, currentPeriod, params, toDateString, currentPage, pages };
	},
});
</script>

<template>
	<div>
		<ol>
			<li
				v-for="(periodPosts, period) in periods"
				:key="period"
			>
				<a
					:href="withBase('/list/' + period + '/')"
					class="group"
				>
					<span
						class="hidden group-hover:!inline"
						:class="{ '!inline ': currentPeriod == period }"
					>
						> </span
					>{{ period }} :
				</a>
				{{ periodPosts.length }}
			</li>
		</ol>

		<ul class="grid gap-4">
			<li
				v-for="({ url, frontmatter: { title, date, category, tags } }, key) in pages[currentPage - 1]"
				:key="key"
				class="bg-yellow-light/20 rounded p-4"
			>
				<div class="flex justify-between flex-wrap">
					<p class="basis-1/3 text-sm">{{ toDateString(date) }}</p>
					<div
						v-if="tags.length > 0"
						class="text-yellow-dark font-semibold md:text-right md:basis-2/3 basis-full order-first md:order-none"
					>
						<a
							v-for="(tag, index) in tags"
							:key="title + index"
							:href="withBase('/tags/' + tag + '/')"
						>
							#{{ tag }}
						</a>
					</div>
					<a
						:href="withBase(url)"
						class="basis-full"
						><span class="title font-medium">{{ title ?? url }} | </span> <span>{{ category }}</span></a
					>
				</div>
			</li>
		</ul>
		<BlogPagination
			:current-page="currentPage"
			:total="pages.length"
			:prefix="'/list/' + (currentPeriod == 'index' ? '' : currentPeriod)"
		></BlogPagination>
	</div>
</template>
