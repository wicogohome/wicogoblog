<script lang="ts">
import { defineComponent, computed } from "vue";
import { withBase } from "vitepress";
import useDataTime from "@@/utils/useDateTime.ts";
import useFrontmatter from "@@/utils/useFrontmatter.ts";
import NextButton from "./components/NextButton.vue";
import PrevButton from "./components/PrevButton.vue";

export default defineComponent({
	name: "BlogArticle",
	components: { NextButton, PrevButton },
	setup() {
		const { articleFrontmatter } = useFrontmatter();
		const { toDateString } = useDataTime();
		const createdAt = computed(() => {
			if (articleFrontmatter.value.date) {
				return toDateString(articleFrontmatter.value.date);
			}
			return "";
		});

		const lastUpdated = computed(() => {
			if (
				articleFrontmatter.value.lastUpdated &&
				articleFrontmatter.value.date &&
				!articleFrontmatter.value.lastUpdated.hasSame(articleFrontmatter.value.date, "day")
			) {
				return toDateString(articleFrontmatter.value.lastUpdated);
			}
			return "";
		});

		return { withBase, articleFrontmatter, createdAt, lastUpdated };
	},
});
</script>

<template>
	<div class="relative">
		<template v-if="articleFrontmatter.title">
			<div class="flex justify-between items-center flex-wrap gap-[8px] mb-[16px]">
				<a
					:href="withBase('/categories/' + articleFrontmatter.category + '/')"
					class="font-mono text-[12px] tracking-[0.12em] uppercase text-olive-bright no-underline border border-ivory/[0.16] px-[10px] py-[4px] transition-colors duration-200 hover:border-olive-bright"
				>
					{{ articleFrontmatter.category }}
				</a>
				<div
					v-if="articleFrontmatter.tags"
					class="flex gap-[12px] flex-wrap"
				>
					<a
						v-for="(tag, index) in articleFrontmatter.tags"
						:key="index"
						:href="withBase('/tags/' + tag + '/')"
						class="font-mono text-[13px] text-olive no-underline transition-colors duration-200 hover:text-olive-bright"
					>
						#{{ tag }}
					</a>
				</div>
			</div>

			<h1 class="article-title">{{ articleFrontmatter.title }}</h1>
			<p class="font-mono text-[clamp(18px,2.4vw,28px)] font-medium text-olive-bright my-[8px]">
				| {{ createdAt }}
			</p>
			<hr class="border-0 border-t border-ivory/[0.16] mt-[20px] mb-[32px]" />
		</template>

		<Content class="article-content mb-16" />

		<div class="grid md:grid-cols-5 gap-[16px] m-[16px]">
			<div
				v-if="lastUpdated.length > 0"
				class="col-span-full text-right font-mono text-[12px] text-ivory-faint"
			>
				最後更新：{{ lastUpdated }}
			</div>
			<PrevButton
				v-if="articleFrontmatter.prev"
				:url="articleFrontmatter.prev.url"
				class="w-full md:col-span-2"
				>{{ articleFrontmatter.prev.title }}</PrevButton
			>
			<NextButton
				v-if="articleFrontmatter.next"
				:url="articleFrontmatter.next.url"
				class="md:col-start-4 w-full md:col-span-2"
				>{{ articleFrontmatter.next.title }}</NextButton
			>
		</div>
	</div>
</template>
