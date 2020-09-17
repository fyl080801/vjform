import { shallowMount, mount } from "@vue/test-utils";
import Test from "@/views/Test.vue";
import vjform from "../../lib";

describe("Basic", () => {
  it("Render Basic", () => {
    const model = { model: { text: "aaa" } };

    const wrapper = shallowMount(Test, {
      propsData: { model, fields: [] }
    });

    expect(wrapper.text()).toMatch(JSON.stringify(model));
  });

  it("Render fields", () => {
    const fields = [
      { component: "p", text: "aaa" },
      { component: "p", fieldOptions: { domProps: { innerText: "xxx" } } },
      {
        component: "el-button",
        fieldOptions: { props: { type: "info" } },
        children: [{ component: "span", text: "button" }]
      }
    ];

    const wrapper = mount(vjform, {
      propsData: { value: {}, fields }
    });

    console.log(wrapper.html());
  });

  it("bind transform", () => {
    const fields = [
      { component: "p", text: { $type: "bind", $source: "params.text" } }
    ];

    const wrapper = mount(vjform, {
      propsData: { value: {}, params: { text: "xxxxx" }, fields }
    });

    console.log(wrapper.html());
  });

  it("func transform", () => {
    const fields = [
      {
        component: "p",
        text: {
          $type: "func",
          $arguments: { num: { $type: "bind", $source: "model.num" }, val: 2 },
          $result: "num + val"
        }
      }
    ];

    const wrapper = mount(vjform, {
      propsData: { value: { num: 1 }, fields }
    });

    console.log(wrapper.html());
  });
});
