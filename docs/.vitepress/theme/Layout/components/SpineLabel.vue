<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "SpineLabel",
	props: {
		text: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		function backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		const isLong = computed(() => (props.text?.length ?? 0) > 25);
		return { backToTop, isLong };
	},
});
</script>

<template>
	<button
		type="button"
		aria-label="回到頁首"
		class="group sticky top-[clamp(48px,8vw,104px)] z-30 flex gap-4 -translate-x-[calc(100%+16px)] cursor-pointer border-0 bg-transparent p-0"
		@click="backToTop"
	>
		<span
			class="text-left vertical-rl max-h-[85vh] font-serif-tc font-normal tracking-[0.15em] text-ivory-faint"
			:class="isLong ? 'text-3xl' : 'text-3xl'"
			>{{ text }}</span
		>
		<span
			class="h-fit font-mono text-xl leading-none text-olive-bright transition-transform duration-300 group-hover:-rotate-90"
			>&gt;</span
		>
	</button>
</template>
