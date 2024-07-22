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
	<div class="relative min-w-20 min-h-20">
		<a
			:href="withBase(url)"
			class="group *:transition-all"
		>
			<div
				class="absolute right-0 blur-[2px] w-5/6 h-full rounded-lg bg-gradient-to-r from-green/20 to-yellow-default/90 group-hover:to-yellow-default group-hover:from-green/25 group-active:to-yellow-default group-active:from-green/25"
			></div>
			<div
				class="h-fit -translate-y-1/2 absolute inset-y-1/2 text-sm group-hover:translate-x-1 group-active:translate-x-1 w-11/12"
			>
				<slot></slot>
			</div>
			<FontAwesomeIcon
				class="absolute md:-bottom-[29px] -bottom-[24px] right-[24px] group-hover:translate-x-1 group-active::translate-x-1"
				icon="arrow-right"
				size="3x"
			/>
		</a>
	</div>
</template>
