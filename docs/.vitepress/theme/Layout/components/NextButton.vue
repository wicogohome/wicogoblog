<script lang="ts">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
export default defineComponent({
	name: "NextButton",
	props: {
		url: {
			type: String,
			default: "#",
		},
	},
	setup() {
		return { withBase };
	},
});
</script>

<template>
	<div class="min-h-[56px]">
		<a
			:href="withBase(url)"
			class="group flex flex-col items-end gap-[6px] px-[18px] py-[14px] border border-ivory/[0.16] no-underline transition-[border-color,background] duration-[250ms] hover:border-olive-bright hover:bg-[rgba(200,204,58,0.05)]"
		>
			<span
				class="font-mono text-[18px] text-olive-bright transition-transform duration-[250ms] group-hover:translate-x-1"
				>→</span
			>
			<span class="font-serif-tc text-[clamp(14px,1.5vw,16px)] text-ivory-dim leading-[1.4] text-right"
				><slot></slot
			></span>
		</a>
	</div>
</template>
