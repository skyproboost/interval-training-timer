<template lang="html">
    <div v-if="loading" class="my-fixed-model">
        <div class="lds-dual-ring"></div>
    </div>
</template>

<script>
    export default {
        name: "Loader",
        data() {
            return {
                loading: true
            }
        },
        methods: {
            start() {
                this.loading = true;
            },
            finish() {
                this.loading = false;
            }
        }
    }
</script>

<style scoped>
    .my-fixed-model {
        position: fixed;
        z-index: 99998;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
        right: 0;
        background: #292929;
    }

    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border-style: solid;
        border-width: 2px;
        border-color: #00dbff transparent #00dbff transparent;
        -webkit-animation: my-ring 1.2s linear infinite;
        animation: my-ring 1.2s linear infinite;
    }
    @keyframes my-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
