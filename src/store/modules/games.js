import router from '@/router'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
	namespaced: true,
	state: {
		games: [],
		scoresId: [],
		feedback: null
	},
	getters: {
		inGames(state) {
			return state.games
		},
	},
	mutations: {
		getGames(state) {
			let refGames = db.collection('games'),
				refScores = db.collection('scores'),
				arrScore = [];

			state.games = []

			//
			// refGames.orderByKey('TE0rbIdcrwVxxHRwqglk').equalTo(null).then((doc) => {
			// 	console.log(doc);
			// })
			// refScores.doc().get()
			// 	.then(score => {
			// 		console.log(score);
			// 	})
			// 	.catch((err) => {
			// 		console.log(err.message);
			// 	})


			refGames.get()
				.then(snapshot => {
					snapshot.forEach((game, i) => {
						// if(game.data().id != arrScore[i]) {
							state.games.push(game.data())
						// }
					})
				})
		}
	},
	actions: {
		GETGAMES({commit}) {
			commit('getGames')
		}
	}
}
