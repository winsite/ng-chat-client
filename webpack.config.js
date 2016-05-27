module.exports = {
	entry: './src/app.js',
	output: {
		path: `${__dirname}/dist`,
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			}
		]
	}
};