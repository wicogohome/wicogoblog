<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "PortfolioSidebar",
	components: {},
	setup() {
		const isOpen = ref(false);
		const links = [
			{
				title: "Blog",
				url: "https://blog.wicontang.com",
			},
			{
				title: "How to Do This",
				url: "https://blog.wicotang.com/categories/部落格製作/",
			},
			{
				title: "Profile",
				url: "https://www.cakeresume.com/me/jia-ying-tang",
			},
		];
		const actions = [
			{
				title: "Download this Page",
				action: () => {
					console.log("TODO download");
				},
			},
			{
				title: "Request an interview",
				action: () => {
					console.log("TODO Request");
				},
			},
		];
		return { isOpen, links, actions };
	},
});
</script>

<template>
	<div
		class="transition-all z-50 outline-white-default sm:outline outline-1 min-h-screen"
		:class="
			isOpen
				? 'sm:w-52 w-screen sm:relative absolute bg-white-light/90 sm:bg-white-light/20'
				: 'sm:relative absolute right-1 sm:bg-white-light/20 bg-none'
		"
	>
		<nav class="fixed flex flex-col justify-between p-6 h-full sm:w-auto w-full">
			<div>
				<FontAwesomeIcon
					:icon="[isOpen ? 'fa-solid' : 'fa-regular', 'fa-map']"
					size="lg"
					class="text-black cursor-pointer"
					@click="isOpen = !isOpen"
				/>
				<ul
					v-if="isOpen"
					class="flex flex-col text-right gap-y-3 mt-4"
				>
					<li
						v-for="{ title, url } in links"
						:key="title"
					>
						<a
							:href="url"
							:alt="title"
							target="_blank"
							>{{ title }}</a
						>
					</li>
				</ul>
			</div>

			<ul
				v-if="isOpen"
				class="flex flex-col gap-y-3 mt-4"
			>
				<li
					v-for="{ title, action } in actions"
					:key="title"
					class="cursor-pointer"
					@click="action"
				>
					{{ title }}
				</li>
			</ul>
		</nav>
	</div>
</template>
