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
	<div class="flex justify-between my-6 gap-3">
		<div>
			<a
				:href="getUrl(currentPage - 1)"
				class="w-10 h-10 flex justify-center items-center"
				:class="{ '!hidden': currentPage == 1 }"
			>
				<FontAwesomeIcon
					class=" "
					icon="arrow-left"
					size="2x"
			/></a>
		</div>

		<div class="flex gap-2">
			<template
				v-for="(page, key) in displayPages"
				:key="page"
			>
				<a
					:href="getUrl(page)"
					class="w-10 h-10 outline outline-1 outline-white-default rounded-md flex justify-center items-center"
					:class="{ 'bg-white-default/90 text-black font-bold': page == currentPage }"
				>
					<span class="h-fit">
						{{ page }}
					</span>
				</a>
				<div
					v-if="displayPages[key + 1] - page > 1"
					class="text-center mx-1"
				>
					...
				</div>
			</template>
		</div>
		<div>
			<a
				:href="getUrl(currentPage + 1)"
				class="w-10 h-10 flex justify-center items-center"
				:class="{ '!hidden': currentPage == total || total < currentPage }"
			>
				<FontAwesomeIcon
					class=" "
					icon="arrow-right"
					size="2x"
				/>
			</a>
		</div>
	</div>
</template>
