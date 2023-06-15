const _ = require("underscore");
const YouAreDaBomb = require("../index");

_.defaults(this, {
  Before(object, methodName, adviseMethod) {
    return YouAreDaBomb(object, methodName).before(adviseMethod);
  },
  After(object, methodName, adviseMethod) {
    return YouAreDaBomb(object, methodName).after(adviseMethod);
  },
  Around(object, methodName, adviseMethod) {
    return YouAreDaBomb(object, methodName).around(adviseMethod);
  },
});

(function () {
  var A, a;

  A = (function () {
    A.name = "A";

    function A() {}

    A.prototype.bar = function () {
      console.log("bar");
    };

    return A;
  })();

  a = new A();

  this.Before(a, "bar", () => {
    console.log("foo");
  });

  a.bar();
}).call(this);
