<template>
  <div class="book">
    <div class="book__title">{{ book.title }}</div>
    <div class="book__content">
      <img :src="book.url" alt="pic"/>
      <div class="book__text">
        <p>Year: {{ book.year }}</p>
        <ul>
          Authors:
          <li v-for="author in authors(book)"
              :key="author.id">
            {{ author | fullName }}
          </li>
        </ul>
        <p>ISBN: {{ book.isbn }}</p>
        <p>Category: {{ book.category }}</p>
      </div>
      <div class="book__sell">
        <div class="book__promo">{{ book.promo }}</div>
        <div class="book__price">{{ formatPrice(book.price) }}</div>
      </div>
    </div>
    <span class="material-icons book__delete"
          @click="deleteBook(book.id)">
            delete
        </span>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  props: {
    book: Object,
  },
  computed: {
    ...mapGetters(['formatPrice']),
    ...mapGetters('books', {
      authors: "getAuthors"
    })
  },
  methods: {
    ...mapActions('books', {deleteBook: "delete"})
  },
  filters: {
    fullName(author) {
      return `${author.firstName} ${author.lastName} `;
    },
    // formatPrice(price) {
    //   return `$ ${price / 100}`;
    // },
  },
};
</script>

<style scoped lang="scss">
.book {
  position: relative;
  border: 1px solid #aaa;
  margin: 10px 0;
  padding: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

  &__delete {
    position: absolute;
    right: 10px;
    top: 10px;

    &:hover {
      cursor: pointer;
      color: red;
    }
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem 2rem;
  }

  &__content {
    display: flex;
    justify-content: space-around;
    align-items: center;

    & img {
      width: 100px;
      height: 100%;
    }
  }

  &__text {
    margin-left: 1rem;
  }

  &__author {
    margin-left: 1.5rem;
  }

  &__sell {
    width: 50%;
    text-align: center;
  }

  &__promo {
    font-size: 1.5rem;
  }

  &__price {
    font-size: 2rem;
    font-weight: bold;
  }
}
</style>
