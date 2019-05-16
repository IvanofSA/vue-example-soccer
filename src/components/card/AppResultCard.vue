<template>
	<form @submit.prevent="addResultMatch(game.id)" class="card-panel col s12">
		<div class="row">
			<h5 class="center deep-purple-text">Результат матча <br/>{{ game.first_team }} - {{ game.second_team }}</h5>
		</div>

		<div class="row">
			<div class="field col s6">
				<label for="first_team_result">{{ game.first_team }}</label>
				<input id="first_team_result" type="text" v-model="result.first_team">
			</div>
			<div class="field col s6">
				<label for="second_team_result">{{ game.second_team }}</label>
				<input id="second_team_result" type="text" v-model="result.second_team">
			</div>
		</div>
		<div class="row">
			<div class="field col s12">
				<p v-if="feedback" class="red-text center">{{ feedback }}</p>
			</div>
		</div>
		<div class="row">
			<div class="field col s12 center">
				<button class="btn deep-purple"> Установить </button>
			</div>
		</div>

	</form>

</template>

<script>
	import db from '@/firebase/init'

	export default {
		name: "AppResultCard",
		props: ['game'],
		data: () => ({
			result: {
				first_team: null,
				second_team: null,
			},
			feedback: null,
		}),
		methods: {
			addResultMatch(id) {
				if(this.result.second_team && this.result.first_team) {
					db.collection('games').where('id', '==', id).get()
						.then(snapshot => {
							snapshot.forEach((doc) => {
								db.collection('games').doc(doc.id).update({
									result: this.result
								})
							})
						}).then(() => {

					})

				} else {
					this.feedback = 'Одно из обязательных полей не заполнено'
				}
			}
		}
	}
</script>

<style scoped>

</style>