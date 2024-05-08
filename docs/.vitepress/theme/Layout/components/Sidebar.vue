<script lang="typescript">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Sidebar",
	setup() {
		return {};
	},
});
</script>

<template>
	<div class="relative">
		<nav class="fixed block">
			<ul>
				<li><a href="#">Home</a></li>
				<li><a href="#">About</a></li>
				<li><a href="#">all</a></li>
				<li><a href="#">catagories</a></li>
				<li><a href="#">tags</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
		</nav>
	</div>
</template>
