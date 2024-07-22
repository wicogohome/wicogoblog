<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Header } from "@@/utils/useTOC";

export default defineComponent({
	name: "SidebarItem",
	props: {
		headers: {
			type: Array as PropType<Header[]>,
			default: () => [{}],
		},
	},
});
</script>

<template>
	<ul class="ml-4">
		<li
			v-for="{ title, link, children } in headers"
			:key="link"
		>
			<a
				:href="link"
				class="hover:text-yellow-default"
				>{{ title }}</a
			>
			<SidebarItem
				v-if="children"
				:headers="children"
				class="opacity-70"
			></SidebarItem>
		</li>
	</ul>
</template>
