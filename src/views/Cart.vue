<template>
  <div class="cart">
    <Navbar />
    <h2>Shopping Cart</h2>
    <label for="currency">Select currency: </label>
    <select name="currency" @change="chngCurrency" id="currency">
      <option value="EGP">EGP</option>
      <option value="USD">USD</option>
    </select>
    <div class="cartWrapper">
      <div class="row">
        <h3 v-if="cart.length > 0">
          Cart<span> ({{ cart.length }} items) </span>
        </h3>
        <h3 v-else>Cart is empty</h3>
        <div class="item-wrapper" v-for="item in cart" :key="item.id">
          <div class="inner-wrapper">
            <div class="details">
              <img
                :src="item.product.pic"
                :alt="item.product.productName"
                class="pic"
              />
              <div class="group">
                <h5 class="name">
                  <router-link
                    :to="{ name: 'product', params: { id: item.product.id } }"
                    >{{ item.product.productName }}</router-link
                  >
                </h5>
                <p class="description">
                  {{ item.product.brand + " - " + item.product.description }}
                </p>
              </div>
            </div>
            <div class="amount">
              <button @click="decrement(item)" class="btn">-</button>
              <input
                type="text"
                class="count"
                :value="item.quantity"
                disabled
              />
              <button @click="increment($event, item)" class="btn">+</button>
            </div>
          </div>
          <div class="inner-wrapper">
            <h6 class="price" v-if="currency === 'USD'">
              <span>{{
                parseInt(item.product.price * 0.064) * item.quantity
              }}</span>
              {{ " USD" }}
              <div v-if="item.quantity > 1">
                <div class="priceEach">
                  ({{ parseInt(item.product.price * 0.064) + " Each" }})
                </div>
              </div>
            </h6>
            <h6 class="price" v-else>
              <span>{{ item.product.price * item.quantity }}</span>
              {{ " EGP" }}
              <div v-if="item.quantity > 1">
                <div class="priceEach">
                  ({{ item.product.price + " Each" }})
                </div>
              </div>
            </h6>
            <div class="operations">
              <button class="options" @click="remove(item)">
                <img src="../assets/garbage-can.svg" alt="Del" />Remove from
                cart
              </button>
            </div>
          </div>
        </div>
        <div class="delAll" v-if="cart.length != 0">
          <button class="btn" @click="clearCart">Clear Cart</button>
        </div>
      </div>
      <div class="sidePanel" v-if="cart.length > 0">
        <h3>Checkout</h3>
        <div class="line" v-if="currency === 'USD'">
          <h4>Sub Total</h4>
          <span>{{ parseInt(total * 0.064) }} USD</span>
        </div>
        <div class="line" v-else>
          <h4>Sub Total</h4>
          <span>{{ total }} EGP</span>
        </div>
        <div class="line shipping" v-if="currency === 'USD'">
          <h4>Shipping</h4>
          <span>{{ parseInt(shipping * 0.064) }} USD</span>
        </div>
        <div class="line shipping" v-else>
          <h4>Shipping</h4>
          <span>{{ shipping }} EGP</span>
        </div>
        <h3>Payment Method</h3>
        <div class="options">
          <div class="option">
            <input
              type="radio"
              name="payment"
              id="COD"
              @click="togglemv"
              checked
            />
            <label for="COD">Cash On Delivery</label>
          </div>
          <div class="option">
            <input type="radio" name="payment" @click="togglemv" id="vm" />
            <label for="vm">Visa - MasterCard</label>
          </div>
        </div>
        <div class="vmPayment" v-if="mv">
          <form>
            <label for="nameOnCard">Name On Card</label
            ><input type="text" name="nameOnCard" />
            <label for="cardNumber">Card Number</label
            ><input type="text" maxlength="16" name="cardNumber" />
            <label for="expireDate">Expire Date</label>
            <select>
              <option value="expireDate">02 2021</option>
              <option value="expireDate">03 2021</option>
              <option value="expireDate">04 2021</option>
              <option value="expireDate">05 2021</option>
              <option value="expireDate">06 2021</option>
              <option value="expireDate">07 2021</option>
              <option value="expireDate">08 2021</option>
              <option value="expireDate">09 2021</option>
              <option value="expireDate">10 2021</option>
              <option value="expireDate">11 2021</option>
              <option value="expireDate">12 2021</option>
              <option value="expireDate">01 2022</option>
              <option value="expireDate">02 2022</option>
              <option value="expireDate">03 2022</option>
              <option value="expireDate">04 2022</option>
              <option value="expireDate">05 2022</option>
              <option value="expireDate">06 2022</option>
              <option value="expireDate">07 2022</option>
              <option value="expireDate">08 2022</option>
              <option value="expireDate">09 2022</option>
              <option value="expireDate">10 2022</option>
              <option value="expireDate">11 2022</option>
              <option value="expireDate">12 2022</option>
            </select>
            <label for="CCV">CCV</label
            ><input type="text" maxlength="3" name="CCV" />
          </form>
        </div>
        <div class="line total" v-if="currency === 'USD'">
          <h4>Total + Shipping <span>(including VAT)</span></h4>
          <span
            >{{
              parseInt(shipping * 0.064) + parseInt(total * 0.064)
            }}
            USD</span
          >
        </div>
        <div class="line total" v-else>
          <h4>Total + Shipping <span>(including VAT)</span></h4>
          <span>{{ shipping + total }} EGP</span>
        </div>
        <button @click="order">PLace Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import { db } from "../firebase";
export default {
  name: "Store",
  data() {
    return {
      shipping: 50,
      mv: false,
      cod: true
    };
  },
  components: {
    Navbar
  },
  methods: {
    increment(e, item) {
      if (
        item.product.stock <= parseInt(e.target.parentElement.children[1].value)
      ) {
        return;
      } else {
        this.$store.state.cart.forEach(cartItem => {
          if (cartItem.product.id === item.product.id) {
            this.$store.dispatch("incrementItem", item);
          }
        });
      }
    },
    decrement(item) {
      this.$store.state.cart.forEach(cartItem => {
        if (cartItem.product.id === item.product.id) {
          this.$store.dispatch("decrementItem", item);
        }
      });
    },
    remove(item) {
      this.$store.state.cart.forEach(cartItem => {
        if (cartItem.product.id === item.product.id) {
          this.$store.dispatch("removeItem", item);
        }
      });
    },
    clearCart() {
      this.$store.dispatch("clearCart");
    },
    togglemv(e) {
      if (e.target.id == "vm") {
        this.mv = true;
        this.cod = false;
      } else {
        this.mv = false;
        this.cod = true;
      }
    },
    order() {
      if (this.user === null) {
        alert("You Need To Register First");
      } else if (this.user.userType === "seller") {
        alert("Register As Buyer To Order Products");
      } else if (this.mv === true) {
        alert("Wrong Mastercard/ Visa Information");
      } else {
        let myCart = this.$store.state.cart;
        document.querySelector(".loader").style.display = "flex";
        for (let index = 0; index < myCart.length; index++) {
          let docRef = db.collection("orders").doc();
          docRef
            .set({
              orderedBy: this.$store.state.user.email,
              productName: myCart[index].product.productName,
              productID: myCart[index].product.id,
              brand: myCart[index].product.brand,
              pic: myCart[index].product.pic,
              price: myCart[index].product.price,
              orderedOn: new Date().toLocaleString(),
              remainingDays: new Date().getDate() + 3,
              deliveryMethod: "Cash On Delivery",
              quantity: myCart[index].quantity,
              total: myCart[index].product.price * myCart[index].quantity + 50,
              id: null
            })
            .then(() => {
              db.collection("orders")
                .doc(docRef.id)
                .update({ id: docRef.id })
                .then(() => {
                  alert("Ordered Successfully");
                  db.collection("items")
                    .doc(myCart[index].product.id)
                    .update({
                      stock:
                        myCart[index].product.stock - myCart[index].quantity
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  document.querySelector(".loader").style.display = "none";
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
              document.querySelector(".loader").style.display = "none";
            });
          this.$store.dispatch("clearCart");
          this.$store.dispatch("getProducts");
        }
      }
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
    cart() {
      if (this.$store.state.cart.length != 0) {
        localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
      }
      return this.$store.state.cart;
    },
    total() {
      let totalMoney = 0;
      this.cart.forEach(item => {
        totalMoney += item.product.price * item.quantity;
      });
      return totalMoney;
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    currency() {
      return this.$store.state.currency;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$store.dispatch("updateCart");
    this.$store.dispatch("updateUser");
    this.$store.dispatch("getProducts");
    document.getElementById("currency").value = localStorage.getItem(
      "currency"
    );
    this.$store.dispatch("getCurrency");
  }
};
</script>

<style lang="scss" scoped>
.cart {
  padding: 100px 0;
  min-height: 100vh;
}
.cartWrapper {
  width: 80%;
  margin: auto;
  display: flex;
  .row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 8px 0px #33333357;
    margin: 10px 0px 10px 0;
    border-radius: 5px;
    padding: 15px;
    width: -webkit-fill-available;
    height: fit-content;
    min-height: 200px;

    h3 {
      text-align: left;
      span {
        font-size: 12px;
        color: #b7a4a4;
        font-weight: 500;
        margin-left: 5px;
      }
    }
    .item-wrapper:nth-last-of-type(2) {
      border-bottom: 0px solid #e4e4e4;
    }
    .item-wrapper {
      border-bottom: 0.5px solid #e4e4e4;
      width: 260px;
      padding: 8px 0;
      position: relative;
      margin-bottom: 9px;
      overflow: hidden;
      width: 250px;
      margin: 30px;
      width: 90%;
      margin: 8px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      transition: 0.3s opacity ease-in-out;
      .inner-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .details {
          display: flex;
          justify-content: center;
          align-items: center;

          .pic {
            height: 60px;
            margin: 0 20px;
          }
          .name {
            padding: 5px 0 0;
            font-weight: 600;
            font-size: 18px;
            margin: 10px;
            text-align: start;
          }

          .description {
            color: #6b6b6b;
            margin: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-align: start;
            -webkit-line-clamp: 2;
          }
        }
        .amount {
          display: flex;
          align-self: flex-end;
          margin: 0 0 15px;
          .btn {
            background-color: #6c757d;
            color: #fff;
            transition: 0.2s all ease-in-out;
            border: 0;
            outline: 0;
            padding: 8px 10px 8px;
            margin-bottom: 10px;
            cursor: pointer;
            width: 34px;
            height: 34px;
            &:hover {
              background-color: #515961;
            }
            &:active {
              background-color: #707c88;
            }
          }
          .btn:nth-of-type(2) {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .btn:nth-of-type(1) {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          input {
            width: 30px;
            height: 34px;
            text-align: center;
            padding: 0;
          }
        }
        .options {
          background: transparent;
          border: 0;
          padding: 8px 14px;
          font-size: 14px;
          cursor: pointer;
          color: #6c757d;
          display: inline-flex;
          align-items: center;
          margin: 0 5px;
          border-radius: 3px;
          img {
            width: 15px;
            transform: translate(-5px, -1px);
          }
          &:hover {
            background-color: #e4e4e4;
          }
        }
        .price {
          font-size: 12px;
          margin: 20px 16px;
          display: inline-flex;
          align-items: baseline;
          span {
            font-weight: 700;
            color: #6c757d;
            font-size: 20px;
            margin-right: 2px;
          }
          div {
            white-space: nowrap;
            color: #b7a4a4;
            font-weight: 500;
            margin-left: 5px;
          }
        }
        .operations {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }
      }
    }
    .delAll {
      width: 90%;
      button {
        background: #fff;
        color: #cc4545;
        padding: 8px 20px;
        border: 1px solid #cc4545;
        border-radius: 3px;
        transition: 0.2s all ease-in-out;
        margin-top: 10px;
        margin-bottom: 5px;
        margin-left: auto;
        display: block;
        &:hover {
          background: #e4e4e4;
        }
        &:active {
          background: #ccc;
        }
      }
    }
  }
  .sidePanel {
    width: 30%;
    height: fit-content;
    box-shadow: 0px 1px 6px 0px #3333334f;
    padding: 15px;
    margin-top: 10px;
    border-radius: 5px;
    margin: 10px;
    .line {
      width: 95%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin: 8px auto;
      padding: 2px;
      h4 {
        margin: 0;
        text-align: left;
        width: 50%;
        font-weight: 600;
      }
    }
    .options {
      text-align: left;
      padding-left: 5px;
      .option {
        padding: 4px;
        label {
          margin-left: 5px;
        }
      }
    }
    form {
      margin: 30px 0;
      text-align: left;
      label {
        font-size: 12px;
        display: inline-block;
        margin: 6px;
        margin-top: 10px;
      }
      input,
      select {
        display: block;
        margin: 5px;
        padding: 5px 10px;
        border: 0;
        border-bottom: 1px solid #cc2525;
        background: transparent;
        width: 80%;
      }
    }
    .btnContainer {
      display: flex;
      justify-content: space-between;
    }
    .btn {
      background: #cc4545;
      color: #fff;
      padding: 10px 30px;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
      display: inline-block;
      transition: 0.2s all ease-in-out;
      font-size: 14px;
      margin: 5px;
      &:hover {
        background: #a53939;
      }
      &:active {
        background: #e44f4f;
      }
    }
    .shipping {
      padding-bottom: 8px;
    }
    .total {
      border-top: 0.5px solid #e4e4e4;
      padding: 12px 0px;
      span {
        font-weight: 600;
        color: #cc4545;
      }
    }
    button {
      background: #cc4545;
      color: #fff;
      padding: 10px;
      border: 0;
      border-radius: 3px;
      width: 85%;
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
  .cartWrapper {
    width: 95% !important;
  }
}

@media screen and (max-width: 850px) {
  .cartWrapper {
    flex-wrap: wrap;
    .row {
      margin: 10px 10px 10px 10px;
    }
    .sidePanel {
      width: 100%;
    }
  }
}

@media screen and (max-width: 500px) {
  .inner-wrapper {
    flex-wrap: wrap;
    .amount {
      margin: 15px auto 0 !important;
    }
    .price {
      margin: 15px auto 0 !important;
    }
    .operations {
      margin: 15px auto 0 !important;
    }
  }
}
</style>
