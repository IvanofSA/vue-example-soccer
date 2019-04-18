import Vue from 'vue'
import App from './App'
import {store} from './store';
import router from './router'
import firebase from 'firebase'
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)
Vue.config.productionTip = false;

let app = null;

firebase.auth().onAuthStateChanged(() => {


	if(!app) {
		app = new Vue({
			el: '#app',
			store,
			router,
			components: { App },
			template: '<App/>'
		});
	}


});