import feature from "../../registry";

feature
  .functional("TEXT", function() {
    let str = "";
    for (let i = 0; i < arguments.length; i++) {
      str += `${arguments[i]}`;
    }
    return str;
  })
  .withDescription("链接字符串");
