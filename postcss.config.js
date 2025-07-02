import postcssPresetEnv from 'postcss-preset-env'
import postcssSortMediaQueries from 'postcss-sort-media-queries'

export default () => {
    return {
        plugins: [
            postcssPresetEnv({
                features: {
                    'custom-media-queries': false,
                    'media-query-ranges': false,
                },
            }),
            postcssSortMediaQueries
        ]
    }
}