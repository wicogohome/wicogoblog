<script lang="ts">
import { useData, withBase } from "vitepress";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import TOCSidebar from "./components/TOCSidebar.vue";
import Footer from "./components/Footer.vue";
import Article from "./Article.vue";
import Home from "./Home.vue";
import About from "./About.vue";
import List from "./List.vue";
import Tags from "./Tags.vue";
import Catagories from "./Catagories.vue";

export default {
	components: { Header, Sidebar, TOCSidebar, Footer, Article, Home, About, List, Tags, Catagories },
	setup() {
		const { frontmatter } = useData();
		return { withBase, frontmatter };
	},
};
</script>

<template>
	<div class="relative flex flex-row flex-wrap">
		<div class="flex flex-col basis-3/4 min-h-screen flex-auto">
			<Header />

			<div class="flex relative h-full my-16">
				<div class="flex-shrink-0 hidden sm:flex">
					<p class="catagory-title sticky top-16 z-40 h-fit">
						<span class="vertical-rl">
							{{ frontmatter?.catagory ?? frontmatter?.layout }}
						</span>
						<span> ></span>
					</p>
				</div>
				<div class="max-w-3xl mx-auto flex">
					<Home v-if="frontmatter.layout === 'home'" />
					<List v-else-if="frontmatter.layout === 'list'" />
					<Tags v-else-if="frontmatter.layout === 'tags'" />
					<Catagories v-else-if="frontmatter.layout === 'catagories'" />
					<About
						v-else-if="frontmatter.layout === 'about'"
						class="md:w-[768px] w-screen max-w-sm"
					/>
					<Article
						v-else
						class="md:w-[768px] w-screen"
					/>
				</div>
				<TOCSidebar
					v-if="!frontmatter.layout"
					class="flex-grow-0 w-44 hidden sm:block"
				></TOCSidebar>
			</div>

			<Footer class="max-h-10" />
		</div>
		<Sidebar
			v-if="frontmatter.layout && frontmatter.layout !== 'article'"
			class="md:flex basis-1/4 flex-auto hidden"
		/>
	</div>
</template>
