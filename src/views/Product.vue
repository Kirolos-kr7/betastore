<template>
  <div class="product">
    <Navbar />
    <label for="currency">Select currency: </label>
    <select name="currency" @change="chngCurrency" id="currency">
      <option value="EGP">EGP</option>
      <option value="USD">USD</option>
    </select>
    <div class="prod" v-if="product">
      <img :src="product.pic" alt class="pic" />
      <div class="wrapper">
        <h4 class="name">{{ product.productName }}</h4>
        <h5>{{ product.brand }}</h5>
        <p class="description">{{ product.description }}</p>
        <h6 class="price" v-if="currency === 'USD'">
          <span>{{ parseInt(product.price * 0.064) }}</span>
          {{ " USD" }}
        </h6>
        <h6 class="price" v-else>
          <span>{{ product.price }}</span>
          {{ " EGP" }}
        </h6>
        <button class="btn" @click="addToCart">Add To cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Product",
  components: {
    Navbar
  },
  props: ["id"],
  methods: {
    addToCart() {
      this.$store.dispatch("addProductToCart", {
        product: this.product,
        quantity: 1
      });
    },
    chngCurrency() {
      localStorage.setItem(
        "currency",
        document.getElementById("currency").value
      );
      this.$store.dispatch("getCurrency");
    }
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    currency() {
      return this.$store.state.currency;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$store.dispatch("getProduct", this.id);
    this.$store.dispatch("getProducts");
    document.getElementById("currency").value = localStorage.getItem(
      "currency"
    );
    this.$store.dispatch("getCurrency");
  }
};
</script>

<style lang="scss" scoped>
.product {
  min-height: 100vh;
  padding: 100px 0 0;
}
.prod {
  display: flex;
  align-items: center;
  width: 80%;
  margin: 30px auto;
  img {
    height: 500px;
    width: 500px;
  }
  .wrapper {
    padding: 30px 30px 30px 50px;
    text-align: left;
    h4 {
      font-size: 30px;
      margin-top: 5px;
      margin-bottom: 10px;
    }
    h5 {
      font-size: 26px;
      font-weight: 500;
      margin: 0;
    }
    h6 {
      font-size: 22px;
      margin: 15px 0;
    }
    button {
      background: #cc4545;
      color: #fff;
      padding: 10px 30px;
      border: 0;
      border-radius: 3px;
      margin: 10px 0;
      cursor: pointer;
      transition: 0.2s all ease-in-out;
      &:hover {
        background: #a53939;
      }
      &:active {
        background: #e44f4f;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .prod {
    width: 100%;
  }
}

@media screen and (max-width: 750px) {
  .prod {
    flex-wrap: wrap;
  }
  .prod img {
    width: 50%;
    height: auto;
    margin: auto;
  }
}
</style>
