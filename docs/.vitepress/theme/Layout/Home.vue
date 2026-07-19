<script lang="ts">
import { defineComponent, computed } from "vue";
import { withBase } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import PostItemsGroup from "./components/PostItemsGroup.vue";
import useDateTime from "@@/utils/useDateTime";

export default defineComponent({
	name: "Home",
	components: { PostItemsGroup },
	setup() {
		const { toDateString } = useDateTime();
		const featured = computed(() => (posts.length > 0 ? posts[0] : null));
		const rest = computed(() => posts.slice(1));
		return { posts, withBase, featured, rest, toDateString };
	},
});
</script>

<template>
	<div>
		<article
			v-if="featured"
			class="pb-[clamp(40px,6vw,64px)] border-b border-ivory/[0.16] mb-[clamp(36px,5vw,56px)]"
		>
			<span
				class="font-mono text-[12px] tracking-[0.24em] uppercase text-olive-bright flex items-center gap-[12px] before:content-[''] before:w-[26px] before:h-[1px] before:bg-olive-bright"
				>本期 · the current chapter</span
			>
			<a
				:href="withBase(featured.url)"
				class="group"
			>
				<h2
					class="font-serif-tc font-semibold text-[clamp(28px,4.4vw,52px)] leading-[1.16] tracking-[-0.01em] mt-[18px] text-ivory no-underline transition-colors duration-[250ms] group-hover:text-olive-bright"
				>
					{{ featured.frontmatter.title }}
				</h2>
			</a>
			<div
				v-if="featured.frontmatter.ogUrl"
				class="my-[26px] border border-ivory/[0.16] p-[10px] bg-ink-2"
			>
				<div
					class="aspect-[16/7] overflow-hidden flex items-center justify-center bg-[repeating-linear-gradient(135deg,#26251a_0_13px,#201f15_13px_26px)]"
				>
					<img
						:src="featured.frontmatter.ogUrl"
						:alt="featured.frontmatter.title"
						class="max-h-full max-w-full object-cover"
					/>
				</div>
			</div>
			<p
				v-if="featured.frontmatter.description"
				class="text-[clamp(15px,1.5vw,17px)] leading-[1.95] text-ivory-dim max-w-[64ch] mt-[8px] first-letter:float-left first-letter:font-newsreader first-letter:font-medium first-letter:text-[3.6em] first-letter:leading-[0.78] first-letter:pt-[0.04em] first-letter:pr-[0.1em] first-letter:text-olive-bright"
			>
				{{ featured.frontmatter.description }}
			</p>
			<div class="flex items-center gap-[18px] mt-[22px] font-mono text-[12.5px] text-ivory-faint flex-wrap">
				<span>{{ toDateString(featured.frontmatter.date) }}</span>
				<span
					v-if="featured.frontmatter.tags?.length"
					class="text-olive-bright"
				>
					{{ (featured.frontmatter.tags as string[]).map((t) => "#" + t).join(" ") }}
				</span>
				<a
					:href="withBase(featured.url)"
					class="font-newsreader italic text-[17px] text-ivory border-b border-olive-bright pb-[2px] no-underline transition-colors duration-[250ms] hover:text-olive-bright"
					>閱讀全文 →</a
				>
			</div>
		</article>

		<PostItemsGroup
			:posts="rest"
			:show-header="true"
		></PostItemsGroup>
	</div>
</template>
