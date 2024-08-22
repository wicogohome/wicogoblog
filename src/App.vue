<script lang="ts">
import { defineComponent } from "vue";
import PortfolioContent from "./components/PortfolioContent.vue";
import PortfolioSidebar from "./components/PortfolioSidebar.vue";
export default defineComponent({
	name: "App",
	components: { PortfolioContent, PortfolioSidebar },
	setup() {
		return {};
	},
});
</script>

<template>
	<div class="flex justify-around min-h-screen">
		<div class="w-full flex flex-col min-h-screen flex-auto">
			<PortfolioContent class="flex relative" />
			<footer class="text-center">
				<p>Copyright © 2024 WicoTang</p>
			</footer>
		</div>

		<PortfolioSidebar class="w-20"></PortfolioSidebar>
	</div>
</template>
