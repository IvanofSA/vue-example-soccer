import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router'

Vue.use(Vuex);

import user from './modules/user';
import games from './modules/games';

export const store = new Vuex.Store({
	modules: {
		user,
		games
	}
});