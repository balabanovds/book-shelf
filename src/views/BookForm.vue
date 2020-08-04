<template>
    <div>
        <h1>New book</h1>
        <form novalidate @submit.prevent="onSubmit">
            <InputText
                    v-model="title"
                    name="title"
                    :validators="[validators.notEmpty()]"
            />
            <InputText
                    v-model="isbn"
                    name="ISBN"
                    :validators="[
                      validators.notEmpty(),
                      validators.len(13),
                      validators.isNumber()
                      ]"
            />
            <button type="submit">Add</button>
        </form>
    </div>

</template>

<script>
  import InputText from "../components/InputText.vue";
  import {ref} from '@vue/composition-api'
  import {isNumber, len, minLen, notEmpty} from "../utils/validators";

  export default {
    name: 'BookForm',
    props: {
      authors: Array
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
    setup() {
      const title = ref('')
      const isbn = ref('')
      const onSubmit = () => {
        console.log('submit', title.value, isbn.value)
      }

      return {
        title,
        isbn,
        onSubmit
      }
    },
    components: {InputText},
  };
</script>

<style>
</style>
