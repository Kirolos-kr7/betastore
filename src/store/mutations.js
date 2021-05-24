import Fuse from "fuse.js/dist/fuse.min.js";
import { db } from "../firebase";

export const SET_PRODUCTS = (state, products) => {
  state.products = products;
};

export const SET_PRODUCT = (state, product) => {
  state.product = product;
};

export const ADD_TO_CART = (state, { product, quantity }) => {
  let inCart = state.cart.find((item) => {
    return item.product.id === product.id;
  });
  if (inCart) {
    if (product.stock <= inCart.quantity) {
      return;
    } else {
      inCart.quantity += 1;
    }
  } else {
    state.cart.push({ product, quantity });
  }
  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const INCREMENT_ITEM = (state, item) => {
  state.cart.forEach((cartItem) => {
    if (cartItem === item) {
      cartItem.quantity += 1;
    }
  });
};

export const DECREMENT_ITEM = (state, item) => {
  state.cart.forEach((cartItem) => {
    if (cartItem === item && item.quantity > 1) {
      cartItem.quantity -= 1;
    }
  });
};

export const REMOVE_ITEM = (state, item) => {
  state.cart.forEach((cartItem, index) => {
    if (cartItem === item) {
      state.cart.splice(index, 1);
    }
  });
  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const UPDATE_CART = (state) => {
  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", "[]");
  } else if (localStorage.getItem("cart") === "") {
    localStorage.setItem("cart", "[]");
  } else {
    state.cart = JSON.parse(localStorage.getItem("cart"));
  }
};

export const CLEAR_CART = (state) => {
  state.cart = [];
  localStorage.setItem("cart", "[]");
};

export const PERFORM_SEARCH = (state, searchInput) => {
  const options = {
    threshold: 0.4,
    keys: ["productName", "brand", "description"],
  };
  const fuse = new Fuse(state.products, options);
  const result = fuse.search(searchInput);
  state.search = result;
  state.searchValue = searchInput;
};

export const UPDATE_USER = (state) => {
  state.user = JSON.parse(localStorage.getItem("user"));
};

export const UPDATE_USER_PRODUCTS = (state) => {
  let userProducts = [];
  db.collection("items")
    .where("seller", "==", state.user.email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((product) => {
        userProducts.push(product.data());
      });
      state.userProducts = userProducts;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const UPDATE_USER_ORDERS = (state) => {
  let orders = [];
  db.collection("orders")
    .where("orderedBy", "==", state.user.email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((product) => {
        orders.push(product.data());
      });
      state.userOrders = orders;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GET_CURRENCY = (state) => {
  state.currency = localStorage.getItem("currency");
};
