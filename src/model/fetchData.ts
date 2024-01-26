import { ref } from 'vue'
import axios from 'axios'

const base_url = "https://mmp.acdh-dev.oeaw.ac.at/api/stelle/";
const default_limit = 20;

const filter_lists = ref(<Array<FilterListItem>>([]));

export interface FilterListitemKeyWords {
    id: number;
    stichwort: string;
}

export interface FilterListItem {
    id: number;
    summary: string;
    zitat: string;
    zitat_stelle: string;
    translation: string;
    start_date: number;
    end_date: number;
    kommentar: string; 
    display_label: string;
    key_word: Array<FilterListitemKeyWords>; 
}

function buildUrl(search_term: string, limit: number) {
    return base_url.concat("?zitat=" + search_term + "&limit=" + limit + "&zitat_lookup=icontains");
}

async function fetchPassage(search_term: string, limit: number) {
    filter_lists.value = [];
    let searchUrl =  buildUrl(search_term, limit)
    // console.log(searchUrl);
    await axios.get(searchUrl)
        .then((res) => {
            for (var val of res.data.results) {
                var obj1Array: Array<FilterListitemKeyWords> = [];
                for (var key of val.key_word) {
                    const obj1 = {
                        id: key.id, 
                        stichwort: key.stichwort,
                    } as FilterListitemKeyWords;
                    obj1Array.push(obj1);
                }

                const obj2 = {
                id: val.id, 
                summary: val.summary,
                zitat: val.zitat,
                zitat_stelle: val.zitat_stelle,
                translation: val.translation,
                start_date: val.start_date,
                end_date: val.end_date,
                kommentar: val.kommentar,
                display_label: val. display_label,
                key_word: obj1Array
                } as FilterListItem ;
                filter_lists.value.push(obj2);
            }
            return filter_lists;
        })
        .catch((e) => {
            return [];
        });
}

export function getFilterList(search_term: string, limit: number | null) : Array<FilterListItem> {
    fetchPassage(search_term, (limit === null || limit === undefined) ? default_limit : limit);
    return filter_lists.value
  }