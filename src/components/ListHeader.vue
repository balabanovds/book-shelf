<template>
    <div class="list-header">
        <input class="search" type="text"
               placeholder="search"
               v-model="search"
               @keyup="setSearch(search)"
        />
        <router-link class="add-new" :to="toUrl">{{buttonText}}</router-link>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
  export default {
    props: {
      buttonText: {
        type: String,
        required: true,
      },
      toUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        search: "",
      };
    },
    methods: {
      ...mapMutations(['setSearch']),
    }
  };
</script>

<style scoped lang="scss">
    .list-header {
        display: flex;

        & > * {
            flex-grow: 1;
        }

        & input {
            display: block;
            font-size: 1.3rem;
            padding: 10px;
            margin-right: 1rem;
        }

        & a {
            display: inline-block;
            padding: 10px 32px;
            background-color: green;
            text-align: center;
            text-decoration: none;
            font-size: 1.5rem;
            color: white;

            &:hover {
                cursor: pointer;
                background-color: #468f59;
            }
        }
    }
</style>
