<script lang="ts">
import _ from "lodash";
import { defineComponent, computed } from "vue";
import { withBase, useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";

import ArticleItem from "./components/ArticleItem.vue";

export default defineComponent({
	name: "Categories",
	components: { ArticleItem },
	setup() {
		const categories = _.groupBy(posts, "frontmatter.category");

		const { params } = useData();
		const currentCategory = computed(() => params?.value?.category);

		return { withBase, categories, currentCategory, params };
	},
});
</script>

<template>
	<div>
		{{ currentCategory }}
		<ol>
			<li
				v-for="(articles, category) in categories"
				:key="category"
			>
				<a :href="withBase('/categories/' + category + '/')">
					{{ category }}
				</a>
				{{ articles.length }}
			</li>
		</ol>
		<div v-if="currentCategory">
			<ul class="grid gap-4">
				<ArticleItem
					v-for="(
						{ url, frontmatter: { title, category, tags, date, lastUpdated, ogUrl } }, key
					) in categories[currentCategory]"
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
