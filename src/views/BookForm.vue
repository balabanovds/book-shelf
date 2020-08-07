<template>
    <div>
        <h1>New book</h1>
        <form novalidate @submit.prevent="onSubmit">
            <InputText
                    v-model="book.title"
                    name="title"
                    :validators="[validators.notEmpty()]"
                    @is-valid="validateForm"
            />
            <InputText
                    v-model="book.promo"
                    name="promo"
                    :validators="[validators.notEmpty()]"
                    @is-valid="validateForm"
            />
            <div class="row">
                <InputText
                        v-model="book.isbn"
                        name="ISBN"
                        :validators="[
                      validators.notEmpty(),
                      validators.len(13),
                      validators.isNumber()
                      ]"
                        @is-valid="validateForm"
                />
                <InputText
                        v-model="book.year"
                        name="year"
                        :validators="[
                      validators.notEmpty(),
                      validators.len(4),
                      validators.isNumber()
                      ]"
                        @is-valid="validateForm"
                />
                <InputText
                        v-model="book.price"
                        name="price"
                        :validators="[
                      validators.notEmpty(),
                      validators.minLen(2),
                      validators.isNumber()
                      ]"
                        @is-valid="validateForm"
                />
            </div>
            <InputText
                    v-model="book.category"
                    name="category"
                    :validators="[validators.notEmpty()]"
                    @is-valid="validateForm"
            />
            <div class="row">
                <InputText
                        v-model="book.tags"
                        name="tags"
                        :validators="[validators.notEmpty()]"
                        @is-valid="validateForm"
                />
                <InputText
                        v-model="book.url"
                        name="URL"
                        :validators="[validators.notEmpty()]"
                        @is-valid="validateForm"
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
  import {reactive, computed} from '@vue/composition-api'
  import {isNumber, len, minLen, notEmpty} from "../utils/validators";
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
      }
    },
    setup(props, {parent}) {
      const router = parent.$router

      const book = reactive({
        isbn: '',
        title: '',
        promo: '',
        url: '',
        tags: [],
        price: null,
        year: null,
        category: ''
      })

      const validFields = reactive({
        isbn: false,
        title: false,
        promo: false,
        price: false,
        year: false,
        category: false
      })

      const onSubmit = () => {
        store.dispatch('books/create', book)
        router.push({name: 'Books'})
      }

      const validateForm = (name, isValid) => {
        name = name.toLowerCase()
        validFields[name] = isValid
      }

      const valid = computed(() => {
        return Object.keys(validFields).every(key => validFields[key] === true)
      })

      return {
        book,
        onSubmit,
        validateForm,
        valid
      }
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
