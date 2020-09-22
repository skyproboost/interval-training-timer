// Инициализация библиотек.
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueNoty from 'vuejs-noty-2'


// Инициализация плагинов.
Vue.use(Vuelidate);
Vue.use(VueNoty, {
    timeout: 10000,
    theme: 'nest',
    progressBar: true,
    layout: 'topRight',
    closeWith: ['button']
})
