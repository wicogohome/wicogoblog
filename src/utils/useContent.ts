import { ref } from "vue";
import _ from "lodash";

const DEFAULT_LANG = "en";
const AVAILABLE_LANGS = ["en", "zh-TW"];
const lang = ref(DEFAULT_LANG);

// TODO auto insert from MD
const contents: Record<string, MultiLangContent[]> = {
	works: [
		{
			name: "poster",
			urls: [
				"https://www.cayintech.com/tw/digital-signage-products/software/poster.html",
				"https://poster.gocayin.com",
			],
			skills: ["Vue3", "Frontend", "Backend", "TailwindCSS"],
			intro: {
				en: "A web-based WYSIWYG editor offering ready-made templates and images, with customizable settings for various object types. The final product can be displayed on digital signage or regular screens.",
				"zh-TW":
					"可在網頁上使用的所見即所得（WYSIWYG）編輯器，提供現成模板與圖片，並可進行多種物件類型的自定義設定，成品可投放於電子看板或一般螢幕上。",
			},
			contents: {
				technical: {
					en: [
						"Development of different object types: text, background, images, and SVG shapes.",
						"Special styles application: animations (pure CSS) and text effects.",
						"Basic editor functions: zoom, drag, rotate, align, undo/redo, etc.",
						"Reusable program structure: generate editor options with different editing types through data configuration.",
						"Integration with related service APIs (material library)",
					],
					"zh-TW": [
						"開發不同物件類型：文字、背景、圖片、SVG形狀。",
						"可套用的特殊樣式：動畫（純CSS）、文字特效。",
						"編輯器基本功能：放大縮小、拖曳、旋轉、對齊、上下一步等。",
						"程式具可複用性：可透過資料設定，生成具有不同編輯型態的編輯器選項。",
						"相關服務API串接（素材庫）",
					],
				},
				management: {
					en: [
						"Managed the process from requirement confirmation to scheduling, established trackable timelines for PM, completed features on time, wrote test and functional documentation, significantly reducing the number of bugs found during QA testing.",
					],
					"zh-TW": [
						"進行從需求確認到時程管理的工作，建立PM可追蹤的時程，能夠在時間內完成功能，並撰寫測試與功能文件，大幅減少QA進測的bug數量。",
					],
				},
			},
		},
		{
			name: "GO CAYIN",
			urls: ["https://www.cayintech.com/tw/gocayin/gocayin.html", "https://gocayin.com"],
			skills: ["Vue3", "Laravel", "Frontend", "Backend", "CI/CD", "AWS", "Subscription", "Docker"],
			intro: {
				en: "A subscription-based SaaS platform available in personal and organizational versions, offering digital products and cloud storage subscriptions.",
				"zh-TW": "訂閱制的SaaS平台，分為個人與組織版，提供數位產品與雲端容量訂閱。",
			},
			contents: {
				technical: {
					en: [
						"Payment integration and subscription feature implementation: Researched domestic and international payment systems, integrated NewebPay and PayPal subscription APIs, and handled order and billing cycle logic.",
						"Admin panel development: Provided content management for the frontend website, allowing staff to manage applications and orders in real-time.",
						"Containerization: Migrated the project environment to Docker for easier environment setup and deployment.",
						"CI/CD testing and deployment: Configured GitLab Runner to execute frontend and backend tests, integrated with AWS for automatic deployment, reducing deployment time and cognitive load while ensuring continuous test coverage.",
						"Automated translation integration: Defined translation file formats, programmatically updated translations, reducing update time from 30-60 minutes to 5 minutes, and avoiding manual errors.",
					],
					"zh-TW": [
						"金流串接與訂閱功能實作：研究國內外金流，串接藍新與PayPal訂閱API，並處理訂單與週期計算邏輯。",
						"管理後台開發：提供對前台網頁的內容管理，方便人員即時管理應用程式與訂單。",
						"容器化：將專案環境遷移至Docker，以便環境建置與部屬。",
						"CICD測試與部屬 ：設定GitLab Runner執行前後端測試，並串接AWS進行自動部屬，減少部屬的時間成本與心智負擔，並確保程式持續受到測試保護。",
						"自動翻譯整合：定義翻譯文件格式，程式化地更新翻譯，將翻譯更新時間由30~60分鐘縮短為5分鐘，並避免人工錯誤。",
					],
				},
				management: {
					en: [
						"Responsible for work allocation of frontend support engineers and collaboration with backend engineers' progress",
						"Conducted Code Reviews",
					],
					"zh-TW": ["負責前端支援工程師之工作分配，後端工程師進度協作", "執行Code Review"],
				},
			},
		},
	],
	projects: [
		{
			name: "WicoGotBlog",
			urls: ["https://blog.wicotang.com/"],
			skills: ["Vue3", "Frontend", "CI/CD", "AWS", "Docker", "Web", "SEO"],
			intro: {
				en: "A personal blog based on VitePress, allowing content writing on various platforms using Obsidian. With Git commit integration, articles can be previewed or updated directly after writing, minimizing publishing friction.",
				"zh-TW":
					"以VitePress為底的個人部落格，可在不同裝置上使用Obsidian編寫文章內容，搭配Git commit，在寫作完成後能夠直接預覽或更新部落格文章。",
			},
			contents: {
				technical: {
					en: [
						"Project structure: Vue3 + VitePress (architecture diagram planned)",
						"Cloud environment: AWS S3 + CloudFront + Route53",
						"CI/CD: Automatic deployment with GitHub Actions",
						"Domain management, SEO (search console & Facebook), CloudWatch monitoring",
					],
					"zh-TW": [
						"專案架構：Vue3 + VitePress（想畫架構圖）",
						"雲端環境：AWS S3 + CloudFront + Route53",
						"CICD：GitHub Actions自動部屬",
						"Domain管理 SEO(search console & facebook) CloudWatch監控",
					],
				},
			},
			images: { left: "/blog.png", top: ["/blog-2.png", "/blog-flow.jpg"] },
		},
		{
			name: "Let's celebrate!",
			urls: ["https://calendar-4f7f4.firebaseapp.com/"],
			skills: ["Vue2", "Frontend", "Firebase", "OpenGraph"],
			intro: {
				en: "A marketing campaign for the '1461' daytime graphic design graduation project at NTUA. It's a website allowing users to view and create anniversaries, and share them on Facebook.",
				"zh-TW":
					"台藝日間圖文畢業製作《1461》之行銷活動，是個可以讓使用者觀看與建立紀念日，並分享到臉書的網站。",
			},
			contents: {
				technical: {
					en: [
						"Single Page Application using Vue.js, deployed on Firebase Hosting",
						"Database using Firebase Firestore and Storage for data and image storage",
						"FB OG using Firebase Functions, with Node.js handling thumbnail and title display",
					],
					"zh-TW": [
						"使用Vue.js的SPA，部屬於Firebase Hosting",
						"資料庫使用Firebase  Firestore和Storage儲存資料與圖片",
						"FB OG使用Firebase Functions，以Node.js處理縮圖與標題顯示",
					],
				},
			},
			images: { left: "/1461.png" },
		},
		{
			name: "MP3Player",
			urls: ["https://wicogohome.github.io/MP3-Player/"],
			skills: ["Vue2", "YouTube API"],
			intro: {
				en: "A streaming music API, choosing YouTube over Spotify for ease of listening. The page includes two playlists and changes cover images with music. The presentation uses CSS animation for a rotating effect and binds objects to beautify the playback interface.",
				"zh-TW":
					"串流音樂API，在spotify和youtube間為了方便收聽而選擇了後者。頁面包含兩份歌曲清單，並可隨著音樂切換封面圖片，呈現上運用CSS animation製作轉動的動畫效果，並綁定物件來美化播放介面。",
			},
			contents: {
				technical: {
					en: ["YouTube Data API integration", "Vue.js playlist / controller"],
					"zh-TW": ["YouTube Data API串接", "Vue.js 播放清單 / 控制器"],
				},
			},
			images: { right: "/mp3player.png" },
		},
		{
			name: "Pomodoro",
			urls: ["https://wicogohome.github.io/Pomodoro/"],
			skills: ["Vue2", "Canvas"],
			intro: {
				en: "This project primarily experiments with special shape drawing, changing the clock hand's movement speed according to work/rest times. The statistics section is also drawn with Canvas, achieving a layered effect of gradient + lines + dots simultaneously.",
				"zh-TW":
					"本作品主要嘗試特殊圖形繪製，並隨著工作∕  休息時間，改變指針面移動速度。統計部分同樣以Canvas繪製，藉由分層達到 漸層＋線條＋  圓點 同時呈現的效果。",
			},
			contents: {
				technical: {
					en: ["Canvas animations (clock face & statistics)", "Vue.js timer / todo list"],
					"zh-TW": ["Canvas動畫（鐘面＆統計）", "Vue.js 計時 / todo list"],
				},
			},
			images: { left: "/pomodora.png" },
		},
	],
};

const summary: MultiLangList = {
	intro: {
		en: "Possesses project and time management skills along with good communication abilities, capable of balancing code quality and requirements within project timelines.",
		"zh-TW": "",
	},
	lists: {
		en: [
			"Languages: PHP, JavaScript, TypeScript, node.js",
			"Frameworks & Libraries: Laravel, Vue.js, TailwindCSS",
			"Cloud: GCP, Firebase, Heroku, AWS (Certified SAA)",
			"CI/CD: Docker, GitHub Actions, GitLab Runner",
			"Flows: Git Flow, Scrum",
			"Others: Nginx, Apache, MySQL",
		],
	},
};

const experiences: MultiLangList = {
	intro: {
		en: "Three years of full-time front-end/back-end experience, with a total of five years of relevant experience.",
		"zh-TW": "",
	},
	lists: {
		en: [
			"CAYIN Technology, Research & Development, 2021.04 ~ 2024.03",
			"Bili digital information, Software Engineer (Intern & Full time), 2020.02 ~ 2021.03",
			"E-service Information Corporation, Software Engineer (Intern), 2018.07 ~ 2019.07",
			"NTUA, BFA, Graphic Communication of Arts, 2016 ~ 2020",
		],
	},
};

const skills = {
	certifications: [
		{
			url: "https://www.credly.com/users/jia-ying-tang",
			name: "AWS Certification (Credly)",
		},
	],
	lists: [
		"Languages: PHP, JavaScript, TypeScript, node.js",
		"Frameworks & Libraries: Laravel, Vue.js, TailwindCSS, jQuery, Bootstrap",
		"Cloud: GCP, Firebase, Heroku, AWS",
		"Frontend：HTML5, Vite, Webpack, Lodash",
		"Backend：Mysql, CashFlow, Export/Import xls/pdf Report",
		"Deploy：Docker, GitHub Actions, GitLab Runner",
		"Cloud：AWS（Certified SAA）, GCP, Firebase, Heroku",
		"Flows: Git Flow, Scrum",
		"Others: Nginx, Apache, Test",
	],
};

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

// {
//     name: ,
//     urls: [

//     ],
// 		skills: [
//     ],
//     intro: ,
//     contents: {
//         technical: [

//         ],
//         management: [

//         ],
//     },
// }

export default function useContent() {
	function toggleLang() {
		const currentKey = AVAILABLE_LANGS.indexOf(lang.value);
		lang.value = AVAILABLE_LANGS[currentKey + 1] ?? AVAILABLE_LANGS[0];
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
