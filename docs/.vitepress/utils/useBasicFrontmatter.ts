export interface BasicFrontmatter {
	title: string;
	tags: Array<string>;
	date: string;
	ogUrl: string;
	lastUpdated: string;
	category: string;
	url: string | null;
}

export default function useBasicFrontmatter() {
	function formatWithDefault({
		title,
		tags,
		date,
		ogUrl,
		lastUpdated,
		category,
		url,
	}: BasicFrontmatter): BasicFrontmatter {
		return { title, tags: tags ?? [], date, ogUrl, lastUpdated, category: category ?? "未分類", url };
	}
	return { formatWithDefault };
}
