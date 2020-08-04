import {ref, watch} from "@vue/composition-api";

export default function inputValidator(inVal, validators, onValidate) {
  const input = ref(inVal)
  const errors = ref([])

  watch(input, value => {
    errors.value = validators
      .map(fn => fn(value))
      .filter(v => v !== null)
    onValidate(value)
  })

  return {
    input,
    errors
  }
}
