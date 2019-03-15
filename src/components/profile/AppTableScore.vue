<template>
	<div class="card" v-if="game">
		<p> Дата матч {{ game.date }}</p>
		<form @submit.prevent="addScore" class="col s12">
			<table class="responsive-table centered">
				<thead>
				<tr>
					<th>{{game.first_team}}</th>
					<th>{{game.second_team}}</th>
				</tr>
				</thead>

				<tbody>
				<tr>
					<td>
						<div class="field col">
							<label for="first_team">Голов забьет {{ game.first_team }}</label>
							<input type="number" id="first_team" v-model="first_team">
						</div>
					</td>
					<td>
						<div class="field col">
							<label for="second_team">Голов забьет {{ game.second_team }}</label>
							<input type="number" id="second_team" v-model="second_team">
						</div>
					</td>
				</tr>
				</tbody>
			</table>
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
	import db from '@/firebase/init'
	import {mapGetters} from 'vuex'

	export default {
		name: "AppTableScore",
		props: ['game', 'user'],
		data() {
			return {
				first_team: null,
				second_team: null,
				feedback: null
			}
		},
		computed: {
			// ...mapGetters({
			// 	scores: 'scores/inScores',
			// })
		},
		methods: {
			clearFeedback() {
				this.feedback = null;
			},
			addScore() {
				if(this.first_team && this.second_team) {
					let ref = db.collection('scores').doc()
					ref.set({
						id: ref.id,
						id_user: this.user.id,
						id_game: this.game.id,
						first_team: this.first_team,
						second_team: this.second_team,
						date: new Date()
					})
						.then(() => {
							this.feedback = 'Результат записан'
							// this.$store.dispatch('scores/GETGAMES', this.user.id)
						})
						.catch((err) => {
							this.feedback = err.message
						});

					setTimeout(() => {
						this.clearFeedback()
					}, 1500);
				}
			}
		}
	}
</script>

<style scoped>

</style>