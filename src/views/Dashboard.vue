<template>
  <div class="Dashboard" v-if="user !== null">
    <div class="Dashboard" v-if="Object.keys(user).length > 0">
      <Navbar />
      <h2>Dashboard</h2>
      <div class="dbContainer profile">
        <h3>Profile</h3>
        <div class="line">
          <h4>Username:</h4>
          {{ user.userName.charAt(0).toUpperCase() + user.userName.slice(1) }}
        </div>
        <div class="line">
          <h4>E-mail:</h4>
          {{ user.email }}
        </div>
        <div class="line">
          <h4>Type:</h4>
          {{ user.userType.charAt(0).toUpperCase() + user.userType.slice(1) }}
        </div>
      </div>
      <div class="dbContainer orders" v-if="user.userType === 'buyer'">
        <h3>Orders</h3>
        <label for="currency">Select currency: </label>
        <select name="currency" @change="chngCurrency" id="currency">
          <option value="EGP">EGP</option>
          <option value="USD">USD</option>
        </select>
        <div class="ordersContainer">
          <div class="item-wrapper" v-for="item in userOrders" :key="item.id">
            <div class="line">
              <h4>Product:</h4>
              {{ item.productName }}
            </div>
            <div class="line">
              <h4>Brand:</h4>
              {{ item.brand }}
            </div>
            <div class="line">
              <h4>Quantity:</h4>
              {{ item.quantity }}
            </div>
            <div class="line" v-if="currency === 'USD'">
              <h4>Total:</h4>
              {{ parseInt(item.total * 0.064) + " USD" }}
            </div>
            <div class="line" v-else>
              <h4>Total:</h4>
              {{ item.total + " EGP" }}
            </div>
            <div class="line">
              <h4>Delivery:</h4>
              {{ item.deliveryMethod }}
            </div>
            <div
              class="line"
              v-if="item.remainingDays - new Date().getDate() > 0"
            >
              <h4>Days Till Delivery:</h4>
              {{ item.remainingDays - new Date().getDate() }}
            </div>
            <div class="line" v-else>
              <h4>Days Till Delivery:</h4>
              {{ "Dilevered" }}
            </div>
            <div class="line">
              <h4>Ordered On:</h4>
              {{ item.orderedOn }}
            </div>
            <div
              class="btn"
              @click="deleteOrder(item.id, item.productID, item.quantity)"
            >
              Cancel Order
            </div>
          </div>
        </div>
      </div>
      <div class="dbContainer products" v-if="user.userType === 'seller'">
        <h3>Products</h3>
        <label for="currency">Select currency: </label>
        <select name="currency" @change="chngCurrency" id="currency">
          <option value="EGP">EGP</option>
          <option value="USD">USD</option>
        </select>
        <PostNew />
        <div class="ordersContainer">
          <div
            class="item-wrapper"
            v-for="item in sellerProducts"
            :key="item.id"
          >
            <div class="line">
              <h4>Product:</h4>
              {{ item.productName }}
            </div>
            <div class="line">
              <h4>Brand:</h4>
              {{ item.brand }}
            </div>
            <div class="line">
              <h4>Posted On:</h4>
              {{ item.dateTime }}
            </div>
            <div class="line">
              <h4>Stock:</h4>
              {{ item.stock }}
            </div>
            <div class="line" v-if="currency === 'USD'">
              <h4>Price:</h4>
              {{ parseInt(item.price * 0.064) }}
            </div>
            <div class="line" v-else>
              <h4>Price:</h4>
              {{ item.price }}
            </div>
            <div class="btn" @click="removeProduct(item.id, item.pic)">
              Remove Product
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import PostNew from "../components/PostNew";
import { db } from "../firebase";
export default {
  name: "Dashboard",
  components: {
    Navbar,
    PostNew,
  },
  methods: {
    deleteOrder(id, productID, quantity) {
      document.querySelector(".loader").style.display = "flex";
      db.collection("orders")
        .doc(id)
        .delete()
        .then(() => {
          this.$store.dispatch("getUserOrders");
          let productFromID = this.$store.state.products.find(
            (product) => product.id == productID
          );
          db.collection("items")
            .doc(productID)
            .update({ stock: quantity + productFromID.stock })
            .then(() => {
              document.querySelector(".loader").style.display = "none";
              alert("Deleted Successfully");
              this.$store.dispatch("getProducts");
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => {
          document.querySelector(".loader").style.display = "none";
          alert(err);
        });
    },
    removeProduct(productID, picURL) {
      this.$store.dispatch("removeUserProduct", { productID, picURL });
    },
    chngCurrency() {
      localStorage.setItem(
        "currency",
        document.getElementById("currency").value
      );
      this.$store.dispatch("getCurrency");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    sellerProducts() {
      return this.$store.state.userProducts;
    },
    userOrders() {
      return this.$store.state.userOrders;
    },
    currency() {
      return this.$store.state.currency;
    },
  },
  created() {
    this.$store.dispatch("updateUser");
    this.$store.dispatch("getUserProducts");
    this.$store.dispatch("getUserOrders");
  },
  mounted() {
    window.scrollTo(0, 0);
    document.getElementById("currency").value = localStorage.getItem(
      "currency"
    );
    this.$store.dispatch("getCurrency");
  },
};
</script>

<style lang="scss" scoped>
.Dashboard {
  padding: 100px 0;
  min-height: 100vh;
}
.dbContainer {
  width: 80%;
  margin: 35px auto;
  box-shadow: 0px 3px 8px 0px #33333357;
  padding: 20px;
  background-color: #fcf7f7;
  border-radius: 5px;
  text-align: left;
  h3 {
    text-align: center;
  }
  h4 {
    display: inline-block;
    margin: 0;
    padding: 5px;
  }
  .ordersContainer {
    display: flex;
    flex-wrap: wrap;
  }
  .item-wrapper {
    padding: 15px;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 10px;
    margin: 20px auto;
    .btn {
      background: #cc4545;
      color: #fff;
      padding: 10px 30px;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
      display: block;
      transition: 0.2s all ease-in-out;
      font-size: 14px;
      margin: 5px;
      text-align: center;
      &:hover {
        background: #a53939;
      }
      &:active {
        background: #e44f4f;
      }
    }
  }
}
</style>
