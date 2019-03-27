<template>
	<div class="container">
		<h2 class="center"> Table Page </h2>

		<table v-for="(game, index) in games" :key="index">
			<thead>
			<tr>
				<th>Имя</th>
				<th>{{game.first_team}} - {{ game.second_team }}</th>
				<th>Итоговый результат</th>
				<th>Количество очков</th>
			</tr>
			</thead>

			<tbody>
			<tr v-for="(score, index) in filterItems(scores, game.id)" :key="score.id">
				<td>{{ score.id_user }}</td>
				<td>{{ score.first_team.score }} - {{ score.second_team.score }}</td>
				<td>{{ game.result.first_team }} - {{ game.result.second_team }}</td>
				<td>0</td>
			</tr>
			</tbody>
		</table>

		<p> {{ users }} </p>
		<p> {{ games }} </p>
		<p> {{ scores }} </p>
	</div>
</template>

<script>

	import {mapGetters} from 'vuex'

	export default {
		name: "AppTablePage",
		data() {
			return {
			}
		},
		created() {
			this.$store.dispatch('user/GETUSERS', null)
			this.$store.dispatch('games/GETGAMES', null)
			this.$store.dispatch('games/GETALLSCORES', null)
		},
		methods: {
			filterItems(arr, id) {
				return arr.filter((el) => {
					return el.id_game === id
				})
			}
		},
		computed: {
			...mapGetters({
				users: 'user/inUsers',
				games: 'games/inGames',
				scores: 'games/inAllScores',
			}),
			scoreForUser() {

			}
		}
	}
</script>

<style scoped>

</style>