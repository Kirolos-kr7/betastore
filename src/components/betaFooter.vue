<template>
  <div class="betaFooter">
    <h3>Copyright &copy; Betastore</h3>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/store">Store</router-link></li>
      <li><router-link to="/cart">Cart</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "betaFooter"
};
</script>

<style lang="scss" scoped>
.betaFooter {
  padding: 30px 50px;
  background: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap-reverse;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: inline-flex;
    li {
      margin: 15px;
      a {
        color: #2c3e50;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}

@media screen and (max-width: 540px) {
  h3,
  ul {
    margin: auto !important;
  }
}
</style>
