<template>
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <h1>
                    User:
                </h1>
                <p class="ml-3" v-for="(item, index) in $auth.user " :key="index">
                    {{index}}: <b>{{item}}</b>
                </p>
                <button @click="logout" class="btn btn-primary">Logout</button>
                <button @click="tryPost" class="btn btn-primary">TEST POST METHOD</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'test',
    methods: {
        async tryPost() {
            let result = await this.myAxios('/api/users/user/add', 'POST')
            alert(`Result: ${result ? 'success' : 'error'}`)
        },
        async logout() {
            await this.$auth.logout({
                headers: {
                    'X-CSRF-TOKEN': this.getCSRFToken()
                }
            })
        }
    },
    mounted() {
        console.log(process.env)
    }
}
</script>

<style scoped>

</style>
