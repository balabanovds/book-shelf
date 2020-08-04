<template>
    <div>
        <ListHeader buttonText="Add new book" @on-search="onSearch" toUrl="/books/new"/>
        <div class="books">
            <BookItem
                    v-for="book in filteredBooks"
                    :key="book.ISBN"
                    :book="book"
                    :authors="getAuthors(book)"
                    @delete-book="onDelete"
            ></BookItem>
        </div>
    </div>
</template>

<script>
  import BookItem from "../components/BookItem.vue";
  import {computed, ref} from "@vue/composition-api";

  export default {
    props: {
      books: Array,
      authors: Array,
    },
    setup(props, {emit}) {

      const search = ref("");

      const filteredBooks = computed(() =>
        props.books.filter((b) => {
          return (
            b.title.toLowerCase().includes(search.value.toLowerCase()) ||
            b.year.toString().includes(search.value) ||
            b.price.toString().includes(search.value) ||
            b.category.toLowerCase().includes(search.value.toLowerCase())
          );
        })
      );

      const onSearch = (value) => (search.value = value);
      const onDelete = (ISBN) => {
        emit('del-book', ISBN)
      };

      const getAuthors = ({ISBN}) => {
        return props.authors.filter((a) =>
          a.booksISBNs.some((val) => val === ISBN)
        );
      };

      return {
        getAuthors,
        onSearch,
        onDelete,
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
