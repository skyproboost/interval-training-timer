import Vue from 'vue'

Vue.mixin({
    methods: {
        // Отключения загрузчика
        loaderOff() {
            this.$nextTick(() => {
                return new Promise(resolve => {
                    this.$nuxt.$loading.finish()
                    resolve()
                })
            })
        },

        // Включение загрузчика
        loaderOn() {
            this.$nextTick(() => {
                return new Promise(resolve => {
                    this.$nuxt.$loading.start()
                    resolve()
                })
            })
        },

        getCSRFToken() {
            let CSRF_TOKEN = document.cookie.split('CSRF_TOKEN=')
            if (CSRF_TOKEN.length === 2) {
                return CSRF_TOKEN.pop().split(';').shift()
            } else return null
        },

        setCSRFToken(method) {
            if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
                let CSRF_TOKEN = this.getCSRFToken()
                if (CSRF_TOKEN) {
                    this.$axios.setHeader('X-CSRF-TOKEN', CSRF_TOKEN)
                }
            }
        },

        async myAxios(url, method = 'GET', data = null) {
            this.setCSRFToken(method)
            return await this.$axios({
                url: url,
                method,
                data
            }).catch(err => {
                console.log(err)
            })
        }
    }
})
