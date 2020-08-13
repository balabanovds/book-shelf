<template>
    <div>
        <h1>New author</h1>
        <form novalidate @submit.prevent="onSubmit">
            <InputText
                    @input="author.firstName = $event"
                    name="firstName"
                    :validators="[validators.notEmpty()]"
                    @is-valid="validateForm"
            />
            <InputText
                    @input="author.lastName = $event"
                    name="lastName"
                    :validators="[validators.notEmpty()]"
                    @is-valid="validateForm"
            />
            <div class="row">
                <InputText
                        type="date"
                        @input="author.birthday = $event"
                        name="birthday"
                        :validators="[validators.notEmpty()]"
                        @is-valid="validateForm"
                />
                <InputText
                        @input="author.country = $event"
                        name="country"
                        :validators="[validators.notEmpty()]"
                        @is-valid="validateForm"
                />
                <div class="gender-radio">
                    <span>Gender:</span>
                    <label>
                        <input type="radio" value="male" v-model="author.gender"> male
                    </label>
                    <label>
                        <input type="radio" value="female" v-model="author.gender"> female
                    </label>
                </div>
            </div>
            <div class="book-select">
                <label for="books">
                    <span>Books:</span>
                </label>
                <select id="books" v-model="author.books" multiple>
                    <option class="book-select__item" v-for="book in books"
                            :value="book.id"
                            :key="book.id">
                        {{book.title}}
                    </option>
                </select>
            </div>

            <button
                    :disabled="!valid"
                    :class="{disabled: !valid}"
                    class="btn"
                    type="submit">
                Add author
            </button>
        </form>
    </div>

</template>

<script>
  import InputText from "../components/InputText.vue";
  import {computed, reactive} from '@vue/composition-api'
  import {isNumber, len, minLen, notEmpty} from "@/utils/validators";
  import store from "../store";
  import {mapState} from 'vuex';

  export default {
    name: 'AuthorForm',
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
    computed: {
      ...mapState('books', ['books'])
    },
    setup(props, {parent}) {
      const router = parent.$router

      const author = reactive({
        firstName: '',
        lastName: '',
        birthday: '',
        country: '',
        gender: 'male',
        books: [],
      })

      const validFields = reactive({
        firstName: false,
        lastName: false,
        country: false,
        birthday: false
      })

      const onSubmit = () => {
        store.dispatch('authors/create', author)
        router.push({name: 'Authors'})
      }

      const validateForm = (name, isValid) => {
        validFields[name] = isValid
      }

      const valid = computed(() => {
        return Object.keys(validFields).every(key => validFields[key] === true)
      })

      return {
        author,
        onSubmit,
        validateForm,
        valid
      }
    },
    components: {
      InputText,
    },
  };
</script>

<style scoped lang="scss">
    span {
        font-size: 1.2rem;
    }

    .row {
        display: flex;

        & * + * {
            margin-left: 10px;
        }

        & > * {
            width: 100%;
        }
    }

    #birthday {
        font-size: 1.5rem;
        padding: 10px;
    }

    .birthday {
        & > * {
            display: block;
            margin-left: 0;
        }

        & > * + * {
            margin-top: 10px;
        }

    }

    .book-select {
        width: 100%;
        padding: 10px 0;

        & > * {
            display: block;
        }

        & > * + * {
            margin-top: 10px;
        }

        &__item {
            font-size: 1.2rem;
            padding: 5px 10px;
        }
    }

    .gender-radio {
        & > * {
            display: block;
            margin-left: 0;
        }

        & > * + * {
            margin-top: 10px;
        }
    }
</style>
