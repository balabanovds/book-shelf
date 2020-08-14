<template>
  <div>
    <label :for="name"> {{ label }} </label>
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
import ErrorSpan from "./ErrorSpan";
import {capitalize} from '@/utils/strings';

export default {
  name: "InputText",
  components: {
    ErrorSpan
  },
  data() {
    return {
      input: '',
      errors: [],
      valid: true
    };
  },
  props: {
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
  computed: {
    error() {
      if (this.errors.length > 0)
        return this.errors[0];
      return '';
    },
    label() {
      return capitalize(this.name);
    }
  },
  methods: {
    onValidate() {
      this.errors = this.validators
          .map(fn => fn(this.input))
          .filter(err => err !== null);
      if (this.errors.length > 0) {
        this.valid = false;
      } else {
        this.valid = true;
        this.$emit('input', this.input);
      }
    }
  },
  watch: {
    errors: function () {
      this.$emit('is-valid', this.name, this.valid);
    }
  }
};
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
