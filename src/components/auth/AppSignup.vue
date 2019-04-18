<template>
	<div class="signup container">
		<form class="card-panel" @submit.prevent="signup">
			<h2 class="center deep-purple-text">Signup</h2>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" type="email" v-model.trim="$v.email.$model">
				<span class="message" v-if="$v.email.$error "> Email заполнен не корректно </span>
			</div>
			<div class="field">
				<label for="password">Пароль</label>
				<input id="password" type="password" v-model.trim="$v.password.$model">
				<span class="message" v-if="$v.password.$error "> Пароль должен иметь не меннее 6 символов </span>
			</div>
			<div class="field">
				<label for="name">Логин</label>
				<input id="name" type="text" v-model.trim="$v.alias.$model">
				<span class="message" v-if="$v.alias.$error "> Логин должен иметь не менее 4 символов </span>

			</div>
			<p class="red-text center" v-if="feedback"> {{ feedback }} </p>
			<div class="field center">
				<button class="btn deep-purple" :disabled="$v.$invalid">Зарегестрироваться</button>
			</div>
		</form>
	</div>
</template>

<script>
	import db from '@/firebase/init'
	import firebase from 'firebase'
	import slugify from 'slugify'
	import {required, email, minLength} from "vuelidate/lib/validators";

	export default {
		name: 'Signup',
		data: () => ({
			email: null,
			password: null,
			alias: null,
			slug: null,
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
			},
			alias: {
				required,
				minLength: minLength(4)
			}
		},
		computed: {},
		methods: {
			signup() {
				this.$v.$touch();

				if(!this.$v.$invalid) {

					this.slug = slugify(this.alias, {
						replacement: '-',
						remove: /[$*_+~.()'"!\-:@]/g,
						lower: true
					})

					let ref = db.collection('users').doc(this.slug)

					ref.get().then(doc => {
						if(doc.exists) {
							this.feedback = 'Такой логин уже существует';
						} else {
							firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
								.then(cred => {
									ref.set({
										alias: this.alias,
										user_id: cred.user.uid,
										is_admin: false
									})
								})
								.then(() => {
									this.$router.push({name: 'AppIndex'});
									this.$store.dispatch('user/SETCURRENTUSER');
									this.feedback = null;
									// store.commit('setMessage', null)
								})
								.catch(err => {
									this.feedback = err.message
								});
						}
					})
				}
			}
		}
	}
</script>

<style>
	.signup {
		max-width: 400px;
		margin-top: 60px;
	}

	.signup h2 {
		font-size: 2.4em;
	}

	.signup .field {
		margin-bottom: 16px;
	}

	.message {
		color: red;
		font-size: 0.8em;
	}
</style>

