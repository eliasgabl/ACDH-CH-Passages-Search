<script setup lang="ts">
import { computed } from 'vue'
import {FilterListItem} from '../model/fetchData'

const props = defineProps<{item: Array<FilterListItem>}>()

const items = computed(() => props.item)

</script>

<template>
    <table class="min-w-full">
      <thead>
        <tr>
          <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Name
          </th>
          <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Key Words
          </th>
        </tr>
      </thead>

      <tbody class="bg-white">
        <tr v-for="column in items" >
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            <div class="flex items-left">
              <div class="text-sm font-medium leading-5 text-gray-900">
                <a :href="'https://mmp.acdh-dev.oeaw.ac.at/archiv/stelle/detail/' + column.id" target="_blank">{{ column.display_label }}</a>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            <div class="flex items-left">
              <div class="text-sm font-medium leading-5 text-gray-900">
              <p class="text-left" v-for="keyword in column.key_word">{{ keyword.stichwort }}</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</template>