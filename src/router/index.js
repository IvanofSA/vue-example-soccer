import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/home/AppIndex'
import AppSignup from '@/components/auth/AppSignup'
import AppLogin from '@/components/auth/AppLogin'
import AppProfile from '@/components/profile/AppProfile'
import AppAdmin from '@/components/admin/AppAdmin'
import firebase from 'firebase'
import db from '@/firebase/init'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'AppIndex',
			component: AppIndex
			// meta: {
			// 	requiresAuth: true
			// }
		},
		{
			path: '/login',
			name: 'AppLogin',
			component: AppLogin
		},
		{
			path: '/signup',
			name: 'AppSignup',
			component: AppSignup,
		},
		{
			path: '/admin',
			name: 'AppAdmin',
			component: AppAdmin,
		},
		{
			path: '/profile/:id',
			name: 'AppProfile',
			component: AppProfile,
			meta: {
				requiresAuth: true
			}
		}

	]
})

// router guards
router.beforeEach((to, from, next) => {

	// check to see if route has auth guard
	if(to.matched.some(rec => rec.meta.requiresAuth)) {
		// check auth state of user
		let user = firebase.auth().currentUser
		if(user) {
			// User is signed in. Proceed to route
			next()
		} else {
			// No user is signed in. Redirect to login
			next({
				name: 'Login'
			})
		}
	} else {
		next()
	}
})

export default router