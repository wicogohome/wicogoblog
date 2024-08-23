<script lang="ts">
import { defineComponent } from "vue";
import ImageViewer from "./ImageViewer.vue";
import BasicCard from "./BasicCard.vue";
export default defineComponent({
	name: "ProjectCard",
	components: { ImageViewer, BasicCard },
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
	<BasicCard>
		<template #title>{{ name }}</template>
		<template #url>
			<ul>
				<li
					v-for="(url, key) in urls"
					:key="key"
				>
					<a :href="url">{{ url }}</a>
				</li>
			</ul></template
		>
		<template #skill
			><p class="text-left md:w-1/2">
				<span
					v-for="(skill, key) in skills"
					:key="key"
				>
					#{{ skill }}
				</span>
			</p></template
		>
		<template #content>
			<div
				v-if="images?.left"
				class="basis-full md:basis-1/2 mb-4 print:basis-1/2"
			>
				<ImageViewer
					:src="images?.left"
					alt="Left image"
					class="basis-full h-auto rounded"
				></ImageViewer>
			</div>

			<div
				class="basis-full pl-12 print:p-0"
				:class="{
					'md:basis-1/2 print:!basis-full': images?.left || images?.right,
					'md:-translate-y-16 print:!translate-y-0': images?.top,
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
					<h4 class="double-whitespace font-zilla-highlight tracking-normal whitespace-pre text-xl -mb-2">
						Things I did:
					</h4>

					<ul
						v-for="(content, key) in contents"
						:key="key"
						class="list-inside list-decimal mt-4"
					>
						<p class="first-letter:uppercase font-zilla tracking-normal text-lg">{{ key }}</p>
						<li
							v-for="(list, index) in content"
							:key="index"
							class="text-xs mb-2"
						>
							{{ list }}
						</li>
					</ul>
				</div>

				<slot></slot>
			</div>

			<div
				v-if="images?.right"
				class="basis-full md:basis-1/2 translate-x-6 print:basis-1/2"
			>
				<ImageViewer
					:src="images?.right"
					alt="Right image"
					class="basis-full h-auto rounded"
				></ImageViewer>
			</div>
		</template>
	</BasicCard>
</template>
