<script lang="ts">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import PostItemsGroup from "./components/PostItemsGroup.vue";

export default defineComponent({
	name: "Home",
	components: { PostItemsGroup },
	setup() {
		return { posts, withBase };
	},
});
</script>

<template>
	<div class="px-6">
		<PostItemsGroup :posts="posts"></PostItemsGroup>
	</div>
</template>
