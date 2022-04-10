<template>
  <div id="login">
    <h1>Register</h1>
    <input
      class="input"
      type="text"
      name="name"
      v-model="input.name"
      placeholder="name"
    />
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
    <button type="button" v-on:click="register()">Register</button>
    <p class="error">{{ msg }}</p>
    <p>Already have an account? <router-link to="/">Login</router-link></p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterView",
  data() {
    return {
      input: {
        name: "",
        email: "",
        password: "",
      },
      msg: "",
    };
  },
  methods: {
    register() {
      if (
        this.input.email === "" ||
        this.input.name === "" ||
        this.input.password === ""
      ) {
        this.msg = "Enter name, email and password";
        return;
      }

      axios
        .post("http://localhost:5000/register", {
          name: this.input.name.trim(),
          email: this.input.email.toLowerCase().trim(),
          password: this.input.password.toLowerCase().trim(),
        })
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            this.$router.replace({ name: "login" });
          } else {
            this.msg = res.data;
          }
        })
        .catch((error) => console.error(error.message));
      // if (
      //   this.input.email == this.$parent.mockAccount.username &&
      //   this.input.password == this.$parent.mockAccount.password
      // ) {
      //   this.$emit("authenticated", true);
      //   this.$router.replace({ name: "secure" });
      // } else {
      //   console.log("The username and / or password is incorrect");
      // }
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