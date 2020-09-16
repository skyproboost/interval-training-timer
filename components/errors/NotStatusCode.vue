<template>
    <div class="error-context">
        <div class="error-context-caption">Что-то пошло не так!</div>
        <nuxt-link to="/">На главную</nuxt-link>
    </div>
</template>

<script>
    export default {
        name: "NotStatusCode",
        props: {
            error: {
                type: Object,
                default: () => {}
            }
        }
    }
</script>

<style scoped>
    .error-context-caption {
        font-size: 30px;
        font-weight: bold;
    }

    .error-context-message {
        letter-spacing: 2px;
    }
</style>
