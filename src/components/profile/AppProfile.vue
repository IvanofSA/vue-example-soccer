<template>
	<div class="view-profile container">
		<div class="card" v-if="user && games">
			<h3 class="deep-purple-text center">{{ user.alias }} приветушки</h3>
			<p> {{ user }}</p>
			<p> {{ games }}</p>
		</div>
		<AppTablesScore v-for="(game, index) in games" :key="game.id" :game="game" :user="user" />

	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import AppTablesScore from '@/components/profile/AppTableScore'

	export default {
		name: "AppProfile",
		data() {
			return {

			}
		},
		components: {
			AppTablesScore
		},
		created() {
			this.$store.dispatch('games/GETGAMES', null)
		},
		computed: {
			...mapGetters({
				user: 'user/inUser',
				games: 'games/inGames',
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
</style>