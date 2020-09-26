export default {
    methods: {
        resetClientData(data) {
            for (let prop in data) {
                if (data.hasOwnProperty(prop)) {
                    data[prop] = null
                }
            }
        },
        notyErrorData(data) {
            const errors = data.error
            if (errors) {
                for (let prop in errors) {
                    if (errors.hasOwnProperty(prop)) this.$noty.error(errors[prop].msg)
                }
            } else this.$noty.error(data.message)
        }
    }
}
