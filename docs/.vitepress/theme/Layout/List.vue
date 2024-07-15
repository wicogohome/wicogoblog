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
				<div class="flex justify-between">
					<span class="text-white-default/70">
						{{ toDateString(date) }}
					</span>

					<div class="flex gap-1 flex-wrap">
						<span
							v-for="tag in tags"
							:key="tag"
							class="text-base text-yellow-dark"
						>
							#{{ tag }}
						</span>
					</div>
				</div>

				<a
					:href="withBase(url)"
					class="text-xl"
				>
					{{ title }}<span class="text-base"> | {{ category }}</span>
				</a>
			</li>
		</ul>
		<BlogPagination
			:current-page="currentPage"
			:total="pages.length"
			:prefix="'/list/' + (currentPeriod == 'index' ? '' : currentPeriod)"
		></BlogPagination>
	</div>
</template>
