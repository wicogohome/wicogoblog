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
		<nav
			class="flex flex-wrap gap-x-[12px] gap-y-[8px] mb-[clamp(28px,4vw,48px)] pb-[clamp(20px,3vw,32px)] border-b border-ivory/[0.16]"
		>
			<a
				v-for="(catPosts, category) in categories"
				:key="category"
				:href="withBase('/categories/' + category + '/')"
				class="inline-flex items-center gap-[6px] px-[18px] py-[8px] border border-ivory/[0.16] font-serif-tc text-[14px] text-ivory-dim no-underline transition-[color,border-color,background] duration-200 hover:text-olive-bright hover:border-olive-bright"
				:class="{ 'text-ink bg-olive-bright border-olive-bright': category == currentCategory }"
			>
				{{ category }}
				<span
					class="font-mono text-[11px] text-ivory-faint"
					:class="{ 'text-ink': category == currentCategory }"
					>{{ catPosts.length }}</span
				>
			</a>
		</nav>

		<PostItemsGroup
			:posts="currentPosts"
			:prefix="'/categories/' + currentCategory"
			:show-header="!!currentCategory"
		>
		</PostItemsGroup>
	</div>
</template>
