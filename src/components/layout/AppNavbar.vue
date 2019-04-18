<template>
	<div class="navbar">
		<nav class="deep-purple darken-1">
			<div class="container">
				<router-link :to="{name: 'AppTablePage'}" class="brand-logo left">Tables!</router-link>
				<ul class="right">
					<li v-if="!user">
						<router-link :to="{ name: 'AppSignup'}"> Signup</router-link>
					</li>
					<li v-if="!user">
						<router-link :to="{ name: 'AppLogin'}"> Login</router-link>
					</li>
					<li v-if="user && user.is_admin">
						<router-link :to="{ name: 'AppAdmin'}"> Админка</router-link>
					</li>
					<li v-if="user">
						<router-link :to="{ name: 'AppProfile', params: {id: user.id}}"> {{ user.alias }}</router-link>
					</li>
					<li v-if="user"><a @click="logout">Logout</a></li>
				</ul>
			</div>
		</nav>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'


	export default {
		name: "AppNavbar",
		data: () => ({
			profile: null
		}),
		computed: {
			...mapGetters({
				user: 'user/getCurrentUser'
			})
		},
		methods: {
			logout() {
				this.$store.dispatch('user/LOGOUT')
			}
		},
		created() {
			// this.$store.commit('user/setCurrentUser')
		}
	}
</script>

<style>

</style>