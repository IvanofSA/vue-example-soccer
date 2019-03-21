import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router'

Vue.use(Vuex);

Vue.directive("filter", {

	bind: function (el, binding) {
		const handler = (e) => {

			let ch = String.fromCharCode(e.which);
			let re = new RegExp(binding.value);

			if (!ch.match(re) || el.value.length >= 2) {
				e.preventDefault();
			}
		}
		el.addEventListener('keypress', handler)
		el.$destroy = () => el.removeEventListener('keypress', handler)
	},
	unbind: function (el) {
		el.$destroy()
	}
});


import user from './modules/user';
import games from './modules/games';

export const store = new Vuex.Store({
	modules: {
		user,
		games
	}
});