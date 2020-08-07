<template>
    <div>
        <div class="err">
            {{error}}
        </div>
    </div>
</template>

<script>
  export default {
    name: "ErrorSpan",
    props: {
      error: String
    }
  }
</script>

<style scoped lang="scss">
    .err {
        font-size: 0.8rem;
        color: red;
        padding-top: 5px;

        &:last-child {
            padding-bottom: 5px;
        }
    }
</style>
