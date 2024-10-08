<script lang="ts">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
import useDateTime from "@@/utils/useDateTime";
export default defineComponent({
	name: "PostItem",
	props: {
		title: { type: String, default: null },
		description: { type: String, default: null },
		url: { type: String, default: null },
		category: { type: String, default: null },
		tags: { type: Array, default: () => [] },
		date: { type: String, default: null },
		lastUpdated: { type: String, default: null },
		ogUrl: { type: String, default: null },
	},
	setup() {
		const { toDateString } = useDateTime();
		return { withBase, toDateString };
	},
});
</script>

<template>
	<li
		class="bg-yellow-light/20 rounded-lg overflow-clip relative shadow-sm shadow-white-default/20 hover:brightness-105 transition-all hover:scale-105 hover:shadow-md hover:shadow-white-default/20 ease-in-out"
	>
		<div class="cursor-pointer md:h-60 h-40 overflow-hidden relative">
			<img
				alt="post-cover-bg"
				:src="ogUrl"
				class="absolute blur-lg"
			/>
			<a :href="withBase(url)">
				<div class="absolute w-full h-full">
					<img
						alt="post-cover"
						:src="ogUrl"
						class="max-h-full m-auto"
					/>
				</div>
			</a>
		</div>

		<div class="p-4">
			<div class="flex justify-between flex-wrap">
				<p class="basis-full text-sm">{{ toDateString(date) }}</p>
				<a
					:href="withBase(url)"
					class="title md:basis-3/4 basis-full md:order-none font-medium"
					>{{ title ?? url }}</a
				>
				<div
					v-if="tags.length > 0"
					class="text-yellow-dark font-semibold md:text-right md:basis-1/4 basis-full order-first md:order-none"
				>
					<a
						v-for="(tag, index) in tags"
						:key="title + index"
						:href="withBase('/tags/' + tag + '/')"
					>
						#{{ tag }}
					</a>
				</div>
			</div>

			<p class="text-sm line-clamp-3 text-white-default/80">
				{{ description }}
			</p>
		</div>
	</li>
</template>
