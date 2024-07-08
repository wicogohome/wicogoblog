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
		<h1 class="website-title relative">
			<span>WicoGot</span>
			<br />
			<span class="-ml-2">>>Blog.md</span>
		</h1>
	</header>
	<nav class="sticky top-0 z-40">
		<ul class="grid grid-flow-col justify-end grid-cols-6 backdrop-blur-sm shadow-sm shadow-yellow-light/20">
			<li class="col-span-3"></li>
			<li class="col-span-1">
				<a :href="withBase('/')">Home</a>
			</li>
			<li class="col-span-1"><a :href="withBase('/about')">About</a></li>
			<li class="col-span-1"><a :href="withBase('/list')">All ></a></li>
		</ul>
	</nav>
</template>
