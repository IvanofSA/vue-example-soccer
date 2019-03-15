<template>
	<div class="signup container">
		<form class="card-panel" @submit.prevent="signup">
			<h2 class="center deep-purple-text">Signup</h2>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" type="email" v-model="email">
			</div>
			<div class="field">
				<label for="password">Пароль</label>
				<input id="password" type="password" v-model="password">
			</div>
			<div class="field">
				<label for="name">Логин</label>
				<input id="name" type="text" v-model="alias">
			</div>
			<p class="red-text center" v-if="feedback">{{ feedback }}</p>
			<div class="field center">
				<button class="btn deep-purple">Зарегестрироваться</button>
			</div>
		</form>
	</div>
</template>

<script>
	// import slugify from 'slugify'
	import {mapGetters} from 'vuex'

	// import db from '@/firebase/init'
	// import firebase from 'firebase'

	export default {
		name: 'Signup',
		data() {
			return {
				email: null,
				password: null,
				alias: null
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
			signup() {
				if(this.alias && this.email && this.password) {
					this.$store.dispatch('user/SIGNUP', {email: this.email, password: this.password, alias: this.alias})

				} else {
					return this.$store.dispatch('user/SETMESSAGE', 'Все поля должны быть заполнены')
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
</style>

