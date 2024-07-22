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

		function backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		return { withBase, mainFrontmatter, currentContent, isArticle, backToTop };
	},
};
</script>

<template>
	<div class="relative flex flex-row flex-wrap">
		<div class="flex flex-col basis-3/4 min-h-screen flex-auto">
			<BlogHeader />

			<div class="flex relative h-full my-10">
				<div class="flex-shrink-0 hidden md:flex">
					<h1
						class="group cursor-pointer category-title sticky top-11 z-40 max-h-[85vh] h-fit text-white-default/80 flex gap-2"
						@click="backToTop"
					>
						<span class="vertical-rl">
							{{ mainFrontmatter?.title ?? mainFrontmatter?.category ?? mainFrontmatter?.layout }}
						</span>
						<div class="group-hover:-rotate-90 transition-transform align-bottom h-fit">></div>
					</h1>
				</div>
				<div class="max-w-3xl mx-auto">
					<component
						:is="currentContent"
						class="px-1 w-main-content md:w-big-main-content lg:max-w-2xl"
					></component>
				</div>
				<TOCSidebar
					v-if="isArticle"
					class="max-w-44 hidden xl:block"
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
