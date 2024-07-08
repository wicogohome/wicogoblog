<script lang="ts">
export default defineComponent({
	name: "BlogArticle",
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
