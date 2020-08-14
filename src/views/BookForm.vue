<template>
  <div>
    <h1>New book</h1>
    <form novalidate @submit.prevent="onSubmit">
      <InputText
          class="book__title"
          @input="book.title = $event"
          name="title"
          :validators="[validators.notEmpty()]"
          @is-valid="validateField"
      />
      <InputText
          class="book__promo"
          @input="book.promo = $event"
          name="promo"
          :validators="[validators.notEmpty()]"
          @is-valid="validateField"
      />
      <div class="row">
        <InputText
            class="book__isbn"
            @input="book.isbn = $event"
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
            @input="book.year = $event"
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
            @input="book.price = $event"
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
          @input="book.category = $event"
          name="category"
          :validators="[validators.notEmpty()]"
          @is-valid="validateField"
      />
      <div class="row">
        <InputText
            class="book__tags"
            @input="book.tags = $event"
            name="tags"
            :validators="[validators.notEmpty()]"
            @is-valid="validateField"
        />
        <InputText
            class="book__src"
            @input="book.url = $event"
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
