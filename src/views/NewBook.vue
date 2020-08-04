<template>
    <div>
        <h1>New book</h1>
        <form novalidate @submit.prevent="onSubmit">
            <label>
                Title
                <input type="text" v-model="title">
            </label>
        </form>
    </div>

</template>

<script>
  export default {
    props: {
      authors: Array
    },
    data() {
      return {
        title: ''
      }
    }
  };
</script>

<style>
</style>
