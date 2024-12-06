<script setup lang="ts">

const props = defineProps({
  filmId: {
    type: Number,
    required: true,
  }
})

const ratingStore = useRatingStore()
const sendRating = async (score: number) => {
  try {
    await ratingStore.addRating( {
      film_id: props.filmId,
      ball: score
    })
    alert(`Your rating is ${props.filmId}!`)
  } catch (e : any) {
    alert(`Error: ${e.message}`)
  }
}

</script>

<template>
  <ul class="rating-stars">
    <li v-for="i in 5"
        :key="i"
        class="star-item">
      <span v-if="ratingStore.getRatingByFilmId(filmId)" class="star-link"><i v-if="ratingStore.getRatingByFilmId(filmId).score <= i" class="bi bi-star-fill"></i></span>
      <a
          @click.prevent="sendRating(i)"
          class="star-link"
          href=""><i class="bi bi-star"></i></a>
    </li>
  </ul>
</template>

<style scoped>
.star {
  color: grey;
  font-size: 1.5rem;
  margin: 0 2px;
}
.star:hover {
  cursor: pointer;
  color: #fff3f3;
}

.ratings{
  margin-right:10px;
}

.ratings i{

  color:#cecece;
  font-size:32px;
}

.rating-color{
  color: #ffffff !important;
}

.review-count{
  font-weight:400;
  margin-bottom:2px;
  font-size:24px !important;
}

.small-ratings i{
  color:#cecece;
}

.review-stat{
  font-weight:300;
  font-size:18px;
  margin-bottom:2px;
}
</style>