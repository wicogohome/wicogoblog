<script lang="ts">
import { useData, withBase } from "vitepress";
import { defineComponent } from "vue";
export default defineComponent({
	name: "BlogHeader",
	setup() {
		const { site } = useData();
		return { withBase, site };
	},
});
</script>

<template>
	<header class="pt-[clamp(48px,8vw,104px)]">
		<div
			class="flex justify-between items-center font-mono text-[11.5px] tracking-[0.22em] uppercase text-ivory-faint"
		>
			<span>WicoGotBlog <span class="text-olive-bright">·</span> Notes</span>
			<span>技術筆記</span>
		</div>
		<div class="mt-[clamp(28px,5vw,52px)] mb-[clamp(24px,4vw,40px)]">
			<div class="mb-[12px]">
				<span
					class="inline-block font-zilla font-bold text-ink bg-olive leading-[0.96] pt-[0.05em] px-[0.2em] pb-[0.13em] tracking-[0.005em] text-[clamp(38px,6.6vw,76px)] shadow-[0_14px_34px_rgba(0,0,0,0.5)]"
					>WicoGot</span
				>
			</div>
			<div class="mb-[12px]">
				<span
					class="inline-block font-zilla font-bold text-ink bg-olive leading-[0.96] pt-[0.05em] px-[0.2em] pb-[0.13em] tracking-[0.005em] text-[clamp(38px,6.6vw,76px)] shadow-[0_14px_34px_rgba(0,0,0,0.5)]"
					>&gt;&gt;Blog.md</span
				>
			</div>
		</div>
		<!-- <p class="font-newsreader italic text-[clamp(15px,1.8vw,20px)] text-ivory-dim max-w-[46ch] m-0">
			{{ site.description }}
		</p> -->
		<hr
			class="border-0 border-t border-ivory/[0.16] shadow-[0_3px_0_-2px_rgba(236,229,206,0.16)] mt-[clamp(26px,4vw,40px)]"
		/>
	</header>
	<!-- Sibling of <header>: a sticky element can only travel within its containing
	     block, so the nav must live outside the header to stick for the whole page. -->
	<nav
		class="sticky top-0 z-40 flex gap-[clamp(22px,4vw,46px)] items-center py-5 px-1 -mx-1 font-mono text-[13px] tracking-[0.1em] bg-ink/80 backdrop-blur-sm"
	>
		<a
			:href="withBase('/')"
			class="pl-2 text-ivory-dim no-underline transition-colors duration-[250ms] hover:text-olive-bright"
			>首頁</a
		>
		<a
			:href="withBase('/about/')"
			class="text-ivory-dim no-underline transition-colors duration-[250ms] hover:text-olive-bright"
			>關於</a
		>
		<a
			:href="withBase('/list/')"
			class="text-ivory-dim no-underline transition-colors duration-[250ms] hover:text-olive-bright"
			>所有文章</a
		>
	</nav>
</template>
