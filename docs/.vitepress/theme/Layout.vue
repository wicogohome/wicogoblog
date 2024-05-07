<script setup lang="ts">
import { ref } from "vue";
import { useData, withBase } from "vitepress";
import { data as posts } from "@@/.vitepress/data/routes.data.ts";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>
	<img src="/vue.svg" />
	<div v-if="frontmatter.home">
		<h1 class="text-cyan-700">{{ site.title }}</h1>
		<p>{{ site.description }}</p>
		<Content />
		<ul>
			<li v-for="{ url, frontmatter: { title } } in posts">
				<a :href="withBase(url)">{{ title ?? url }}</a>
			</li>
		</ul>
	</div>
	<div v-else>
		<a href="./">Home</a>
		<Content />
	</div>
</template>
