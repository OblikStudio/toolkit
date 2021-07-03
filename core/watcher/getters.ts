export type Getter = (value: any, element?: Element) => any;

export let qs: Getter = function (selector: string) {
	return document.documentElement.querySelector(selector);
};

export let qsa: Getter = function (selector: string) {
	return document.documentElement.querySelectorAll(selector);
};
