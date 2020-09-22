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
        }
    }
})
