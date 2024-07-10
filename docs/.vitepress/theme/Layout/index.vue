<script lang="ts">
import { useData, withBase } from "vitepress";
import type { ComputedRef } from "vue";
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
import { computed } from "vue";

export default {
	components: { BlogHeader, Sidebar, TOCSidebar, BlogFooter, BlogArticle, Home, About, List, Tags, Categories },
	setup() {
		const { frontmatter } = useData();
		interface MainFrontmatter {
			layout: string | null;
			title: string | null;
			category: string | null;
		}
		const mainFrontmatter: ComputedRef<MainFrontmatter> = computed(() => ({
			layout: frontmatter.value.layout ?? "article",
			title: frontmatter.value.title ?? null,
			category: frontmatter.value.category ?? null,
		}));
		return { withBase, mainFrontmatter };
	},
};
</script>

<template>
	<div class="relative flex flex-row flex-wrap">
		<div class="flex flex-col basis-3/4 min-h-screen flex-auto">
			<BlogHeader />

			<div class="flex relative h-full my-16">
				<div class="flex-shrink-0 hidden sm:flex">
					<p class="category-title sticky top-10 z-40 h-fit">
						<span class="vertical-rl">
							{{ mainFrontmatter?.title ?? mainFrontmatter?.category ?? mainFrontmatter?.layout }}
						</span>
						<span> ></span>
					</p>
				</div>
				<div class="max-w-3xl mx-auto flex">
					<Home v-if="mainFrontmatter.layout === 'home'" />
					<List v-else-if="mainFrontmatter.layout === 'list'" />
					<Tags v-else-if="mainFrontmatter.layout === 'tags'" />
					<Categories v-else-if="mainFrontmatter.layout === 'categories'" />
					<About
						v-else-if="mainFrontmatter.layout === 'about'"
						class="md:w-[768px] w-screen max-w-sm"
					/>
					<BlogArticle
						v-else
						class="md:w-[768px] w-screen"
					/>
				</div>
				<TOCSidebar
					v-if="mainFrontmatter.layout === 'article'"
					class="flex-grow-0 w-44 hidden sm:block"
				></TOCSidebar>
			</div>

			<BlogFooter class="max-h-10" />
		</div>
		<Sidebar
			v-if="mainFrontmatter.layout !== 'article'"
			class="md:flex basis-1/4 flex-auto hidden"
		/>
	</div>
</template>
