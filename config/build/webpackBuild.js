import { devServer } from './devServer.js'
import { loaders } from './loaders.js'
import { plugins } from './plugins.js'

export function webpackBuild(options) {
    const { mode, paths } = options
    const isDev = mode === 'development'

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        stats: {
            children: true,
        },
        output: {
            path: paths.output,
            filename: 'js/app.[contenthash].js',
            // assetModuleFilename: 'assets/[name][ext]',
            clean: true,
        },
        target: isDev ? 'web' : 'browserslist',
        devtool: isDev ? 'source-map' : false,
        plugins: plugins(options),
        module: {
            rules: loaders(options),
        },
        devServer: isDev ? devServer() : undefined
    }
}