<template>
    <div>
        <label :for="name"> {{label}} </label>
        <input :class="{error: !valid}"
               :type="type"
               :id="name"
               :name="name"
               v-model="input"
               @blur="onValidate">
        <ErrorSpan v-if="!valid" :error="error"/>
    </div>
</template>

<script>
  import {computed, ref} from '@vue/composition-api'
  import {capitalize} from "@/utils/strings";
  import inputValidator from "@/traits/inputValidator";
  import ErrorSpan from "./ErrorSpan";

  export default {
    name: "InputText",
    components: {
      ErrorSpan
    },
    props: {
      value: [String, Number, Array],
      type: {
        type: String,
        default: 'text'
      },
      name: {
        type: String,
        default: 'define_me!'
      },
      validators: {
        type: Array,
        default: () => []
      },
    },
    setup(props, {emit}) {
      const valid = ref(true)
      const label = computed(() => capitalize(props.name))

      const {input, errors} = inputValidator(
        props.value,
        props.validators,
        value => emit('input', value)
      )

      const onValidate = () => {
        valid.value = errors.value.length === 0
        emit('is-valid', props.name, valid.value)
      }

      const error = computed(() => {
        if (errors.value.length > 0) {
          return errors.value[0]
        }
      })

      return {
        label,
        input,
        error,
        valid,
        onValidate
      }
    }
  }
</script>

<style scoped lang="scss">
    div {
        font-size: 1.2rem;
        position: relative;
        margin-bottom: 20px;
    }

    input {
        font-size: 1.5rem;
        width: 100%;
        padding: 10px 20px;
        outline: none;
        margin-top: 10px;

        border: 1px solid #ccc;
        border-radius: 4px;

        &:focus {
            border: 2px solid #42b983;
        }

        &.error {
            border: 2px solid red;
        }
    }
</style>
