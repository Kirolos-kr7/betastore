<template>
  <div class="productCard">
    <div class="item-wrapper">
      <img :src="product.pic" :alt="product.productName" class="pic" />
      <h5 class="name">
        <router-link :to="{ name: 'product', params: { id: product.id } }">{{
          product.productName
        }}</router-link>
      </h5>
      <p class="description">
        {{ product.brand || brand }} {{ " - " + product.description }}
      </p>
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
</template>

<script>
export default {
  name: "productCard",
  props: {
    product: {}
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addProductToCart", {
        product: this.product,
        quantity: 1
      });
      let notification = document.querySelector(".notification");
      notification.classList.add("runNotification");
      setTimeout(() => {
        notification.classList.remove("runNotification");
      }, 1000);
    }
  },
  computed: {
    currency() {
      return this.$store.state.currency;
    }
  }
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  border: 1px solid #e4e4e4;
  width: 260px;
  padding: 10px 0;
  position: relative;
  margin-bottom: 9px;
  border-radius: 5px;
  overflow: hidden;
  width: 250px;
  margin: 30px;
  .pic {
    height: 225px;
  }
  .name {
    padding: 5px 0 0;
    font-weight: 600;
    font-size: 18px;
    margin: 10px;
  }
  .description {
    color: #6b6b6b;
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .price {
    background: #6c757d;
    display: block;
    padding: 3px;
    color: #fff;
    font-size: 16px;
    margin: 20px 0;
    span {
      font-weight: 700;
      color: #000000;
      font-size: 26px;
    }
  }
  .btn {
    transition: 0.2s all ease-in-out;
    border: 0;
    outline: 0;
    position: relative;
    padding: 10px 15px 8px;
    margin-bottom: 10px;
    cursor: pointer;
    &::after {
      content: "";
      width: 100%;
      height: 0px;
      position: absolute;
      background-color: #6c757d;
      bottom: 0px;
      left: 0;
      transition: 0.2s all ease-in-out;
      z-index: -1;
    }

    &:hover {
      background-color: transparent;
      color: #fff;
      &::after {
        height: 100% !important;
      }
    }
  }
}
</style>
