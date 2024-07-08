<script lang="ts">
import { defineComponent } from "vue";
import { useData, withBase } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import ArticleItem from "./components/ArticleItem.vue";
export default defineComponent({
	name: "Home",
	components: { ArticleItem },
	setup() {
		const { site } = useData();
		return { site, posts, withBase };
	},
});
</script>

<template>
	<div class="px-6">
		<ul class="grid gap-4">
			<ArticleItem
				v-for="({ url, frontmatter: { title, category, tags, date, lastUpdated, ogUrl } }, key) in posts"
				:key="key"
				:title="title"
				:url="url"
				:category="category"
				:tags="tags"
				:date="date"
				:last-updated="lastUpdated"
				:og-url="ogUrl"
			>
			</ArticleItem>
		</ul>
	</div>
</template>
