import _ from "lodash";

interface PaginatedParams {
	params: { [key: string]: string | number };
}

export default function usePagination() {
	function createPaginatedParams<T>(
		items: T[],
		getKey: (item: T) => string | string[],
		paramName: string,
		pagination: number
	): PaginatedParams[] {
		return _(items)
			.flatMap(getKey)
			.uniq()
			.map((key) => {
				const count = items.filter((item) => {
					const itemKey = getKey(item);
					return Array.isArray(itemKey) ? itemKey.includes(key) : itemKey === key;
				}).length;

				return createPaginationRange(count, pagination, { [paramName]: key });
			})
			.flatten()
			.value();
	}

	function createSimplePagination<T>(items: T[], pagination: number): PaginatedParams[] {
		return createPaginationRange(items.length, pagination);
	}

	function createPaginationRange(
		itemCount: number,
		pagination: number,
		additionalParams: {
			[key: string]: string | number;
		} = {}
	): PaginatedParams[] {
		const pageCount = Math.ceil(itemCount / pagination);
		return _.range(1, pageCount + 1).map((page) => ({
			params: {
				page,
				...additionalParams,
			},
		}));
	}
	function createIndexParam(paramName: string): PaginatedParams {
		return {
			params: {
				[paramName]: "index",
				page: 1,
			},
		};
	}

	return { createPaginatedParams, createSimplePagination, createIndexParam, createPaginationRange };
}
