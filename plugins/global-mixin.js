import Vue from 'vue'

Vue.mixin({
    methods: {
        // Отключения загрузчика
        loaderOff() {
            this.$nextTick(() => {
                this.$nuxt.$loading.finish()
            })
        },

        // Включение загрузчика
        loaderOn() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
            })
        },

        myFetch(url, method = 'GET', data = null) {
            return new Promise((resolve, reject) => {
                this.$axios({ url, method, data })
                    .then(res => resolve(res))
                    .catch(error => {
                        this.notyErrorData(error.response.data)
                        reject(error)
                    })
                    .finally(() => this.loaderOff())
            })
        }
    }
})
