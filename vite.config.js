import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(process.cwd(), 'index.html'),
                index2: resolve(process.cwd(), 'index2.html'),
                faq: resolve(process.cwd(), 'FAQ.html'),
                collections: resolve(process.cwd(), 'collections.html'),
                contact: resolve(process.cwd(), 'contact.html'),
                eCatalog: resolve(process.cwd(), 'e-catalog.html'),
                jobReference: resolve(process.cwd(), 'job+reference.html'),
                newsDetail: resolve(process.cwd(), 'news-detail.html'),
                news: resolve(process.cwd(), 'news.html'),
                products: resolve(process.cwd(), 'products.html'),
                productDetail: resolve(process.cwd(), 'product-detail.html'),
            }
        }
    },
});