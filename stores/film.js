import { defineStore } from "pinia";
import { api } from "~/api/index.js";

export const useFilmStore = defineStore("film", () => {
    const films = ref([]);

    const fetchFilms = async () => {
        const res = await api.get('/films');
        films.value = res.data.films;
    };

    fetchFilms();

    return {
        films,
        fetchFilms,
    };
});