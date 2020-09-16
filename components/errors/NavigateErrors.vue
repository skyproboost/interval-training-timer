<template>
    <div class="container">
        <div v-if="error.statusCode">
            <StatusCode :error="error" />
        </div>
        <div v-else>
            <NotStatusCode is="NotStatusCode" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavigateErrors",
        data: () => ({
            codeError: null
        }),
        props: {
            error: {
                type: Object,
                default: () => {},
            }
        }
    }
</script>

<style scoped>

</style>
