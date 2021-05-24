import { createStore } from "vuex";
import state from "./state";
import getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

export default createStore({
  state,
  mutations,
  actions,
  getters
});
