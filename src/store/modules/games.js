import router from '@/router'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
	namespaced: true,
	state: {
		games: [],
		fGames: [],
		scores: [],
		tempGames: [],
		feedback: null
	},
	getters: {
		inGames(state) {
			return state.games
		},

		inScores(state) {
			return state.scores
		},
	},
	mutations: {
		getScores(state, id) {

			state.scores = []
			console.log(id);
			db.collection('scores').where('id_user', '==', id)
				.onSnapshot((snapshot) => {
					snapshot.docChanges().forEach(change => {
						if(change.type == 'added') {

							console.log(change.doc.data());

							state.scores.unshift({
								id: change.doc.data().id,
								id_user: change.doc.data().id_user,
								id_game: change.doc.data().id_game,
								first_team: {
									name: change.doc.data().first_team.name,
									score: change.doc.data().first_team.score
								},
								second_team: {
									name: change.doc.data().second_team.name,
									score: change.doc.data().second_team.score
								},
								date: change.doc.data().date
							})
							// state.fGames = [...state.games]
							state.games = state.games.filter(val => val.id !== change.doc.data().id_game)
						}
					})
				})
		},
		getGames(state) {


			state.games = []

			db.collection('games')
				.onSnapshot((snapshot) => {
					snapshot.docChanges().forEach(change => {
						if(change.type == 'added') {
							state.games.unshift({
								first_team: change.doc.data().first_team,
								second_team: change.doc.data().second_team,
								previous_result: change.doc.data().previous_result,
								info: change.doc.data().info,
								date: change.doc.data().date,
								id: change.doc.data().id
							})
							// state.fGames = [...state.games]
						}
					})
				})

		}

	},
	actions: {
		GETSCORES({commit}, route) {
			commit('getScores', route.id)
		},
		GETGAMES({commit}) {
			commit('getGames')
		}
	}
}
