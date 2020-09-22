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
    </section>
</template>

<script>

export default {
    name: 'HomePage',
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
        async reg() {
            let result = await this.$axios.post('/register', { ...this.client }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
