import { ref } from "vue";
import _ from "lodash";
import { settings as preloadedSettings } from "virtual:portfolio-settings";

const DEFAULT_LANG = "en";
const AVAILABLE_LANGS = ["en", "zh-TW"];
const lang = ref(localStorage.getItem("lang") ?? DEFAULT_LANG);

function initSetting() {
	const settings = JSON.parse(preloadedSettings);
	const contents: Record<string, MultiLangContent[]> = _.get(settings, "contents", {
		works: [],
		projects: [],
	});

	const summary: MultiLangList = _.get(settings, "summary", {
		intro: {},
		lists: {},
	});

	const experiences: MultiLangList = _.get(settings, "experiences", {
		intro: {},
		lists: {},
	});

	const skills = _.get(settings, "skills", {
		certifications: {},
		lists: {},
	});

	return {
		contents,
		summary,
		experiences,
		skills,
	};
}
interface MultiLangContent {
	name: string;
	urls: Array<string>;
	intro: Record<string, string>;
	skills: Array<string>;
	contents: {
		technical?: Record<string, Array<string>>;
		management?: Record<string, Array<string>>;
	};
	images?: {
		top?: string | Array<string>;
		left?: string;
		right?: string;
	};
}

interface MultiLangList {
	intro: Record<string, string>;
	lists: Record<string, Array<string>>;
}

interface List {
	intro: string;
	lists: Array<string>;
}
export interface Content {
	name: string;
	urls: Array<string>;
	intro: string;
	skills: Array<string>;
	contents: {
		technical?: Array<string>;
		management?: Array<string>;
	};
	images?: {
		top?: string | Array<string>;
		left?: string;
		right?: string;
	};
}

export default function useContent() {
	const { contents, summary, experiences, skills } = initSetting();

	function toggleLang() {
		const currentKey = AVAILABLE_LANGS.indexOf(lang.value);
		lang.value = AVAILABLE_LANGS[currentKey + 1] ?? AVAILABLE_LANGS[0];
		localStorage.setItem("lang", lang.value);
		return lang.value;
	}
	function getWorks(lang: string = DEFAULT_LANG): Content[] {
		return _.map(_.get(contents, "works"), (content) => getLocalizedContent(content, lang));
	}

	function getProjects(lang: string = DEFAULT_LANG): Content[] {
		return _.map(_.get(contents, "projects"), (content) => getLocalizedContent(content, lang));
	}

	function getLocalizedContent(content: MultiLangContent, language: string): Content {
		const {
			name,
			urls,
			intro,
			skills,
			contents: { technical, management },
			images,
		} = content;

		const localizedContents: {
			technical?: Array<string>;
			management?: Array<string>;
		} = {};

		if (technical) {
			localizedContents.technical = technical[language] || technical[DEFAULT_LANG];
		}

		if (management) {
			localizedContents.management = management[language] || management[DEFAULT_LANG];
		}

		return {
			name,
			urls,
			intro: intro[language] || intro[DEFAULT_LANG],
			skills,
			contents: localizedContents,
			images,
		};
	}

	function getSummary(lang: string = DEFAULT_LANG): List {
		const { intro, lists } = summary;
		return {
			intro: intro[lang] || intro[DEFAULT_LANG],
			lists: lists[lang] || lists[DEFAULT_LANG],
		};
	}

	function getExperiences(lang: string = DEFAULT_LANG): List {
		const { intro, lists } = experiences;
		return {
			intro: intro[lang] || intro[DEFAULT_LANG],
			lists: lists[lang] || lists[DEFAULT_LANG],
		};
	}

	function getSkills() {
		return skills;
	}

	return { lang, toggleLang, getWorks, getProjects, getSummary, getExperiences, getSkills };
}
