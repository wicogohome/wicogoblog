<script lang="ts">
import _ from "lodash";
import { defineComponent, computed } from "vue";
import { withBase, useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";

import PostItemsGroup from "./components/PostItemsGroup.vue";

export default defineComponent({
	name: "Categories",
	components: { PostItemsGroup },
	setup() {
		const categories = _.groupBy(posts, "frontmatter.category");

		const { params } = useData();
		const currentCategory = computed(() => params?.value?.category);
		const currentPosts = computed(() => categories[currentCategory.value] ?? []);
		return { withBase, categories, currentCategory, currentPosts };
	},
});
</script>

<template>
	<div>
		<ol class="flex justify-start min-w-96 gap-1 flex-wrap">
			<li
				v-for="(posts, category) in categories"
				:key="category"
				class="p-4 rounded-t-lg border border-white-default"
				:class="{ 'bg-white-default text-black ': category == currentCategory }"
			>
				<a :href="withBase('/categories/' + category + '/')">
					{{ category }}
				</a>
				{{ posts.length }}
			</li>
		</ol>
		<div class="outline outline-1 min-h-52 min-w-80 rounded p-2">
			<hr />
			<hr class="my-1" />
			<PostItemsGroup
				:posts="currentPosts"
				:prefix="'/categories/' + currentCategory"
			>
			</PostItemsGroup>
		</div>
	</div>
</template>
