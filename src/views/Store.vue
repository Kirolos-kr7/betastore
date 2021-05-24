<template>
  <div class="Store">
    <Navbar />
    <h2>All Products</h2>
    <label for="currency">Select currency: </label>
    <select name="currency" @change="chngCurrency" id="currency">
      <option value="EGP">EGP</option>
      <option value="USD">USD</option>
    </select>
    <div class="row">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div class="notification">Added To Cart</div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import productCard from "../components/ProductCard";

export default {
  name: "Store",
  components: {
    Navbar,
    productCard
  },
  methods: {
    chngCurrency() {
      localStorage.setItem(
        "currency",
        document.getElementById("currency").value
      );
      this.$store.dispatch("getCurrency");
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$store.dispatch("getProducts");
    document.getElementById("currency").value = localStorage.getItem(
      "currency"
    );
    this.$store.dispatch("getCurrency");
  }
};
</script>

<style lang="scss" scoped>
.Store {
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

@media screen and (max-width: 1000px) {
  .row {
    width: 100% !important;
  }
}
</style>
