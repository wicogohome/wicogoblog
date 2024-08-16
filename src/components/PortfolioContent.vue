<script lang="ts">
import { defineComponent } from "vue";
import MainCard from "@/assets/main-card.svg?component";
import Lines from "@/assets/lines.svg?component";
import Dots from "@/assets/dots.svg?component";
import Rectangle from "@/assets/rectangle.svg?component";
import TopicCard from "@/assets/topic-card.svg?component";
export default defineComponent({
	name: "PortfolioContent",
	components: { MainCard, TopicCard, Lines, Dots, Rectangle },
	setup() {
		console.log(MainCard);
		return { MainCard };
	},
});
</script>

<template>
	<div class="relative my-8">
		<div class="absolute top-12 left-4">
			<h1 class="website-title h-fit whitespace-pre">
				Hola, <br />
				<span class="outline outline-black outline-2 outline-offset-[-3px]"> I’m Wico Tang. </span>
			</h1>
			<p class="indent-28">Backend engineer / Frontend engineer,</p>
			<p class="indent-28">3 years +</p>
		</div>

		<div class="absolute top-0 -z-10 mx-auto w-5/6 inset-x-0 flex flex-col min-w-[350px]">
			<MainCard class="w-full"></MainCard>
			<div class="flex justify-center items-center">
				<Dots class="w-[50px]"></Dots>
			</div>
			<Lines class="w-1/2"></Lines>
			<Rectangle class="w-full"></Rectangle>
			<TopicCard></TopicCard>
			<img
				src="@/assets/headshot.webp"
				style="clip-path: circle()"
				width="150"
			/>
		</div>
	</div>
</template>
