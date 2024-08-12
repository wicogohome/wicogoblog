<script lang="ts">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
export default defineComponent({
	name: "BlogHeader",
	setup() {
		return { withBase };
	},
});
</script>

<template>
	<header class="bg-white-light/20 md:bg-transparent">
		<div class="website-title relative">
			<span>WicoGot</span>
			<br />
			<span class="-ml-2">>>Blog.md</span>
		</div>
	</header>
	<nav class="sticky top-0 z-40">
		<ul class="p-2 grid grid-flow-col justify-end grid-cols-6 backdrop-blur-sm shadow-sm shadow-yellow-light/20">
			<li class="col-span-2 sm:col-span-3"></li>
			<li class="col-span-1">
				<a :href="withBase('/')">首頁</a>
			</li>
			<li class="col-span-1"><a :href="withBase('/about/')">關於</a></li>
			<li class="col-span-2 sm:col-span-1"><a :href="withBase('/list/')">所有文章 ></a></li>
		</ul>
	</nav>
</template>
