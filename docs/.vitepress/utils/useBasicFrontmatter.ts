export interface BasicFrontmatter {
	title: string;
	description: string;
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
		description,
		tags,
		date,
		ogUrl,
		lastUpdated,
		category,
		url,
	}: BasicFrontmatter): BasicFrontmatter {
		return {
			title,
			description,
			tags: tags ?? [],
			date,
			ogUrl: ogUrl ?? "/default-cover.webp",
			lastUpdated,
			category: category ?? "未分類",
			url,
		};
	}
	return { formatWithDefault };
}
