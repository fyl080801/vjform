import { withHooks } from "vue-hooks";

// eslint-disable-next-line no-unused-vars
const component = withHooks(h => {
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
});

component.name = "app";

export default component;
