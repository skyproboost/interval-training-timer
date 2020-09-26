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
        }
    }
})
