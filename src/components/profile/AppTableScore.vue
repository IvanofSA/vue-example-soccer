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
							<input type="text" placeholder="0" v-filter="'^[0-9]{1,2}$'" id="first_team" v-model="first_team_score">
						</div>
					</td>
					<td>
						<div class="field col">
							<label for="second_team">Голов забьет {{ game.second_team }}</label>
							<input type="text"  placeholder="0" v-filter="'^[0-9]{1,2}$'" id="second_team" v-model="second_team_score">
						</div>
					</td>
				</tr>
				<tr v-if="checkPreviousResult">

					<td>
						<div class="field col">
							<label for="1">Доп время {{ game.first_team }}</label>
							<input type="number" id="1" v-filter="'^[0-9]{1,2}$'" v-model="additional_time.first_team">
						</div>
					</td>
					<td>
						<div class="field col">
							<label for="2">Доп время {{ game.second_team }}</label>
							<input type="number" id="2" v-filter="'^[0-9]{1,2}$'" v-model="additional_time.second_team">
						</div>
					</td>
				</tr>
				<tr v-if="checkAdditionalTime">

					<td>
						<div class="field col">
							<label for="3"> Пенальти {{ game.first_team }}</label>
							<input type="number" id="3" v-filter="'^[0-9]{1,3}$'" v-model="penalty.first_team">
						</div>
					</td>
					<td>
						<div class="field col">
							<label for="4">Пенальти {{ game.second_team }}</label>
							<input type="number" id="4" v-filter="'^[0-9]{1,3}$'" v-model="penalty.second_team">
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

	export default {
		name: "AppTableScore",
		props: ['game', 'user'],
		data() {
			return {
				first_team_score: null,
				second_team_score: null,
				additional_time: {
					first_team: null,
					second_team: null
				},
				penalty: {
					first_team: null,
					second_team: null
				},
				feedback: null,
			}
		},
		computed: {

			checkPreviousResult() {
				if(this.game.previous_result && this.game.previous_result.first_team && this.game.previous_result.second_team) {
					let firstScore = this.first_team_score === this.game.previous_result.first_team,
						secondScore = this.second_team_score === this.game.previous_result.second_team;

					return firstScore && secondScore
				}
			},

			checkAdditionalTime() {
				return this.additional_time.first_team == 0 && this.additional_time.second_team
			}

		},
		methods: {
			clearFeedback() {
				this.feedback = null;
			},
			addScore() {
				if(this.first_team_score && this.second_team_score) {
					let ref = db.collection('scores').doc()
					this.feedback = null

					db.collection('scores').add({
						id: ref.id,
						id_user: this.user.id,
						id_game: this.game.id,
						first_team: {
							name: this.game.first_team,
							score: this.first_team_score,
							additional_time: this.additional_time.first_team,
							penalty: this.penalty.first_team
						},
						second_team: {
							name: this.game.second_team,
							score: this.second_team_score,
							additional_time: this.additional_time.second_team,
							penalty: this.penalty.second_team
						},
						date: new Date()
					}).then(() => {
						this.feedback = 'Результат записан'

					})


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