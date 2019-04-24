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
	},
	getters: {
		getGames: state => state.games,
		getAllScores: state => state.allScores,
		getCurrentScore: state => state.currentScore,
		getCurrentIdMatch: state => state.idMatch
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
						let data = change.doc.data();
						if(change.type == 'added') {
							if(data.id != state.currentId) {
								state.currentScore.unshift(data)
								state.currentId = data.id;
							}
							state.games = state.games.filter(val => val.id !== data.id_game)
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
						let score = doc.data();
						let winnerscore = null;
						if(score.first_team.score == score.second_team.score){
							score.winnerscore = 0
						} else if(score.first_team.score >= score.second_team.score){
							score.winnerscore = 1
						} else {
							score.winnerscore = 2
						}
						//Todo Переделать проверку
						//Todo Добавить проверку времени матча + добавления очков
						state.games.forEach(game => {

							let winnergame = null;

							if(game.result.first_team == game.result.second_team){
								game.winnergame = 0
							} else if(game.result.first_team  >= game.result.second_team) {
								game.winnergame = 1
							} else {
								game.winnergame = 2
							}

							if(game.first_team == score.first_team.name && game.second_team == score.second_team.name) {
								if(game.result.first_team === score.first_team.score && game.result.second_team === score.second_team.score) {
									score.result = {
										total: 0,
										point: 3,
										status: 'full_win'
									}
								} else {
									if(game.winnergame == score.winnerscore) {
										score.result = {
											total: 0,
											point: 1,
											status: 'win'
										}
									} else {
										score.result = {
											total: 0,
											point: 0,
											status: 'lose'
										}
									}
								}


							}



						})

						if(score) {
							state.allScores.unshift(score)
						}
					})
				})
				.then(() => {
					// state.games.forEach(game => {
					// 	state.allScores.forEach(score => {
					// 		if(game.first_team == score.first_team.name && game.second_team == score.second_team.name) {
					// 			if(game.result.first_team === score.first_team.score && game.result.second_team === score.second_team.score) {
					// 				console.log('tut');
					// 				score.result = 'win'
					// 			}
					// 		}
					// 	})
					// })
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

			if(store.getters.getGames.length && store.getters.getCurrentScore.length) {
				store.commit('filterGame')
			}
		}
	}
}
