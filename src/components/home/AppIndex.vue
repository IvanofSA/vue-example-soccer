<template>
	<div class="container">
		<h2> Hello world! </h2>
		<p></p>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		name: "AppIndex",
		data() {
			return {

			}
		},
		...mapGetters({
			user: 'user/inUser'
		})
	}
</script>

<style scoped>

</style>