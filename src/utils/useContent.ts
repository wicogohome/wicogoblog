import { ref } from "vue";
import _ from "lodash";

const DEFAULT_LANG = "en";
const AVAILABLE_LANGS = ["en", "zh-TW"];
const lang = ref(DEFAULT_LANG);

const en = {
	works: [
		{
			name: "poster",
			urls: [
				"https://www.cayintechnical.com/tw/digital-signage-products/software/poster.html",
				"https://poster.gocayin.com",
			],
			skills: ["Vue3", "Frontend", "Backend", "TailwindCSS"],
			intro: "A web-based WYSIWYG editor offering ready-made templates and images, with customizable settings for various object types. The final product can be displayed on digital signage or regular screens.",
			contents: {
				technical: [
					"Development of different object types: text, background, images, and SVG shapes.",
					"Special styles application: animations (pure CSS) and text effects.",
					"Basic editor functions: zoom, drag, rotate, align, undo/redo, etc.",
					"Reusable program structure: generate editor options with different editing types through data configuration.",
					"Integration with related service APIs (material library)",
				],
				management: [
					"Managed the process from requirement confirmation to scheduling, established trackable timelines for PM, completed features on time, wrote test and functional documentation, significantly reducing the number of bugs found during QA testing.",
				],
			},
		},
		{
			name: "GO CAYIN",
			urls: ["https://www.cayintechnical.com/tw/gocayin/gocayin.html", "https://gocayin.com"],
			skills: ["Vue3", "Laravel", "Frontend", "Backend", "CI/CD", "AWS", "Subscription", "Docker"],
			intro: "A subscription-based SaaS platform available in personal and organizational versions, offering digital products and cloud storage subscriptions.",
			contents: {
				technical: [
					"Payment integration and subscription feature implementation: Researched domestic and international payment systems, integrated NewebPay and PayPal subscription APIs, and handled order and billing cycle logic.",
					"Admin panel development: Provided content management for the frontend website, allowing staff to manage applications and orders in real-time.",
					"Containerization: Migrated the project environment to Docker for easier environment setup and deployment.",
					"CI/CD testing and deployment: Configured GitLab Runner to execute frontend and backend tests, integrated with AWS for automatic deployment, reducing deployment time and cognitive load while ensuring continuous test coverage.",
					"Automated translation integration: Defined translation file formats, programmatically updated translations, reducing update time from 30-60 minutes to 5 minutes, and avoiding manual errors.",
				],
				management: [
					"Responsible for work allocation of frontend support engineers and collaboration with backend engineers' progress",
					"Conducted Code Reviews",
				],
			},
		},
	],
	projects: [
		{
			name: "WicoGotBlog",
			urls: ["https://blog.wicotang.com/"],
			skills: ["Vue3", "Frontend", "CI/CD", "AWS", "Docker", "Web", "SEO"],
			intro: "A personal blog based on VitePress, allowing content writing on various platforms using Obsidian. With Git commit integration, articles can be previewed or updated directly after writing, minimizing publishing friction.",
			contents: {
				technical: [
					"Project structure: Vue3 + VitePress (architecture diagram planned)",
					"Cloud environment: AWS S3 + CloudFront + Route53",
					"CI/CD: Automatic deployment with GitHub Actions",
					"Domain management, SEO (search console & Facebook), CloudWatch monitoring",
				],
			},
			images: { left: "/blog.png", top: ["/blog-2.png", "/blog-flow.jpg"] },
		},
		{
			name: "Let's celebrate!",
			urls: ["https://calendar-4f7f4.firebaseapp.com/"],
			skills: ["Vue2", "Frontend", "Firebase", "OpenGraph"],
			intro: "A marketing campaign for the '1461' daytime graphic design graduation project at NTUA. It's a website allowing users to view and create anniversaries, and share them on Facebook.",
			contents: {
				technical: [
					"Single Page Application using Vue.js, deployed on Firebase Hosting",
					"Database using Firebase Firestore and Storage for data and image storage",
					"FB OG using Firebase Functions, with Node.js handling thumbnail and title display",
				],
			},
			images: { left: "/1461.png" },
		},
		{
			name: "MP3Player",
			urls: ["https://wicogohome.github.io/MP3-Player/"],
			skills: ["Vue2", "YouTube API"],
			intro: "A streaming music API, choosing YouTube over Spotify for ease of listening. The page includes two playlists and changes cover images with music. The presentation uses CSS animation for a rotating effect and binds objects to beautify the playback interface.",
			contents: {
				technical: ["YouTube Data API integration", "Vue.js playlist / controller"],
			},
			images: { right: "/mp3player.png" },
		},
		{
			name: "Pomodoro",
			urls: ["https://wicogohome.github.io/Pomodoro/"],
			skills: ["Vue2", "Canvas"],
			intro: "This project primarily experiments with special shape drawing, changing the clock hand's movement speed according to work/rest times. The statistics section is also drawn with Canvas, achieving a layered effect of gradient + lines + dots simultaneously.",
			contents: {
				technical: ["Canvas animations (clock face & statistics)", "Vue.js timer / todo list"],
			},
			images: { left: "/pomodora.png" },
		},
	],
};
const zhTW = {
	works: [
		{
			name: "poster",
			urls: [
				"https://www.cayintechnical.com/tw/digital-signage-products/software/poster.html",
				"https://poster.gocayin.com",
			],
			skills: ["Vue3", "Frontend", "Backend", "TailwindCSS"],
			intro: "可在網頁上使用的所見即所得（WYSIWYG）編輯器，提供現成模板與圖片，並可進行多種物件類型的自定義設定，成品可投放於電子看板或一般螢幕上。",
			contents: {
				technical: [
					"開發不同物件類型：文字、背景、圖片、SVG形狀。",
					"可套用的特殊樣式：動畫（純CSS）、文字特效。",
					"編輯器基本功能：放大縮小、拖曳、旋轉、對齊、上下一步等。",
					"程式具可複用性：可透過資料設定，生成具有不同編輯型態的編輯器選項。",
					"相關服務API串接（素材庫）",
				],
				management: [
					"進行從需求確認到時程管理的工作，建立PM可追蹤的時程，能夠在時間內完成功能，並撰寫測試與功能文件，大幅減少QA進測的bug數量。",
				],
			},
		},
		{
			name: "GO CAYIN",
			urls: ["https://www.cayintechnical.com/tw/gocayin/gocayin.html", "https://gocayin.com"],
			skills: ["Vue3", "Laravel", "Frontend", "Backend", "CI/CD", "AWS", "Subscription", "Docker"],
			intro: "訂閱制的SaaS平台，分為個人與組織版，提供數位產品與雲端容量訂閱。",
			contents: {
				technical: [
					"金流串接與訂閱功能實作：研究國內外金流，串接藍新與PayPal訂閱API，並處理訂單與週期計算邏輯。",
					"管理後台開發：提供對前台網頁的內容管理，方便人員即時管理應用程式與訂單。",
					"容器化：將專案環境遷移至Docker，以便環境建置與部屬。",
					"CICD測試與部屬 ：設定GitLab Runner執行前後端測試，並串接AWS進行自動部屬，減少部屬的時間成本與心智負擔，並確保程式持續受到測試保護。",
					"自動翻譯整合：定義翻譯文件格式，程式化地更新翻譯，將翻譯更新時間由30~60分鐘縮短為5分鐘，並避免人工錯誤。",
				],
				management: ["負責前端支援工程師之工作分配，後端工程師進度協作", "執行Code Review"],
			},
		},
	],
	projects: [
		{
			name: "WicoGotBlog",
			urls: ["https://blog.wicotang.com/"],
			skills: ["Vue3", "Frontend", "CI/CD", "AWS", "Docker", "Web", "SEO"],
			intro: "以VitePress為底的個人部落格，可在不同裝置上使用Obsidian編寫文章內容，搭配Git commit，在寫作完成後能夠直接預覽或更新部落格文章。",
			contents: {
				technical: [
					"專案架構：Vue3 + VitePress（想畫架構圖）",
					"雲端環境：AWS S3 + CloudFront + Route53",
					"CICD：GitHub Actions自動部屬",
					"Domain管理 SEO(search console & facebook) CloudWatch監控",
				],
			},
			images: { left: "/blog.png", top: ["/blog-2.png", "/blog-flow.jpg"] },
		},
		{
			name: "Let's celebrate!",
			urls: ["https://calendar-4f7f4.firebaseapp.com/"],
			skills: ["Vue2", "Frontend", "Firebase", "OpenGraph"],
			intro: "台藝日間圖文畢業製作《1461》之行銷活動，是個可以讓使用者觀看與建立紀念日，並分享到臉書的網站。",
			contents: {
				technical: [
					"使用Vue.js的SPA，部屬於Firebase Hosting",
					"資料庫使用Firebase  Firestore和Storage儲存資料與圖片",
					"FB OG使用Firebase Functions，以Node.js處理縮圖與標題顯示",
				],
			},
			images: { left: "/1461.png" },
		},
		{
			name: "MP3Player",
			urls: ["https://wicogohome.github.io/MP3-Player/"],
			skills: ["Vue2", "YouTube API"],
			intro: "串流音樂API，在spotify和youtube間為了方便收聽而選擇了後者。頁面包含兩份歌曲清單，並可隨著音樂切換封面圖片，呈現上運用CSS animation製作轉動的動畫效果，並綁定物件來美化播放介面。",
			contents: {
				technical: ["YouTube Data API串接", "Vue.js 播放清單 / 控制器"],
			},
			images: { right: "/mp3player.png" },
		},
		{
			name: "Pomodoro",
			urls: ["https://wicogohome.github.io/Pomodoro/"],
			skills: ["Vue2", "Canvas"],
			intro: "本作品主要嘗試特殊圖形繪製，並隨著工作∕  休息時間，改變指針面移動速度。統計部分同樣以Canvas繪製，藉由分層達到 漸層＋線條＋  圓點 同時呈現的效果。",
			contents: {
				technical: ["Canvas動畫（鐘面＆統計）", "Vue.js 計時 / todo list"],
			},
			images: { left: "/pomodora.png" },
		},
	],
};
const langMappings = {
	en,
	"zh-TW": zhTW,
};

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
	function toggleLang() {
		const currentKey = AVAILABLE_LANGS.indexOf(lang.value);
		lang.value = AVAILABLE_LANGS[currentKey + 1] ?? AVAILABLE_LANGS[0];
		return lang.value;
	}
	function getWorks(lang: string = DEFAULT_LANG): Content[] {
		// TODO auto insert from MD

		return _.get(langMappings, `${lang}.works`, _.get(langMappings, `${DEFAULT_LANG}.works`));
	}

	function getProjects(lang: string = DEFAULT_LANG): Content[] {
		// TODO auto insert from MD
		return _.get(langMappings, `${lang}.projects`, _.get(langMappings, `${DEFAULT_LANG}.projects`));
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
	}

	return { lang, toggleLang, getWorks, getProjects };
}
