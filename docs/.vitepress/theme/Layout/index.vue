<script lang="ts">
import { useData, withBase } from "vitepress";
import type { Component, ComputedRef } from "vue";
import { computed } from "vue";

import About from "./About.vue";
import BlogArticle from "./Article.vue";
import Categories from "./Categories.vue";
import BlogFooter from "./components/Footer.vue";
import BlogHeader from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import SpineLabel from "./components/SpineLabel.vue";
import TOCSidebar from "./components/TOCSidebar.vue";
import Home from "./Home.vue";
import List from "./List.vue";
import Tags from "./Tags.vue";

// Layouts that carry a meaningful "chapter" heading worth mirroring in the spine label.
// Home's cover is already the strong visual anchor, so it's excluded.
const SPINE_LABEL_LAYOUTS = ["article", "list", "tags", "categories"];

export default {
	components: {
		BlogHeader,
		Sidebar,
		TOCSidebar,
		BlogFooter,
		SpineLabel,
		BlogArticle,
		Home,
		About,
		List,
		Tags,
		Categories,
	},
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

		const categoryTitle = computed(
			() => mainFrontmatter.value?.title ?? mainFrontmatter.value?.category ?? mainFrontmatter.value?.layout
		);
		const showSpineLabel = computed(() => SPINE_LABEL_LAYOUTS.includes(mainFrontmatter.value.layout));

		return { withBase, mainFrontmatter, currentContent, isArticle, categoryTitle, showSpineLabel };
	},
};
</script>

<template>
	<div class="max-w-[1160px] mx-auto">
		<div class="relative">
			<div class="hidden xl:block absolute left-0 inset-y-0 w-0">
				<SpineLabel :text="categoryTitle" />
			</div>
			<BlogHeader />
			<div
				class="px-gutter grid gap-[clamp(34px,6vw,84px)] items-start pt-[clamp(40px,6vw,72px)] compact:grid-cols-1 compact:gap-[48px]"
				:class="isArticle ? 'grid-cols-1 xl:grid-cols-[1fr_13rem]' : 'grid-cols-[1fr_264px]'"
			>
				<main>
					<component :is="currentContent"></component>
				</main>
				<aside
					v-if="!isArticle"
					class="sticky top-[76px] compact:static"
				>
					<Sidebar />
				</aside>
				<TOCSidebar
					v-if="isArticle"
					class="hidden xl:block sticky top-[76px]"
				/>
			</div>
			<BlogFooter />
		</div>
	</div>
</template>
