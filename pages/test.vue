<template>
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <h1>
                    User:
                </h1>
                <pre>
                    {{ getUser }}
                </pre>
                <p>{{ newXss }}</p>
                <button @click="logout" class="btn btn-primary">Logout</button>
                <button @click="test" class="btn btn-primary">post</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'test',
    middleware: ['auth'],
    data() {
        return {
            newXss: null
        }
    },
    methods: {
        async logout() {
            this.loaderOn()
            await this.$axios.post('/logout')
            await this.$router.push('/login')
        },
        test() {
            this.loaderOn()
            this.$axios.post('/test').then(() => {
                this.loaderOff()
            })
        }
    },
    computed: {
        getUser() {
            return this.$store.getters['USER/GET_USER']
        }
    }
}
</script>

<style scoped>

</style>
