import router from '@/router'
import db from '@/firebase/init'
import firebase from 'firebase'
import slugify from 'slugify'

export default {
	namespaced: true,
	state: {
		user: null,
		slug: null,
		feedback: null
	},
	getters: {
		inUser(state) {
			return state.user
		},
		inSlug(state) {
			return state.slug
		},
		inFeedback(state) {
			return state.feedback
		}
	},
	mutations: {

		setMessage(state, payload) {
			state.feedback = payload
		},

		setUser(state) {
			let user = firebase.auth().currentUser,
				ref = db.collection('users');

			//get current user
			if(user) {
				ref.where('user_id', '==', user.uid).get()
					.then(snapshot => {
						snapshot.forEach(doc => {
							if(doc) {
								state.user = doc.data(),
									state.user.id = doc.id
							} else {
								state.user = null
							}
						})
					})
			}

		},

		setSlug(state, alias) {
			state.slug = slugify(alias, {
				replacement: '-',
				remove: /[$*_+~.()'"!\-:@]/g,
				lower: true
			});
		},

		logout(state) {
			firebase.auth().signOut().then(() => {
				state.user = null
				router.push({name: 'AppLogin'})
			})
		}
	},
	actions: {
		LOGOUT({commit}) {
			commit('logout')
		},
		SETUSER({commit}) {
			commit('setUser')
		},
		SETMESSAGE({commit}, payload) {
			commit('setMessage', payload)
		},
		LOGIN(store, payload) {
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(cred => {
					// cred.user.uid
					store.commit('setUser')
					router.push({name: 'AppIndex'})
				})
				.catch(err => {
					store.commit('setMessage', err.message)
				})
		},
		SIGNUP(store, payload) {
			store.commit('setSlug', payload.alias);
			let ref = db.collection('users').doc(store.getters.inSlug);

			ref.get().then(doc => {
				if(doc.exists) {
					store.commit('setMessage', 'Такой логин уже существует')
				} else {
					firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
						.then(cred => {
							ref.set({
								alias: payload.alias,
								user_id: cred.user.uid,
								is_admin: false
							})
						})
						.then(() => {
							router.push({name: 'AppIndex'})
							store.commit('setUser')
							store.commit('setMessage', null)
						})
						.catch(err => {
							store.commit('setMessage', err.message)
						});
				}
			})
		},
	}
}
