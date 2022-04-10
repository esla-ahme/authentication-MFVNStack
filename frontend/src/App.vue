<template>
  <div>
    <nav></nav>
    <router-view
      @authenticated="setAuthenticated"
      @logout="logout"
      :token="token"
    />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      authenticated: false,
      token: null,
    };
  },
  mounted() {
    //check if token already saved in local storage
    const tkn = localStorage.getItem("vue-token");

    // if token found automatically route to users
    if (tkn != null) {
      this.token = tkn;
      this.authenticated = true;
      this.$router.replace({ name: "users" });
    } else {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    /**
     * on login authinticate user and save token to localstorage
     * @params
     * status: bool => true if user is auth-ed
     * token: string => jwt access token
     **/ setAuthenticated(status, token) {
      this.authenticated = status;
      this.token = token;
      localStorage.setItem("vue-token", token);
    },

    //remove token on logout
    logout() {
      this.token = null;
      this.authenticated = false;
      localStorage.removeItem("vue-token");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
