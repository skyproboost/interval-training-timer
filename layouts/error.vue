<template>
    <NavigateErrors class="center-content" :error="error" />
</template>

<script>
    export default {
        name: "error",
        props: {
            error: {
                type: Object,
                default: () => {},
            }
        }
    }
</script>

<style scoped>
    .center-content {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 100vh;
    }
</style>
