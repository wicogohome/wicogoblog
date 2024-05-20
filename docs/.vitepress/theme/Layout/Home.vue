<script lang="ts">
import { defineComponent } from "vue";
import { useData, withBase } from "vitepress";
import { data as posts } from "@@/.vitepress/data/routes.data.ts";
import ArticleItem from "./components/ArticleItem.vue";
export default defineComponent({
	name: "Home",
	components: { ArticleItem },
	setup() {
		const { site, frontmatter } = useData();
		return { site, posts, withBase, frontmatter };
	},
});
</script>

<template>
	<div class="px-6">
		<ul class="grid gap-4">
			<ArticleItem
				v-for="{
					url,
					frontmatter: { title, catagory, tags, date, last_updated: lastUpdated, og_url: ogUrl },
				} in posts"
				:title="title"
				:url="url"
				:catagory="catagory"
				:tags="tags"
				:date="date"
				:last-updated="lastUpdated"
				:og-url="ogUrl"
			>
			</ArticleItem>
		</ul>
	</div>
</template>
