<template>
    <div>
        <input class="search" type="text" placeholder="search" v-model="search"/>
        <div class="books">
            <BookItem
                    v-for="book in filteredBooks"
                    :key="book.ISBN"
                    :book="book"
                    :authors="getAuthors(book)"
            ></BookItem>
        </div>
    </div>
</template>

<script>
  import BookItem from "../components/BookItem.vue";
  import fetchAll from "../traits/fetchAll";
  import {computed, ref} from "@vue/composition-api";

  export default {
    setup() {
      const {state} = fetchAll();

      const search = ref("");

      const filteredBooks = computed(() =>
        state.books.filter((b) => {
          return (
            b.title.includes(search.value) ||
            b.year.toString().includes(search.value) ||
            b.price.toString().includes(search.value) ||
            b.category.includes(search.value)
          );
        })
      );

      const getAuthors = ({ISBN}) => {
        return state.authors.filter((a) =>
          a.booksISBNs.some((val) => val === ISBN)
        );
      };

      return {
        getAuthors,
        search,
        filteredBooks,
      };
    },
    components: {
      BookItem,
    },
  };
</script>

<style>
</style>
