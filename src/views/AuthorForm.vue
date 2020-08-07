<template>
    <div>
        <h1>New author</h1>
        <form novalidate @submit.prevent="onSubmit">
            <InputText
                    v-model="author.firstName"
                    name="firstName"
                    :validators="[validators.notEmpty()]"
                    @is-valid="validateForm"
            />
            <InputText
                    v-model="author.lastName"
                    name="lastName"
                    :validators="[validators.notEmpty()]"
                    @is-valid="validateForm"
            />
            <div class="row">
                <InputText
                        type="date"
                        v-model="dateStr"
                        name="birthday"
                        :validators="[validators.notEmpty()]"
                        @is-valid="validateForm"
                />
<!--                <div class="birthday">-->
<!--                    <label for="birthday">-->
<!--                        <span>Birthday:</span>-->
<!--                    </label>-->
<!--                    <input-->
<!--                            class="birthday__picker"-->
<!--                            id="birthday"-->
<!--                            type="date"-->
<!--                            v-model="dateStr"-->
<!--                    />-->
<!--                </div>-->
                <InputText
                        v-model="author.country"
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
                <select id="books" v-model="author.booksISBNs" multiple>
                    <option class="book-select__item" v-for="book in books"
                            :value="book.isbn"
                            :key="book.isbn">
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
  import {computed, reactive, ref} from '@vue/composition-api'
  import {isNumber, len, minLen, notEmpty} from "../utils/validators";

  export default {
    name: 'BookForm',
    props: {
      books: Array,
    },
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
    setup(props, {emit, parent}) {
      const router = parent.$router

      const dateStr = ref('')

      const author = reactive({
        firstName: '',
        lastName: '',
        birthday: new Date(),
        country: '',
        gender: 'male',
        booksISBNs: [],
      })

      const validFields = reactive({
        firstName: false,
        lastName: false,
        country: false,
        birthday: false
      })

      const onSubmit = () => {
        author.birthday = new Date(dateStr.value)
        emit('add-author', author)
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
        dateStr,
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

    /*input, select {*/
    /*    padding: 0.75em 0.5em;*/
    /*    font-size: 100%;*/
    /*    border: 1px solid #ccc;*/
    /*    width: 100%;*/
    /*}*/
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
