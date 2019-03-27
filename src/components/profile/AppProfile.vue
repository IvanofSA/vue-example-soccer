<template>
	<div class="view-profile container">
		<div class="card" v-if="user && games">
			<h3 class="deep-purple-text center">{{ user.alias }} Текущие ставки</h3>
			<p> {{ scores }}</p>
			<ul class="list">
				<li class="list__item match" v-for="(score, index) in scores" :key="index">
					<router-link class="" :to="{ name: 'AppTablePage' }">
						<span class="match__date">{{score.date}}</span>
						<span class="match__game"> {{score.first_team.name}} - {{score.second_team.name}} </span>
						<span class="match__score"> {{score.first_team.score}} - {{score.second_team.score}} </span>
						<i class="material-icons ml-auto">info</i>
					</router-link>
				</li>
			</ul>
		</div>
		<AppTablesScore v-for="game in games" :key="game.id" :game="game" :user="user"/>

	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import AppTablesScore from '@/components/profile/AppTableScore'

	export default {
		name: "AppProfile",
		data() {
			return {}
		},
		components: {
			AppTablesScore
		},
		created() {
			// this.$store.dispatch('games/GETGAMES', null)
			this.$store.dispatch('games/GETSCORES', {id: this.$route.params.id})
		},
		computed: {
			...mapGetters({
				user: 'user/inUser',
				games: 'games/inGames',
				scores: 'games/inScores',
			})
		}
	}
</script>

<style>
	.view-profile .card {
		padding: 20px;
		margin-top: 60px;
	}

	.view-profile h2 {
		font-size: 2em;
		margin-top: 0;
	}

	.view-profile li {
		padding: 10px;
		border-bottom: 1px solid #eee;
	}

	.view-profile li:last-of-type {
		border-bottom: 0;
	}

	.view-profile tbody tr {
		border-bottom: 0;
	}

	.list .list__item a{
		display: flex;
		flex-flow: row;
		align-items: center;
		justify-content: flex-start;
	}
	.match .match__date {
		width: 150px;
	}
	.match .match__game {
		text-align: center;
		width: 150px;
	}
	.match .match__score {
		text-align: center;
		width: calc(100% - 300px);
	}
	i.ml-auto {
		color: rgba(0, 0, 0, 0.26);
	}

</style>