<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "SVGBackground",
	props: {
		url: {
			type: String,
			required: true,
		},
		mode: {
			type: String,
			default: "img",
			validator(value: string) {
				return ["img", "bg"].includes(value);
			},
		},
	},
	setup() {
		function setBGStyle(url: string): string {
			return `background-image:url('${url}')`;
		}
		return { setBGStyle };
	},
});
</script>

<template>
	<div class="relative">
		<template v-if="mode === 'img'">
			<img
				:src="url"
				class="w-full h-full"
			/>
			<div class="absolute lg:top-16 md:top-12 top-8 -left-6">
				<slot></slot>
			</div>
		</template>

		<template v-if="mode === 'bg'">
			<div
				class="md:bg-contain bg-no-repeat py-12 bg-cover rounded-lg bg-center"
				:style="setBGStyle(url)"
			>
				<div class="-translate-x-6">
					<slot></slot>
				</div>
			</div>
		</template>
	</div>
</template>
