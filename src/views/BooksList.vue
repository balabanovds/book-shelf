<template>
    <div>
        <ListHeader buttonText="Add new book" toUrl="/books/new"/>
        <div class="books">
            <BookItem
                    v-for="book in filteredBySearch"
                    :key="book.id"
                    :book="book"
            ></BookItem>
        </div>
    </div>
</template>

<script>
  import BookItem from "../components/BookItem.vue";
  import {mapGetters} from 'vuex';

  export default {
    props: {
      authors: Array,
    },
    computed: {
      ...mapGetters('books', ["filteredBySearch"])
    },
    components: {
      BookItem,
    },
  };
</script>

<style>
</style>
