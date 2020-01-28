import { withHooks } from "vue-hooks";

const component = withHooks((h, attrs, props) => {
  return <p>{props.value}</p>;
});

component.props = { value: String };

export default component;
