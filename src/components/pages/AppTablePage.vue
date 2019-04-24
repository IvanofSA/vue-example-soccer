<template>
	<div class="container">
		<div class="card-panel" v-for="(game, index) in games" :key="index">
			<table class="table table--light">
				<caption><span>{{game.first_team}} <span v-if="game.result">{{ game.result.first_team }} - {{ game.result.second_team }}</span> {{ game.second_team }}</span>
				</caption>

				<thead>
				<tr>
					<th>Имя</th>
					<th>Ставка</th>
					<!--<th>Итоговый результат</th>-->
					<th>Количество очков</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="score in filterItems(scores, game.id)" :key="score.id" :class="[score.result.status == 'full_win' ? 'success' : (score.result.status == 'win' ? 'winner' : '')]">
					<td data-label="Имя">{{ score.id_user }}</td>
					<td data-label='Ставка'>{{ score.first_team.score }} - {{ score.second_team.score }}
					</td>
					<!--<td data-label='Итоговый результат' v-if="game.result">{{ game.result.first_team }} - {{-->
					<!--game.result.second_team }}-->
					<!--</td>-->
					<td data-label="Количество очков" v-if="score.result" > {{ score.result.total }} </td>
				</tr>
				</tbody>
			</table>

			<!--<p> {{ scores }}</p>-->
		</div>
	</div>
</template>

<script>

	import {mapGetters} from 'vuex'

	export default {
		name: "AppTablePage",
		data: () => ({
			show: false
		}),
		created() {
			this.$store.dispatch('user/SETALLUSER', null)
			this.$store.dispatch('games/SETGAMES', null)
			this.$store.dispatch('games/SETALLSCORES', null)
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
				users: 'user/getCurrentUser',
				games: 'games/getGames',
				scores: 'games/getAllScores',
			}),
		}
	}
</script>


<style scoped lang="scss">

	.is-show {
		display: block !important;

		@media only screen and (min-width: 48rem) {
			display: table-cell !important;
		}
	}

	.is-hide {
		display: none !important;

		@media only screen and (min-width: 48rem) {
			display: table-cell !important;
		}
	}

	// MIXINS
	@mixin createTable {
		width: 90%;
		margin: 0 auto;
		border-collapse: collapse;

		// COMPONENTS
		caption {
			margin-bottom: 30px;
			font: {
				size: 1.25rem;
				weight: 700;
			}
			text-transform: uppercase;
			letter-spacing: 0.125rem;
		}
		thead {
			display: none;
		}

		tbody, tr, td {
			display: block;
		}

		tr {
			margin: 0.5rem 0;
			padding: 0.5rem 0;
			border: 1px solid #DDD;
			border-bottom: 3px solid #DDD;

			&.success {
				background-color: lightgreen;
			}
			&.winner {
				background-color: lightyellow;

			}
		}

		td {
			position: relative;
			padding: 0.5rem;
			font-size: 0.875rem;
			text-align: right;
			white-space: normal;
			border-bottom: 1px dotted #DDD;

			&:first-child {
				margin-top: -0.5rem;
			}
			&:last-child {
				margin-bottom: -0.5rem;
				border: 0;
			}
			&:before {
				position: absolute;
				left: 0.5rem;
				content: attr(data-label);
				font: {
					size: 1rem;
					weight: 700;
				}
				text-transform: uppercase;
				letter-spacing: 0.125rem;
				white-space: nowrap;
			}
		}

		// MEDIA QUERY
		@media only screen and (min-width: 48rem) {
			display: table;

			// COMPONENTS
			thead {
				display: table-header-group;
				font: {
					size: 1rem;
					weight: 700;
				}
				text-align: left;
				text-transform: uppercase;
				letter-spacing: 0.125rem;
				border-bottom: 2px solid #777;
			}

			tbody {
				display: table-row-group;
			}

			tr {
				display: table-row;
				border: 0;

				/*&:not(:last-child) {*/
				border-bottom: 1px dotted #DDD;
				/*}*/
				&.table__row--selected {
					background-color: rgba(94, 53, 173, 0.6);
				}
			}

			th {
				padding: 1rem 0.5rem;
				border-radius: 0;
			}

			td {
				display: table-cell;
				padding: 1rem 0.5rem;
				text-align: left;
				border-radius: 0;
				&:before {
					display: none;
				}
			}
		}

		// STATES
		&.table--light {
			thead {
				background-color: #F3F6F9;
				color: #000;
				border-bottom: 2px solid #E3E6E9;
			}
		}
		&.table--dark {
			thead {
				background-color: #333;
				color: #FFF;
				border-bottom: 2px solid #222;
			}
		}
		&.table--default {
			tr:not(:last-child) {
				border-bottom: 1px solid #DDD;
			}
		}
		&.table--bordered {
			th, td {
				border: 1px solid #DDD;
			}
		}
		&.table--striped {
			tr:nth-child(even):not(thead) {
				background-color: rgba(238, 238, 238, 0.7);
			}
		}
		&.table--hoverable {
			tr:hover > td {
				background-color: lighten(lightcyan, 10%);
			}
		}
	}

	// End of CreateTable

	// CUSTOM
	.table {
		@include createTable;
	}

</style>