<template>
	<div class="admin container">
		<AppAddMatch/>
		<!--<AppResultCard v-for="(game, index) in games" :key="index" :game="game"/>-->
	</div>
</template>

<script>
	import AppResultCard from '@/components/admin/AppResultCard'
	import AppAddMatch from '@/components/admin/AppAddMatch'

	import {mapGetters} from 'vuex'


	export default {
		name: "AppAdmin",
		data: () => ({

		}),
		created() {
			// this.$store.dispatch('games/SETGAMES', null)
		},
		components: {
			AppResultCard,
			AppAddMatch
		},
		computed: {
			...mapGetters({
				games: 'games/getGames',
			})
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