<script lang="ts">
import { ref } from "vue";
import { useData, withBase } from "vitepress";
import { data as posts } from "@@/.vitepress/data/routes.data.ts";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
import Article from "./Article.vue";
import Home from "./Home.vue";
import About from "./About.vue";
import List from "./List.vue";
import Tags from "./Tags.vue";
import Catagories from "./Catagories.vue";

export default {
	components: { Header, Sidebar, Footer, Article, Home, About, List, Tags, Catagories },
	setup() {
		const { site, frontmatter } = useData();
		return { site, posts, withBase, frontmatter };
	},
};
</script>

<template>
	<div class="relative flex flex-row flex-wrap">
		<div class="flex flex-col basis-3/4 min-h-screen flex-auto">
			<Header />
			<div class="border-2 h-full">
				<Home v-if="frontmatter.layout === 'home'" />
				<About v-else-if="frontmatter.layout === 'about'" />
				<List v-else-if="frontmatter.layout === 'list'" />
				<Tags v-else-if="frontmatter.layout === 'tags'" />
				<Catagories v-else-if="frontmatter.layout === 'catagories'" />
				<Article v-else />
			</div>
			<Footer class="max-h-10" />
		</div>
		<Sidebar class="md:flex basis-1/4 h-screen flex-auto hidden" />
	</div>
</template>
