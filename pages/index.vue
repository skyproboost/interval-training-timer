<template>
    <section class="container">
        <div class="row justify-content-center pt-5">
            <div class="col-md-6">
                <div class="d-flex flex-column p-5 badge-secondary">
                    <input placeholder="Введите логин" class="form-control mb-1" v-model="client.login" type="text">
                    <select class="form-control mb-1" v-model="client.sex">
                        <option value="male">Парень</option>
                        <option value="female">Девушка</option>
                    </select>
                    <input placeholder="Введите пароль" class="form-control mb-1" v-model="client.password"
                           type="password">
                    <button class="btn btn-success" @click="reg">Регистрация</button>
                </div>
            </div>
        </div>
        <div class="row justify-content-center pt-5">
            <div class="col-md-6">
                <div class="d-flex flex-column p-5 badge-secondary">
                    <input placeholder="Введите логин" class="form-control mb-1" v-model="client.login" type="text">
                    <input placeholder="Введите пароль" class="form-control mb-1" v-model="client.password"
                           type="password">
                    <button class="btn btn-success" @click="auth">Авторизация</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'HomePage',
    auth: 'guest',
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
        async auth() {
            let result = await this.$auth.loginWith('local', {
                data: {
                    login: this.client.login,
                    password: this.client.password
                }
            }).catch(err => {
                console.log(err)
            })
            if (result) {
                await this.$router.push('/test')
            }
        },
        async reg() {
            let result = await this.$axios.post('/api/users/register', { ...this.client }).catch(err => {
                console.log(err)
            })
            console.log(result)
        }
    }
}
</script>
