<template>
  <div class="home-page">
    <h1>Главная</h1>
    <ul v-if="!filmsLoading">
      <li v-for="currentFilm in films" :key="currentFilm.id">
        <button @click="handleFilmGet(currentFilm.id)">#{{ currentFilm.id }} | {{ currentFilm.title }}</button>
      </li>
    </ul>
    <div v-else>Loading...</div>

    <div v-if="!isFilmLoading" class="home-page__film">
      <h2>Детальный фильм</h2>
      <div>
        {{ film.title }}
      </div>
    </div>

    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useLazyQuery, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const films = ref([])
const film = ref({})

const { onResult: onFilmsResult, loading: filmsLoading } = useQuery(gql`
  query getAllFilms {
    allFilms {
      films {
        title
        id
      }
    }
  }
`)

const {
  load: getById,
  variables,
  loading: isFilmLoading,
  onResult: onFilmResult,
} = useLazyQuery(gql`
  query getFilmById($filmId: ID) {
    film(id: $filmId) {
      id
      title
    }
  }
`)

onFilmsResult((result: any) => {
  films.value = result.data?.allFilms.films
})

onFilmResult((result: any) => {
  film.value = result.data?.film
})

const handleFilmGet = (id: string): void => {
  variables.value = {
    filmId: id,
  }

  getById()
}
</script>
