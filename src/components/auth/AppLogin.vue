<template>
	<div class="login container">
		<form @submit.prevent="login" class="card-panel">
			<h2 class="center deep-purple-text">Login</h2>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" type="email" v-model.lazy="$v.email.$model">
				<span class="message" v-if="$v.email.$error "> Email заполнен не корректно </span>

			</div>
			<div class="field">
				<label for="password">Password</label>
				<input id="password" type="password" v-model.lazy="$v.password.$model">
				<span class="message" v-if="$v.password.$error "> Пароль должен иметь не меннее 6 символов </span>
			</div>
			<p v-if="feedback" class="red-text center">{{ feedback }}</p>
			<div class="field center">
				<button class="btn deep-purple">Login</button>
			</div>
		</form>
	</div>
</template>

<script>

	import firebase from 'firebase'
	import {required, email, minLength} from "vuelidate/lib/validators";

	export default {
		name: "Login",
		data: () => ({
			email: null,
			password: null,
			feedback: null
		}),
		created() {
			this.feedback = null;
		},
		validations: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(6)
			}
		},
		computed: {

		},
		methods: {
			login() {
				this.$v.$touch()

				if(!this.$v.$invalid) {
					firebase.auth().signInWithEmailAndPassword(this.email, this.password)
						.then(cred => {
							this.$store.dispatch('user/SETCURRENTUSER');
							this.$router.push({name: 'AppIndex'})
						})
						.catch(err => {
							this.feedback = err.message
						})
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

	.message {
		color: red;
		font-size: 0.8em;
	}


</style>