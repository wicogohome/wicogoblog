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
		const { lang, getWorks, getProjects, getSummary, getExperiences, getSkills } = useContent();
		const works = computed(() => getWorks(lang.value));
		const projects = computed(() => getProjects(lang.value));
		const summary = computed(() => getSummary(lang.value));
		const experiences = computed(() => getExperiences(lang.value));
		const skills = getSkills();

		return {
			works,
			projects,
			summary,
			experiences,
			skills,

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
		<div class="relative mx-auto lg:w-3/4 inset-x-0 flex flex-col gap-8 print:w-full">
			<SVGBackground
				:url="MainCard"
				class="print:w-2/3"
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
					class="transition-transform absolute lg:left-3/4 md:left-2/3 md:top-2/3 sm:top-3/4 left-3/4 top-[100px] md:w-[300px] w-full hidden sm:block print:hidden"
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
			<div class="flex print:w-2/3">
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
				<h2 class="title">Summary</h2>
				<p class="mb-4">
					{{ summary.intro }}
				</p>
				<ul class="list-disc list-inside text-xs pl-12">
					<li
						v-for="(list, key) in summary.lists"
						:key="key"
						class="mb-2"
					>
						{{ list }}
					</li>
				</ul>
			</SVGBackground>

			<!-- Works -->
			<h2 class="title">Works</h2>
			<ProjectGroup :projects="works"> </ProjectGroup>

			<!-- Projects -->
			<h2 class="title">Projects</h2>
			<ProjectGroup :projects="projects">
				<template #WicoGotBlog>
					<a
						href="https://blog.wicotang.com/categories/部落格製作/"
						class="single-whitespace font-zilla-highlight tracking-normal text-white-default bg-black"
						>Read More</a
					>
				</template>
			</ProjectGroup>
			<SVGBackground
				:url="Circle"
				class="h-96 print:w-2/3"
			>
				<h2 class="title">Experiences</h2>
				<p class="mb-4">
					{{ experiences.intro }}
				</p>
				<ul class="list-disc list-inside text-xs pl-12">
					<li
						v-for="(list, key) in experiences.lists"
						:key="key"
						class="mb-2"
					>
						{{ list }}
					</li>
				</ul>
			</SVGBackground>

			<BasicCard>
				<template #title>Certifications & Skills</template>
				<template #url>
					<ul>
						<li
							v-for="{ url, name } in skills.certifications"
							:key="name"
						>
							<a
								:href="url"
								class="single-whitespace font-zilla-highlight tracking-normal text-white-default bg-black"
								>{{ name }}</a
							>
						</li>
					</ul>
				</template>
				<template #content>
					<ul class="list-disc list-inside pl-12 text-xs">
						<li
							v-for="(list, key) in skills.lists"
							:key="key"
							class="mb-2"
						>
							{{ list }}
						</li>
					</ul>
				</template>
			</BasicCard>

			<SVGBackground
				:url="Sector"
				class="w-1/2 mb-12 mih-h-12"
			>
				<div class="relative sm:w-52 sm:h-40 w-32 h-32">
					<div class="absolute bottom-0">
						<h2 class="title">CONTACT with ME</h2>
						<p class="indent-8 bg-white-default/90">>> wicotang@gmail.com</p>
					</div>
				</div>
			</SVGBackground>
		</div>
	</div>
</template>
