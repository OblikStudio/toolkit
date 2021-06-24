import { Parser } from "../../utils/config";

const config = new Parser();

export function value(input: any) {
	if (typeof input === "string" && input.length > 0) {
		if (input[0] === "{") {
			return JSON.parse(input);
		} else {
			return config.parse(input);
		}
	} else {
		return undefined;
	}
}
