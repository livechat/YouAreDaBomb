/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const _ = require("underscore");

const YouAreDaBomb = function (object, ...functionNames) {
  let combinator;
  return (combinator = {
    before: (advice) => {
      for (var functionName of Array.from(functionNames)) {
        object[functionName] = (() => {
          const fn = object[functionName];
          return function (...args) {
            advice(...Array.from(args || []));
            const result = fn.apply(object, args);
            return result;
          };
        })();
      }
      return combinator;
    },

    around(advice) {
      for (var functionName of Array.from(functionNames)) {
        object[functionName] = (() => {
          const fn = object[functionName];
          return function (...args) {
            const proceed = (...proceededArgs) => fn.apply(object, proceededArgs);
            return advice(proceed, ...Array.from(args));
          };
        })();
      }
      return combinator;
    },

    after: (advice) => {
      for (var functionName of Array.from(functionNames)) {
        object[functionName] = (() => {
          const fn = object[functionName];
          return function (...args) {
            const result = fn.apply(object, args);
            advice(...Array.from(args || []));
            return result;
          };
        })();
      }
      return combinator;
    },

    beforeAnyCallback: (advice) => {
      for (var functionName of Array.from(functionNames)) {
        object[functionName] = (function () {
          const fn = object[functionName];
          return function (...args) {
            const adviced_args = [];
            _.each(args, (arg) => {
              const new_arg = _.isFunction(arg)
                ? function (...callback_args) {
                    advice(...Array.from(callback_args || []));
                    return arg(...Array.from(callback_args || []));
                  }
                : arg;
              return adviced_args.push(new_arg);
            });
            return fn.apply(object, adviced_args);
          };
        })();
      }
      return combinator;
    },

    afterAnyCallback: (advice) => {
      for (var functionName of Array.from(functionNames)) {
        object[functionName] = (function () {
          const fn = object[functionName];
          return function (...args) {
            const adviced_args = [];
            _.each(args, (arg) => {
              const new_arg = _.isFunction(arg)
                ? function (...callback_args) {
                    const result = arg(...Array.from(callback_args || []));
                    advice(...Array.from(callback_args || []));
                    return result;
                  }
                : undefined;
              arg;
              return adviced_args.push(new_arg);
            });
            return fn.apply(object, adviced_args);
          };
        })();
      }
      return combinator;
    },
  });
};

module.exports = YouAreDaBomb;
