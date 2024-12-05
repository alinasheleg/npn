import {defineStore} from "pinia";
import {api} from "~/api/index.js";


export const useReviewStore = defineStore('review', () =>{
    const reviews = ref([]);

    const fetchReviewsByFilmd = async (id) => {
        const res = await api.get (`/films/${id}/reviews`);
        reviews.value = res.data.reviews;
    }
    return{
        reviews,
        fetchReviewsByFilmd,
    }
});