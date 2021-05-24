<template>
  <div class="search">
    <Navbar />
    <h2 v-if="search.length > 0">Results for "{{ searchValue }}"</h2>
    <h2 v-else>No Results</h2>
    <div class="row">
      <product-card
        v-for="product in search"
        :key="product.item.id"
        :product="product.item"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import productCard from "../components/ProductCard";

export default {
  name: "Search",
  components: {
    Navbar,
    productCard
  },
  methods: {},
  created() {},
  computed: {
    search() {
      return this.$store.state.search;
    },
    searchValue() {
      return this.$store.state.searchValue;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$store.dispatch("getProducts");
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 100px 0;
  min-height: 100vh;
}
.row {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}
</style>
