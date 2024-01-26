<script setup lang="ts">
import { ref } from 'vue'
import SearchList from './SearchList.vue'
import {getFilterList, FilterListItem} from '../model/fetchData'


export interface FilterListColumeParams {
  identifier: string;
  width_in_per: number;
}

const search_term = ref("")
const filter_lists = ref(<Array<FilterListItem>>([]));

async function handleChange() {
  handleSearch(search_term.value)
}
async function handleClick(search_term: string) {
  handleSearch(search_term)
}

async function handleSearch(search_term: string) {
  filter_lists.value = getFilterList(search_term, null);
}
</script>

<template>
  <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
    <button @click="handleClick(search_term)" class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
      <svg class="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
      </svg>
      <span class="mx-1">Search</span>
    </button>
    <div class="relative mx-4 lg:mx-0">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <form @submit.prevent="handleChange">
        <input class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          type="text"
          placeholder="Search"
          v-model="search_term"
        >
      </form>
    </div>
  </div>
  <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg" >
          <SearchList :item= filter_lists></SearchList>
        </div>
      </div>
    </div>
</template>

