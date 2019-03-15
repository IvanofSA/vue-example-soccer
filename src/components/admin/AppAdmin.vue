<template>
	<div class="admin container">
		<form @submit.prevent="addMatch" class="card-panel col s12">
			<div class="row">
				<h2 class="center deep-purple-text">Добавить матч</h2></div>
			<div class="row">
				<div class="field col s6">
					<label for="first_team">Название команды 1*</label>
					<input id="first_team" type="text" v-model="first_team">
				</div>
				<div class="field col s6">
					<label for="second_team">Название команды 2*</label>
					<input id="second_team" type="text" v-model="second_team">
				</div>
			</div>
			<div class="row">
				<div class="field col s12">
					<label for="date">Дата матча*</label>
					<input id="date" type="text" v-mask="{mask: '99.99.9999', greedy: true}" v-model="date">
				</div>
			</div>
			<div class="row">
				<div class="field col s12">
					<label for="info">Дополнительная информация</label>
					<textarea id="info" class="materialize-textarea" v-model="info"></textarea>
				</div>
			</div>
			<p v-if="feedback" class="red-text center">{{ feedback }}</p>
			<div class="row">
				<div class="field col s12 center">
					<button class="btn deep-purple"> Добавить</button>
				</div>
			</div>

		</form>
	</div>
</template>

<script>
	import Vue from 'vue'
	import db from '@/firebase/init'
	import firebase from 'firebase'

	const VueInputMask = require('vue-inputmask').default
	Vue.use(VueInputMask)

	export default {
		name: "AppAdmin",
		data() {
			return {
				first_team: null,
				second_team: null,
				date: null,
				info: null,
				feedback: null
			}
		},
		created() {
			this.clearFeedback()
		},
		methods: {
			clearFeedback() {
				this.feedback = null;
			},
			clearForm(){
					this.first_team = null
					this.second_team = null
					this.date = null
					this.info = null
			},
			addMatch() {
				if(this.second_team && this.first_team && this.date) {
					let ref = db.collection('games').doc();
					ref.set({
						first_team: this.first_team,
						second_team: this.second_team,
						date: this.date,
						info: this.info,
						id: ref.id
					})
					.then(() => {
						this.feedback = 'Матч создан'
						this.clearForm()
					})
					.catch((err) => {
						this.feedback = err.message
						this.clearForm()
					});

					setTimeout(() => {
						this.clearFeedback()
					}, 1500);

				} else {
					this.feedback = 'Одно из обязательных полей не заполнено'
				}

			}
		}
	}
</script>

<style>
	.admin {
		max-width: 400px;
		margin-top: 60px;
	}

	.admin h2 {
		font-size: 2.4em;
	}

	.admin .field {
		margin-bottom: 16px;
	}
</style>