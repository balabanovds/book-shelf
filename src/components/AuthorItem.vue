<template>
    <div class="author">
        <div class="row">
            <div class="author__name">{{ author | fullName }}</div>
            <div class="author__text">
                Born: {{ author.birthday | formatDate }} at {{ author.country }}
            </div>
        </div>
        <ul class="author__books">
            Books:
            <li v-for="book in books(author)" :key="book.id">{{book.title}}</li>
        </ul>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import moment from "moment";

  export default {
    props: {
      author: Object,
    },
    computed: {
      ...mapGetters('authors', {
        books: 'getBooks'
      })
    },
    filters: {
      fullName(author) {
        return `${author.firstName} ${author.lastName} `;
      },
      formatDate(date) {
        return moment(date).format('MMMM Do YYYY')
      }
    },
  };
</script>

<style scoped lang="scss">
    .author {
        border: 1px solid #aaa;
        margin: 10px 0;
        padding: 10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

        &__text {
            font-size: 1.2rem;
            padding: 10px 2rem;
        }

        &__name {
            font-size: 2rem;
            font-weight: bold;
            padding: 1rem 2rem;
        }

        &__books {
            padding: .8rem 2rem;
        }

    }
</style>
