<script lang="ts">
import { defineComponent, computed } from "vue";
import SVGBackground from "./SVGBackground.vue";
import ProjectGroup from "./ProjectGroup.vue";
import BasicCard from "./BasicCard.vue";
import useContent from "@/utils/useContent.ts";

import MainCard from "@/assets/main-card.svg";
import Lines from "@/assets/lines.svg";
import Dots from "@/assets/dots.svg";
import TopicCard from "@/assets/topic-card.svg";
import Circle from "@/assets/circle.svg";
import Sector from "@/assets/sector.svg";

export default defineComponent({
	name: "PortfolioContent",
	components: { SVGBackground, ProjectGroup, BasicCard },
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
		<div class="relative mx-auto lg:w-3/4 inset-x-0 flex flex-col gap-8">
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

			<SVGBackground
				:url="TopicCard"
				mode="bg"
			>
				<h2 class="website-title">{{ " Summary " }}</h2>
				<p>
					Possesses project and time management skills along with good communication abilities, capable of
					balancing code quality and requirements within project timelines.
				</p>
				<ul class="list-disc list-inside">
					<li>Languages: PHP, JavaScript, TypeScript, node.js</li>
					<li>Frameworks & Libraries: Laravel, Vue.js, TailwindCSS</li>
					<li>Cloud: GCP, Firebase, Heroku, AWS (Certified SAA)</li>
					<li>CI/CD: Docker, GitHub Actions, GitLab Runner</li>
					<li>Flows: Git Flow, Scrum</li>
					<li>Others: Nginx, Apache, MySQL</li>
				</ul>
			</SVGBackground>

			<!-- Works -->
			<h2 class="website-title">{{ " Works " }}</h2>
			<ProjectGroup :projects="works"> </ProjectGroup>

			<!-- Projects -->
			<h2 class="website-title">{{ " Projects " }}</h2>
			<ProjectGroup :projects="projects">
				<template #WicoGotBlog>
					<a href="https://blog.wicotang.com/categories/部落格製作/">Read More</a>
				</template>
			</ProjectGroup>

			<SVGBackground
				:url="Circle"
				class="h-96"
			>
				<h2 class="website-title">{{ " Experiences " }}</h2>
				<p>
					Three years of full-time front-end/back-end experience, with a total of five years of relevant
					experience.
				</p>
				<ul class="list-disc list-inside pl-12">
					<li>CAYIN Technology, Research & Development, 2021.04 ~ 2024.03</li>
					<li>Bili digital information, Software Engineer (Intern & Full time), 2020.02 ~ 2021.03</li>
					<li>E-service Information Corporation, Software Engineer (Intern), 2018.07 ~ 2019.07</li>
					<li>NTUA, BFA, Graphic Communication of Arts, 2016 ~ 2020</li>
				</ul>
			</SVGBackground>
			<BasicCard>
				<template #title>{{ ` Certifications & Skills` }}</template>
				<template #url>
					<a href="https://www.credly.com/users/jia-ying-tang">AWS Certification (Credly)</a>
					<img />
				</template>
				<template #content>
					<div class="basis-full pl-12">
						<ul class="list-disc list-inside">
							<li>Languages: PHP, JavaScript, TypeScript, node.js</li>
							<li>Frameworks & Libraries: Laravel, Vue.js, TailwindCSS, jQuery, Bootstrap</li>
							<li>Cloud: GCP, Firebase, Heroku, AWS</li>
							<li>Frontend：HTML5, Vite, Webpack, Lodash</li>
							<li>Backend：Mysql, CashFlow, Export/Import xls/pdf Report</li>
							<li>Deploy：Docker, GitHub Actions, GitLab Runner</li>
							<li>Cloud：AWS（Certified SAA）, GCP, Firebase, Heroku</li>
							<li>Flows: Git Flow, Scrum</li>
							<li>Others: Nginx, Apache, Test</li>
						</ul>
					</div>
				</template>
			</BasicCard>

			<SVGBackground
				:url="Sector"
				class="w-1/2 mb-12"
			>
				<div class="relative sm:w-52 sm:h-40 w-32 h-32">
					<div class="absolute bottom-0">
						<h2 class="website-title">{{ " CONTACT with ME " }}</h2>
						<p class="indent-8 bg-white-default/90">>> wicotang@gmail.com</p>
					</div>
				</div>
			</SVGBackground>
		</div>
	</div>
</template>
