<script lang="ts">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
export default defineComponent({
	name: "Sidebar",
	setup() {
		const sidebarItems = [
			{
				title: "About",
				url: "/about/",
			},
			{
				title: "Categories",
				url: "/categories/",
			},
			{
				title: "tags",
				url: "/tags/",
			},
			{
				title: "Contact",
				url: "#",
			},
		];
		return { withBase, sidebarItems };
	},
});
</script>

<template>
	<div class="z-50 bg-white-light/20 outline-white-default outline outline-1 relative">
		<nav class="fixed block h-full p-6">
			<div class="flex flex-col h-full flex-nowrap break-all justify-between">
				<div class="flex flex-col items-center">
					<div class="bg-headshot w-32 aspect-square rounded-full bg-cover"></div>
					<p class="text-center break-normal">
						<span>Wico Tang</span><br />
						<span>Backend Developer</span><br />
						<small>#WEB #PHP #JS/TS #AWS </small>
					</p>

					<hr class="m-2 w-full" />
					<small class="text-center break-normal">
						終於開始部落格生活的LV.1初心者，目標是記錄平日開發與所學新知。
					</small>
				</div>
				<ul>
					<li
						v-for="{ title, url } in sidebarItems"
						:key="title"
					>
						<a :href="withBase(url)">{{ title }}</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>
