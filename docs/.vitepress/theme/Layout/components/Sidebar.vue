<script lang="ts">
import { defineComponent, computed } from "vue";
import { withBase } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import _ from "lodash";

export default defineComponent({
	name: "BlogColophon",
	setup() {
		const categories = computed(() =>
			_.chain(posts)
				.groupBy("frontmatter.category")
				.map((items, cat) => ({ cat, count: items.length }))
				.value()
		);
		const allTags = computed(() => _(posts).flatMap("frontmatter.tags").uniq().value());
		const totalCount = posts.length;
		return { withBase, categories, allTags, totalCount };
	},
});
</script>

<template>
	<div class="text-[14px] compact:border-t compact:border-ivory/[0.16] compact:pt-[32px]">
		<div class="font-mono text-[11px] tracking-[0.22em] uppercase text-ivory-faint mb-[18px]">作者 · colophon</div>
		<div class="flex gap-[16px] items-center">
			<div
				class="w-[64px] h-[64px] rounded-full overflow-hidden flex-none bg-black shadow-[0_0_0_1px_rgba(236,229,206,0.16),0_0_0_4px_rgba(200,204,58,0.14)]"
			>
				<img
					:src="withBase('/headshot.webp')"
					alt="Wico Tang"
					class="w-full h-full object-cover object-[50%_12%]"
				/>
			</div>
			<div>
				<div class="font-serif-tc font-semibold text-[20px] text-ivory leading-[1.2]">Wico Tang</div>
				<div class="font-mono text-[11.5px] text-olive-bright tracking-[0.04em] mt-[3px]">
					Backend Developer
				</div>
			</div>
		</div>
		<p
			class="font-newsreader italic text-ivory-dim text-[14.5px] leading-[1.7] my-[18px] py-[16px] border-y border-ivory/[0.16]"
		>
			終於開始部落格生活的LV.1初心者，目標是記錄平日開發與所學新知。
		</p>
		<a
			class="inline-flex items-center gap-[8px] mt-[18px] text-ivory-dim font-mono text-[12px] no-underline transition-colors duration-200 hover:text-olive-bright"
			href="https://github.com/wicogohome"
			target="_blank"
			rel="noopener"
		>
			<svg
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"
				/>
			</svg>
			github.com/wicogohome
		</a>

		<div class="font-mono text-[11px] tracking-[0.18em] uppercase text-ivory-faint mt-[24px] mb-[12px]">
			目次 · categories
		</div>
		<div class="flex flex-col">
			<a
				:href="withBase('/categories/')"
				class="group flex items-baseline gap-[10px] py-[8px] text-ivory-dim no-underline transition-colors duration-200 hover:text-olive-bright"
			>
				<span>全部</span>
				<span class="flex-1 border-b border-dotted border-ivory/[0.16] -translate-y-1"></span>
				<span class="font-mono text-[12px] text-ivory-faint group-hover:text-olive-bright">{{
					totalCount
				}}</span>
			</a>
			<a
				v-for="{ cat, count } in categories"
				:key="cat"
				:href="withBase('/categories/' + cat + '/')"
				class="group flex items-baseline gap-[10px] py-[8px] text-ivory-dim no-underline transition-colors duration-200 hover:text-olive-bright"
			>
				<span>{{ cat }}</span>
				<span class="flex-1 border-b border-dotted border-ivory/[0.16] -translate-y-1"></span>
				<span class="font-mono text-[12px] text-ivory-faint group-hover:text-olive-bright">{{ count }}</span>
			</a>
		</div>

		<div class="font-mono text-[11px] tracking-[0.18em] uppercase text-ivory-faint mt-[24px] mb-[12px]">
			標籤 · tags
		</div>
		<div class="flex flex-wrap gap-x-[14px] gap-y-[7px] font-mono text-[13px]">
			<a
				v-for="tag in allTags"
				:key="tag"
				:href="withBase('/tags/' + tag + '/')"
				class="text-ivory-dim no-underline transition-colors duration-200 before:content-['#'] before:text-ivory-faint hover:text-olive-bright"
				>{{ tag }}</a
			>
		</div>
	</div>
</template>
