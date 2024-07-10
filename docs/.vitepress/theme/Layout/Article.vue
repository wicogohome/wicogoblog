<script lang="ts">
import { defineComponent, computed } from "vue";
import { withBase } from "vitepress";
import useDataTime from "@@/utils/useDateTime.ts";
import useFrontmatter from "@@/utils/useFrontmatter.ts";
import NextButton from "./components/NextButton.vue";
import PrevButton from "./components/PrevButton.vue";

export default defineComponent({
	name: "BlogArticle",
	components: { NextButton, PrevButton },
	setup() {
		const { articleFrontmatter } = useFrontmatter();
		const { toDateString } = useDataTime();
		const createdAt = computed(() => {
			if (articleFrontmatter.value.date) {
				return toDateString(articleFrontmatter.value.date);
			}

			return "";
		});

		return { withBase, articleFrontmatter, createdAt };
	},
});
</script>

<template>
	<div class="relative">
		<div class="flex justify-between">
			<a :href="withBase('/catagories/' + articleFrontmatter.category)"
				>{{ `< ${articleFrontmatter.category} ` }} ></a
			>

			<div
				v-if="articleFrontmatter.tags"
				class="text-yellow-dark font-semibold text-right"
			>
				<a
					v-for="(tag, index) in articleFrontmatter.tags"
					:key="index"
					:href="withBase('/tags/' + tag)"
				>
					#{{ tag }}
				</a>
			</div>
		</div>

		<div class="article-title">{{ articleFrontmatter.title }}</div>
		<p class="md:text-4xl text-3xl font-bold text-yellow-dark my-2">| {{ createdAt }}</p>
		<hr />
		<Content class="article-content !static p-6" />
		<div class="grid md:grid-cols-5 m-4 gap-4 h-20">
			<PrevButton
				v-if="articleFrontmatter.prev"
				:url="articleFrontmatter.prev.url"
				class="w-full md:col-span-2"
				>{{ articleFrontmatter.prev.title }}</PrevButton
			>
			<NextButton
				v-if="articleFrontmatter.next"
				:url="articleFrontmatter.next.url"
				class="md:col-start-4 w-full md:col-span-2"
				>{{ articleFrontmatter.next.title }}</NextButton
			>
		</div>
	</div>
</template>
