<template>
    <div id="app">
        <div id="nav">
            <router-link to="/books">Books</router-link>
            <router-link to="/authors">Authors</router-link>
        </div>
        <div class="container">
            <router-view :books="books" :authors="authors" @del-book="onDelBook"/>
        </div>
    </div>
</template>

<script>
  import {onMounted, ref} from "@vue/composition-api";
  import {mockAuthors, mockBooks} from "./mock";

  export default {
    setup() {
      const books = ref([])
      const authors = ref([])

      onMounted(() => {
        books.value = mockBooks;
        authors.value = mockAuthors;
      });

      const onDelBook = (id) => {
        books.value = books.value.filter(b => b.ISBN !== id)
      }

      return {books, authors, onDelBook};
    },
  };
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    p {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .container {
        width: 75vw;
        margin: 0 auto;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        text-align: center;

        a {
            font-weight: bold;
            color: #2c3e50;
            margin: 0 10px;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
