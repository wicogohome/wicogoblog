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

		const lastUpdated = computed(() => {
			if (
				articleFrontmatter.value.lastUpdated &&
				articleFrontmatter.value.date &&
				!articleFrontmatter.value.lastUpdated.hasSame(articleFrontmatter.value.date, "day")
			) {
				return toDateString(articleFrontmatter.value.lastUpdated);
			}

			return "";
		});

		return { withBase, articleFrontmatter, createdAt, lastUpdated };
	},
});
</script>

<template>
	<div class="relative">
		<template v-if="articleFrontmatter.title">
			<div class="flex justify-between">
				<a :href="withBase('/categories/' + articleFrontmatter.category + '/')"
					>{{ `< ${articleFrontmatter.category} >` }}
				</a>

				<div
					v-if="articleFrontmatter.tags"
					class="text-yellow-dark font-semibold text-right"
				>
					<a
						v-for="(tag, index) in articleFrontmatter.tags"
						:key="index"
						:href="withBase('/tags/' + tag + '/')"
					>
						#{{ tag }}
					</a>
				</div>
			</div>

			<h1 class="article-title">{{ articleFrontmatter.title }}</h1>
			<p class="md:text-4xl text-3xl font-bold text-yellow-dark my-2">| {{ createdAt }}</p>
			<hr />
		</template>
		<Content class="article-content mb-16" />

		<div class="grid md:grid-cols-5 m-4 gap-4">
			<div
				v-if="lastUpdated.length > 0"
				class="text-right w-full md:col-span-5"
			>
				最後更新：{{ lastUpdated }}
			</div>
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
