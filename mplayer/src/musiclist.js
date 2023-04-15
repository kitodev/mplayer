import {writable} from "svelte/store"

export const musicList = writable([
    {
        image: "strings-cello-bow-and-f-hole-1635517.jpg",
        audio: "ambient-piano-ampamp-strings-10711.mp3",
        name: "Ambient Piano Ampamp",
        artist: "Davis Cameron"
    },
    {
        image: "westminster-bridge-and-big-ben-london-uk-1635339.jpg",
        audio: "playing-in-color-120336.mp3",
        name: "Playing in color",
        artist: "Josh Arthur"
    },
    {
        image: "a-snail-on-the-wood-1634483.jpg",
        audio: "deep-ambient-11051.mp3",
        name: "Deep Ambient",
        artist: "Johnathan Andrew"
    },
]);