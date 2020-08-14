<template>
  <div id="app">
    <div id="nav">
      <router-link to="/books">Books</router-link>
      <router-link to="/authors">Authors</router-link>
      <CurrencySwitch class="currency-switch"/>
    </div>
    <div class="container">
      <router-view/>
    </div>
    <div class="footer">
      <a href="https://www.cbr-xml-daily.ru/">Курсы валют, API</a>
    </div>
  </div>
</template>

<script>
import CurrencySwitch from '@/components/CurrencySwitch';

export default {
  created() {
    this.$store.dispatch('authors/fetchAll');
    this.$store.dispatch('books/fetchAll');
  },
  components: {
    CurrencySwitch
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.container {
  width: 75vw;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav {
  position: relative;
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  list-style-position: outside;

  & > * {
    margin-left: 15px;
  }
}

.currency-switch {
  margin: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.btn {
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

  &.disabled {
    background-color: darkgray;
  }
}

.footer {
  text-align: center;
  font-size: 0.8rem;

  & a {
    text-decoration: none;
    color: #2c3e50;
  }
}

</style>
