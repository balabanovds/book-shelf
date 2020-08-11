<template>
    <div>
        <ListHeader buttonText="Add author" toUrl="/authors/new"/>
        <AuthorItem
                v-for="author in filteredBySearch"
                :key="author.id"
                :author="author"
        ></AuthorItem>
    </div>
</template>

<script>
  import AuthorItem from "../components/AuthorItem";
  import {mapGetters} from 'vuex';

  export default {
    props: {
      books: Array,
    },
    computed: {
      ...mapGetters('authors', ['filteredBySearch']),
    },
    components: {
      AuthorItem,
    },
  };
</script>

<style>
</style>
