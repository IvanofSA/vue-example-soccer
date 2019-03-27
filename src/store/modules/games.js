import router from '@/router'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
	namespaced: true,
	state: {
		games: [],
		scores: [],
		allUsersScores: [],
		tempGames: [],
		feedback: null,
		currentId: null
	},
	getters: {
		inGames(state) {
			return state.games
		},
		inAllScores(state) {
			return state.allUsersScores
		},
		inScores(state) {
			return state.scores
		},
	},
	mutations: {
		getScores(state, id) {
			state.scores = []
			db.collection('scores').where('id_user', '==', id)
				.onSnapshot((snapshot) => {
					snapshot.docChanges().forEach(change => {
						if(change.type == 'added') {
							state.scores.unshift({
								id: change.doc.data().id,
								id_user: change.doc.data().id_user,
								id_game: change.doc.data().id_game,
								first_team: {
									name: change.doc.data().first_team.name,
									score: change.doc.data().first_team.score,
									additional_time: change.doc.data().first_team.additional_time,
									penalty: change.doc.data().first_team.penalty
								},
								second_team: {
									name: change.doc.data().second_team.name,
									score: change.doc.data().second_team.score,
									additional_time: change.doc.data().first_team.additional_time,
									penalty: change.doc.data().first_team.penalty
								},
								date: change.doc.data().date
							})

							state.games = state.games.filter(val => val.id !== change.doc.data().id_game)
						}
					})
				})
		},
		getAllScores(state) {
			state.allUsersScores  = []
			let ref = db.collection('scores');
			ref.get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						if(doc) {
							state.allUsersScores.unshift(doc.data())
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
								result: change.doc.data().result,
								info: change.doc.data().info,
								date: change.doc.data().date,
								id: change.doc.data().id
							})
						}
					})
				})

		}

	},
	actions: {
		GETSCORES({commit}, route) {
			commit('getScores', route.id)
		},
		GETALLSCORES({commit}) {
			commit('getAllScores')
		},
		GETGAMES({commit}) {
			commit('getGames')
		}
	}
}
