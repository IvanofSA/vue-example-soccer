<template>
	<div id="app">
		<app-navbar></app-navbar>

		<router-view/>
	</div>
</template>

<script>
  import AppNavbar from '@/components/layout/AppNavbar'

	export default {
		name: 'App',
		components: {
			AppNavbar
		},
		created() {
			this.$store.commit('user/setCurrentUser')

		}
	}
</script>

<style>

</style>
