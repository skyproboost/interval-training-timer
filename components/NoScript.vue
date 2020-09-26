<template>
    <div class="noscript-block vh-100">
        <div class="block">
            <div class="title">JavaScript Required</div>
            <div class="content">We're sorry, but Nelefon doesn't work property without JavaScript
                enabled. Please reload the page or go to home page.
            </div>
            <div class="footer">
                <nuxt-link class="footer-btn" :to="this.$nuxt.$route.path">Reload</nuxt-link>
                <nuxt-link class="footer-btn" to="/">Home page</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoScript'
}
</script>

<style scoped>
.noscript-block {
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e9eaee;
}

.block {
    background: white;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
    box-shadow: 0 0 3px #b7b7b7;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    text-align: center;
}

.footer {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-bottom: 10px;
}

.footer-btn {
    margin: 1px;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    background: #4565a2;
    color: white;
}

.footer-btn:hover {
    background: #5978b1;
}

.content {
    padding: 15px 0;
}

.title {
    text-align: center;
    padding: 0 20px 5px;
    border-bottom: 1px solid #b7b7b7;
    font-weight: bold;
    font-size: 30px;
}
</style>
