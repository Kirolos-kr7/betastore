<template>
  <div class="Navigation">
    <div class="Wrapper">
      <nav>
        <div class="group">
          <h1>
            <router-link class="navTop" to="/">Beta Store</router-link>
          </h1>
        </div>
        <ul class="main" v-if="windowWidth > 750">
          <li>
            <router-link class="navTop" to="/">Home</router-link>
          </li>
          <li>
            <router-link class="navTop" to="/store">Store</router-link>
          </li>
          <li>
            <div class="searchBtn" @click="showSearchModal">
              <img src="../assets/loupe.svg" alt="" />
            </div>
          </li>
          <li>
            <router-link class="navTop cartBtn" to="/cart"
              ><img class="cart" src="../assets/cart.svg" alt="" />
              <div class="count" v-if="cartCount > 0">
                {{ cartCount }}
              </div></router-link
            >
          </li>
          <li v-if="$store.state.user == null">
            <div class="btn" @click="showRegModal">Registration</div>
          </li>
          <li v-else>
            <div
              class="btn"
              @click="switchDD"
              @keydown="focusOff"
              @blur="focusOff"
            >
              Profile
              <img
                src="../assets/chevron-arrow-down.svg"
                alt="chevron"
                class="chevron"
              />
              <div class="dropdown" v-if="dropdown">
                <ul class="dd">
                  <li @click="toDashboard">Dashboard</li>
                  <div class="divider"></div>
                  <li @click="logOut">Log Out</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <div class="menuBtn" @click="toggleMenu" v-else>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
    <div class="overflowMenu" v-if="menu">
      <ul>
        <li>
          <router-link class="navTop" @click="toggleMenu" to="/"
            >Home</router-link
          >
        </li>
        <li>
          <router-link class="navTop" @click="toggleMenu" to="/store"
            >Store</router-link
          >
        </li>
        <li>
          <div
            class="searchBtn"
            @click="
              showSearchModal();
              toggleMenu();
            "
          >
            Search
          </div>
        </li>
        <li>
          <router-link class="navTop cartBtn" to="/cart">Cart </router-link>
        </li>
        <li v-if="$store.state.user == null">
          <div
            class="btn"
            @click="
              showRegModal();
              toggleMenu();
            "
          >
            Registration
          </div>
        </li>
        <li v-else>
          <div
            class="btn"
            @click="switchDD"
            @keydown="focusOff"
            @blur="focusOff"
          >
            Profile
            <img
              src="../assets/chevron-arrow-down.svg"
              alt="chevron"
              class="chevron"
            />
            <div class="dropdown" v-if="dropdown">
              <ul class="dd">
                <li @click="toDashboard">Dashboard</li>
                <div class="divider"></div>
                <li @click="logOut">Log Out</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Registration />
    <SearchComponent />
  </div>
</template>

<script>
import Registration from "./Registration.vue";
import SearchComponent from "./SearchComponent";
import { auth } from "../firebase";
export default {
  name: "Navbar",
  data() {
    return {
      dropdown: false,
      menu: false,
    };
  },
  components: {
    SearchComponent,
    Registration,
  },
  methods: {
    logOut() {
      auth
        .signOut()
        .then(() => {
          localStorage.setItem("user", null);
          this.$store.state.user = null;
          this.$router.push("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
    switchDD() {
      this.dropdown = !this.dropdown;
    },
    focusOff() {
      this.dropdown = false;
    },
    toDashboard() {
      this.$router.push("/dashboard");
    },
    showSearchModal() {
      document.querySelector(".searchComp").style.display = "block";
    },
    showRegModal() {
      document.querySelector(".registration").style.display = "block";
    },
    toggleMenu() {
      this.menu = !this.menu;
    },
  },
  computed: {
    cartCount() {
      return this.$store.state.cart.length;
    },
    windowWidth() {
      return window.innerWidth;
    },
  },
  mounted() {
    this.$store.dispatch("updateUser");
    this.$store.dispatch("updateCart");
  },
};
</script>

<style scoped lang="scss">
.Wrapper {
  background: transparent;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9;
  nav {
    height: 70px;
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: row;
    width: 80%;
    margin: auto;
    .group {
      width: 30%;
      display: flex;
      h1 {
        display: inline-block;
        text-align: start;
        margin: auto 50px;
        font-size: 28px;
        white-space: nowrap;
        a {
          color: #2c3e50;
          text-decoration: none;

          // &:hover {
          //   color: rgb(231, 104, 104);
          //   transition: 0.2s all ease-in-out;
          //   text-decoration: none;
          // }
        }
      }
    }
    ul.main {
      list-style: none;
      width: 70%;
      text-align: end;
      margin: auto 50px auto 0;
      li {
        display: inline-block;
        padding: 10px;
        font-size: 18px;
        font-weight: 600;
        margin: 0 10px;
        a {
          transition: 0.2s all ease-in-out;
          color: #2c3e50;
          text-decoration: none;
          .cart {
            width: 35px;
            transform: translate(-5px, 7px);
            padding: 8px 9px 7px 7px;
            background: #e4e4e4;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: none;
          }
          // &:hover {
          //   color: rgb(231, 104, 104);
          //   text-decoration: none;
          // }
        }
      }
      .cartBtn {
        position: relative;
      }
    }
  }
}
.count {
  position: absolute;
  bottom: -5px;
  right: -3px;
  background-color: #ccc;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 12px;
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
  transform: translateY(-5px);
  &:hover {
    background: #a53939;
  }
  &:active {
    background: #e44f4f;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  .chevron {
    width: 10px;
    margin-left: 4px;
  }
}
.searchBtn {
  background: #e4e4e4;
  padding: 7px 9px;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  img {
    width: 18px;
    transform: translateY(2px);
  }
}

.dropdown {
  position: absolute;
  background: #e4e4e4;
  top: 100%;
  right: 0;
  margin-top: 5px;
  width: 130%;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0px 3px 6px #0000000f;
  overflow: hidden;
  ul.dd {
    margin: 0;
    padding: 0;
    text-align: left;
    li {
      display: block !important;
      font-size: 14px !important;
      width: 120% !important;
      margin: 0 !important;
      transform: translateX(-10px);
      padding: 10px 20px !important;
      transition: 0.2s all ease-in-out;
      color: #2c3e50;
      &:hover {
        background: #ccc;
      }
    }
    .divider {
      width: 100%;
      height: 1px;
      background: #cec8c8;
      border-radius: 10px;
    }
  }
}
.menuBtn {
  height: 30px;
  width: 30px;
  background: #e3e3e3;
  margin: auto 50px auto auto;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  span {
    height: 2px;
    border-radius: 3px;
    width: 70%;
    background: #333;
    margin: 0 auto;
  }
}
.overflowMenu {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e4e4e4;
  font-weight: 600;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 15px;
      margin: 10px;
      font-size: 20px;
      a {
        text-decoration: none;
        color: #2c3e50;
      }
    }
  }
}

.searchComp {
  display: none;
}

@media screen and (max-width: 1000px) {
  nav {
    width: 100% !important;
  }
}

@media screen and (max-width: 850px) {
  .Wrapper nav {
    .group {
      width: 20%;
    }
    ul.main {
      width: 80%;
      margin: auto 0;
    }
  }
}

@media screen and (max-width: 725px) {
  .Wrapper nav {
    .group {
      width: 20%;
    }
    ul.main {
      width: 80%;
      margin: auto 0;
    }
  }
}
</style>
