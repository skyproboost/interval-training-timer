<template>
    <div>
        <h1>Test</h1>
        <button @click="logout" class="btn btn-primary">Logout</button>
        <button @click="tryPost" class="btn btn-primary">TEST POST METHOD</button>
    </div>
</template>

<script>
export default {
    name: 'test',
    methods: {
        async tryPost() {
            let result = await this.myAxios('/api/users/user/add', 'POST')
            console.log(result)
        },
        async logout() {
            await this.$auth.logout({
                headers: {
                    'X-CSRF-TOKEN': this.getCSRFToken()
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
