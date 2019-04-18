import router from '@/router'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
	namespaced: true,
	state: {
		games: [],
		currentScore: [],
		allScores: [],
		tempGames: [],
		feedback: null,
		currentId: null,
		idMatch: null,
		currentId: null
	},
	getters: {
		getGames: state => state.games,
		getAllScores: state => state.allScores,
		getCurrentScore: state => state.currentScore,
		getCurrentIdMatch: state => state.idMatch

		// inGames(state) {
		// 	return state.games
		// },
		// inAllScores(state) {
		// 	return state.allUsersScores
		// },
		// inScores(state) {
		// 	return state.scores
		// },
	},

	mutations: {

		currentIdMatch(state, id) {
			state.idMatch = id
		},

		setScores(state, id) {

			state.currentScore = [];
			db.collection('scores').where('id_user', '==', id)
				.onSnapshot((snapshot) => {
					snapshot.docChanges().forEach(change => {
						if(change.type == 'added') {
							if(change.doc.data().id != state.currentId) {
								state.currentScore.unshift(change.doc.data())
								state.currentId = change.doc.data().id;
							}
							state.games = state.games.filter(val => val.id !== change.doc.data().id_game)
						}
					})
				})
		},
		filterGame(state) {
			state.currentScore.forEach(el => {
				state.games = state.games.filter(val => val.id !== el.id_game)
			})
		},
		setAllScores(state) {
			state.allScores = [];
			let ref = db.collection('scores');
			ref.get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						if(doc) {
							state.allScores.unshift(doc.data())
						}
					})

				})
		},

		setGames(state) {
			state.games = [];
			db.collection('games')
				.onSnapshot((snapshot) => {
					snapshot.docChanges().forEach(change => {
						if(change.type == 'added') {
							state.games.unshift(change.doc.data())
						}
					})
				})
		}
	},

	actions: {
		SETSCORES({commit}, route) {
			commit('setScores', route.id)
			// commit('filterGame')
		},
		SETALLSCORES({commit}) {
			commit('setAllScores')
		},
		SETGAMES({commit}) {
			commit('setGames')
			// commit('filterGame')
		},
		CURRENTIDMATCH({commit}, id) {
			commit('currentIdMatch', id)
		},
		CHECKGAMES(store, route) {
			if(!store.getters.getGames.length) {
				store.commit('setScores', route.id)
			}

			if(!store.getters.getCurrentScore.length) {
				store.commit('setGames')
			}

			console.log(store.getters.getCurrentScore.length);
			console.log(store.getters.getGames.length);

			if(store.getters.getGames.length && store.getters.getCurrentScore.length) {
				store.commit('filterGame')
				console.log('tut');
			}
		}
	}
}
