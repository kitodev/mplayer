<script>
	import { onMount } from "svelte"
	import { musicList } from "./musiclist.js"

	let currSongIndex = 0;
	let playerState = "play";
	let audioElement;
	let mainElement;

	function prev() {
		if(currSongIndex == 0) {
			currSongIndex = $musicList.length - 1;
		} else {
			currSongIndex = (currSongIndex + 1) % $musicList.length
		}
		playerState = "play";
	}

	function playPause() {
		if(playerState == "play") {
			playerState = "pause";
			audioElement.pause();
		} else {
			playerState = "play";
			audioElement.play();
		}
	}

	function next() {
		currSongIndex = (currSongIndex + 1) % $musicList.length
		playerState = "play";
		setBackground();
	}

	function setSong(i) {
		currSongIndex = i;
		playerState = "play";
		setBackground();
	}

	function setBackground() {
		let background = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.5)),
		url(./files/image/${$musicList[currSongIndex].image}) center no-repeat`;
		mainElement.style.background = background;
		mainElement.style.backgroundSize = "cover";
	}

	onMount(function() {
		setBackground();
	})
</script>
<style>
	main {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	audio {
		display: none;
	}
	.player {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 350px;
		height: 530px;
		display: flex;
		overflow: hidden;
	}
	.player .song-list {
		height: calc(100% - 120px);
		background: rgba(255,255,255, 0.2);
		box-shadow: 0px 8px 32px rgba(32, 38, 135, 0.2);
		overflow-y: scroll;
	}
	.player .current-song {
		padding: 10px;
		display: flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.8);
		z-index: 2;
	}
	.player .current-song .avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.player .song-list > div .avatar {
		width: 50px;
		height: 50px;
		text-align: center;
		padding: 10px;
	}
	.player .song-list > div.active {
		display: flex;
		background: rgba(255, 255, 255, 0.8);
	}
	.player .song-list > div .avatar img {
		max-width: 150px;
		max-height: 150px;
		border-radius: 50%;
	}
	.player .song-list > div .song-details {
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.player .song-list > div .song-details h2 {
		font-size: 18px;
		margin: 0px 0px 2px;
		color: #111;
	}
	.player .song-list > div .song-details p {
		color: #111;
		font-size: 15px;
		margin: 0px;
	}
	.player .song-list::-webkit-scrollbar {
		width: 4px;
		background: transparent;
	}
	.player .song-list::-webkit-scrollbar-thumb {
		width: 4px;
		background: #fff;
	}
	.player .song-controls .controls {
		display: flex;
		justify-content: space-between;
	}
	.player .song-controls .controls button{
		outline: none;
		border: none;
		background: transparent;
		color: #111;
		cursor: pointer;
	}

</style>
<main bind:this={mainElement}>
<audio
src={"./files/audio/"+$musicList[currSongIndex].audio}
bind:this={audioElement}
autoplay="false"
>
</audio>

<div class="player">
	<div class="current-song">
		<div class="avatar">
		<img class="avatar-img" alt="{$musicList[currSongIndex].image}" src={"./files/image/" + $musicList[currSongIndex].image}>
		</div>
		<div class="song-controls">
			<h2>{$musicList[currSongIndex].name}</h2>
			<div class="controls">
				<button on:click={prev}>
					<i class="fa fa-backward"></i>
				</button>
				<button on:click={playPause}>
					{#if playerState == "play"}
					<i class="fa fa-pause"></i>
					{:else}
					<i class="fa fa-play"></i>
					{/if}
				</button>
				<button on:click={next}>
					<i class="fa fa-forward"></i>
				</button>
			</div>
		</div>
		<div class="song-list">
			{#each $musicList as music, i}
			<div class="{i == currSongIndex ? "active":""}"
			on:click="{()=> setSong(i)}"
			>
			<div class="avatar">
				<img src="{"./files/image/" + music.image}">
			</div>
			<div class="song-details">
				<h2>{music.name}</h2>
				<p>{music.artist}</p>
			</div>
			</div>
			{/each}
		</div>
	</div>
</div>
</main>