<script lang="ts">
import { defineComponent, computed } from "vue";
import SVGBackground from "./SVGBackground.vue";
import ProjectGroup from "./ProjectGroup.vue";
import useContent from "@/utils/useContent.ts";

import MainCard from "@/assets/main-card.svg";
import Lines from "@/assets/lines.svg";
import Dots from "@/assets/dots.svg";
import TopicCard from "@/assets/topic-card.svg";
import Circle from "@/assets/circle.svg";
import Sector from "@/assets/sector.svg";

export default defineComponent({
	name: "PortfolioContent",
	components: { SVGBackground, ProjectGroup },
	setup() {
		const { lang, getWorks, getProjects } = useContent();
		const works = computed(() => getWorks(lang.value));
		const projects = computed(() => getProjects(lang.value));

		return {
			works,
			projects,
			MainCard,
			TopicCard,
			Lines,
			Dots,
			Circle,
			Sector,
		};
	},
});
</script>

<template>
	<div class="relative m-8">
		<div class="relative mx-auto lg:w-3/4 inset-x-0 flex flex-col gap-4">
			<SVGBackground
				:url="MainCard"
				class=""
			>
				<div class="relative z-10">
					<h1 class="website-title">
						Hola, <br />
						<span class="outline outline-black outline-2 outline-offset-[-3px]"> I’m Wico Tang. </span>
					</h1>
					<p class="md:indent-28 indent-16 text-sm">Backend engineer / Frontend engineer,</p>
					<p class="md:indent-28 indent-16 text-sm">3 years +</p>
				</div>
				<div
					class="transition-transform absolute lg:left-3/4 md:left-2/3 md:top-2/3 sm:top-3/4 left-3/4 top-[100px] w-full hidden sm:block"
				>
					<img
						src="@/assets/headshot.webp"
						style="clip-path: circle()"
						class="md:w-[300px] w-1/2"
					/>
					<div
						class="text-xs bg-black rounded-lg text-white-default py-2 px-4 w-fit md:translate-x-[120px] translate-x-[100px] translate-y-[-25px]"
					>
						A Web Engineer You Can Trust
					</div>
				</div>
			</SVGBackground>
			<div class="flex">
				<div class="flex flex-col w-1/2 gap-4">
					<div class="flex justify-center">
						<SVGBackground
							:url="Dots"
							class="w-[40px]"
						></SVGBackground>
					</div>

					<SVGBackground
						:url="Lines"
						class="w-full"
					></SVGBackground>
				</div>
			</div>

			<!-- Works -->
			<h2 class="website-title">{{ " Works " }}</h2>
			<ProjectGroup :projects="works"> </ProjectGroup>

			<!-- Projects -->
			<h2 class="website-title">{{ " Projects " }}</h2>
			<ProjectGroup :projects="projects">
				<template #WicoGotBlog> read more </template>
			</ProjectGroup>

			<SVGBackground :url="Circle">
				<h2 class="website-title">{{ " Experiences " }}</h2>
				三年前/後端正職經驗，共五年相關經驗 -
				具備專案與時間管理以及良好的溝通能力，能夠在專案時間內掌握程式碼品質與需求的平衡
				<ul class="list-disc list-inside">
					<li>程式語言：PHP, JavaScript</li>
					<li>框架和函式庫：Laravel, Vue.js, jQuery, Bootstrap</li>
					<li>開發工具和環境：Git, GCP, Firebase, Heroku, MySQL, AWS</li>
					<li>設計工具：Photoshop, Illustrator, InDesign, Adobe XD</li>
					<li>frontend：HTML5 JavaScript Vue.js 3/2 Vite TailwindCSS Webpack jQuery Bootstrap</li>
					<li>backend：PHP Laravel Mysql Cash flow</li>
					<li>Deploy：Docker k8s GitHub Actions GitLab Runner</li>
					<li>Cloud：AWS（Certified SAA） GCP Firebase</li>
					<li>basic：git scrum Test</li>
				</ul>
			</SVGBackground>

			<SVGBackground :url="Sector"
				><h2 class="website-title">{{ " CONTACT with ME " }}</h2>
				wicotang@gmail.com
			</SVGBackground>
		</div>
	</div>
</template>
