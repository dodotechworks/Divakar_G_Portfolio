import { i as __toESM, n as __exportAll, r as __require } from "../_runtime.mjs";
import { r as require_react } from "./react+tanstack__react-query.mjs";
import "./@emotion/is-prop-valid+[...].mjs";
//#region node_modules/stylis/src/Enum.js
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
//#endregion
//#region node_modules/stylis/src/Utility.js
/**
* @param {number}
* @return {number}
*/
var abs = Math.abs;
/**
* @param {number}
* @return {string}
*/
var from = String.fromCharCode;
/**
* @param {object}
* @return {object}
*/
var assign = Object.assign;
/**
* @param {string} value
* @param {number} length
* @return {number}
*/
function hash(value, length) {
	return charat(value, 0) ^ 45 ? (((length << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
/**
* @param {string} value
* @return {string}
*/
function trim(value) {
	return value.trim();
}
/**
* @param {string} value
* @param {RegExp} pattern
* @return {string?}
*/
function match(value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value;
}
/**
* @param {string} value
* @param {(string|RegExp)} pattern
* @param {string} replacement
* @return {string}
*/
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
/**
* @param {string} value
* @param {string} search
* @param {number} position
* @return {number}
*/
function indexof(value, search, position) {
	return value.indexOf(search, position);
}
/**
* @param {string} value
* @param {number} index
* @return {number}
*/
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
/**
* @param {string} value
* @param {number} begin
* @param {number} end
* @return {string}
*/
function substr(value, begin, end) {
	return value.slice(begin, end);
}
/**
* @param {string} value
* @return {number}
*/
function strlen(value) {
	return value.length;
}
/**
* @param {any[]} value
* @return {number}
*/
function sizeof(value) {
	return value.length;
}
/**
* @param {any} value
* @param {any[]} array
* @return {any}
*/
function append(value, array) {
	return array.push(value), value;
}
/**
* @param {string[]} array
* @param {function} callback
* @return {string}
*/
function combine(array, callback) {
	return array.map(callback).join("");
}
/**
* @param {string[]} array
* @param {RegExp} pattern
* @return {string[]}
*/
function filter(array, pattern) {
	return array.filter(function(value) {
		return !match(value, pattern);
	});
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
/**
* @param {string} value
* @param {object | null} root
* @param {object | null} parent
* @param {string} type
* @param {string[] | string} props
* @param {object[] | string} children
* @param {object[]} siblings
* @param {number} length
*/
function node(value, root, parent, type, props, children, length, siblings) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length,
		return: "",
		siblings
	};
}
/**
* @param {object} root
* @param {object} props
* @return {object}
*/
function copy(root, props) {
	return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
/**
* @param {object} root
*/
function lift(root) {
	while (root.root) root = copy(root.root, { children: [root] });
	append(root, root.siblings);
}
/**
* @return {number}
*/
function char() {
	return character;
}
/**
* @return {number}
*/
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
/**
* @return {number}
*/
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
/**
* @return {number}
*/
function peek() {
	return charat(characters, position);
}
/**
* @return {number}
*/
function caret() {
	return position;
}
/**
* @param {number} begin
* @param {number} end
* @return {string}
*/
function slice(begin, end) {
	return substr(characters, begin, end);
}
/**
* @param {number} type
* @return {number}
*/
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
/**
* @param {string} value
* @return {any[]}
*/
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
/**
* @param {any} value
* @return {any}
*/
function dealloc(value) {
	return characters = "", value;
}
/**
* @param {number} type
* @return {string}
*/
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
/**
* @param {number} type
* @return {string}
*/
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
/**
* @param {number} index
* @param {number} count
* @return {string}
*/
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
/**
* @param {number} type
* @return {number}
*/
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92:
			next();
			break;
	}
	return position;
}
/**
* @param {number} type
* @param {number} index
* @return {number}
*/
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
/**
* @param {number} index
* @return {string}
*/
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
/**
* @param {string} value
* @return {object[]}
*/
function compile(value) {
	return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {string[]} rule
* @param {string[]} rules
* @param {string[]} rulesets
* @param {number[]} pseudo
* @param {number[]} points
* @param {string[]} declarations
* @return {object}
*/
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;
	while (scanning) switch (previous = character, character = next()) {
		case 40: if (previous != 108 && charat(characters, length - 1) == 58) {
			if (indexof(characters += replace(delimit(character), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1) ampersand = -1;
			break;
		}
		case 34:
		case 39:
		case 91:
			characters += delimit(character);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			characters += whitespace(previous);
			break;
		case 92:
			characters += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
					if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters) && substr(characters, -1, void 0) !== " ") characters += " ";
					break;
				default: characters += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			switch (character) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters = replace(characters, /\f/g, "");
					if (property > 0 && (strlen(characters) - length || variable === 0 && previous === 47)) append(property > 32 ? declaration(characters + ";", rule, parent, length - 1, declarations) : declaration(replace(characters, " ", "") + ";", rule, parent, length - 2, declarations), declarations);
					break;
				case 59: characters += ";";
				default:
					append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets);
					if (character === 123) if (offset === 0) parse(characters, root, reference, reference, props, rulesets, length, points, children);
					else {
						switch (atrule) {
							case 99: if (charat(characters, 3) === 110) break;
							case 108: if (charat(characters, 2) === 97) break;
							default: offset = 0;
							case 100:
							case 109:
							case 115:
						}
						if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children);
						else parse(characters, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters = "", length = pseudo;
			break;
		case 58: length = 1 + strlen(characters), property = previous;
		default:
			if (variable < 1) {
				if (character == 123) --variable;
				else if (character == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters += from(character), character * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters += "\f", -1);
					break;
				case 44:
					points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters += delimit(next());
					atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
					break;
				case 45: if (previous === 45 && strlen(characters) == 2) variable = 0;
			}
	}
	return rulesets;
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} index
* @param {number} offset
* @param {string[]} rules
* @param {number[]} points
* @param {string} type
* @param {string[]} props
* @param {string[]} children
* @param {number} length
* @param {object[]} siblings
* @return {object}
*/
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length, siblings);
}
/**
* @param {number} value
* @param {object} root
* @param {object?} parent
* @param {object[]} siblings
* @return {object}
*/
function comment(value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} length
* @param {object[]} siblings
* @return {object}
*/
function declaration(value, root, parent, length, siblings) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length, siblings);
}
//#endregion
//#region node_modules/stylis/src/Prefixer.js
/**
* @param {string} value
* @param {number} length
* @param {object[]} children
* @return {string}
*/
function prefix(value, length, children) {
	switch (hash(value, length)) {
		case 5103: return WEBKIT + "print-" + value + value;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599: return WEBKIT + value + value;
		case 4855: return WEBKIT + value.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + value;
		case 4789: return MOZ + value + value;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return WEBKIT + value + MOZ + value + MS + value + value;
		case 5936: switch (charat(value, length + 11)) {
			case 114: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
			case 108: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
			case 45: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
		}
		case 6828:
		case 4268:
		case 2903: return WEBKIT + value + MS + value + value;
		case 6165: return WEBKIT + value + MS + "flex-" + value + value;
		case 5187: return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
		case 5443: return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
		case 4675: return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
		case 5548: return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
		case 5292: return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
		case 6060: return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
		case 4554: return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
		case 6187: return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
		case 5495:
		case 3959: return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
		case 4968: return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /space-between/, "justify") + WEBKIT + value + value;
		case 4200:
			if (!match(value, /flex-|baseline/)) return MS + "grid-column-align" + substr(value, length) + value;
			break;
		case 2592:
		case 3360: return MS + replace(value, "template-", "") + value;
		case 4384:
		case 3616:
			if (children && children.some(function(element, index) {
				return length = index, match(element.props, /grid-\w+-end/);
			})) return ~indexof(value + (children = children[length].value), "span", 0) ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span", 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
			return MS + replace(value, "-start", "") + value;
		case 4896:
		case 4128: return children && children.some(function(element) {
			return match(element.props, /grid-\w+-start/);
		}) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
				case 109: if (charat(value, length + 4) !== 45) break;
				case 102: return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length + 3) == 108 ? "$3" : "$2-$3")) + value;
				case 115: return ~indexof(value, "stretch", 0) ? prefix(replace(value, "stretch", "fill-available"), length, children) + value : value;
			}
			break;
		case 5152:
		case 5920: return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_, a, b, c, d, e, f) {
			return MS + a + ":" + b + f + (c ? MS + a + "-span:" + (d ? e : +e - +b) + f : "") + value;
		});
		case 4949:
			if (charat(value, length + 6) === 121) return replace(value, ":", ":" + WEBKIT) + value;
			break;
		case 6444:
			switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
				case 120: return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
				case 100: return replace(value, ":", ":" + MS) + value;
			}
			break;
		case 5719:
		case 2647:
		case 2135:
		case 3927:
		case 2391: return replace(value, "scroll-", "scroll-snap-") + value;
	}
	return value;
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
/**
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function serialize(children, callback) {
	var output = "";
	for (var i = 0; i < children.length; i++) output += callback(children[i], i, children, callback) || "";
	return output;
}
/**
* @param {object} element
* @param {number} index
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case NAMESPACE:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: if (!strlen(element.value = element.props.join(","))) return "";
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
/**
* @param {function[]} collection
* @return {function}
*/
function middleware(collection) {
	var length = sizeof(collection);
	return function(element, index, children, callback) {
		var output = "";
		for (var i = 0; i < length; i++) output += collection[i](element, index, children, callback) || "";
		return output;
	};
}
/**
* @param {function} callback
* @return {function}
*/
function rulesheet(callback) {
	return function(element) {
		if (!element.root) {
			if (element = element.return) callback(element);
		}
	};
}
/**
* @param {object} element
* @param {number} index
* @param {object[]} children
* @param {function} callback
*/
function prefixer(element, index, children, callback) {
	if (element.length > -1) {
		if (!element.return) switch (element.type) {
			case DECLARATION:
				element.return = prefix(element.value, element.length, children);
				return;
			case KEYFRAMES: return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
			case RULESET: if (element.length) return combine(children = element.props, function(value) {
				switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
					case ":read-only":
					case ":read-write":
						lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
						lift(copy(element, { props: [value] }));
						assign(element, { props: filter(children, callback) });
						break;
					case "::placeholder":
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
						lift(copy(element, { props: [value] }));
						assign(element, { props: filter(children, callback) });
						break;
				}
				return "";
			});
		}
	}
}
//#endregion
//#region node_modules/styled-components/dist/styled-components.esm.js
var styled_components_esm_exports = /* @__PURE__ */ __exportAll({
	ServerStyleSheet: () => Ut,
	StyleSheetConsumer: () => ft,
	StyleSheetContext: () => pt,
	StyleSheetManager: () => gt,
	ThemeConsumer: () => vt,
	ThemeContext: () => yt,
	ThemeProvider: () => bt,
	__PRIVATE__: () => Jt,
	createGlobalStyle: () => Vt,
	createTheme: () => zt,
	css: () => Rt,
	default: () => Tt,
	isStyledComponent: () => ce,
	keyframes: () => qt,
	styled: () => Tt,
	stylisPluginRSC: () => nn,
	useTheme: () => St,
	version: () => u,
	withTheme: () => Ht
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var r, i;
var l = "undefined" != typeof process && void 0 !== process.env && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", c = "active", a = "data-styled-version", u = "6.4.2", d = "/*!sc*/\n", h = "undefined" != typeof window && "undefined" != typeof document, p = void 0 === import_react.createContext;
function f(e) {
	if ("undefined" != typeof process && void 0 !== process.env) {
		const t = process.env[e];
		if (void 0 !== t && "" !== t) return "false" !== t;
	}
}
var m = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : null !== (i = null !== (r = f("REACT_APP_SC_DISABLE_SPEEDY")) && void 0 !== r ? r : f("SC_DISABLE_SPEEDY")) && void 0 !== i ? i : "undefined" != typeof process && void 0 !== process.env && false), g = "sc-keyframes-", y = {};
function S(e, ...t) {
	return /* @__PURE__ */ new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length > 0 ? ` Args: ${t.join(", ")}` : ""}`);
}
var w = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), C = 1;
var P = (e) => {
	if (w.has(e)) return w.get(e);
	for (; N.has(C);) C++;
	const t = C++;
	return w.set(e, t), N.set(t, e), t;
}, O = (e) => N.get(e), E = (e, t) => {
	C = t + 1, w.set(e, t), N.set(t, e);
}, x = Object.freeze([]), $ = Object.freeze({});
function R(e, t, n = $) {
	return e.theme !== n.theme && e.theme || t || n.theme;
}
var j = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, k = /(^-|-$)/g;
function T(e) {
	return e.replace(j, "-").replace(k, "");
}
var D = /(a)(d)/gi, M = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97));
function V(e) {
	let t, n = "";
	for (t = Math.abs(e); t > 52; t = t / 52 | 0) n = M(t % 52) + n;
	return (M(t % 52) + n).replace(D, "$1-$2");
}
var G = 5381, F = (e, t) => {
	let n = t.length;
	for (; n;) e = 33 * e ^ t.charCodeAt(--n);
	return e;
}, z = (e) => F(G, e);
function W(e) {
	return V(z(e) >>> 0);
}
function B(e) {
	return e.displayName || e.name || "Component";
}
function L(e) {
	return "string" == typeof e && true;
}
function q(e) {
	return L(e) ? `styled.${e}` : `Styled(${B(e)})`;
}
var H = Symbol.for("react.memo"), Y = Symbol.for("react.forward_ref"), U = {
	contextType: !0,
	defaultProps: !0,
	displayName: !0,
	getDerivedStateFromError: !0,
	getDerivedStateFromProps: !0,
	propTypes: !0,
	type: !0
}, J = {
	name: !0,
	length: !0,
	prototype: !0,
	caller: !0,
	callee: !0,
	arguments: !0,
	arity: !0
}, X = {
	$$typeof: !0,
	compare: !0,
	defaultProps: !0,
	displayName: !0,
	propTypes: !0,
	type: !0
}, Z = {
	[Y]: {
		$$typeof: !0,
		render: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0
	},
	[H]: X
};
function K(e) {
	return ("type" in (t = e) && t.type.$$typeof) === H ? X : "$$typeof" in e ? Z[e.$$typeof] : U;
	var t;
}
var Q = Object.defineProperty, ee = Object.getOwnPropertyNames, te = Object.getOwnPropertySymbols, ne = Object.getOwnPropertyDescriptor, oe = Object.getPrototypeOf, se = Object.prototype;
function re(e, t, n) {
	if ("string" != typeof t) {
		const o = oe(t);
		o && o !== se && re(e, o, n);
		const s = ee(t).concat(te(t)), r = K(e), i = K(t);
		for (let o = 0; o < s.length; ++o) {
			const l = s[o];
			if (!(l in J || n && n[l] || i && l in i || r && l in r)) {
				const n = ne(t, l);
				try {
					Q(e, l, n);
				} catch (e) {}
			}
		}
	}
	return e;
}
function ie(e) {
	return "function" == typeof e;
}
var le = Symbol.for("react.forward_ref");
function ce(e) {
	return null != e && ("object" == typeof e || "function" == typeof e) && e.$$typeof === le && "styledComponentId" in e;
}
function ae(e, t) {
	return e && t ? e + " " + t : e || t || "";
}
function ue(e, t) {
	return e.join(t || "");
}
function de(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) t += e[n] + d;
	return t;
}
function he(e) {
	return e ? e.replaceAll(d, "") : e;
}
function pe(e) {
	return null !== e && "object" == typeof e && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function fe(e, t, n = !1) {
	if (!n && !pe(e) && !Array.isArray(e)) return t;
	if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e[n] = fe(e[n], t[n]);
	else if (pe(t)) for (const n in t) e[n] = fe(e[n], t[n]);
	return e;
}
function me(e) {
	if (!p) return null;
	const n = import_react.cache;
	return n ? n(e) : null;
}
function ge(e, t) {
	Object.defineProperty(e, "toString", { value: t });
}
var ye = class {
	constructor(e) {
		this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e, this._cGroup = 0, this._cIndex = 0;
	}
	indexOfGroup(e) {
		if (e === this._cGroup) return this._cIndex;
		let t = this._cIndex;
		if (e > this._cGroup) for (let n = this._cGroup; n < e; n++) t += this.groupSizes[n];
		else for (let n = this._cGroup - 1; n >= e; n--) t -= this.groupSizes[n];
		return this._cGroup = e, this._cIndex = t, t;
	}
	insertRules(e, t) {
		if (e >= this.groupSizes.length) {
			const t = this.groupSizes, n = t.length;
			let o = n;
			for (; e >= o;) if (o <<= 1, o < 0) throw S(16, `${e}`);
			this.groupSizes = new Uint32Array(o), this.groupSizes.set(t), this.length = o;
			for (let e = n; e < o; e++) this.groupSizes[e] = 0;
		}
		let n = this.indexOfGroup(e + 1), o = 0;
		for (let s = 0, r = t.length; s < r; s++) this.tag.insertRule(n, t[s]) && (this.groupSizes[e]++, n++, o++);
		o > 0 && this._cGroup > e && (this._cIndex += o);
	}
	clearGroup(e) {
		if (e < this.length) {
			const t = this.groupSizes[e], n = this.indexOfGroup(e), o = n + t;
			this.groupSizes[e] = 0;
			for (let e = n; e < o; e++) this.tag.deleteRule(n);
			t > 0 && this._cGroup > e && (this._cIndex -= t);
		}
	}
	getGroup(e) {
		let t = "";
		if (e >= this.length || 0 === this.groupSizes[e]) return t;
		const n = this.groupSizes[e], o = this.indexOfGroup(e), s = o + n;
		for (let e = o; e < s; e++) t += this.tag.getRule(e) + d;
		return t;
	}
}, ve = `style[${l}][${a}="${u}"]`, Se = new RegExp(`^${l}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`), be = (e) => "undefined" != typeof ShadowRoot && e instanceof ShadowRoot || "host" in e && 11 === e.nodeType, we = (e) => {
	if (!e) return document;
	if (be(e)) return e;
	if ("getRootNode" in e) {
		const t = e.getRootNode();
		if (be(t)) return t;
	}
	return document;
}, Ne = (e, t, n) => {
	const o = n.split(",");
	let s;
	for (let n = 0, r = o.length; n < r; n++) (s = o[n]) && e.registerName(t, s);
}, Ce = (e, t) => {
	var n;
	const o = (null !== (n = t.textContent) && void 0 !== n ? n : "").split(d), s = [];
	for (let t = 0, n = o.length; t < n; t++) {
		const n = o[t].trim();
		if (!n) continue;
		const r = n.match(Se);
		if (r) {
			const t = 0 | parseInt(r[1], 10), n = r[2];
			0 !== t && (E(n, t), Ne(e, n, r[3]), e.getTag().insertRules(t, s)), s.length = 0;
		} else s.push(n);
	}
}, Pe = (e) => {
	const t = we(e.options.target).querySelectorAll(ve);
	for (let n = 0, o = t.length; n < o; n++) {
		const o = t[n];
		o && o.getAttribute(l) !== c && (Ce(e, o), o.parentNode && o.parentNode.removeChild(o));
	}
};
var Oe = !1;
function Ee() {
	if (!1 !== Oe) return Oe;
	if ("undefined" != typeof document) {
		const e = document.head.querySelector("meta[property=\"csp-nonce\"]");
		if (e) return Oe = e.nonce || e.getAttribute("content") || void 0;
		const t = document.head.querySelector("meta[name=\"sc-nonce\"]");
		if (t) return Oe = t.getAttribute("content") || void 0;
	}
	return Oe = "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : void 0;
}
var Ie = (e, t) => {
	const n = document.head, o = e || n, s = document.createElement("style"), r = ((e) => {
		const t = Array.from(e.querySelectorAll(`style[${l}]`));
		return t[t.length - 1];
	})(o), i = void 0 !== r ? r.nextSibling : null;
	s.setAttribute(l, c), s.setAttribute(a, u);
	const d = t || Ee();
	return d && s.setAttribute("nonce", d), o.insertBefore(s, i), s;
}, Ae = class {
	constructor(e, t) {
		this.element = Ie(e, t), this.element.appendChild(document.createTextNode("")), this.sheet = ((e) => {
			var t;
			if (e.sheet) return e.sheet;
			const n = null !== (t = e.getRootNode().styleSheets) && void 0 !== t ? t : document.styleSheets;
			for (let t = 0, o = n.length; t < o; t++) {
				const o = n[t];
				if (o.ownerNode === e) return o;
			}
			throw S(17);
		})(this.element), this.length = 0;
	}
	insertRule(e, t) {
		try {
			return this.sheet.insertRule(t, e), this.length++, !0;
		} catch (e) {
			return !1;
		}
	}
	deleteRule(e) {
		this.sheet.deleteRule(e), this.length--;
	}
	getRule(e) {
		const t = this.sheet.cssRules[e];
		return t && t.cssText ? t.cssText : "";
	}
}, _e = class {
	constructor(e, t) {
		this.element = Ie(e, t), this.nodes = this.element.childNodes, this.length = 0;
	}
	insertRule(e, t) {
		if (e <= this.length && e >= 0) {
			const n = document.createTextNode(t);
			return this.element.insertBefore(n, this.nodes[e] || null), this.length++, !0;
		}
		return !1;
	}
	deleteRule(e) {
		this.element.removeChild(this.nodes[e]), this.length--;
	}
	getRule(e) {
		return e < this.length ? this.nodes[e].textContent : "";
	}
}, xe = class {
	constructor(e) {
		this.rules = [], this.length = 0;
	}
	insertRule(e, t) {
		return e <= this.length && (e === this.length ? this.rules.push(t) : this.rules.splice(e, 0, t), this.length++, !0);
	}
	deleteRule(e) {
		this.rules.splice(e, 1), this.length--;
	}
	getRule(e) {
		return e < this.length ? this.rules[e] : "";
	}
};
var $e = h;
var Re = {
	isServer: !h,
	useCSSOMInjection: !m
};
var je = class je {
	static registerId(e) {
		return P(e);
	}
	constructor(e = $, t = {}, n) {
		this.options = Object.assign(Object.assign({}, Re), e), this.gs = t, this.keyframeIds = /* @__PURE__ */ new Set(), this.names = new Map(n), this.server = !!e.isServer, !this.server && h && $e && ($e = !1, Pe(this)), ge(this, () => ((e) => {
			const t = e.getTag(), { length: n } = t;
			let o = "";
			for (let s = 0; s < n; s++) {
				const n = O(s);
				if (void 0 === n) continue;
				const r = e.names.get(n);
				if (void 0 === r || !r.size) continue;
				const i = t.getGroup(s);
				if (0 === i.length) continue;
				const c = l + ".g" + s + "[id=\"" + n + "\"]";
				let a = "";
				for (const e of r) e.length > 0 && (a += e + ",");
				o += i + c + "{content:\"" + a + "\"}/*!sc*/\n";
			}
			return o;
		})(this));
	}
	rehydrate() {
		!this.server && h && Pe(this);
	}
	reconstructWithOptions(e, t = !0) {
		const n = new je(Object.assign(Object.assign({}, this.options), e), this.gs, t && this.names || void 0);
		return n.keyframeIds = new Set(this.keyframeIds), !this.server && h && e.target !== this.options.target && we(this.options.target) !== we(e.target) && Pe(n), n;
	}
	allocateGSInstance(e) {
		return this.gs[e] = (this.gs[e] || 0) + 1;
	}
	getTag() {
		return this.tag || (this.tag = (e = (({ isServer: e, useCSSOMInjection: t, target: n, nonce: o }) => e ? new xe(n) : t ? new Ae(n, o) : new _e(n, o))(this.options), new ye(e)));
		var e;
	}
	hasNameForId(e, t) {
		var n, o;
		return null !== (o = null === (n = this.names.get(e)) || void 0 === n ? void 0 : n.has(t)) && void 0 !== o && o;
	}
	registerName(e, t) {
		P(e), e.startsWith(g) && this.keyframeIds.add(e);
		const n = this.names.get(e);
		n ? n.add(t) : this.names.set(e, new Set([t]));
	}
	insertRules(e, t, n) {
		this.registerName(e, t), this.getTag().insertRules(P(e), n);
	}
	clearNames(e) {
		this.names.has(e) && this.names.get(e).clear();
	}
	clearRules(e) {
		this.getTag().clearGroup(P(e)), this.clearNames(e);
	}
	clearTag() {
		this.tag = void 0;
	}
};
var ke = /* @__PURE__ */ new WeakSet(), Te = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexShrink: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
};
function De(e, t) {
	return null == t || "boolean" == typeof t || "" === t ? "" : "number" != typeof t || 0 === t || e in Te || e.startsWith("--") ? String(t).trim() : t + "px";
}
var Me = 47;
function Ve(e) {
	if (45 === e.charCodeAt(0) && 45 === e.charCodeAt(1)) return e;
	let t = "";
	for (let n = 0; n < e.length; n++) {
		const o = e.charCodeAt(n);
		t += o >= 65 && o <= 90 ? "-" + String.fromCharCode(o + 32) : e[n];
	}
	return t.startsWith("ms-") ? "-" + t : t;
}
var Ge = Symbol.for("sc-keyframes");
function Fe(e) {
	return "object" == typeof e && null !== e && Ge in e;
}
function ze(e) {
	return ie(e) && !(e.prototype && e.prototype.isReactComponent);
}
var We = (e) => null == e || !1 === e || "" === e, Be = Symbol.for("react.client.reference");
function Le(e) {
	return e.$$typeof === Be;
}
function He(e, t) {
	for (const n in e) {
		const o = e[n];
		e.hasOwnProperty(n) && !We(o) && (Array.isArray(o) && ke.has(o) || ie(o) ? t.push(Ve(n) + ":", o, ";") : pe(o) ? (t.push(n + " {"), He(o, t), t.push("}")) : t.push(Ve(n) + ": " + De(n, o) + ";"));
	}
}
function Ye(e, t, n, o, s = []) {
	if (We(e)) return s;
	const r = typeof e;
	if ("string" === r) return s.push(e), s;
	if ("function" === r) {
		if (Le(e)) return s;
		if (ze(e) && t) return Ye(e(t), t, n, o, s);
		return s.push(e), s;
	}
	if (Array.isArray(e)) {
		for (let r = 0; r < e.length; r++) Ye(e[r], t, n, o, s);
		return s;
	}
	return ce(e) ? (s.push(`.${e.styledComponentId}`), s) : Fe(e) ? (n ? (e.inject(n, o), s.push(e.getName(o))) : s.push(e), s) : Le(e) ? s : pe(e) ? e.toString !== Object.prototype.toString ? (s.push(e.toString()), s) : (He(e, s), s) : (s.push(e.toString()), s);
}
var Ue = z(u), Je = p ? /* @__PURE__ */ new WeakMap() : null;
function Xe(e, t) {
	if (!Je) return null;
	const n = Je.get(e);
	if (!n) return null;
	const o = t.names.get(e.componentId);
	if (!o) return null;
	let s = "";
	for (const e of o) {
		const t = n.get(e);
		if (!t) return null;
		s += t;
	}
	return s;
}
var Ze = class {
	constructor(e, t, n) {
		this.rules = e, this.componentId = t, this.baseHash = F(Ue, t), this.baseStyle = n, je.registerId(t);
	}
	generateAndInjectStyles(e, t, n) {
		let o = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e, t, n) : "";
		{
			let s = "";
			for (let o = 0; o < this.rules.length; o++) {
				const r = this.rules[o];
				if ("string" == typeof r) s += r;
				else if (r) if (ze(r)) {
					const o = r(e);
					"string" == typeof o ? s += o : null != o && !1 !== o && (s += ue(Ye(o, e, t, n)));
				} else s += ue(Ye(r, e, t, n));
			}
			if (s) {
				this.dynamicNameCache || (this.dynamicNameCache = /* @__PURE__ */ new Map());
				const e = n.hash ? n.hash + s : s;
				let r = this.dynamicNameCache.get(e);
				if (!r) {
					if (r = V(F(F(this.baseHash, n.hash), s) >>> 0), this.dynamicNameCache.size >= 200) {
						const e = this.dynamicNameCache.keys().next().value;
						void 0 !== e && this.dynamicNameCache.delete(e);
					}
					this.dynamicNameCache.set(e, r);
				}
				if (!t.hasNameForId(this.componentId, r)) if (p && function(e, t) {
					var n, o;
					return null !== (o = null === (n = null == Je ? void 0 : Je.get(e)) || void 0 === n ? void 0 : n.has(t)) && void 0 !== o && o;
				}(this, r)) t.registerName(this.componentId, r);
				else {
					const e = n(s, "." + r, void 0, this.componentId);
					p && function(e, t, n) {
						if (!Je) return;
						let o = Je.get(e);
						o || (o = /* @__PURE__ */ new Map(), Je.set(e, o)), o.set(t, de(n));
					}(this, r, e), t.insertRules(this.componentId, r, e);
				}
				o = ae(o, r);
			}
		}
		return o;
	}
};
var Ke = /&/g;
function Qe(e, t) {
	let n = 0;
	for (; --t >= 0 && 92 === e.charCodeAt(t);) n++;
	return !(1 & ~n);
}
function et(e) {
	const t = e.length;
	let n = "", o = 0, s = 0, r = 0, i = !1, l = !1;
	for (let c = 0; c < t; c++) {
		const a = e.charCodeAt(c);
		if (0 !== r || i || a !== Me || 42 !== e.charCodeAt(c + 1)) if (i) 42 === a && e.charCodeAt(c + 1) === Me && (i = !1, c++);
		else if (34 !== a && 39 !== a || Qe(e, c)) {
			if (0 === r) if (123 === a) s++;
			else if (125 === a) {
				if (s--, s < 0) {
					l = !0;
					let n = c + 1;
					for (; n < t;) {
						const t = e.charCodeAt(n);
						if (59 === t || 10 === t) break;
						n++;
					}
					n < t && 59 === e.charCodeAt(n) && n++, s = 0, c = n - 1, o = n;
					continue;
				}
				0 === s && (n += e.substring(o, c + 1), o = c + 1);
			} else 59 === a && 0 === s && (n += e.substring(o, c + 1), o = c + 1);
		} else 0 === r ? r = a : r === a && (r = 0);
		else i = !0, c++;
	}
	return l || 0 !== s || 0 !== r ? (o < t && 0 === s && 0 === r && (n += e.substring(o)), n) : e;
}
function tt(e, t) {
	const n = t + " ", o = "," + n;
	for (let s = 0; s < e.length; s++) {
		const r = e[s];
		if ("rule" === r.type) {
			r.value = (n + r.value).replaceAll(",", o);
			const e = r.props, t = [];
			for (let o = 0; o < e.length; o++) t[o] = n + e[o];
			r.props = t;
		}
		Array.isArray(r.children) && "@keyframes" !== r.type && tt(r.children, t);
	}
	return e;
}
function nt({ options: e = $, plugins: t = x } = $) {
	let n, s, r;
	const i = (e, t, o) => o.startsWith(s) && o.endsWith(s) && o.replaceAll(s, "").length > 0 ? `.${n}` : e, l = t.slice();
	l.push((e) => {
		e.type === "rule" && e.value.includes("&") && (r || (r = new RegExp(`\\${s}\\b`, "g")), e.props[0] = e.props[0].replace(Ke, s).replace(r, i));
	}), e.prefix && l.push(prefixer), l.push(stringify);
	let c = [];
	const a = middleware(l.concat(rulesheet((e) => c.push(e)))), u = (t, i = "", l = "", u = "&") => {
		n = u, s = i, r = void 0;
		const d = function(e) {
			const t = -1 !== e.indexOf("//"), n = -1 !== e.indexOf("}");
			if (!t && !n) return e;
			if (!t) return et(e);
			const o = e.length;
			let s = "", r = 0, i = 0, l = 0, c = 0, a = 0, u = !1;
			for (; i < o;) {
				const t = e.charCodeAt(i);
				if (34 !== t && 39 !== t || Qe(e, i)) if (0 === l) if (t === Me && i + 1 < o && 42 === e.charCodeAt(i + 1)) {
					for (i += 2; i + 1 < o && (42 !== e.charCodeAt(i) || e.charCodeAt(i + 1) !== Me);) i++;
					i += 2;
				} else if (40 !== t) if (41 !== t) if (c > 0) i++;
				else if (42 === t && i + 1 < o && e.charCodeAt(i + 1) === Me) s += e.substring(r, i), i += 2, r = i, u = !0;
				else if (t === Me && i + 1 < o && e.charCodeAt(i + 1) === Me) {
					for (s += e.substring(r, i); i < o && 10 !== e.charCodeAt(i);) i++;
					r = i, u = !0;
				} else 123 === t ? a++ : 125 === t && a--, i++;
				else c > 0 && c--, i++;
				else c++, i++;
				else i++;
				else 0 === l ? l = t : l === t && (l = 0), i++;
			}
			return u ? (r < o && (s += e.substring(r)), 0 === a ? s : et(s)) : 0 === a ? e : et(e);
		}(t);
		let h = compile(l || i ? l + " " + i + " { " + d + " }" : d);
		return e.namespace && (h = tt(h, e.namespace)), c = [], serialize(h, a), c;
	}, d = e;
	let h = G;
	for (let e = 0; e < t.length; e++) t[e].name || S(15), h = F(h, t[e].name);
	return null != d && d.namespace && (h = F(h, d.namespace)), null != d && d.prefix && (h = F(h, "p")), u.hash = h !== G ? h.toString() : "", u;
}
var ot, st, rt;
var it = new je(), lt = nt();
var ct, at = null, ut = lt;
var dt = p && null !== (rt = null === (st = (ot = import_react.default).cache) || void 0 === st ? void 0 : st.call(ot, () => {
	it.names.clear(), it.keyframeIds.clear(), it.clearTag(), at = null;
})) && void 0 !== rt ? rt : null, ht = {
	shouldForwardProp: void 0,
	styleSheet: it,
	stylis: lt,
	stylisPlugins: void 0
}, pt = p ? {
	Provider: ({ children: e }) => e,
	Consumer: ({ children: e }) => e(ht)
} : import_react.createContext(ht), ft = pt.Consumer;
function mt() {
	return p ? (dt && dt(), at || ht) : import_react.useContext(pt);
}
function gt(e) {
	var n, o, s;
	if (p) {
		dt && dt();
		const t = at || ht, s = void 0 !== e.stylisPlugins || void 0 !== e.namespace || void 0 !== e.enableVendorPrefixes;
		s && (e.stylisPlugins && e.stylisPlugins !== ct ? (ct = e.stylisPlugins, ut = nt({
			options: {
				namespace: e.namespace,
				prefix: e.enableVendorPrefixes
			},
			plugins: e.stylisPlugins
		})) : void 0 === e.namespace && void 0 === e.enableVendorPrefixes || (ut = nt({
			options: {
				namespace: e.namespace,
				prefix: e.enableVendorPrefixes
			},
			plugins: null !== (n = e.stylisPlugins) && void 0 !== n ? n : t.stylisPlugins
		})));
		const r = s ? void 0 === e.stylisPlugins || e.stylisPlugins.length ? ut : lt : t.stylis, i = "shouldForwardProp" in e ? e.shouldForwardProp : t.shouldForwardProp, l = null !== (o = e.stylisPlugins) && void 0 !== o ? o : t.stylisPlugins;
		return at = r !== lt || i ? {
			shouldForwardProp: i,
			styleSheet: it,
			stylis: r,
			stylisPlugins: l
		} : null, e.children;
	}
	const r = mt(), { styleSheet: i } = r, l = import_react.useMemo(() => {
		let t = i;
		return e.sheet ? t = e.sheet : e.target ? t = t.reconstructWithOptions(void 0 !== e.nonce ? {
			target: e.target,
			nonce: e.nonce
		} : { target: e.target }, !1) : void 0 !== e.nonce && (t = t.reconstructWithOptions({ nonce: e.nonce })), e.disableCSSOMInjection && (t = t.reconstructWithOptions({ useCSSOMInjection: !1 })), t;
	}, [
		e.disableCSSOMInjection,
		e.nonce,
		e.sheet,
		e.target,
		i
	]), c = import_react.useMemo(() => {
		var t;
		return void 0 === e.stylisPlugins && void 0 === e.namespace && void 0 === e.enableVendorPrefixes ? r.stylis : nt({
			options: {
				namespace: e.namespace,
				prefix: e.enableVendorPrefixes
			},
			plugins: null !== (t = e.stylisPlugins) && void 0 !== t ? t : r.stylisPlugins
		});
	}, [
		e.enableVendorPrefixes,
		e.namespace,
		e.stylisPlugins,
		r.stylis,
		r.stylisPlugins
	]), a = "shouldForwardProp" in e ? e.shouldForwardProp : r.shouldForwardProp, u = null !== (s = e.stylisPlugins) && void 0 !== s ? s : r.stylisPlugins, d = import_react.useMemo(() => ({
		shouldForwardProp: a,
		styleSheet: l,
		stylis: c,
		stylisPlugins: u
	}), [
		a,
		l,
		c,
		u
	]);
	return import_react.createElement(pt.Provider, { value: d }, e.children);
}
var yt = p ? {
	Provider: ({ children: e }) => e,
	Consumer: ({ children: e }) => e(void 0)
} : import_react.createContext(void 0), vt = yt.Consumer;
function St() {
	const e = p ? void 0 : import_react.useContext(yt);
	if (!e) throw S(18);
	return e;
}
function bt(e) {
	if (p) return e.children;
	const n = import_react.useContext(yt), o = import_react.useMemo(() => function(e, t) {
		if (!e) throw S(14);
		if (ie(e)) return e(t);
		if (Array.isArray(e) || "object" != typeof e) throw S(8);
		return t ? Object.assign(Object.assign({}, t), e) : e;
	}(e.theme, n), [e.theme, n]);
	return e.children ? import_react.createElement(yt.Provider, { value: o }, e.children) : null;
}
var wt = {};
function Nt(e, t) {
	const n = "string" != typeof e ? "sc" : T(e);
	wt[n] = (wt[n] || 0) + 1;
	const o = n + "-" + W(u + n + wt[n]);
	return t ? t + "-" + o : o;
}
var Pt = me(() => /* @__PURE__ */ new Set()), Ot = /* @__PURE__ */ new Map();
function Et(e) {
	let t = Ot.get(e);
	return t || (t = new RegExp("\\." + e + "(?![a-zA-Z0-9_-])", "g"), Ot.set(e, t)), t;
}
function It(e, t, n) {
	const o = n.names.get(t);
	if (o) for (const t of o) {
		const n = Et(t);
		n.lastIndex = 0, e = e.replace(n, ":where(." + t + ")");
	}
	return e;
}
function At(o, s, r) {
	const i = ce(o), c = o, a = !L(o), { attrs: u = x, componentId: h = Nt(s.displayName, s.parentComponentId), displayName: f = q(o) } = s, m = s.displayName && s.componentId ? T(s.displayName) + "-" + s.componentId : s.componentId || h, g = i && c.attrs ? c.attrs.concat(u).filter(Boolean) : u;
	let { shouldForwardProp: y } = s;
	if (i && c.shouldForwardProp) {
		const e = c.shouldForwardProp;
		if (s.shouldForwardProp) {
			const t = s.shouldForwardProp;
			y = (n, o) => e(n, o) && t(n, o);
		} else y = e;
	}
	const v = new Ze(r, m, i ? c.componentStyle : void 0);
	function S(o, s) {
		return function(o, s, r) {
			const { attrs: i, componentStyle: c, defaultProps: a, foldedComponentIds: u, styledComponentId: h, target: f } = o, m = p ? void 0 : import_react.useContext(yt), g = mt(), y = o.shouldForwardProp || g.shouldForwardProp;
			const v = R(s, m, a) || (p ? void 0 : $);
			let S, b;
			S = function(e, t, n) {
				const o = Object.assign(Object.assign({}, t), {
					className: void 0,
					theme: n
				}), s = e.length > 1;
				for (let n = 0; n < e.length; n++) {
					const r = e[n], i = ie(r) ? r(s ? Object.assign({}, o) : o) : r;
					for (const e in i) "className" === e ? o.className = ae(o.className, i[e]) : "style" === e ? o.style = Object.assign(Object.assign({}, o.style), i[e]) : e in t && void 0 === t[e] || (o[e] = i[e]);
				}
				return "className" in t && "string" == typeof t.className && (o.className = ae(o.className, t.className)), o;
			}(i, s, v), b = function(e, n, o, s) {
				return e.generateAndInjectStyles(n, o, s);
			}(c, S, g.styleSheet, g.stylis);
			const w = S.as || f, N = function(t, n, o, s) {
				const r = {};
				for (const i in t) void 0 === t[i] || "$" === i[0] || "as" === i || "theme" === i && t.theme === o || ("forwardedAs" === i ? r.as = t.forwardedAs : s && !s(i, n) || (r[i] = t[i]));
				return r;
			}(S, w, v, y);
			let C = ae(u, h);
			b && (C += " " + b), S.className && (C += " " + S.className), N[L(w) && w.includes("-") ? "class" : "className"] = C, r && (N.ref = r);
			const O = (0, import_react.createElement)(w, N);
			if (p) {
				const e = Pt ? Pt() : null;
				let n = null, o = 0, s = "", r = !0, i = c;
				for (; i;) {
					const t = g.styleSheet.names.get(i.componentId);
					if (t) {
						o += t.size;
						for (const o of t) e && e.has(o) || (n || (n = []), n.push(o), e && e.add(o));
					}
					if (n && r) {
						let e = Xe(i, g.styleSheet);
						null === e ? r = !1 : (i !== c && (e = It(e, i.componentId, g.styleSheet)), s = e + s);
					}
					i = i.baseStyle;
				}
				if (n && !r) {
					s = "";
					const e = g.styleSheet.getTag();
					let t = c;
					for (; t;) {
						let n = e.getGroup(P(t.componentId));
						n && t !== c && (n = It(n, t.componentId, g.styleSheet)), s = n + s, t = t.baseStyle;
					}
				}
				let a = "";
				if (g.styleSheet.keyframeIds.size > 0) {
					const t = g.styleSheet.getTag();
					for (const n of g.styleSheet.keyframeIds) {
						if (e && e.has(n)) continue;
						const o = t.getGroup(P(n));
						o && (a += o, e && e.add(n));
					}
				}
				if (s && e && n && n.length < o) {
					const e = s.split(d);
					let t = "";
					for (let o = 0; o < e.length; o++) {
						const s = e[o];
						if (s) for (let e = 0; e < n.length; e++) {
							const o = Et(n[e]);
							if (o.lastIndex = 0, o.test(s)) {
								t += s + d;
								break;
							}
						}
					}
					s = t;
				}
				const u = he(a + s);
				if (u) {
					const e = import_react.createElement("style", {
						[l]: "",
						key: "sc-" + c.componentId,
						children: u
					});
					return import_react.createElement(import_react.Fragment, null, e, O);
				}
			}
			return O;
		}(b, o, s);
	}
	S.displayName = f;
	let b = import_react.forwardRef(S);
	return b.attrs = g, b.componentStyle = v, b.displayName = f, b.shouldForwardProp = y, b.foldedComponentIds = i ? ae(c.foldedComponentIds, c.styledComponentId) : "", b.styledComponentId = m, b.target = i ? c.target : o, Object.defineProperty(b, "defaultProps", {
		get() {
			return this._foldedDefaultProps;
		},
		set(e) {
			this._foldedDefaultProps = i ? function(e, ...t) {
				for (const n of t) fe(e, n, !0);
				return e;
			}({}, c.defaultProps, e) : e;
		}
	}), ge(b, () => `.${b.styledComponentId}`), a && re(b, o, {
		attrs: !0,
		componentStyle: !0,
		displayName: !0,
		foldedComponentIds: !0,
		shouldForwardProp: !0,
		styledComponentId: !0,
		target: !0
	}), b;
}
var _t = new Set([
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"bdi",
	"bdo",
	"blockquote",
	"body",
	"button",
	"br",
	"canvas",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"map",
	"mark",
	"menu",
	"meter",
	"nav",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"search",
	"section",
	"select",
	"slot",
	"small",
	"span",
	"strong",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"u",
	"ul",
	"var",
	"video",
	"wbr",
	"circle",
	"clipPath",
	"defs",
	"ellipse",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"filter",
	"foreignObject",
	"g",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"stop",
	"svg",
	"switch",
	"symbol",
	"text",
	"textPath",
	"tspan",
	"use"
]);
function xt(e, t) {
	const n = [e[0]];
	for (let o = 0, s = t.length; o < s; o += 1) n.push(t[o], e[o + 1]);
	return n;
}
var $t = (e) => (ke.add(e), e);
function Rt(e, ...t) {
	if (ie(e) || pe(e)) return $t(Ye(xt(x, [e, ...t])));
	const n = e;
	return 0 === t.length && 1 === n.length && "string" == typeof n[0] ? Ye(n) : $t(Ye(xt(n, t)));
}
function jt(e, t, n = $) {
	if (!t) throw S(1, t);
	const o = (o, ...s) => e(t, n, Rt(o, ...s));
	return o.attrs = (o) => jt(e, t, Object.assign(Object.assign({}, n), { attrs: Array.prototype.concat(n.attrs, o).filter(Boolean) })), o.withConfig = (o) => jt(e, t, Object.assign(Object.assign({}, n), o)), o;
}
var kt = (e) => jt(At, e), Tt = kt;
_t.forEach((e) => {
	Tt[e] = kt(e);
});
var Dt = class {
	constructor(e, t) {
		this.instanceRules = /* @__PURE__ */ new Map(), this.rules = e, this.componentId = t, this.isStatic = function(e) {
			for (let t = 0; t < e.length; t += 1) {
				const n = e[t];
				if (ie(n) && !ce(n)) return !1;
			}
			return !0;
		}(e), je.registerId(this.componentId);
	}
	removeStyles(e, t) {
		this.instanceRules.delete(e), this.rebuildGroup(t);
	}
	renderStyles(e, t, n, o) {
		const s = this.componentId;
		if (this.isStatic) {
			if (n.hasNameForId(s, s + e)) this.instanceRules.has(e) || this.computeRules(e, t, n, o);
			else {
				const r = this.computeRules(e, t, n, o);
				n.insertRules(s, r.name, r.rules);
			}
			return;
		}
		const r = this.instanceRules.get(e);
		if (this.computeRules(e, t, n, o), !n.server && r) {
			const t = r.rules, n = this.instanceRules.get(e).rules;
			if (t.length === n.length) {
				let e = !0;
				for (let o = 0; o < t.length; o++) if (t[o] !== n[o]) {
					e = !1;
					break;
				}
				if (e) return;
			}
		}
		this.rebuildGroup(n);
	}
	computeRules(e, t, n, o) {
		const s = ue(Ye(this.rules, t, n, o)), r = {
			name: this.componentId + e,
			rules: o(s, "")
		};
		return this.instanceRules.set(e, r), r;
	}
	rebuildGroup(e) {
		const t = this.componentId;
		e.clearRules(t);
		for (const n of this.instanceRules.values()) e.insertRules(t, n.name, n.rules);
	}
};
var Mt = me(() => /* @__PURE__ */ new Set());
function Vt(e, ...n) {
	const o = Rt(e, ...n), s = `sc-global-${W(JSON.stringify(o))}`, r = new Dt(o, s);
	const i = (e) => {
		const n = mt(), l = p ? void 0 : import_react.useContext(yt);
		let c;
		if (c = n.styleSheet.allocateGSInstance(s), (p || n.styleSheet.server) && function(e, t, n, o, s) {
			if (r.isStatic) r.renderStyles(e, y, n, s);
			else {
				const l = Object.assign(Object.assign({}, t), { theme: R(t, o, i.defaultProps) });
				r.renderStyles(e, l, n, s);
			}
		}(c, e, n.styleSheet, l, n.stylis), p) {
			const e = "undefined" == typeof window ? r.instanceRules.get(c) : void 0, o = e ? de(e.rules) : "";
			if (o) {
				r.instanceRules.delete(c);
				const e = Mt ? Mt() : null;
				if (e) {
					const t = r.isStatic ? s + n.stylis.hash : o;
					if (e.has(t)) return null;
					e.add(t);
				}
				return import_react.createElement("style", {
					key: s + "-" + c,
					"data-styled-global": s,
					children: he(o)
				});
			}
		}
		return r.instanceRules.delete(c), null;
	};
	return import_react.memo(i);
}
function Gt(e, t, n, o, s) {
	for (const r in e) {
		const i = e[r], l = s ? s + "-" + r : r;
		if ("object" == typeof i && null !== i) {
			const e = {};
			Gt(i, t, e, o, l), n[r] = e;
		} else n[r] = o(l, i, r);
	}
}
function Ft(e, t, n, o) {
	let s = "";
	for (const r in e) {
		const i = e[r], l = t[r], c = o ? o + "-" + r : r;
		"object" == typeof i && null !== i ? "object" == typeof l && null !== l && (s += Ft(i, l, n, c)) : void 0 !== l && "function" != typeof l && (s += "--" + n + c + ":" + l + ";");
	}
	return s;
}
function zt(e, t) {
	var n, o;
	const s = (null !== (n = null == t ? void 0 : t.prefix) && void 0 !== n ? n : "sc") + "-", r = null !== (o = null == t ? void 0 : t.selector) && void 0 !== o ? o : ":root", i = function(e, t) {
		const n = {};
		return Gt(e, t, n, (e) => "--" + t + e), n;
	}(e, s), l = function(e, t) {
		const n = {};
		return Gt(e, t, n, (e, n) => {
			return "var(--" + t + e + ", " + n + ")";
		}), n;
	}(e, s), c = Vt`
    ${r} {
      ${(t) => Ft(e, t.theme, s)}
    }
  `;
	return Object.assign(l, {
		GlobalStyle: c,
		raw: e,
		vars: i,
		resolve(t) {
			if (!h) throw new Error("createTheme.resolve() is client-only");
			const n = null != t ? t : document.documentElement;
			return function(e, t, n) {
				const o = {};
				return Gt(e, t, o, (e, o) => n.getPropertyValue("--" + t + e).trim() || o), o;
			}(e, s, getComputedStyle(n));
		}
	});
}
var Wt;
var Bt = p ? /* @__PURE__ */ new WeakMap() : null;
var Lt = class {
	constructor(e, t) {
		this[Wt] = !0, this.inject = (e, t = lt) => {
			var n;
			const o = this.getName(t);
			if (!e.hasNameForId(this.id, o)) {
				const s = t.hash || "", r = p ? null === (n = null == Bt ? void 0 : Bt.get(this)) || void 0 === n ? void 0 : n.get(s) : void 0;
				if (r) e.insertRules(this.id, o, r);
				else {
					const n = t(this.rules, o, "@keyframes");
					if (p && Bt) {
						let e = Bt.get(this);
						e || (e = /* @__PURE__ */ new Map(), Bt.set(this, e)), e.set(s, n);
					}
					e.insertRules(this.id, o, n);
				}
			}
		}, this.name = e, this.id = g + e, this.rules = t, P(this.id), ge(this, () => {
			throw S(12, String(this.name));
		});
	}
	getName(e = lt) {
		return e.hash ? this.name + V(+e.hash >>> 0) : this.name;
	}
};
function qt(e, ...t) {
	const n = ue(Rt(e, ...t));
	return new Lt(W(n), n);
}
function Ht(e) {
	const n = import_react.forwardRef((n, o) => {
		const s = R(n, p ? void 0 : import_react.useContext(yt), e.defaultProps);
		return import_react.createElement(e, Object.assign(Object.assign({}, n), {
			theme: s,
			ref: o
		}));
	});
	return n.displayName = `WithTheme(${B(e)})`, re(n, e);
}
Wt = Ge;
var Yt = /^\s*<\/[a-z]/i;
var Ut = class {
	constructor({ nonce: e } = {}) {
		this._emitSheetCSS = () => {
			const e = this.instance.toString();
			if (!e) return "";
			const t = this.instance.options.nonce || Ee();
			return `<style ${ue([
				t && `nonce="${t}"`,
				`${l}="true"`,
				`${a}="${u}"`
			].filter(Boolean), " ")}>${e}</style>`;
		}, this.getStyleTags = () => {
			if (this.sealed) throw S(2);
			return this._emitSheetCSS();
		}, this.getStyleElement = () => {
			if (this.sealed) throw S(2);
			const e = this.instance.toString();
			if (!e) return [];
			const n = {
				[l]: "",
				[a]: u,
				dangerouslySetInnerHTML: { __html: e }
			}, o = this.instance.options.nonce || Ee();
			return o && (n.nonce = o), [import_react.createElement("style", Object.assign({}, n, { key: "sc-0-0" }))];
		}, this.seal = () => {
			this.sealed = !0;
		}, this.instance = new je({
			isServer: !0,
			nonce: e
		}), this.sealed = !1;
	}
	collectStyles(e) {
		if (this.sealed) throw S(2);
		return import_react.createElement(gt, { sheet: this.instance }, e);
	}
	interleaveWithNodeStream(e) {
		if (this.sealed) throw S(2);
		this.seal();
		const { Transform: t } = __require("stream"), { instance: n, _emitSheetCSS: o } = this, s = new t({ transform: function(e, t, s) {
			const r = e.toString(), i = o();
			if (n.clearTag(), Yt.test(r)) {
				const e = r.indexOf(">") + 1, t = r.slice(0, e), n = r.slice(e);
				this.push(t + i + n);
			} else this.push(i + r);
			s();
		} });
		if ("on" in e && "function" == typeof e.on && "pipe" in e) {
			const t = e;
			return t.on("error", (e) => {
				s.emit("error", e);
			}), t.pipe(s);
		}
		if ("pipe" in e && "function" == typeof e.pipe) return e.pipe(s);
		throw new Error("Unsupported stream type");
	}
};
var Jt = {
	StyleSheet: je,
	mainSheet: it
};
`${l}`;
var Zt = /:(?:(first)-child|(last)-child|(only)-child|(nth-child)\(([^()]+)\)|(nth-last-child)\(([^()]+)\))/g, Kt = `:not(style[${l}])`, Qt = `style[${l}]`;
function en(e) {
	return -1 === e.indexOf("-child") ? e : (Zt.lastIndex = 0, e.replace(Zt, (e, t, n, o, s, r, i, l) => t ? `:nth-child(1 of ${Kt})` : n ? `:nth-last-child(1 of ${Kt})` : o ? `:nth-child(1 of ${Kt}):nth-last-child(1 of ${Kt})` : s ? -1 !== r.indexOf(" of ") ? e : `:nth-child(${r} of ${Kt})` : -1 !== l.indexOf(" of ") ? e : `:nth-last-child(${l} of ${Kt})`));
}
function tn(e, t) {
	if (-1 === e.indexOf("+")) return;
	let n = 0, o = 0;
	for (let s = 0; s < e.length; s++) {
		const r = e.charCodeAt(s);
		if (40 === r) n++;
		else if (41 === r) n--;
		else if (91 === r) o++;
		else if (93 === r) o--;
		else if (43 === r && 0 === n && 0 === o && !Qe(e, s)) {
			const n = e.substring(0, s), o = e.substring(s + 1);
			t.push(n + "+" + Qt + "+" + o), t.push(n + "+" + Qt + "+" + Qt + "+" + o);
		}
	}
}
function nn(e) {
	if (e.type === "rule") {
		const t = e.props, n = [];
		for (let e = 0; e < t.length; e++) {
			const o = en(t[e]);
			n.push(o), tn(o, n);
		}
		e.props = n;
	}
}
//#endregion
export { styled_components_esm_exports as n, Tt as t };
