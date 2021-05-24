<template>
  <div class="home">
    <Navbar />
    <header>
      <div class="row">
        <div class="Wrapper col">
          <div class="Content">
            <h2>Welcome<br />to the<br />Beta Store</h2>
            <h3>Sell And Buy the stuff you want</h3>
            <router-link to="/store">
              <button>
                Shop Now
                <img src="../assets/right-chevron.svg" alt="" />
              </button>
            </router-link>
          </div>
        </div>
        <div class="col imgContainer">
          <img
            class="roboPic"
            src="../assets/undraw_add_to_cart_vkjp.svg"
            alt="robot"
          />
        </div>
      </div>
    </header>
    <div class="topProducts">
      <h2>Our Top Products</h2>
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
      <div class="btn" @click="$router.push('store')">Browse All Products</div>
    </div>
    <div class="notification" ref="notification">Added To Cart</div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import productCard from "../components/ProductCard";
export default {
  name: "home",
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
      return this.$store.state.products.slice(0, 3);
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
<style scoped lang="scss">
header {
  position: relative;
  min-height: calc(100vh);
  background-color: #dedde3;
  .row {
    display: flex;
    overflow: hidden;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    min-height: calc(100vh);

    .col {
      margin: auto;
    }
    .Wrapper {
      width: 80%;
      z-index: 1;
      .Content {
        margin: auto;
        text-align: left;
        padding: 50px;
        width: 65%;
        padding-bottom: 150px;
        h2 {
          font-size: 32px;
          margin-bottom: -5px;
          width: 50%;
          line-height: 45px;
        }
        h3 {
          font-weight: 500;
          margin-bottom: 25px;
        }
        button {
          background: #a8a8a8;
          border: 1px solid #232323;
          font-weight: 600;
          padding: 12px 20px;
          border-radius: 25px;
          text-align: left;
          width: 160px;
          cursor: pointer;
          img {
            width: 25px;
            position: absolute;
            transform: translate(10px, -3px);
            pointer-events: none;
          }
          a {
            text-decoration: none;
            color: #000;
          }
        }
      }
    }
    .imgContainer {
      width: 35%;
      background: #6c63ff;
      height: 100vh;
      position: relative;
      z-index: 0;
      img {
        width: 500px;
        margin: auto;
        position: absolute;
        left: 0%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.topProducts {
  padding: 50px;
  .row {
    width: 80%;
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .btn {
    background: #cc4545;
    color: #fff;
    padding: 12px 20px;
    border: 0;
    border-radius: 3px;
    width: fit-content;
    margin: 10px auto;
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

@media screen and (max-width: 1000px) {
  .row {
    width: 100% !important;
    .Wrapper .Content {
      width: 100% !important;
    }
  }
}

@media screen and (max-width: 750px) {
  header .row .Wrapper .Content {
    padding: 50px 0 50px 50px;
    padding-bottom: 150px;
  }
  header .row .imgContainer img {
    width: 400px;
    transform: translate(-50%, 0%);
  }
}

@media screen and (max-width: 450px) {
  header .row .Wrapper .Content {
    h2 {
      font-size: 28px;
    }
    h3 {
      font-size: 16px;
    }
  }
}
</style>
