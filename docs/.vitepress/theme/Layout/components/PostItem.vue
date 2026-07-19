<script lang="ts">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
import useDateTime from "@@/utils/useDateTime";
export default defineComponent({
	name: "PostItem",
	props: {
		title: { type: String, default: null },
		url: { type: String, default: null },
		category: { type: String, default: null },
		tags: { type: Array, default: () => [] },
		date: { type: String, default: null },
		folio: { type: Number, default: null },
	},
	setup() {
		const { toDateString } = useDateTime();
		return { withBase, toDateString };
	},
});
</script>

<template>
	<li
		class="group relative list-none border-t border-ivory/[0.09] before:content-[''] before:absolute before:left-[-2px] before:top-1/2 before:-translate-y-1/2 before:scale-y-0 before:origin-center before:w-[3px] before:h-[54%] before:bg-green before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100"
	>
		<a
			:href="withBase(url)"
			class="grid grid-cols-[54px_1fr_auto] narrow:grid-cols-[40px_1fr] gap-x-[20px] narrow:gap-x-[14px] gap-y-[6px] narrow:gap-y-[4px] items-baseline pt-[22px] pr-[14px] pb-[22px] pl-0 no-underline translate-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[18px]"
		>
			<span class="row-start-1 row-span-2 font-mono text-[15px] text-olive-bright pt-[0.15em]">{{
				folio != null ? String(folio).padStart(2, "0") : ""
			}}</span>
			<span
				class="font-serif-tc font-semibold text-[clamp(18px,2vw,24px)] leading-[1.3] text-ivory transition-colors duration-[250ms] group-hover:text-olive-bright"
				>{{ title ?? url }}</span
			>
			<span
				class="font-mono text-[12.5px] text-ivory-faint whitespace-nowrap narrow:col-[2] narrow:text-[12px] narrow:mt-[2px]"
				>{{ toDateString(date) }}</span
			>
			<span class="col-[2/4] narrow:col-[2] font-mono text-[12px] text-ivory-faint tracking-[0.02em]">
				<span class="text-ivory-dim">{{ category }}</span>
				<template v-if="tags && tags.length > 0">
					&nbsp;·&nbsp;
					<span class="text-olive">{{ (tags as string[]).map((t) => "#" + t).join(" ") }}</span>
				</template>
			</span>
		</a>
	</li>
</template>
