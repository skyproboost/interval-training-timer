<template>
    <NavigateErrors :error="error" />
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
