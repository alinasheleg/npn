<script setup lang='ts'>
const filmStore = useFilmStore();
const countryStore = useCountryStore();
const categoryStore = useCategoryStore();

const category = ref(null);
const country = ref(null);
const sort = ref('name');
const filter = () => {
  filmStore.addCategoryToParams(category.value);
  filmStore.addCountryToParams(category.value);
  filmStore.addSortToParams(category.value);
  filmStore.fetchFilms();
}

const resetFilter = () => {
  category.value = null;
  country.value = null;
  sort.value = 'name';
  filter();


}


</script>

<template>
  <div class="mt-3 row">

    <div class="col-md-4">
      <select v-model="category" @change="filter" class="form-select" aria-label="Default select example">
        <option :value="null" selected>Select genge</option>
        <option
            v-for="category in categoryStore.categories"
            :key="category.id"
            :value="category.id">{{ category.name }} ({{ category.filmCount }})</option>
      </select>
    </div>

    <div class="col-md-4">
      <select v-model="country" @change="filter" class="form-select" aria-label="Default select example">
        <option :value="null" selected>Select country</option>
        <option
            v-for="country in countryStore.countries"
            :key="country.id"
            :value="country.id"
        >{{ country.name }}</option>
      </select>
    </div>
    <div class="col-md-2">
      <select v-model="sort" @change="filter" class="form-select" aria-label="Default select example">
        <option selected>Select genge</option>
        <option value="Name">Name</option>
        <option value="Year">Year</option>
        <option value="Rating">Rating</option>
      </select>
    </div>

    <div class="col-md-2">
      <button @click="resetFilter" class="btn outline-warning">Reset</button>
    </div>
    <div  class="row row-cols-1 row-cols-md-3 g-4">

      <div class="col" v-for="film in filmStore.films" :key="film.id" >
        <div class="card">
          <img v-if="film.link_img" :src="film.link_img" class="card-img-top" alt="film.link_img">
          <img v-else src="https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/50c92dd6-51a3-4ec5-a334-fc21f486e0bc/1920x" class="card-img-top" alt="film.link_img">
          <div class="card-body">
            <h5 class="card-title">{{film.name}}</h5>
            <p class="card-text">{{ film.ratingAvg }}</p>
            <p class="card-text">{{ film.duration }} min.</p>
            <p class="card-text">
              < class="card-title"><template v-for="category in film.categories" :key = "category.id">{{category.name}}>
                {{category.name}}
              </template>
            </p>
            <button  type="button" class="btn btn-info">Info</button>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="justify-content-center">

    <div v-if="filmStore.isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <nav class="d-flex justify-content-center my-4" aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
</template>