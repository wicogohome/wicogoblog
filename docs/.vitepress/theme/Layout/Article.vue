<script lang="ts">
import { defineComponent, computed } from "vue";
import { withBase } from "vitepress";
import useDataTime from "@@/utils/useDateTime.ts";
import useFrontmatter from "@@/utils/useFrontmatter.ts";

export default defineComponent({
	name: "BlogArticle",
	setup() {
		const { articleFrontmater } = useFrontmatter();
		const { toDateString } = useDataTime();
		const createdAt = computed(() => {
			if (articleFrontmater.date) {
				return toDateString(articleFrontmater.date);
			}

			return "";
		});

		return { withBase, articleFrontmater, createdAt };
	},
});
</script>

<template>
	<div class="relative">
		<div class="flex justify-between">
			<a :href="withBase('/catagories/' + articleFrontmater.category)"
				>{{ `< ${articleFrontmater.category} ` }} ></a
			>

			<div
				v-if="articleFrontmater.tags"
				class="text-yellow-dark font-semibold text-right"
			>
				<a
					v-for="(tag, index) in articleFrontmater.tags"
					:key="index"
					:href="withBase('/tags/' + tag)"
				>
					#{{ tag }}
				</a>
			</div>
		</div>

		<div class="article-title">{{ articleFrontmater.title }}</div>
		<p class="md:text-4xl text-3xl font-bold text-yellow-dark my-2">| {{ createdAt }}</p>
		<hr />
		<Content class="article-content !static p-6" />
	</div>
</template>
