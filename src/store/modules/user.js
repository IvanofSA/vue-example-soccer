import router from '@/router'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
	namespaced: true,
	state: {
		user: null,
		all: [],
		slug: null,
		feedback: null
	},
	getters: {
		getCurrentUser: state => state.user,
		getAllUsers: state => state.allUsers
	},
	mutations: {
		setCurrentUser(state) {
			let user = firebase.auth().currentUser,
				ref = db.collection('users');

			state.user = null;

			if(user) {
				ref.where('user_id', '==', user.uid).get()
					.then(snapshot => {
						snapshot.forEach(doc => {
							if(doc) {
								state.user = doc.data();
								state.user.id = doc.id;
							} else {
								state.user = null;
							}
						})
					})
			}
		},
		setAllUsers(state) {

			state.all = []

			let ref = db.collection('users');
			ref.get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						console.log(doc.data());

						if(doc) {
							state.all.unshift(doc.data())
						}
					})
				})
		},
		logout(state) {
			firebase.auth().signOut().then(() => {
				state.user = null;
				router.push({name: 'AppLogin'})
			})
		}
	},
	actions: {
		LOGOUT({commit}) {
			commit('logout')
		},
		SETCURRENTUSER({commit}) {
			commit('setCurrentUser')
		},
		SETALLUSER({commit}) {
			commit('setAllUsers')
		},
	}
}
