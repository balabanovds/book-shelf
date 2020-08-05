<template>
    <div>
        <ListHeader buttonText="Add author" @on-search="onSearch" toUrl="/authors/new"/>
        <AuthorItem
                v-for="author in filteredAuthors"
                :key="author.id"
                :author="author"
                :books="getBooks(author)"
        ></AuthorItem>
    </div>
</template>

<script>
  import AuthorItem from "../components/AuthorItem";
  import {computed, ref} from "@vue/composition-api";

  export default {
    props: {
      books: Array,
      authors: Array,
    },
    setup({authors, books}) {
      const search = ref("");

      const filteredAuthors = computed(() =>
        authors.filter((a) => {
          const srch = search.value.toLowerCase()
          return (
            a.firstName.toLowerCase().includes(srch) ||
            a.lastName.toLowerCase().includes(srch) ||
            a.country.toLowerCase().includes(srch)
          );
        })
      );

      const onSearch = (value) => (search.value = value);
      const getBooks = (author) => {
        return author.booksISBNs.flatMap(i => books.filter(b => b.isbn === i))
      }

      return {
        getBooks,
        onSearch,
        filteredAuthors
      }
    },
    components: {
      AuthorItem,
    },
  };
</script>

<style>
</style>
