import Vue from "vue";

export default Vue.extend({
  render() {
    return (
      <div id="app">
        <p>
          <router-link class="el-button" to="/basic">
            Basic
          </router-link>
          <router-link class="el-button" to="/hooks">
            Hooks
          </router-link>
        </p>
        <router-view />
      </div>
    );
  }
});
