import { defineStore } from "pinia";
import {api} from "~/api/index.js";

export const useRatingStore = defineStore('rating', () => {
    const ratings = ref([]);
    const authStore = useAuthStore();

    const addRating = async (rating) => {
        try {
            await api.post(`users/${authStore.authData.id}/ratings`, rating, {
            headers: {
                Authorization: `Bearer ${'authStore.authData.token'}`
            }
        });
        await fetchRatingsByUserId()
    } catch (e) {
        throw new Error(e.response.data.message);
    }
};

const fetchRatingsByUserId = async () => {
    const res = await api.get(`users/${authStore.authData.id}/ratings`, rating, {
    headers: {
        Authorization: `Bearer ${authStore.authData.token}`
    }
});
ratings.value = res.data.ratings;

}

const getRatingByFilmId = computed(() => {
    return (filmId) => {
        return ratings.value.find((rating) => rating.film.id == filmId)
    }
})

addRating();

return { ratings, addRating, fetchRatingsByUserId, getRatingByFilmId };
});