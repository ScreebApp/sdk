<script lang="ts">
	import * as Screeb from "@screeb/sdk-browser";
	import { onMount } from "svelte";

	onMount(async () => {
		await Screeb.load();
		console.log("screeb loaded");
		await Screeb.init(
			"0e2b609a-8dce-4695-a80f-966fbfa87a88",
			"dev@screeb.app",
			{
				firstname: "John",
				lastname: "Smith",
				last_seen_at: new Date(),
				authenticated: true,
				org_size: 20,
			}
		);

		console.log(await Screeb.debug());

		await Screeb.eventTrack("screeb-sdk-browser-example started", {
			test: 123,
		});
		await Screeb.identityProperties({ hello: "I'm a dev." });
		await Screeb.identityGroupAssign("cohort", "Screeb Developers");

		setTimeout(async () => {
			console.log(await Screeb.identityGet());
		}, 200);
	});
</script>

<main>
	<img src="favicon.png" alt="This is the Screeb.app logo" />
	<h1>Hello <em>you</em>!</h1>

	<h2>Welcome aboard!</h2>
	<p>
		Visit our
		<a
			href="https://github.com/ScreebApp/developers/wiki/Javascript-SDK-install"
			target="_blank"
		>
			Developer documentation
		</a>
		to learn how to integrate
		<a href="https://screeb.app" target="_blank">Screeb</a>.
	</p>
</main>

<style>
	img {
		margin-top: 1em;
		max-width: 100px;
	}

	main {
		color: #303140;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		font-size: 4em;
		font-weight: 500;
		font-family: Rubik;
		margin-block-start: 0.2em;
		margin-block-end: 0.2em;
	}

	h2 {
		font-size: 1.2em;
		font-weight: 500;
		font-family: Rubik;
	}

	em {
		font-style: normal;
		color: #5e21f1;
		font-weight: 700;
	}

	a {
		font-weight: 700;
		color: #5e21f1;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
