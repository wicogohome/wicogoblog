<script lang="ts">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
export default defineComponent({
	name: "PrevButton",
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
	<div class="relative min-w-20 min-h-20">
		<a
			:href="withBase(url)"
			class="group *:transition-all"
		>
			<div
				class="p-1 absolute blur-[2px] w-5/6 h-full rounded-lg bg-gradient-to-r to-green/10 from-yellow-default/70 group-hover:from-yellow-default/80 group-hover:to-green/15 group-active:from-yellow-default/80 group-active:to-green/15"
			>
				<div class="bg-black-textured w-full h-full"></div>
			</div>
			<FontAwesomeIcon
				class="absolute md:-top-[29px] -top-[23px] left-[24px] group-hover:-translate-x-1 group-active:-translate-x-1 opacity-80"
				icon="arrow-left"
				size="3x"
			/>
			<div
				class="absolute right-0 inset-y-1/2 h-fit -translate-y-1/2 text-sm group-hover:-translate-x-1 group-active:-translate-x-1 w-11/12"
			>
				<slot></slot>
			</div>
		</a>
	</div>
</template>
