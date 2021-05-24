import { db, storage } from "../firebase";

export const getProducts = ({ commit }) => {
  let prods = [];
  db.collection("items")
    .where("stock", ">", 0)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((prod) => {
        prods.push(prod.data());
      });
      commit("SET_PRODUCTS", prods);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProduct = ({ commit }, productID) => {
  db.collection("items")
    .doc(productID)
    .get()
    .then((snapshot) => {
      commit("SET_PRODUCT", snapshot.data());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserProducts = ({ commit }) => {
  commit("UPDATE_USER_PRODUCTS");
};

export const getUserOrders = ({ commit }) => {
  commit("UPDATE_USER_ORDERS");
};

export const removeUserProduct = ({ commit }, { productID, picURL }) => {
  document.querySelector(".loader").style.display = "flex";
  db.collection("items")
    .doc(productID)
    .delete()
    .then(() => {
      storage
        .refFromURL(picURL)
        .delete()
        .catch((err) => {
          alert(err);
        });
      document.querySelector(".loader").style.display = "none";
      alert("Removed Successfully");
    })
    .catch((err) => {
      document.querySelector(".loader").style.display = "none";
      alert(err);
    });
  commit("UPDATE_USER_PRODUCTS");
};

export const addProductToCart = ({ commit }, { product, quantity }) => {
  commit("ADD_TO_CART", { product, quantity });
};

export const incrementItem = ({ commit }, item) => {
  commit("INCREMENT_ITEM", item);
};

export const decrementItem = ({ commit }, item) => {
  commit("DECREMENT_ITEM", item);
};

export const removeItem = ({ commit }, item) => {
  commit("REMOVE_ITEM", item);
};

export const updateCart = ({ commit }) => {
  commit("UPDATE_CART");
};

export const clearCart = ({ commit }) => {
  commit("CLEAR_CART");
};

export const performSearch = ({ commit }, searchInput) => {
  commit("PERFORM_SEARCH", searchInput);
};

export const updateUser = ({ commit }) => {
  commit("UPDATE_USER");
};

export const getCurrency = ({ commit }) => {
  commit("GET_CURRENCY");
};
