import Vue from 'vue'
import App from './App'
import {store} from './store';
import router from './router'
import firebase from 'firebase'

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