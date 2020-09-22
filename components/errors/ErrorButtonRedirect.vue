<template>
    <button class="btn-redirect" @click="redirect">На главную</button>
</template>

<script>
export default {
    name: 'ErrorButtonRedirect',
    methods: {
        async redirect() {
            await this.$router.push('/')
            this.$router.go()
        }
    }
}
</script>

<style scoped>
.btn-redirect {
    border: none;
    background: none;
    margin-top: -5px;
    color: #5395c5;
    font-weight: bold;
    cursor: pointer;
    transition: .3s all ease-in-out;
}

.btn-redirect:hover {
    color: #7bb2dd;
}
</style>
