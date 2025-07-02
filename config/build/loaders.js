import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function loaders(options) {
    const { mode } = options
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const htmlLoader = {
        test: /\.html$/,
        loader: 'html-loader',
    }

    const scssLoader = {
        test: /\.(scss|sass|css)$/,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
        ],
    }

    const fontsLoader = {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name][ext]',
        },
    }

    const imagesLoader = {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
            // Сохранение иерархии папок из папки src/img/
            filename: (pathData) => {
                const relativePath = path.relative(
                    path.resolve('src', 'img'),
                    pathData.filename
                );
                const parsed = path.parse(relativePath);

                // В продакшене: img/somefolder/[name].[contenthash][ext]
                if (isProd) {
                    return path.posix.join(
                        'img',
                        parsed.dir,
                        `${parsed.name}.[contenthash]${parsed.ext}`
                    );
                }

                // В дев-режиме сохраняем путь и имя
                return path.posix.join('img', parsed.dir, `${parsed.name}${parsed.ext}`);
            },
        },
    }

    return [
        htmlLoader,
        scssLoader,
        fontsLoader,
        imagesLoader,
    ]
}