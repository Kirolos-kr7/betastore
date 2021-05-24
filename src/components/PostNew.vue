<template>
  <div class="PostNew">
    <div class="btn" @click="showAddNewModal">Post New Product</div>
    <div class="addNewModal" ref="addNewModal">
      <div class="modal">
        <div class="close">
          <img src="../assets/close.svg" @click="hideAddNewModal" />
          <h2>Add New Product</h2>
          <form @submit.prevent="addNewProduct">
            <input
              type="text"
              v-model="productName"
              placeholder="Product Name *"
              required
            />
            <input
              type="text"
              v-model="brand"
              placeholder="Brand Name *"
              required
            />
            <input
              type="text"
              v-model="price"
              placeholder="Price (EGP) *"
              required
            />
            <input type="text" v-model="stock" placeholder="Stock *" required />
            <input
              type="text"
              v-model="description"
              placeholder="Description *"
              required
            />
            <label for="file">Select Product Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="file"
              required
            />
            <h6>Image should be 300px X 300px with a solid background</h6>
            <button class="btn" @click.prevent="addNewProduct">
              Upload Product
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { storage } from "../firebase";
export default {
  name: "PostNew",
  data() {
    return {
      brand: "",
      description: "",
      productName: "",
      price: null,
      stock: null,
    };
  },
  methods: {
    showAddNewModal() {
      this.$refs.addNewModal.style.display = "flex";
    },
    hideAddNewModal() {
      this.$refs.addNewModal.style.display = "none";
    },
    addNewProduct() {
      document.querySelector(".loader").style.display = "flex";
      storage
        .ref()
        .child(document.getElementById("file").files[0].name)
        .put(document.getElementById("file").files[0])
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            let doc = db.collection("items").doc();
            doc
              .set({
                brand: this.brand,
                description: this.description,
                productName: this.productName,
                price: parseInt(this.price),
                stock: parseInt(this.stock),
                id: doc.id,
                pic: downloadURL,
                seller: this.$store.state.user.email,
                dateTime:
                  new Date().toDateString() +
                  " " +
                  new Date().toLocaleTimeString(),
              })
              .then(() => {
                this.$store.dispatch("getUserProducts");
                document.querySelector(".loader").style.display = "none";
                alert("Successfully Added");
              })
              .catch((err) => {
                document.querySelector(".loader").style.display = "none";
                alert(err);
              });
          });
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  computed: {
    userData() {
      return this.$store.state.user;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.search {
  margin: auto;
}
.addNewModal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  text-align: 0;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.29);
  z-index: 3;
  display: none;
  justify-content: center;
  align-items: center;
  transition: 0.2s all ease-in-out;
  .modal {
    position: relative;
    text-align: center;
    width: 25%;
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
      cursor: default;
      margin-bottom: 0px;
    }
    input {
      border: 0;
      background: transparent;
      border-bottom: 1px solid #e91e63;
      padding: 5px 10px;
      margin-top: 20px;
      font-size: 14px;
      width: 85%;
    }
    input[type="file"] {
      border-bottom: 0px solid #e91e63;
      margin-top: 10px;
    }
    label {
      margin: 20px 0 0 0;
      display: block;
      text-align: left;
    }
    h6 {
      font-weight: 500;
      margin-bottom: 0;
      margin-top: 10px;
    }
  }
}

.btn {
  margin: 20px 0;
  background: #cc4545;
  color: #fff;
  padding: 10px 30px;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  transition: 0.2s all ease-in-out;
  font-size: 14px;
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

@media screen and (max-width: 1000px) {
  .modal {
    width: 55% !important;
  }
}
</style>
