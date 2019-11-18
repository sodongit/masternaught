import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';

document.body.prepend(document.createElement('div'));

new Vue({
    vuetify,
    el: 'div',
    store,
    render: h => h(App),
});

