<template>
  <div class="registration">
    <div class="regModal" ref="regModal">
      <div class="modal">
        <div class="close">
          <img src="../assets/close.svg" @click="hideRegModal" />
        </div>
        <div class="logIn" ref="logIn">
          <h2>Log In</h2>
          <form @submit.prevent="logIn">
            <input
              type="email"
              v-model="logInData.email"
              placeholder="Email"
              required
            />
            <input
              type="password"
              v-model="logInData.password"
              placeholder="Password"
              required
            />
            <h6>
              New here?
              <div class="chng" @click="showSignUp">Sign Up</div>
            </h6>
            <button class="btn">Log In</button>
          </form>
        </div>
        <div class="signUp" ref="signUp">
          <h2>Sign Up</h2>
          <form @submit.prevent="signUp">
            <input
              type="text"
              v-model="signUpData.username"
              placeholder="Username"
              required
            />
            <input
              type="email"
              v-model="signUpData.email"
              placeholder="Email"
              required
            />
            <input
              type="password"
              v-model="signUpData.password"
              placeholder="Password"
              required
            />
            <div class="slct">
              <div class="type">
                <input
                  type="radio"
                  name="type"
                  @click="typeSelect"
                  id="Buyer"
                  required
                  checked
                /><label for="Buyer">Buyer</label>
              </div>
              <div class="type">
                <input
                  type="radio"
                  name="type"
                  @click="typeSelect"
                  id="Seller"
                  required
                /><label for="Seller">Seller</label>
              </div>
            </div>
            <h6>
              Already signed?
              <div class="chng" @click="showLogIn">Log In</div>
            </h6>
            <button class="btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { db } from "../firebase";
export default {
  name: "registration",
  data() {
    return {
      signUpData: {
        username: "",
        password: "",
        email: "",
        type: "buyer"
      },
      logInData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    hideRegModal() {
      document.querySelector(".registration").style.display = "none";
    },
    showSignUp() {
      this.$refs.signUp.style.display = "block";
      this.$refs.logIn.style.display = "none";
    },
    showLogIn() {
      this.$refs.logIn.style.display = "block";
      this.$refs.signUp.style.display = "none";
    },
    typeSelect(e) {
      this.signUpData.type = e.target.id;
    },
    signUp() {
      auth
        .createUserWithEmailAndPassword(
          this.signUpData.email.toLocaleLowerCase(),
          this.signUpData.password
        )
        .then(() => {
          alert("Signed Up Successfully");
          db.collection("users")
            .add({
              userName: this.signUpData.username,
              userType: this.signUpData.type.toLowerCase(),
              email: this.signUpData.email.toLowerCase(),
              id: null
            })
            .then(doc => {
              db.collection("users")
                .doc(doc.id)
                .update({ id: doc.id });
            });
          this.signUpData.email = "";
          this.signUpData.password = "";
          this.signUpData.username = "";
          this.showLogIn();
        })
        .catch(error => {
          alert(error.message);
        });
    },
    logIn() {
      auth
        .signInWithEmailAndPassword(
          this.logInData.email.toLocaleLowerCase(),
          this.logInData.password
        )
        .then(() => {
          alert("Logged In Successfully");
          db.collection("users")
            .where("email", "==", this.logInData.email.toLowerCase())
            .get()
            .then(querySnapshot => {
              querySnapshot.docs.forEach(user => {
                this.$store.state.user = user.data();
                localStorage.setItem("user", JSON.stringify(user.data()));
              });
            });
          document.querySelector(".registration").style.display = "none";
        })
        .catch(error => {
          alert(error.message);
        });
    }
  },
  computed: {
    userData() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.$refs.signUp.style.display = "none";
  }
};
</script>

<style lang="scss" scoped>
.registration {
  margin: auto;
  display: none;
}
.regModal {
  position: fixed;
  width: 100vw;
  height: 100vh;
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
      font-size: 14px;
      width: 85%;
    }
    h6 {
      font-weight: 500;
      margin-bottom: 0;
      .chng {
        text-decoration: underline;
        display: inline-block;
        color: #3f51b5;
        cursor: pointer;
      }
    }
    .slct {
      display: flex;
      justify-content: center;
      align-items: center;
      .type {
        font-weight: 400;
        margin: 0 15px;
      }
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
}

@media screen and (max-width: 440px) {
  .modal {
    width: 90% !important;
  }
}
</style>
