import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Store from "../views/Store.vue";
import Cart from "../views/Cart.vue";
import Product from "../views/Product.vue";
import Search from "../views/SearchPage.vue";
import Dashboard from "../views/Dashboard.vue";
// import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/store",
    name: "Store",
    component: Store
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
    // async beforeEnter(to, from, next) {
    //   try {
    //     let user = await store.state.user;
    //     if (Object.keys(user).length > 0) {
    //       next();
    //     }
    //   } catch (e) {
    //     next({
    //       name: "Home",
    //     });
    //   }
    // },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
