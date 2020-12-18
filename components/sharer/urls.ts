export interface SharerOptions {
	url: string;
	text?: string;
	image?: string;
}

export type Sharer = (input: SharerOptions) => string;

/**
 * @see https://developers.facebook.com/docs/plugins/share-button
 */
export let facebook: Sharer = function (input) {
	return `https://facebook.com/sharer.php?display=popup&u=${encodeURIComponent(
		input.url
	)}`;
};

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview
 */
export let twitter: Sharer = function (input) {
	let result = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
		input.url
	)}`;

	if (input.text) {
		result += `&text=${encodeURIComponent(input.text)}`;
	}

	return result;
};

/**
 * @see https://stackoverflow.com/a/33746543/3130281
 */
export let linkedin: Sharer = function (input) {
	return `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
		input.url
	)}`;
};

/**
 * @see https://stackoverflow.com/a/24851347/3130281
 */
export let reddit: Sharer = function (input) {
	let result = `http://www.reddit.com/submit?url=${encodeURIComponent(
		input.url
	)}`;

	if (input.text) {
		result += `&title=${input.text}`;
	}

	return result;
};

/**
 * @see https://stackoverflow.com/a/11212220/3130281
 */
export let pinterest: Sharer = function (input) {
	let result = `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
		input.url
	)}`;

	if (input.text) {
		result += `&description=${encodeURIComponent(input.text)}`;
	}

	if (input.image) {
		result += `&media=${encodeURIComponent(input.image)}`;
	}

	return result;
};
