<script lang="ts">
import _ from "lodash";
import { defineComponent, computed } from "vue";
import { withBase, useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";

import ArticleItem from "./components/ArticleItem.vue";

export default defineComponent({
	name: "Tags",
	components: { ArticleItem },
	setup() {
		const allTags = _(posts)
			.map("frontmatter.tags")
			.flatten()
			.uniq()
			.map((tag) => ({ tag, count: _.countBy(posts, ({ frontmatter: { tags } }) => tags.includes(tag)).true }))
			.orderBy("count", "desc")
			.value();

		const { params } = useData();
		const currentTag = computed(() => params?.value?.tag);
		const currentArticles = computed(() =>
			posts.filter(({ frontmatter: { tags } }) => tags.includes(currentTag.value))
		);
		return { withBase, allTags, currentTag, params, currentArticles };
	},
});
</script>

<template>
	<div>
		<div class="flex gap-3 my-4 flex-wrap">
			<a
				v-for="({ tag, count }, key) in allTags"
				:key="tag + key"
				:href="withBase('/tags/' + tag + '/')"
				class="bg-yellow-dark rounded-full px-4 relative py-2"
				:class="{ 'bg-gradient-to-r from-green/20 to-yellow-default/90': currentTag == tag }"
			>
				#{{ tag }}
				<div
					class="absolute -right-1 -top-1 text-center w-4 rounded-full bg-white-default aspect-square text-yellow-dark text-xs"
				>
					{{ count }}
				</div>
			</a>
		</div>

		<ul class="grid gap-4">
			<ArticleItem
				v-for="(
					{ url, frontmatter: { title, category, tags, date, lastUpdated, ogUrl } }, key
				) in currentArticles"
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
