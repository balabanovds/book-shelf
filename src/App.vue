<template>
    <div id="app">
        <div id="nav">
            <router-link to="/books">Books</router-link>
            <router-link to="/authors">Authors</router-link>
        </div>
        <div class="container">
            <router-view
                    :books="books"
                    :authors="authors"
                    @del-book="onDelBook"
                    @add-book="onAddBook"
                    @add-author="onAddAuthor"
            />
        </div>
    </div>
</template>

<script>
  import {defineComponent, onMounted, ref} from "@vue/composition-api";
  import {mockAuthors, mockBooks} from "./mock";

  export default defineComponent({
    setup() {
      const books = ref([])
      const authors = ref([])

      onMounted(() => {
        books.value = mockBooks;
        authors.value = mockAuthors;
      });

      const onAddBook = (book) => {
        books.value.push(book)
      }

      const onAddAuthor = (author) => {
        author.id = authors.value.length + 1
        authors.value.push(author)
      }

      const onDelBook = (id) => {
        books.value = books.value.filter(b => b.isbn !== id)
      }

      return {
        books,
        authors,
        onDelBook,
        onAddBook,
        onAddAuthor
      };
    },
  });
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

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        list-style-position: outside;

        & > * {
            margin-left: 15px;
        }
    }

    .btn {
        display: inline-block;
        padding: 10px 32px;
        background-color: green;
        text-align: center;
        text-decoration: none;
        font-size: 1.5rem;
        color: white;

        &:hover {
            cursor: pointer;
            background-color: #468f59;
        }

        &.disabled {
            background-color: darkgray;
        }
    }

</style>
