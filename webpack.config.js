import { webpackBuild } from "./config/build/webpackBuild.js"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'js', 'app.js'),
        output: path.resolve(__dirname, 'build'),
        indexHtml: path.resolve(__dirname, 'src', 'index.html'),
        contactHtml: path.resolve(__dirname, 'src', 'contact.html'),
        productHtml: path.resolve(__dirname, 'src', 'product.html'),
        catalogHtml: path.resolve(__dirname, 'src', 'catalog.html'),
    }

    return webpackBuild({
        mode: env.mode ?? 'development',
        paths
    })
}