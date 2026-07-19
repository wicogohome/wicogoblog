<script lang="ts">
import _ from "lodash";
import { computed, defineComponent } from "vue";
import { withBase } from "vitepress";
export default defineComponent({
	name: "BlogPagination",
	props: {
		currentPage: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		prefix: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const displayPages = computed(() => {
			const rangeArray = _.range(1, props.total + 1);
			if (props.total < 6) {
				return rangeArray;
			}
			let startCount = 3;
			let endCount = 2;
			let centerArray;

			if (2 < props.currentPage && props.currentPage < props.total) {
				startCount = endCount = 1;
				centerArray = _.filter(
					rangeArray,
					(page) =>
						page == props.currentPage ||
						(page > props.currentPage && page - 2 < props.currentPage) ||
						(page < props.currentPage && page + 2 > props.currentPage)
				);
			}
			return _.union(_.take(rangeArray, startCount), centerArray, _.takeRight(rangeArray, endCount));
		});

		function getUrl(page: number) {
			if (page <= 1) {
				return withBase(props.prefix + "/");
			}
			return withBase(props.prefix + "/pages/" + page + "/");
		}
		return { getUrl, displayPages };
	},
});
</script>

<template>
	<div
		v-if="total > 1"
		class="flex justify-center items-center gap-[8px] my-[clamp(32px,5vw,56px)] font-mono text-[13px] tracking-[0.08em]"
	>
		<a
			:href="getUrl(currentPage - 1)"
			class="flex items-center justify-center w-[36px] h-[36px] text-ivory-dim no-underline transition-colors duration-200 hover:text-olive-bright"
			:class="{ invisible: currentPage == 1 }"
		>
			←
		</a>

		<div class="flex items-center gap-[4px]">
			<template
				v-for="(page, key) in displayPages"
				:key="page"
			>
				<a
					:href="getUrl(page)"
					class="flex items-center justify-center w-[36px] h-[36px] border border-ivory/[0.16] text-ivory-dim no-underline transition-[color,border-color,background] duration-200 hover:text-olive-bright hover:border-olive-bright"
					:class="{ 'text-ink bg-olive-bright border-olive-bright': page == currentPage }"
				>
					{{ page }}
				</a>
				<span
					v-if="displayPages[key + 1] - page > 1"
					class="text-ivory-faint px-[4px]"
				>
					···
				</span>
			</template>
		</div>

		<a
			:href="getUrl(currentPage + 1)"
			class="flex items-center justify-center w-[36px] h-[36px] text-ivory-dim no-underline transition-colors duration-200 hover:text-olive-bright"
			:class="{ invisible: currentPage == total || total < currentPage }"
		>
			→
		</a>
	</div>
</template>
