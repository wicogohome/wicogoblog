<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "BlogFooter",
	setup() {
		return {};
	},
});
</script>

<template>
	<footer
		class="text-center pt-[clamp(56px,9vw,110px)] pb-[clamp(40px,6vw,70px)] mt-[clamp(40px,6vw,64px)] border-t border-ivory/[0.16]"
	>
		<div class="font-newsreader italic text-[22px] text-ivory-dim">— fin —</div>
		<div class="font-mono text-[12px] tracking-[0.2em] text-ivory-faint mt-[14px]">WicoGotBlog © 2026</div>
	</footer>
</template>
