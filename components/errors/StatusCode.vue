<template>
    <div class="error-context">
        <div class="error-context-caption">{{error.statusCode}}</div>
        <div class="error-context-message">{{error.message}}</div>
        <nuxt-link to="/">На главную</nuxt-link>
    </div>
</template>

<script>
    export default {
        name: "StatusCode",
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
        font-size: 100px;
        font-weight: bold;
        margin-bottom: -15px;
    }

    .error-context-message {
        letter-spacing: 2px;
    }
</style>
