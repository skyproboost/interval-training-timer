export default {
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: process.env.npm_package_name || '',
                name: process.env.npm_package_name || '',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { href: process.env.NODE_ENV === 'production' ? process.env.HOST_FULL : '', rel: 'canonical' }

        ]
    },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/css/bootstrap.min.css',
        '~/assets/css/main.css'
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        '~/plugins/global-mixin',
        { src: '~/plugins/no-ssr.js', ssr: false }
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/sitemap',
        '@nuxtjs/auth',
        'nuxt-helmet',
        ['@nuxtjs/robots',
            {
                UserAgent: '*',
                sitemap: process.env.NODE_ENV === 'production' ? process.env.HOST_FULL + '/sitemap.xml' : '',
                allow: '/'
            }
        ]
    ],

    auth: {
        localStorage: false,
        cookie: {
            options: {
                secure: process.env.PROTOCOL === 'https',
                sameSite: 'strict'
            }
        },
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/api/users/login',
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: {
                        url: '/api/users/logout',
                        method: 'post',
                        propertyName: 'token'
                    },
                    user: {
                        url: '/api/users/user',
                        method: 'get',
                        propertyName: 'user'
                    }
                },
                tokenRequired: true,
                tokenType: process.env.AUTH_TOKEN_TYPE
            }
        },
        redirect: {
            login: '/',
            logout: '/',
            home: '/'
        },
        rewriteRedirects: true
    },

    sitemap: {
        hostname: process.env.NODE_ENV === 'production' ? process.env.HOST_FULL : '',
        gzip: true,
        routes: [
            '/'
        ]
    },
    manifest: {
        async: true,
        deffer: true,
        crossorigin: 'use-credentials',
        name: process.env.npm_package_name || '',
        short_name: process.env.npm_package_name || '',
        description: process.env.npm_package_description || '',
        display: 'standalone',
        orientation: 'portrait-primary',
        lang: 'English',
        background_color: '#ffffff',
        theme_color: '#ffffff'
    },

    meta: {
        mobileApp: true,
        mobileAppIOS: true,
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
        appleStatusBarStyle: 'white',
        author: process.env.npm_package_autor || '',
        name: process.env.npm_package_name || '',
        description: process.env.npm_package_description || '',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        lang: 'en',
        title: process.env.npm_package_name || ''
    },

    workbox: {
        runtimeCaching: [
            {
                urlPattern: 'https://fonts.gstatic.com/.*',
                handler: 'cacheFirst',
                method: 'GET',
                strategyOptions: {
                    cacheableResponse: { statuses: [0, 200] }
                }
            }
        ]
    },
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        https: process.env.PROTOCOL === 'https',
        baseURL: process.env.HOST_FULL
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {},
    serverMiddleware: [
        '~/api/index.js'
    ],
    router: {
        middleware: ['auth']
    }
}
