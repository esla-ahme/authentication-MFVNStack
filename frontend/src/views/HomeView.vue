<template>
  <div id="login">
    <h1>Login</h1>

    <input
      class="input"
      type="text"
      name="email"
      v-model="input.email"
      placeholder="Email"
    />

    <input
      class="input"
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />

    <button type="button" v-on:click="login()">Login</button>
    <!--Error message-->
    <p class="error">{{ msg }}</p>
    <p>
      Don't have account yet? <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    //states
    return {
      input: {
        email: "",
        password: "",
      },
      msg: "",
    };
  },
  methods: {
    login() {
      //check if inputs not empty
      if (this.input.email === "" && this.input.password === "") {
        this.msg = "Enter email and password";
        return;
      }

      axios
        .post("http://localhost:5000/login", {
          email: this.input.email.toLowerCase().trim(),
          password: this.input.password.toLowerCase().trim(),
        })
        .then((res) => {
          //incase of success  authnticate user
          if (res.status == 201) {
            this.$emit("authenticated", true, res.data.token);

            this.$router.replace({ name: "users" });
          } else {
            //in failure show message
            this.msg = res.data;
          }
        })
        .catch((error) => (this.msg = error.message));
    },
  },
};
</script>
<style scoped>
#login {
  width: 350px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 100px;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.input {
  background-color: #eee;
  width: 250px;
  padding: 15px;
  font-size: 20;
  margin-bottom: 10px;
  border: none;
  outline: none;
}
button {
  background-color: #5af97a;
  width: 150px;
  padding: 15px;
  font-size: 32;
  margin-bottom: 10px;
  border: none;
  outline: none;
  font-weight: bold;
  cursor: pointer;
}
.error {
  color: #f42;
}
</style>