import _ from "lodash";
import { DateTime } from "luxon";
import type { DateTime as DateTimeType } from "luxon";

const ORIGIN_DATETIME_FORMAT = "yyyy-MM-dd HH:mm z";
const DATE_FORMAT = "yyyy-MM-dd";
const DATETIME_FORMAT = "yyyy-MM-dd HH:ii";

export default function useDateTime() {
	function parseFromTZ(dateTimeString: string | DateTimeType, tz: string = "Asia/Taipei"): DateTimeType {
		if (_.isString(dateTimeString)) {
			return DateTime.fromFormat(dateTimeString + " " + tz, ORIGIN_DATETIME_FORMAT);
		}
		return dateTimeString;
	}

	function toDateString(dateTimeString: string | DateTimeType): string {
		return parseFromTZ(dateTimeString).toFormat(DATE_FORMAT);
	}

	function toDateTimeString(dateTimeString: string | DateTimeType): string {
		return parseFromTZ(dateTimeString).toFormat(DATETIME_FORMAT);
	}

	return { parseFromTZ, toDateString, toDateTimeString };
}
