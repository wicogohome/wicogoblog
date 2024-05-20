import { DateTime } from "luxon";

export default function useDateTime() {
	function parseFromTZ(dateTimeString: string, tz: string = "Asia/Taipei"): DateTime {
		return DateTime.fromFormat(dateTimeString + " " + tz, "yyyy-MM-dd HH:mm z");
	}

	function toDateString(dateTimeString: string): string {
		return parseFromTZ(dateTimeString).toFormat("yyyy-MM-dd");
	}

	function toDateTimeString(dateTimeString: string): string {
		return parseFromTZ(dateTimeString).toFormat("yyyy-MM-dd HH:ii");
	}

	return { parseFromTZ, toDateString, toDateTimeString };
}
