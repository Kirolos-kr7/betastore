<template>
  <div class="searchComp">
    <div class="searchModal" ref="searchModal">
      <div class="modal">
        <div class="close" @click="hideSearchModal">
          <img src="../assets/close.svg" alt="" />
        </div>
        <h2>Search Products</h2>
        <input
          type="text"
          v-model="searchInput"
          placeholder="What are you looking for"
        />
        <div
          class="btn"
          @click="
            performSearch();
            hideSearchModal();
          "
        >
          <router-link to="/search">Search</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchComp",
  data() {
    return {
      products: [],
      searchInput: ""
    };
  },
  computed: {},
  methods: {
    hideSearchModal() {
      document.querySelector(".searchComp").style.display = "none";
    },
    performSearch() {
      this.$store.dispatch("performSearch", this.searchInput);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.searchComp {
  margin: auto;
  .btn {
    padding: 8px 8px 3px 8px;
    background: #e4e4e4;
    border-radius: 50%;
    cursor: pointer;
    img {
      width: 18px;
    }
  }
  .searchModal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    text-align: 0;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.29);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all ease-in-out;
    .modal {
      position: relative;
      text-align: center;
      width: 400px;
      margin: 110px auto;
      padding: 25px;
      background: #e4e4e4;
      border-radius: 15px;
      box-shadow: 0 4px 20px #00000038;
      .close {
        cursor: pointer;
        img {
          position: absolute;
          width: 20px;
          top: 25px;
          right: 25px;
        }
      }
      h2 {
        display: block;
        margin-bottom: 0px;
      }
      input {
        border: 0;
        background: transparent;
        border-bottom: 1px solid #e91e63;
        padding: 5px 10px;
        margin-top: 20px;
        width: 85%;
      }
      .btn {
        background: #cc4545;
        color: #fff;
        padding: 10px 30px;
        border: 0;
        border-radius: 3px;
        margin: 20px 0;
        cursor: pointer;
        display: inline-block;
        transition: 0.2s all ease-in-out;
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
      }
      .item-wrapper {
        text-align: left;
        width: 90%;
        border-bottom: 1px solid #3333332b;
        display: inline-block;
        h4 {
          font-size: 17px;
          margin-bottom: 0px;
        }
        p {
          font-size: 13px;
          margin-top: 5px;
        }
      }
      .item-wrapper:last-of-type {
        border-bottom: 0px solid #3333332b;
      }
    }
  }
}

@media screen and (max-width: 440px) {
  .modal {
    width: 90% !important;
  }
}
</style>
