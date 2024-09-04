<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Ref } from "vue";
import { withBase, onContentUpdated } from "vitepress";
import useTOC from "@@/utils/useTOC.ts";
import type { Header } from "@@/utils/useTOC.ts";
import SidebarItem from "./SidebarItem.vue";
export default defineComponent({
	name: "TOCSidebar",
	components: { SidebarItem },
	setup() {
		const { getHeaders, useActiveAnchor } = useTOC();
		const headers: Ref<Header[]> = ref([]);

		onContentUpdated(() => {
			headers.value = getHeaders();
		});

		const container = ref();
		const marker = ref();
		useActiveAnchor(container, marker);
		return { withBase, headers, container, marker };
	},
});
</script>

<template>
	<div ref="container">
		<div class="sticky top-11 left-0 block bg-white-light/20 py-6 pl-4 pr-2 bottom-4 overflow-hidden">
			<div
				ref="marker"
				class="bg-yellow-default w-1 h-5 absolute transition-all"
			></div>
			<SidebarItem :headers="headers"></SidebarItem>
		</div>
	</div>
</template>
