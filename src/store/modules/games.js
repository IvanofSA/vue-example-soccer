import router from '@/router'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
	namespaced: true,
	state: {
		games: [],
		scoresId: null,
		feedback: null
	},
	getters: {
		inGames(state) {
			return state.games
		},
	},
	mutations: {
		getScores(state) {

		},
		getGames(state, arrIdGame) {
			// let ref = db.collection('games');
			let ref = db.collection('games');

			state.games = []

			ref.get()
				.then(snapshot => {
					let tempArr = [];
					snapshot.forEach((game) => {
						tempArr.push(game.data())
					})
				})
				.then((arr) => {

					// arrIdGame.forEach((el) => {
					// 	ref.get()
					// 		.then(snapshot => {
					// 			snapshot.forEach((game) => {
					// 				if(game.id != el) {
					// 					state.games.push(game.data())
					// 				}
					// 			})
					// 		})
					// })

				})


		}
	},
	actions: {
		GETGAMES({commit}) {
			let ref = db.collection('scores');
			let arr = [];
			ref.get()
				.then(snapshot => {
					snapshot.forEach((score) => {
						let id = score.data().id_game;
						arr.push(id)
					})

					commit('getGames', arr)

				})
		}
	}
}
