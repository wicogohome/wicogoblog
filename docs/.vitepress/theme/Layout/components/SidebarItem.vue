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
				class="text-ivory-dim hover:text-olive-bright transition-colors duration-200 break-keep whitespace-break-spaces text-[14.5px] leading-[1.6] inline-block py-[3px]"
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
