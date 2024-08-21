<script lang="ts">
import { defineComponent } from "vue";
import ImageViewer from "./ImageViewer.vue";

export default defineComponent({
	name: "PortfolioContent",
	components: { ImageViewer },
	props: {
		name: {
			type: String,
			required: true,
		},
		skills: {
			type: Array<string>,
			required: true,
		},
		urls: {
			type: Array<string>,
			default: () => [],
		},
		images: {
			type: Object,
			default: () => ({}),
		},
		intro: {
			type: String,
			required: true,
		},
		contents: {
			type: Object,
			required: true,
		},
		direction: {
			type: String,
			default: "left",
		},
	},
	setup() {
		return {};
	},
});
</script>

<template>
	<div class="relative group">
		<div
			class="w-full h-full absolute right-0 blur-sm rounded-2xl bg-gradient-to-r from-green/20 to-yellow-default/90 group-hover:to-yellow-default group-hover:from-green/25 transition-transform"
		></div>
		<div class="relative -translate-x-6 pt-12 pb-6">
			<div class="flex flex-col mb-4">
				<slot name="title">
					<h3>{{ ` ${name} ` }}</h3>
				</slot>
				<ul>
					<li
						v-for="(url, key) in urls"
						:key="key"
					>
						<a :href="url">{{ url }}</a>
					</li>
				</ul>

				<p class="text-left md:w-1/2">
					<span
						v-for="(skill, key) in skills"
						:key="key"
					>
						#{{ skill }}
					</span>
				</p>
			</div>

			<div class="flex flex-wrap -mx-2">
				<div
					v-if="images?.left"
					class="basis-full md:basis-1/2 mb-4"
				>
					<ImageViewer
						:src="images?.left"
						alt="Left image"
						class="basis-full h-auto rounded"
					></ImageViewer>
				</div>

				<div
					class="basis-full pl-12"
					:class="{
						'md:basis-1/2': images?.left || images?.right,
						'md:-translate-y-16': images?.top,
					}"
				>
					<div
						v-if="images?.top"
						class="flex flex-wrap -mx-1 mb-4"
					>
						<div
							v-for="(img, index) in images?.top"
							:key="index"
							class="w-1/2 px-1 mb-2"
						>
							<ImageViewer
								:src="img"
								alt="Top image"
								class="basis-full h-auto rounded"
							></ImageViewer>
						</div>
					</div>

					<p class="mb-4 text-sm">{{ intro }}</p>

					<div class="mb-4">
						<h4 class="font-zilla-highlight tracking-normal whitespace-pre text-xl">Things I did:</h4>

						<ul
							v-for="(content, key) in contents"
							:key="key"
							class="list-inside list-decimal"
						>
							<p class="first-letter:uppercase font-zilla tracking-normal text-lg">
								{{ key }}
							</p>
							<li
								v-for="(list, index) in content"
								:key="index"
								class="text-xs"
							>
								{{ list }}
							</li>
						</ul>
					</div>

					<slot></slot>
				</div>

				<div
					v-if="images?.right"
					class="basis-full md:basis-1/2 translate-x-6"
				>
					<ImageViewer
						:src="images?.right"
						alt="Right image"
						class="basis-full h-auto rounded"
					></ImageViewer>
				</div>
			</div>
		</div>
	</div>
</template>
