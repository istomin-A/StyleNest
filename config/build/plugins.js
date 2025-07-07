import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ImageMinimizerWebpackPlugin from 'image-minimizer-webpack-plugin'

export function plugins(options) {
    const { mode, paths } = options
    // const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: paths.indexHtml,
        }),
        new HtmlWebpackPlugin({
            filename: 'contact.html',
            template: paths.contactHtml,
        }),
        new HtmlWebpackPlugin({
            filename: 'product.html',
            template: paths.productHtml,
        }),
        new HtmlWebpackPlugin({
            filename: 'catalog.html',
            template: paths.catalogHtml,
        }),
    ]

    // if(isDev){}

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/style.[contenthash].css',
            })
        )

        plugins.push(
            new ImageMinimizerWebpackPlugin({
                // Оптимизация картинок
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['imagemin-mozjpeg', {
                                quality: 85,
                            }],
                            ['imagemin-pngquant', {
                                quality: [0.65, 0.8],
                                speed: 2,
                                strip: true,
                            }],
                        ],
                    },
                },
                // Для создания avif картинки - использовать `?as=avif` при импорте картинки
                generator: [
                    {
                        preset: 'avif',
                        implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
                        options: {
                            plugins: [
                                ['imagemin-avif', { quality: 50 }]
                            ]
                        },
                    },
                ],
            }),
        )
    }

    return plugins
}