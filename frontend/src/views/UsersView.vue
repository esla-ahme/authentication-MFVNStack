<template>
  <div>
    <div class="container">
      <div class="row">
        <p>ID</p>
        <p>Name</p>
        <p>Email</p>
      </div>
      <div class="row" :key="user._id" v-for="user in users">
        <p>{{ user._id.substr(0, 7) }}</p>
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
    </div>
    <button @click="logout()">logout</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "users",

  props: ["token"],
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/users", {
        headers: {
          token: this.token,
        },
      })
      .then((res) => {
        this.users = res.data;
        console.log(this.users);
      })
      .catch((error) => alert(error));
  },
  methods: {
    logout() {
      this.$emit("logout");
      this.$router.replace({ name: "login" });
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px;
  padding: 0px;
}
p {
  flex: 1;
  padding: 20px 0px;
  height: 100%;
  margin: 0px;
}
p:nth-child(2n) {
  background-color: #ddd;
}
.container {
  flex-direction: column;
  justify-content: flex-start;
  height: min-content;
  border: 1px solid #333;
  width: 800;
}
button {
  background-color: #aab9ca;
  width: 150px;
  padding: 15px;
  font-size: 32;
  margin-bottom: 10px;
  border: none;
  outline: none;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}
</style>