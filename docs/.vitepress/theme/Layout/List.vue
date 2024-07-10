<script lang="ts">
import _ from "lodash";
import { defineComponent, computed } from "vue";
import { withBase, useData } from "vitepress";
import { data as posts } from "@@/data/routes.data.ts";
import useDateTime from "@@/utils/useDateTime";

export default defineComponent({
	name: "List",
	components: {},
	setup() {
		const { parseFromTZ } = useDateTime();
		const periods = _.groupBy(posts, ({ frontmatter: { date } }) => {
			const dateTime = parseFromTZ(date);
			return dateTime.year + "-" + dateTime.month;
		});

		const { params } = useData();
		const currentPeriod = computed(() => params?.value?.period);

		return { withBase, posts, periods, currentPeriod, params };
	},
});
</script>

<template>
	<div>
		{{ currentPeriod }}
		<ol>
			<li
				v-for="(articles, period) in periods"
				:key="period"
			>
				<a :href="withBase('/list/' + period + '/')">
					{{ period }}
				</a>
				{{ articles.length }}
			</li>
		</ol>

		<ul class="grid gap-4">
			<li
				v-for="({ url, frontmatter: { title, date } }, key) in periods[currentPeriod] ?? posts"
				:key="key"
			>
				<a :href="withBase(url)"> {{ title }} | {{ date }} </a>
			</li>
		</ul>
	</div>
</template>
