<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10">
                <div class="row justify-content-center pt-5">
                    <div class="col-md-6">
                        <div class="d-flex flex-column p-5 badge-secondary">
                            <input placeholder="Введите логин" class="form-control mb-1" v-model="client.login"
                                   type="text">
                            <input placeholder="Введите пароль" class="form-control mb-1" v-model="client.password"
                                   type="password">
                            <button class="btn btn-success" @click="auth">Авторизация</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin_auth_helper from '@/plugins/mixin_auth_helper'

export default {
    name: 'login',
    auth: 'guest',
    mixins: [mixin_auth_helper],
    data() {
        return {
            client: {
                login: null,
                sex: null,
                password: null
            }
        }
    },
    methods: {
        auth() {
            this.$axios.post('/login', this.client)
                .then(async res => {
                    this.$store.commit('USER/SET_USER', res.data.payload)
                    await this.$router.push('/test')
                })
                .catch(error => {
                    this.resetClientData(this.client)
                    this.notyErrorData(error.response.data)
                })
                .finally(() => this.loaderOff())
        }
    }
}
</script>

<style scoped>

</style>
