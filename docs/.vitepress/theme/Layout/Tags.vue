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
			.map((tag) => ({ tag, count: _.countBy(posts, ({ frontmatter: { tags } }) => tags.includes(tag)).true }))
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
		{{ currentTag }}
		<ol>
			<li
				v-for="({ tag, count }, key) in allTags"
				:key="tag + key"
			>
				<a :href="withBase('/tags/' + tag + '/')">
					{{ tag }}
				</a>
				{{ count }}
			</li>
		</ol>
		<div v-if="currentTag">
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
	</div>
</template>
