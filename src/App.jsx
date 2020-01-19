{
  /* <template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script> */
}

import { withHooks } from "vue-hooks";

// eslint-disable-next-line no-unused-vars
const component = withHooks(h => {
  return (
    <div id="app">
      <router-view />
    </div>
  );
});

component.name = "app";

export default component;
