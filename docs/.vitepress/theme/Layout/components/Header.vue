<script lang="ts">
import { defineComponent } from "vue";
import { useData } from "vitepress";
export default defineComponent({
	name: "Header",
	setup() {
		const { site, frontmatter } = useData();
		return { site };
	},
});
</script>

<template>
	<header class="sticky top-0">
		<h1>{{ site.title }}</h1>
		{{ site.description }}
	</header>
</template>
