<script lang="ts">
import { defineComponent } from "vue";
import { api as viewerApi } from "v-viewer";

export default defineComponent({
	name: "ImageViewer",
	props: {
		src: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		function displayViewer() {
			viewerApi({
				options: {
					toolbar: false,
					navbar: false,
				},
				images: [props.src],
			});
		}
		return { displayViewer };
	},
});
</script>

<template>
	<img
		:src="src"
		class="cursor-pointer"
		@click="displayViewer"
	/>
</template>
