<template>
  <div>
    <h1>New book</h1>
    <form novalidate @submit.prevent="onSubmit">
      <InputText
          class="book__title"
          v-model="book.title"
          name="title"
          :validators="[validators.notEmpty()]"
          @is-valid="validateField"
      />
      <InputText
          class="book__promo"
          v-model="book.promo"
          name="promo"
          :validators="[validators.notEmpty()]"
          @is-valid="validateField"
      />
      <div class="row">
        <InputText
            class="book__isbn"
            v-model="book.isbn"
            name="ISBN"
            :validators="[
                      validators.notEmpty(),
                      validators.len(13),
                      validators.isNumber()
                      ]"
            @is-valid="validateField"
        />
        <InputText
            class="book__year"
            v-model="book.year"
            name="year"
            :validators="[
                      validators.notEmpty(),
                      validators.len(4),
                      validators.isNumber()
                      ]"
            @is-valid="validateField"
        />
        <InputText
            class="book__price"
            v-model="book.price"
            name="price"
            :validators="[
                      validators.notEmpty(),
                      validators.minLen(2),
                      validators.isNumber()
                      ]"
            @is-valid="validateField"
        />
      </div>
      <InputText
          class="book__category"
          v-model="book.category"
          name="category"
          :validators="[validators.notEmpty()]"
          @is-valid="validateField"
      />
      <div class="row">
        <InputText
            class="book__tags"
            v-model="book.tags"
            name="tags"
            :validators="[validators.notEmpty()]"
            @is-valid="validateField"
        />
        <InputText
            class="book__src"
            v-model="book.url"
            name="URL"
            :validators="[validators.notEmpty()]"
            @is-valid="validateField"
        />
      </div>


      <button
          :disabled="!valid"
          :class="{disabled: !valid}"
          class="btn"
          type="submit">
        Add book
      </button>
    </form>
  </div>

</template>

<script>
import InputText from "../components/InputText.vue";
import {computed, reactive} from '@vue/composition-api';
import {isNumber, len, minLen, notEmpty} from "@/utils/validators";
import store from "../store";

export default {
  name: 'BookForm',
  data() {
    return {
      validators: {
        len,
        minLen,
        isNumber,
        notEmpty
      }
    };
  },
  setup(props, {parent}) {
    const router = parent.$router;

    const book = reactive({
      isbn: '',
      title: '',
      promo: '',
      url: '',
      tags: [],
      price: null,
      year: null,
      category: ''
    });

    const validFields = reactive({
      isbn: false,
      title: false,
      promo: false,
      price: false,
      year: false,
      category: false
    });

    const onSubmit = () => {
      store.dispatch('books/create', book);
      router.push({name: 'Books'});
    };

    const validateField = (name, isValid) => {
      name = name.toLowerCase();
      validFields[name] = isValid;
    };

    const valid = computed(() => {
      return Object.keys(validFields).every(key => validFields[key] === true);
    });

    return {
      book,
      onSubmit,
      validateField,
      valid
    };
  },
  components: {InputText},
};
</script>

<style scoped lang="scss">
.row {
  display: flex;

  & * + * {
    margin-left: 10px;
  }

  & > * {
    width: 100%;
  }
}
</style>
