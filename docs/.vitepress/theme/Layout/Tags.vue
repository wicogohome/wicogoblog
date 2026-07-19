<script lang="ts">
import _ from "lodash";
import { defineComponent, computed } from "vue";
import { withBase, useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import PostItemsGroup from "./components/PostItemsGroup.vue";

export default defineComponent({
	name: "Tags",
	components: { PostItemsGroup },
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
		const currentPosts = computed(() =>
			posts.filter(({ frontmatter: { tags } }) => tags.includes(currentTag.value))
		);
		return { withBase, allTags, currentTag, params, currentPosts };
	},
});
</script>

<template>
	<div>
		<div
			class="flex flex-wrap gap-x-[12px] gap-y-[8px] mb-[clamp(28px,4vw,48px)] pb-[clamp(20px,3vw,32px)] border-b border-ivory/[0.16]"
		>
			<a
				v-for="({ tag, count }, key) in allTags"
				:key="tag + key"
				:href="withBase('/tags/' + tag + '/')"
				class="inline-flex items-center gap-[4px] px-[14px] py-[6px] border border-ivory/[0.16] font-mono text-[13px] text-ivory-dim no-underline transition-[color,border-color,background] duration-200 hover:text-olive-bright hover:border-olive-bright"
				:class="{ 'text-ink bg-olive-bright border-olive-bright': currentTag == tag }"
			>
				<span
					class="text-ivory-faint"
					:class="{ 'text-ink': currentTag == tag }"
					>#</span
				>{{ tag }}
				<span
					class="text-[11px] text-ivory-faint ml-[4px]"
					:class="{ 'text-ink': currentTag == tag }"
					>{{ count }}</span
				>
			</a>
		</div>

		<PostItemsGroup
			:posts="currentPosts"
			:prefix="'/tags/' + currentTag"
			:show-header="!!currentTag"
		>
		</PostItemsGroup>
	</div>
</template>
