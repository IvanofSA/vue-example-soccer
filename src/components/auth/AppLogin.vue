<template>
	<div class="login container">
		<form @submit.prevent="login" class="card-panel">
			<h2 class="center deep-purple-text">Login</h2>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" type="email" v-model="email">
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input id="password" type="password" v-model="password">
			</div>
			<p v-if="feedback" class="red-text center">{{ feedback }}</p>
			<div class="field center">
				<button class="btn deep-purple">Login</button>
			</div>
		</form>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		name: "Login",
		data() {
			return {
				email: null,
				password: null,
			}
		},
		created() {
			this.$store.dispatch('user/SETMESSAGE', null)
		},
		computed: {
			...mapGetters({
				feedback: 'user/inFeedback'
			})
		},
		methods: {
			login(){
				if(this.email && this.password) {
					this.$store.dispatch('user/LOGIN', {email: this.email, password: this.password})
				} else {
					return this.$store.dispatch('user/SETMESSAGE', 'Все поля должны быть заполнены')
				}
			}
		}
	}
</script>

<style>
	.login {
		max-width: 400px;
		margin-top: 60px;
	}

	.login h2 {
		font-size: 2.4em;
	}

	.login .field {
		margin-bottom: 16px;
	}

</style>