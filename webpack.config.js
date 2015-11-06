/*globals module,__dirname*/

var path = require("path");
var glob = require("glob");

module.exports = {
	// entry: glob.sync("./lib/*.jsx"),
	entry: glob.sync(path.join(__dirname, "lib/*.jsx")),
	output: {
		path: __dirname,
		filename: "index.js",
		libraryTarget: "umd"
	},
	module: {
		loaders: [
			{test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: "babel"}
		]
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
		modulesDirectories: ["node_modules"]
	},
	externals: {
		react: "React"
	}
};
