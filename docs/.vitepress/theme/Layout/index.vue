<script lang="ts">
import { useData, withBase } from "vitepress";
import { computed } from "vue";
import type { Component, ComputedRef } from "vue";

import BlogHeader from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import TOCSidebar from "./components/TOCSidebar.vue";
import BlogFooter from "./components/Footer.vue";
import BlogArticle from "./Article.vue";
import Home from "./Home.vue";
import About from "./About.vue";
import List from "./List.vue";
import Tags from "./Tags.vue";
import Categories from "./Categories.vue";

export default {
	components: { BlogHeader, Sidebar, TOCSidebar, BlogFooter, BlogArticle, Home, About, List, Tags, Categories },
	setup() {
		const { frontmatter } = useData();
		interface MainFrontmatter {
			layout: string;
			title: string | null;
			category: string | null;
		}
		const mainFrontmatter: ComputedRef<MainFrontmatter> = computed(() => ({
			layout: frontmatter.value.layout ?? "article",
			title: frontmatter.value.title ?? null,
			category: frontmatter.value.category ?? null,
		}));

		const contentMap: { [index: string]: Component } = {
			home: Home,
			list: List,
			tags: Tags,
			categories: Categories,
			about: About,
			article: BlogArticle,
		};
		const currentContent = computed(() => contentMap[mainFrontmatter.value.layout]);
		const isArticle = computed(() => mainFrontmatter.value.layout === "article");
		return { withBase, mainFrontmatter, currentContent, isArticle };
	},
};
</script>

<template>
	<div class="relative flex flex-row flex-wrap">
		<div class="flex flex-col basis-3/4 min-h-screen flex-auto">
			<BlogHeader />

			<div class="flex relative h-full my-10">
				<div class="flex-shrink-0 hidden sm:flex">
					<h1 class="category-title sticky top-10 z-40 h-fit text-white-default/80">
						<span class="vertical-rl">
							{{ mainFrontmatter?.title ?? mainFrontmatter?.category ?? mainFrontmatter?.layout }}
						</span>
						<span> ></span>
					</h1>
				</div>
				<div class="max-w-3xl mx-auto flex">
					<component
						:is="currentContent"
						class="md:w-[640px] px-1 w-main-content"
					></component>
				</div>
				<TOCSidebar
					v-if="isArticle"
					class="flex-grow-0 w-44 hidden lg:block"
				></TOCSidebar>
			</div>

			<BlogFooter class="h-16" />
		</div>
		<Sidebar
			v-if="!isArticle"
			class="md:flex basis-1/4 flex-auto hidden"
		/>
	</div>
</template>
