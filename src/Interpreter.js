import { parse$Expression, Expression } from "./Parser.js";

const toCamel = str => str.replace(/[A-Z]/g, "-$&").toLowerCase();

class Object2 {
  static mapKey(CB, obj) { return Object.fromEntries(Object.entries(obj).map(([k, v]) => [CB(k), v])); }
  static mapValue(CB, obj) { return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, CB(v)])); }
  static mapKeyValue(CB, obj) { return Object.fromEntries(Object.entries(obj).map(kv => CB(kv))); }
  static filterKey(CB, obj) { return Object.fromEntries(Object.entries(obj).filter(([k, v]) => CB(k))); }
  static filterValue(CB, obj) { return Object.fromEntries(Object.entries(obj).filter(([k, v]) => CB(v))); }
  static filterKeyValue(CB, obj) { return Object.fromEntries(Object.entries(obj).filter(kv => CB(kv))); }
};

export class Interpreter {

  constructor(shortFuncs, stackables) {
    this.shortFuncs = Object2.mapKey(toCamel, shortFuncs);
    this.stackables = stackables;
  }

  interpretExp(exp, scope = {}) {
    const cb = scope[exp.name] ?? this.shortFuncs[exp.name];
    if (!cb)
      throw new SyntaxError(`Unknown short function: ${exp.name}`);
    const innerScope = Object.assign(scope, cb.scope);
    const args = exp.args.map(x => x instanceof Expression ? this.interpretExp(x, innerScope) : x);
    return cb.call(exp, ...args);
  }

  mergeOrStack(shorts) {
    const res = {};
    for (const short of shorts) {
      const obj = this.interpretExp(short);
      for (let [k, v] of Object.entries(obj)) {
        if (v == null) continue;
        k = k.replace(/[A-Z]/g, "-$&").toLowerCase();
        if (CSS.supports(k, "inherit"))
          if (!CSS.supports(k, v))
            throw new SyntaxError(`Invalid CSS$ value: ${k} = ${v}`);
        //else, the browser doesn't support the property, because the property is too modern.
        if (!(k in res))
          res[k] = v;
        else if (k in this.stackables)
          res[k] += (this.stackables[k] + v);
        else
          throw new SyntaxError(`CSS$ clash: ${k} = ${res[k]}  AND = ${v}.`);
      }
    }
    return res;
  }

  interpretClass(txt) {
    return Object2.mapValue(shorts => this.mergeOrStack(shorts), parse$Expression(txt));
  }
}