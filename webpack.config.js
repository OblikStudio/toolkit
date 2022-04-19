let path = require("path");

/** @type {import('@types/webpack').Configuration} */
module.exports = {
	entry: {
		oblik: "./index.ts",
	},
	output: {
		library: "oblik",
		path: path.resolve(__dirname, "build/dist"),
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: "minify-html-literals-loader",
					},
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
};
