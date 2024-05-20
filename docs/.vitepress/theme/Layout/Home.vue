<script lang="ts">
import { defineComponent } from "vue";
import { useData, withBase } from "vitepress";
import { data as posts } from "@@/.vitepress/data/routes.data.ts";
export default defineComponent({
	name: "Home",
	setup() {
		const { site, frontmatter } = useData();
		return { site, posts, withBase, frontmatter };
	},
});
</script>

<template>
	<div class="bg-gradient-to-br from-green/20 to-yellow">
		<ul>
			<li v-for="{ url, frontmatter: { title } } in posts">
				<a :href="withBase(url)">{{ title ?? url }}</a>
			</li>
		</ul>
		<Content />
	</div>
</template>
