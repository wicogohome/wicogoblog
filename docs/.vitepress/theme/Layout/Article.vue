<script lang="typescript">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
export default defineComponent({
	name: "Article",
	setup() {
		return { withBase };
	},
});
</script>

<template>
	<div>
		<a :href="withBase('/')">Home</a>
		<Content class="break-all" />
	</div>
</template>
