let path = require("path");

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
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
		],
	},
};
