<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "BasicCard",
	setup() {
		return {};
	},
});
</script>

<template>
	<div class="relative group">
		<div
			class="w-full h-full absolute right-0 blur-sm rounded-2xl bg-gradient-to-r from-green/20 to-yellow-default/90 group-hover:to-yellow-default group-hover:from-green/25 transition-transform"
		></div>
		<div class="relative -translate-x-6 pt-12 pb-6">
			<div class="flex flex-col mb-4">
				<h3><slot name="title"> </slot></h3>
				<slot name="url"></slot>
				<slot name="skill"></slot>
			</div>

			<div class="flex flex-wrap -mx-2">
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>
