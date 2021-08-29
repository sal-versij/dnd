<script lang="ts">
	import { Container, Button, Col, Row } from 'sveltestrap';
	import DbCtx from './db/DbCtx';
	import { Friend } from './db/model';

	const db = new DbCtx('myDb');
	let friend: Friend = new Friend();

	async function dbCount() {
		await db.ready();
		await db.friends
			.where('name')
			.startsWithIgnoreCase('d')
			.each(function (friend) {
				console.log(friend);
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	$: dbCount();

	async function dbSave() {
		await db.ready();
		await db.friends.add(friend);
		friend.id = undefined;
		await dbCount();
	}
</script>

<Container>
	<Row cols="1">
		<Col>
			<div class="form-group">
				<label class="font-weight-bold" for="name">Name</label>
				<input
					class="form-control"
					id="name"
					type="text"
					bind:value={friend.name}
				/>
			</div>
		</Col>
	</Row>
	<Row>
		<Col>
			<Button color="primary" on:click={dbSave}>Salva</Button>
		</Col>
	</Row>
</Container>

<style lang="scss">
</style>
