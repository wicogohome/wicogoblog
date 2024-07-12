<script lang="ts">
import { defineComponent } from "vue";
import { withBase } from "vitepress";
import useDateTime from "@@/utils/useDateTime";
export default defineComponent({
	name: "PostItem",
	props: {
		title: { type: String, default: null },
		url: { type: String, default: null },
		category: { type: String, default: null },
		tags: { type: Array, default: () => [] },
		date: { type: String, default: null },
		lastUpdated: { type: String, default: null },
		ogUrl: { type: String, default: null },
	},
	setup() {
		const { toDateString } = useDateTime();
		return { withBase, toDateString };
	},
});
</script>

<template>
	<li
		class="bg-yellow-light/20 rounded-lg overflow-clip relative shadow-sm shadow-white-default/20 hover:brightness-105 transition-all hover:scale-105 hover:shadow-md hover:shadow-white-default/20 ease-in-out"
	>
		<div class="cursor-pointer h-60 overflow-hidden relative">
			<img
				:src="ogUrl"
				class="absolute blur-lg"
			/>
			<a :href="withBase(url)">
				<div class="absolute w-full h-full">
					<img
						:src="ogUrl"
						class="max-h-full m-auto"
					/>
				</div>
			</a>
		</div>

		<div class="p-4">
			{{ toDateString(date) }}
			<div class="flex justify-between">
				<a
					:href="withBase(url)"
					class="title"
					>{{ title ?? url }}</a
				>
				<div
					v-if="tags.length > 0"
					class="text-yellow-dark font-semibold"
				>
					<a
						v-for="(tag, index) in tags"
						:key="title + index"
						:href="withBase('/tags/' + tag)"
					>
						#{{ tag }}
					</a>
				</div>
			</div>

			<p class="text-sm line-clamp-3">
				TODO-銀話世手普恐注順新両祭情気国建。出入災情年込事根発画回姿並員材。天電自写部情展県越語谷月覧年整。供朝供本言上部台展茶全変訴第。際吉中県海一前注碁駐力王図済成平緩処期首。転在六長割相康善公裏示詩近柴長功著稿。愛断若関上線題星刑締整仙家阜域選加具。害読尽勝都今入館見覧転必命。円傷労会囲気男稿体愛書念秋。
			</p>
		</div>
	</li>
</template>
