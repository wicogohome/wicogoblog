<script lang="ts">
import { defineComponent, PropType } from "vue";

import ProjectCard from "./ProjectCard.vue";
import type { Content } from "@/utils/useContent.ts";
export default defineComponent({
	name: "PortfolioGroup",
	components: { ProjectCard },
	props: {
		projects: {
			type: Array as PropType<Content[]>,
			default: () => [{}],
		},
	},
	setup() {
		const directionMap = ["left", "right"];
		return { directionMap };
	},
});
</script>

<template>
	<ProjectCard
		v-for="({ name, urls, skills, images = {}, intro, contents }, key) in projects"
		:key="key"
		:name="name"
		:urls="urls"
		:skills="skills"
		:images="images"
		:intro="intro"
		:contents="contents"
		:direction="directionMap[key % 2]"
	>
		<slot :name="name"> </slot>
	</ProjectCard>
</template>
