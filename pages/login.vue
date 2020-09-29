<template>
    <div class="container vh-100">
        <div class="row h-100 align-items-center justify-content-center">
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
            this.myFetch('/login', 'POST', this.client)
                .then(res => {
                    this.$store.commit('USER/SET_USER', res.data.payload)
                    this.$router.push('/test')
                })
                .catch(() => this.resetClientData(this.client))
        }
    }
}
</script>

<style scoped>

</style>
