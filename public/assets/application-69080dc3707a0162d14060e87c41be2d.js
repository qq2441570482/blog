/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement("a");
      originAnchor.href = location.href;
      var urlAnchor = document.createElement("a");

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + "//" + originAnchor.host ===
            urlAnchor.protocol + "//" + urlAnchor.host));      //
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {


}).call(this);
/* =========================================================
 * bootstrap-datetimepicker.js
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Improvements by Sébastien Malot
 * Improvements by Yun Lai
 * Improvements by Kenneth Henderick
 * Project URL : http://www.malot.fr/bootstrap-datetimepicker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

/*
 * Improvement by CuGBabyBeaR @ 2013-09-12
 *
 * Make it work in bootstrap v3
 */


!function ($) {

	function UTCDate() {
		return new Date(Date.UTC.apply(Date, arguments));
	}

	function UTCToday() {
		var today = new Date();
		return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds(), 0);
	}

	// Picker object

	var Datetimepicker = function (element, options) {
		var that = this;

		this.element = $(element);

		// add container for single page application
		// when page switch the datetimepicker div will be removed also.
		this.container = options.container || 'body';

		this.language = options.language || this.element.data('date-language') || "en";
		this.language = this.language in dates ? this.language : "en";
		this.isRTL = dates[this.language].rtl || false;
		this.formatType = options.formatType || this.element.data('format-type') || 'standard';
		this.format = DPGlobal.parseFormat(options.format || this.element.data('date-format') || dates[this.language].format || DPGlobal.getDefaultFormat(this.formatType, 'input'), this.formatType);
		this.isInline = false;
		this.isVisible = false;
		this.isInput = this.element.is('input');
		this.fontAwesome = options.fontAwesome || this.element.data('font-awesome') || false;

		this.bootcssVer = options.bootcssVer || (this.isInput ? (this.element.is('.form-control') ? 3 : 2) : ( this.bootcssVer = this.element.is('.input-group') ? 3 : 2 ));

		this.component = this.element.is('.date') ? ( this.bootcssVer == 3 ? this.element.find('.input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar, .input-group-addon .glyphicon-calendar, .input-group-addon .fa-calendar, .input-group-addon .fa-clock-o').parent() : this.element.find('.add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar .fa-calendar .fa-clock-o').parent()) : false;
		this.componentReset = this.element.is('.date') ? ( this.bootcssVer == 3 ? this.element.find(".input-group-addon .glyphicon-remove, .input-group-addon .fa-times").parent():this.element.find(".add-on .icon-remove, .add-on .fa-times").parent()) : false;
		this.hasInput = this.component && this.element.find('input').length;
		if (this.component && this.component.length === 0) {
			this.component = false;
		}
		this.linkField = options.linkField || this.element.data('link-field') || false;
		this.linkFormat = DPGlobal.parseFormat(options.linkFormat || this.element.data('link-format') || DPGlobal.getDefaultFormat(this.formatType, 'link'), this.formatType);
		this.minuteStep = options.minuteStep || this.element.data('minute-step') || 5;
		this.pickerPosition = options.pickerPosition || this.element.data('picker-position') || 'bottom-right';
		this.showMeridian = options.showMeridian || this.element.data('show-meridian') || false;
		this.initialDate = options.initialDate || new Date();
		this.zIndex = options.zIndex || this.element.data('z-index') || undefined;

		this.icons = {
			leftArrow: this.fontAwesome ? 'fa-arrow-left' : (this.bootcssVer === 3 ? 'glyphicon-arrow-left' : 'icon-arrow-left'),
			rightArrow: this.fontAwesome ? 'fa-arrow-right' : (this.bootcssVer === 3 ? 'glyphicon-arrow-right' : 'icon-arrow-right')
		};
		this.icontype = this.fontAwesome ? 'fa' : 'glyphicon';

		this._attachEvents();

		this.formatViewType = "datetime";
		if ('formatViewType' in options) {
			this.formatViewType = options.formatViewType;
		} else if ('formatViewType' in this.element.data()) {
			this.formatViewType = this.element.data('formatViewType');
		}

		this.minView = 0;
		if ('minView' in options) {
			this.minView = options.minView;
		} else if ('minView' in this.element.data()) {
			this.minView = this.element.data('min-view');
		}
		this.minView = DPGlobal.convertViewMode(this.minView);

		this.maxView = DPGlobal.modes.length - 1;
		if ('maxView' in options) {
			this.maxView = options.maxView;
		} else if ('maxView' in this.element.data()) {
			this.maxView = this.element.data('max-view');
		}
		this.maxView = DPGlobal.convertViewMode(this.maxView);

		this.wheelViewModeNavigation = false;
		if ('wheelViewModeNavigation' in options) {
			this.wheelViewModeNavigation = options.wheelViewModeNavigation;
		} else if ('wheelViewModeNavigation' in this.element.data()) {
			this.wheelViewModeNavigation = this.element.data('view-mode-wheel-navigation');
		}

		this.wheelViewModeNavigationInverseDirection = false;

		if ('wheelViewModeNavigationInverseDirection' in options) {
			this.wheelViewModeNavigationInverseDirection = options.wheelViewModeNavigationInverseDirection;
		} else if ('wheelViewModeNavigationInverseDirection' in this.element.data()) {
			this.wheelViewModeNavigationInverseDirection = this.element.data('view-mode-wheel-navigation-inverse-dir');
		}

		this.wheelViewModeNavigationDelay = 100;
		if ('wheelViewModeNavigationDelay' in options) {
			this.wheelViewModeNavigationDelay = options.wheelViewModeNavigationDelay;
		} else if ('wheelViewModeNavigationDelay' in this.element.data()) {
			this.wheelViewModeNavigationDelay = this.element.data('view-mode-wheel-navigation-delay');
		}

		this.startViewMode = 2;
		if ('startView' in options) {
			this.startViewMode = options.startView;
		} else if ('startView' in this.element.data()) {
			this.startViewMode = this.element.data('start-view');
		}
		this.startViewMode = DPGlobal.convertViewMode(this.startViewMode);
		this.viewMode = this.startViewMode;

		this.viewSelect = this.minView;
		if ('viewSelect' in options) {
			this.viewSelect = options.viewSelect;
		} else if ('viewSelect' in this.element.data()) {
			this.viewSelect = this.element.data('view-select');
		}
		this.viewSelect = DPGlobal.convertViewMode(this.viewSelect);

		this.forceParse = true;
		if ('forceParse' in options) {
			this.forceParse = options.forceParse;
		} else if ('dateForceParse' in this.element.data()) {
			this.forceParse = this.element.data('date-force-parse');
		}
		var template = this.bootcssVer === 3 ? DPGlobal.templateV3 : DPGlobal.template;
		while (template.indexOf('{iconType}') !== -1) {
			template = template.replace('{iconType}', this.icontype);
		}
		while (template.indexOf('{leftArrow}') !== -1) {
			template = template.replace('{leftArrow}', this.icons.leftArrow);
		}
		while (template.indexOf('{rightArrow}') !== -1) {
			template = template.replace('{rightArrow}', this.icons.rightArrow);
		}
		this.picker = $(template)
			.appendTo(this.isInline ? this.element : this.container) // 'body')
			.on({
				click:     $.proxy(this.click, this),
				mousedown: $.proxy(this.mousedown, this)
			});

		if (this.wheelViewModeNavigation) {
			if ($.fn.mousewheel) {
				this.picker.on({mousewheel: $.proxy(this.mousewheel, this)});
			} else {
				console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option");
			}
		}

		if (this.isInline) {
			this.picker.addClass('datetimepicker-inline');
		} else {
			this.picker.addClass('datetimepicker-dropdown-' + this.pickerPosition + ' dropdown-menu');
		}
		if (this.isRTL) {
			this.picker.addClass('datetimepicker-rtl');
			var selector = this.bootcssVer === 3 ? '.prev span, .next span' : '.prev i, .next i';
			this.picker.find(selector).toggleClass(this.icons.leftArrow + ' ' + this.icons.rightArrow);
		}
		$(document).on('mousedown', function (e) {
			// Clicked outside the datetimepicker, hide it
			if ($(e.target).closest('.datetimepicker').length === 0) {
				that.hide();
			}
		});

		this.autoclose = false;
		if ('autoclose' in options) {
			this.autoclose = options.autoclose;
		} else if ('dateAutoclose' in this.element.data()) {
			this.autoclose = this.element.data('date-autoclose');
		}

		this.keyboardNavigation = true;
		if ('keyboardNavigation' in options) {
			this.keyboardNavigation = options.keyboardNavigation;
		} else if ('dateKeyboardNavigation' in this.element.data()) {
			this.keyboardNavigation = this.element.data('date-keyboard-navigation');
		}

		this.todayBtn = (options.todayBtn || this.element.data('date-today-btn') || false);
		this.todayHighlight = (options.todayHighlight || this.element.data('date-today-highlight') || false);

		this.weekStart = ((options.weekStart || this.element.data('date-weekstart') || dates[this.language].weekStart || 0) % 7);
		this.weekEnd = ((this.weekStart + 6) % 7);
		this.startDate = -Infinity;
		this.endDate = Infinity;
		this.daysOfWeekDisabled = [];
		this.setStartDate(options.startDate || this.element.data('date-startdate'));
		this.setEndDate(options.endDate || this.element.data('date-enddate'));
		this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data('date-days-of-week-disabled'));
		this.setMinutesDisabled(options.minutesDisabled || this.element.data('date-minute-disabled'));
		this.setHoursDisabled(options.hoursDisabled || this.element.data('date-hour-disabled'));
		this.fillDow();
		this.fillMonths();
		this.update();
		this.showMode();

		if (this.isInline) {
			this.show();
		}
	};

	Datetimepicker.prototype = {
		constructor: Datetimepicker,

		_events:       [],
		_attachEvents: function () {
			this._detachEvents();
			if (this.isInput) { // single input
				this._events = [
					[this.element, {
						focus:   $.proxy(this.show, this),
						keyup:   $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput) { // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus:   $.proxy(this.show, this),
						keyup:   $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
				if (this.componentReset) {
					this._events.push([
						this.componentReset,
						{click: $.proxy(this.reset, this)}
					]);
				}
			}
			else if (this.element.is('div')) {  // inline datetimepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			for (var i = 0, el, ev; i < this._events.length; i++) {
				el = this._events[i][0];
				ev = this._events[i][1];
				el.on(ev);
			}
		},

		_detachEvents: function () {
			for (var i = 0, el, ev; i < this._events.length; i++) {
				el = this._events[i][0];
				ev = this._events[i][1];
				el.off(ev);
			}
			this._events = [];
		},

		show: function (e) {
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			if (this.forceParse) {
				this.update();
			}
			this.place();
			$(window).on('resize', $.proxy(this.place, this));
			if (e) {
				e.stopPropagation();
				e.preventDefault();
			}
			this.isVisible = true;
			this.element.trigger({
				type: 'show',
				date: this.date
			});
		},

		hide: function (e) {
			if (!this.isVisible) return;
			if (this.isInline) return;
			this.picker.hide();
			$(window).off('resize', this.place);
			this.viewMode = this.startViewMode;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown', this.hide);
			}

			if (
				this.forceParse &&
					(
						this.isInput && this.element.val() ||
							this.hasInput && this.element.find('input').val()
						)
				)
				this.setValue();
			this.isVisible = false;
			this.element.trigger({
				type: 'hide',
				date: this.date
			});
		},

		remove: function () {
			this._detachEvents();
			this.picker.remove();
			delete this.picker;
			delete this.element.data().datetimepicker;
		},

		getDate: function () {
			var d = this.getUTCDate();
			return new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
		},

		getUTCDate: function () {
			return this.date;
		},

		setDate: function (d) {
			this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)));
		},

		setUTCDate: function (d) {
			if (d >= this.startDate && d <= this.endDate) {
				this.date = d;
				this.setValue();
				this.viewDate = this.date;
				this.fill();
			} else {
				this.element.trigger({
					type:      'outOfRange',
					date:      d,
					startDate: this.startDate,
					endDate:   this.endDate
				});
			}
		},

		setFormat: function (format) {
			this.format = DPGlobal.parseFormat(format, this.formatType);
			var element;
			if (this.isInput) {
				element = this.element;
			} else if (this.component) {
				element = this.element.find('input');
			}
			if (element && element.val()) {
				this.setValue();
			}
		},

		setValue: function () {
			var formatted = this.getFormattedDate();
			if (!this.isInput) {
				if (this.component) {
					this.element.find('input').val(formatted);
				}
				this.element.data('date', formatted);
			} else {
				this.element.val(formatted);
			}
			if (this.linkField) {
				$('#' + this.linkField).val(this.getFormattedDate(this.linkFormat));
			}
		},

		getFormattedDate: function (format) {
			if (format == undefined) format = this.format;
			return DPGlobal.formatDate(this.date, format, this.language, this.formatType);
		},

		setStartDate: function (startDate) {
			this.startDate = startDate || -Infinity;
			if (this.startDate !== -Infinity) {
				this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language, this.formatType);
			}
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function (endDate) {
			this.endDate = endDate || Infinity;
			if (this.endDate !== Infinity) {
				this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language, this.formatType);
			}
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
			this.daysOfWeekDisabled = daysOfWeekDisabled || [];
			if (!$.isArray(this.daysOfWeekDisabled)) {
				this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/);
			}
			this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled, function (d) {
				return parseInt(d, 10);
			});
			this.update();
			this.updateNavArrows();
		},

		setMinutesDisabled: function (minutesDisabled) {
			this.minutesDisabled = minutesDisabled || [];
			if (!$.isArray(this.minutesDisabled)) {
				this.minutesDisabled = this.minutesDisabled.split(/,\s*/);
			}
			this.minutesDisabled = $.map(this.minutesDisabled, function (d) {
				return parseInt(d, 10);
			});
			this.update();
			this.updateNavArrows();
		},

		setHoursDisabled: function (hoursDisabled) {
			this.hoursDisabled = hoursDisabled || [];
			if (!$.isArray(this.hoursDisabled)) {
				this.hoursDisabled = this.hoursDisabled.split(/,\s*/);
			}
			this.hoursDisabled = $.map(this.hoursDisabled, function (d) {
				return parseInt(d, 10);
			});
			this.update();
			this.updateNavArrows();
		},

		place: function () {
			if (this.isInline) return;

			if (!this.zIndex) {
				var index_highest = 0;
				$('div').each(function () {
					var index_current = parseInt($(this).css("zIndex"), 10);
					if (index_current > index_highest) {
						index_highest = index_current;
					}
				});
				this.zIndex = index_highest + 10;
			}

			var offset, top, left, containerOffset;
			if (this.container instanceof $) {
				containerOffset = this.container.offset();
			} else {
				containerOffset = $(this.container).offset();
			}

			if (this.component) {
				offset = this.component.offset();
				left = offset.left;
				if (this.pickerPosition == 'bottom-left' || this.pickerPosition == 'top-left') {
					left += this.component.outerWidth() - this.picker.outerWidth();
				}
			} else {
				offset = this.element.offset();
				left = offset.left;
			}

			if(left+220 > document.body.clientWidth){
            			left = document.body.clientWidth-220;
          		}

			if (this.pickerPosition == 'top-left' || this.pickerPosition == 'top-right') {
				top = offset.top - this.picker.outerHeight();
			} else {
				top = offset.top + this.height;
			}

			top = top - containerOffset.top;
			left = left - containerOffset.left;

			if(this.container != 'body') top = top + document.body.scrollTop

			this.picker.css({
				top:    top,
				left:   left,
				zIndex: this.zIndex
			});
		},

		update: function () {
			var date, fromArgs = false;
			if (arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
				date = arguments[0];
				fromArgs = true;
			} else {
				date = (this.isInput ? this.element.val() : this.element.find('input').val()) || this.element.data('date') || this.initialDate;
				if (typeof date == 'string' || date instanceof String) {
				  date = date.replace(/^\s+|\s+$/g,'');
				}
			}

			if (!date) {
				date = new Date();
				fromArgs = false;
			}

			this.date = DPGlobal.parseDate(date, this.format, this.language, this.formatType);

			if (fromArgs) this.setValue();

			if (this.date < this.startDate) {
				this.viewDate = new Date(this.startDate);
			} else if (this.date > this.endDate) {
				this.viewDate = new Date(this.endDate);
			} else {
				this.viewDate = new Date(this.date);
			}
			this.fill();
		},

		fillDow: function () {
			var dowCnt = this.weekStart,
				html = '<tr>';
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">' + dates[this.language].daysMin[(dowCnt++) % 7] + '</th>';
			}
			html += '</tr>';
			this.picker.find('.datetimepicker-days thead').append(html);
		},

		fillMonths: function () {
			var html = '',
				i = 0;
			while (i < 12) {
				html += '<span class="month">' + dates[this.language].monthsShort[i++] + '</span>';
			}
			this.picker.find('.datetimepicker-months td').html(html);
		},

		fill: function () {
			if (this.date == null || this.viewDate == null) {
				return;
			}
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				dayMonth = d.getUTCDate(),
				hours = d.getUTCHours(),
				minutes = d.getUTCMinutes(),
				startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() + 1 : -Infinity,
				endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
				endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() + 1 : Infinity,
				currentDate = (new UTCDate(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate())).valueOf(),
				today = new Date();
			this.picker.find('.datetimepicker-days thead th:eq(1)')
				.text(dates[this.language].months[month] + ' ' + year);
			if (this.formatViewType == "time") {
				var formatted = this.getFormattedDate();
				this.picker.find('.datetimepicker-hours thead th:eq(1)').text(formatted);
				this.picker.find('.datetimepicker-minutes thead th:eq(1)').text(formatted);
			} else {
				this.picker.find('.datetimepicker-hours thead th:eq(1)')
					.text(dayMonth + ' ' + dates[this.language].months[month] + ' ' + year);
				this.picker.find('.datetimepicker-minutes thead th:eq(1)')
					.text(dayMonth + ' ' + dates[this.language].months[month] + ' ' + year);
			}
			this.picker.find('tfoot th.today')
				.text(dates[this.language].today)
				.toggle(this.todayBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			/*var prevMonth = UTCDate(year, month, 0,0,0,0,0);
			 prevMonth.setUTCDate(prevMonth.getDate() - (prevMonth.getUTCDay() - this.weekStart + 7)%7);*/
			var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getUTCDay() == this.weekStart) {
					html.push('<tr>');
				}
				clsName = '';
				if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
					clsName += ' old';
				} else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
					clsName += ' new';
				}
				// Compare internal UTC date with local today, not UTC today
				if (this.todayHighlight &&
					prevMonth.getUTCFullYear() == today.getFullYear() &&
					prevMonth.getUTCMonth() == today.getMonth() &&
					prevMonth.getUTCDate() == today.getDate()) {
					clsName += ' today';
				}
				if (prevMonth.valueOf() == currentDate) {
					clsName += ' active';
				}
				if ((prevMonth.valueOf() + 86400000) <= this.startDate || prevMonth.valueOf() > this.endDate ||
					$.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
					clsName += ' disabled';
				}
				html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + '</td>');
				if (prevMonth.getUTCDay() == this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
			}
			this.picker.find('.datetimepicker-days tbody').empty().append(html.join(''));

			html = [];
			var txt = '', meridian = '', meridianOld = '';
			var hoursDisabled = this.hoursDisabled || [];
			for (var i = 0; i < 24; i++) {
				if (hoursDisabled.indexOf(i) !== -1) continue;
				var actual = UTCDate(year, month, dayMonth, i);
				clsName = '';
				// We want the previous hour for the startDate
				if ((actual.valueOf() + 3600000) <= this.startDate || actual.valueOf() > this.endDate) {
					clsName += ' disabled';
				} else if (hours == i) {
					clsName += ' active';
				}
				if (this.showMeridian && dates[this.language].meridiem.length == 2) {
					meridian = (i < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
					if (meridian != meridianOld) {
						if (meridianOld != '') {
							html.push('</fieldset>');
						}
						html.push('<fieldset class="hour"><legend>' + meridian.toUpperCase() + '</legend>');
					}
					meridianOld = meridian;
					txt = (i % 12 ? i % 12 : 12);
					html.push('<span class="hour' + clsName + ' hour_' + (i < 12 ? 'am' : 'pm') + '">' + txt + '</span>');
					if (i == 23) {
						html.push('</fieldset>');
					}
				} else {
					txt = i + ':00';
					html.push('<span class="hour' + clsName + '">' + txt + '</span>');
				}
			}
			this.picker.find('.datetimepicker-hours td').html(html.join(''));

			html = [];
			txt = '', meridian = '', meridianOld = '';
			var minutesDisabled = this.minutesDisabled || [];
			for (var i = 0; i < 60; i += this.minuteStep) {
				if (minutesDisabled.indexOf(i) !== -1) continue;
				var actual = UTCDate(year, month, dayMonth, hours, i, 0);
				clsName = '';
				if (actual.valueOf() < this.startDate || actual.valueOf() > this.endDate) {
					clsName += ' disabled';
				} else if (Math.floor(minutes / this.minuteStep) == Math.floor(i / this.minuteStep)) {
					clsName += ' active';
				}
				if (this.showMeridian && dates[this.language].meridiem.length == 2) {
					meridian = (hours < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
					if (meridian != meridianOld) {
						if (meridianOld != '') {
							html.push('</fieldset>');
						}
						html.push('<fieldset class="minute"><legend>' + meridian.toUpperCase() + '</legend>');
					}
					meridianOld = meridian;
					txt = (hours % 12 ? hours % 12 : 12);
					//html.push('<span class="minute'+clsName+' minute_'+(hours<12?'am':'pm')+'">'+txt+'</span>');
					html.push('<span class="minute' + clsName + '">' + txt + ':' + (i < 10 ? '0' + i : i) + '</span>');
					if (i == 59) {
						html.push('</fieldset>');
					}
				} else {
					txt = i + ':00';
					//html.push('<span class="hour'+clsName+'">'+txt+'</span>');
					html.push('<span class="minute' + clsName + '">' + hours + ':' + (i < 10 ? '0' + i : i) + '</span>');
				}
			}
			this.picker.find('.datetimepicker-minutes td').html(html.join(''));

			var currentYear = this.date.getUTCFullYear();
			var months = this.picker.find('.datetimepicker-months')
				.find('th:eq(1)')
				.text(year)
				.end()
				.find('span').removeClass('active');
			if (currentYear == year) {
				// getUTCMonths() returns 0 based, and we need to select the next one
				months.eq(this.date.getUTCMonth() + 2).addClass('active');
			}
			if (year < startYear || year > endYear) {
				months.addClass('disabled');
			}
			if (year == startYear) {
				months.slice(0, startMonth + 1).addClass('disabled');
			}
			if (year == endYear) {
				months.slice(endMonth).addClass('disabled');
			}

			html = '';
			year = parseInt(year / 10, 10) * 10;
			var yearCont = this.picker.find('.datetimepicker-years')
				.find('th:eq(1)')
				.text(year + '-' + (year + 9))
				.end()
				.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year' + (i == -1 || i == 10 ? ' old' : '') + (currentYear == year ? ' active' : '') + (year < startYear || year > endYear ? ' disabled' : '') + '">' + year + '</span>';
				year += 1;
			}
			yearCont.html(html);
			this.place();
		},

		updateNavArrows: function () {
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				day = d.getUTCDate(),
				hour = d.getUTCHours();
			switch (this.viewMode) {
				case 0:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
						&& month <= this.startDate.getUTCMonth()
						&& day <= this.startDate.getUTCDate()
						&& hour <= this.startDate.getUTCHours()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
						&& month >= this.endDate.getUTCMonth()
						&& day >= this.endDate.getUTCDate()
						&& hour >= this.endDate.getUTCHours()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
						&& month <= this.startDate.getUTCMonth()
						&& day <= this.startDate.getUTCDate()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
						&& month >= this.endDate.getUTCMonth()
						&& day >= this.endDate.getUTCDate()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 2:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
						&& month <= this.startDate.getUTCMonth()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
						&& month >= this.endDate.getUTCMonth()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 3:
				case 4:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		mousewheel: function (e) {

			e.preventDefault();
			e.stopPropagation();

			if (this.wheelPause) {
				return;
			}

			this.wheelPause = true;

			var originalEvent = e.originalEvent;

			var delta = originalEvent.wheelDelta;

			var mode = delta > 0 ? 1 : (delta === 0) ? 0 : -1;

			if (this.wheelViewModeNavigationInverseDirection) {
				mode = -mode;
			}

			this.showMode(mode);

			setTimeout($.proxy(function () {

				this.wheelPause = false

			}, this), this.wheelViewModeNavigationDelay);

		},

		click: function (e) {
			e.stopPropagation();
			e.preventDefault();
			var target = $(e.target).closest('span, td, th, legend');
			if (target.is('.' + this.icontype)) {
				target = $(target).parent().closest('span, td, th, legend');
			}
			if (target.length == 1) {
				if (target.is('.disabled')) {
					this.element.trigger({
						type:      'outOfRange',
						date:      this.viewDate,
						startDate: this.startDate,
						endDate:   this.endDate
					});
					return;
				}
				switch (target[0].nodeName.toLowerCase()) {
					case 'th':
						switch (target[0].className) {
							case 'switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
								switch (this.viewMode) {
									case 0:
										this.viewDate = this.moveHour(this.viewDate, dir);
										break;
									case 1:
										this.viewDate = this.moveDate(this.viewDate, dir);
										break;
									case 2:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										break;
									case 3:
									case 4:
										this.viewDate = this.moveYear(this.viewDate, dir);
										break;
								}
								this.fill();
								this.element.trigger({
									type:      target[0].className + ':' + this.convertViewModeText(this.viewMode),
									date:      this.viewDate,
									startDate: this.startDate,
									endDate:   this.endDate
								});
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);

								// Respect startDate and endDate.
								if (date < this.startDate) date = this.startDate;
								else if (date > this.endDate) date = this.endDate;

								this.viewMode = this.startViewMode;
								this.showMode(0);
								this._setDate(date);
								this.fill();
								if (this.autoclose) {
									this.hide();
								}
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')) {
							var year = this.viewDate.getUTCFullYear(),
								month = this.viewDate.getUTCMonth(),
								day = this.viewDate.getUTCDate(),
								hours = this.viewDate.getUTCHours(),
								minutes = this.viewDate.getUTCMinutes(),
								seconds = this.viewDate.getUTCSeconds();

							if (target.is('.month')) {
								this.viewDate.setUTCDate(1);
								month = target.parent().find('span').index(target);
								day = this.viewDate.getUTCDate();
								this.viewDate.setUTCMonth(month);
								this.element.trigger({
									type: 'changeMonth',
									date: this.viewDate
								});
								if (this.viewSelect >= 3) {
									this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
								}
							} else if (target.is('.year')) {
								this.viewDate.setUTCDate(1);
								year = parseInt(target.text(), 10) || 0;
								this.viewDate.setUTCFullYear(year);
								this.element.trigger({
									type: 'changeYear',
									date: this.viewDate
								});
								if (this.viewSelect >= 4) {
									this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
								}
							} else if (target.is('.hour')) {
								hours = parseInt(target.text(), 10) || 0;
								if (target.hasClass('hour_am') || target.hasClass('hour_pm')) {
									if (hours == 12 && target.hasClass('hour_am')) {
										hours = 0;
									} else if (hours != 12 && target.hasClass('hour_pm')) {
										hours += 12;
									}
								}
								this.viewDate.setUTCHours(hours);
								this.element.trigger({
									type: 'changeHour',
									date: this.viewDate
								});
								if (this.viewSelect >= 1) {
									this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
								}
							} else if (target.is('.minute')) {
								minutes = parseInt(target.text().substr(target.text().indexOf(':') + 1), 10) || 0;
								this.viewDate.setUTCMinutes(minutes);
								this.element.trigger({
									type: 'changeMinute',
									date: this.viewDate
								});
								if (this.viewSelect >= 0) {
									this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
								}
							}
							if (this.viewMode != 0) {
								var oldViewMode = this.viewMode;
								this.showMode(-1);
								this.fill();
								if (oldViewMode == this.viewMode && this.autoclose) {
									this.hide();
								}
							} else {
								this.fill();
								if (this.autoclose) {
									this.hide();
								}
							}
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')) {
							var day = parseInt(target.text(), 10) || 1;
							var year = this.viewDate.getUTCFullYear(),
								month = this.viewDate.getUTCMonth(),
								hours = this.viewDate.getUTCHours(),
								minutes = this.viewDate.getUTCMinutes(),
								seconds = this.viewDate.getUTCSeconds();
							if (target.is('.old')) {
								if (month === 0) {
									month = 11;
									year -= 1;
								} else {
									month -= 1;
								}
							} else if (target.is('.new')) {
								if (month == 11) {
									month = 0;
									year += 1;
								} else {
									month += 1;
								}
							}
							this.viewDate.setUTCFullYear(year);
							this.viewDate.setUTCMonth(month, day);
							this.element.trigger({
								type: 'changeDay',
								date: this.viewDate
							});
							if (this.viewSelect >= 2) {
								this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
							}
						}
						var oldViewMode = this.viewMode;
						this.showMode(-1);
						this.fill();
						if (oldViewMode == this.viewMode && this.autoclose) {
							this.hide();
						}
						break;
				}
			}
		},

		_setDate: function (date, which) {
			if (!which || which == 'date')
				this.date = date;
			if (!which || which == 'view')
				this.viewDate = date;
			this.fill();
			this.setValue();
			var element;
			if (this.isInput) {
				element = this.element;
			} else if (this.component) {
				element = this.element.find('input');
			}
			if (element) {
				element.change();
				if (this.autoclose && (!which || which == 'date')) {
					//this.hide();
				}
			}
			this.element.trigger({
				type: 'changeDate',
				date: this.date
			});
		},

		moveMinute: function (date, dir) {
			if (!dir) return date;
			var new_date = new Date(date.valueOf());
			//dir = dir > 0 ? 1 : -1;
			new_date.setUTCMinutes(new_date.getUTCMinutes() + (dir * this.minuteStep));
			return new_date;
		},

		moveHour: function (date, dir) {
			if (!dir) return date;
			var new_date = new Date(date.valueOf());
			//dir = dir > 0 ? 1 : -1;
			new_date.setUTCHours(new_date.getUTCHours() + dir);
			return new_date;
		},

		moveDate: function (date, dir) {
			if (!dir) return date;
			var new_date = new Date(date.valueOf());
			//dir = dir > 0 ? 1 : -1;
			new_date.setUTCDate(new_date.getUTCDate() + dir);
			return new_date;
		},

		moveMonth: function (date, dir) {
			if (!dir) return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag == 1) {
				test = dir == -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function () {
					return new_date.getUTCMonth() == month;
				}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function () {
					return new_date.getUTCMonth() != new_month;
				};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			} else {
				// For magnitudes >1, move one month at a time...
				for (var i = 0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function () {
					return new_month != new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()) {
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function (date, dir) {
			return this.moveMonth(date, dir * 12);
		},

		dateWithinRange: function (date) {
			return date >= this.startDate && date <= this.endDate;
		},

		keydown: function (e) {
			if (this.picker.is(':not(:visible)')) {
				if (e.keyCode == 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, day, month,
				newDate, newViewDate;
			switch (e.keyCode) {
				case 27: // escape
					this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.keyboardNavigation) break;
					dir = e.keyCode == 37 ? -1 : 1;
					viewMode = this.viewMode;
					if (e.ctrlKey) {
						viewMode += 2;
					} else if (e.shiftKey) {
						viewMode += 1;
					}
					if (viewMode == 4) {
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
					} else if (viewMode == 3) {
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
					} else if (viewMode == 2) {
						newDate = this.moveDate(this.date, dir);
						newViewDate = this.moveDate(this.viewDate, dir);
					} else if (viewMode == 1) {
						newDate = this.moveHour(this.date, dir);
						newViewDate = this.moveHour(this.viewDate, dir);
					} else if (viewMode == 0) {
						newDate = this.moveMinute(this.date, dir);
						newViewDate = this.moveMinute(this.viewDate, dir);
					}
					if (this.dateWithinRange(newDate)) {
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.keyboardNavigation) break;
					dir = e.keyCode == 38 ? -1 : 1;
					viewMode = this.viewMode;
					if (e.ctrlKey) {
						viewMode += 2;
					} else if (e.shiftKey) {
						viewMode += 1;
					}
					if (viewMode == 4) {
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
					} else if (viewMode == 3) {
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
					} else if (viewMode == 2) {
						newDate = this.moveDate(this.date, dir * 7);
						newViewDate = this.moveDate(this.viewDate, dir * 7);
					} else if (viewMode == 1) {
						if (this.showMeridian) {
							newDate = this.moveHour(this.date, dir * 6);
							newViewDate = this.moveHour(this.viewDate, dir * 6);
						} else {
							newDate = this.moveHour(this.date, dir * 4);
							newViewDate = this.moveHour(this.viewDate, dir * 4);
						}
					} else if (viewMode == 0) {
						newDate = this.moveMinute(this.date, dir * 4);
						newViewDate = this.moveMinute(this.viewDate, dir * 4);
					}
					if (this.dateWithinRange(newDate)) {
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 13: // enter
					if (this.viewMode != 0) {
						var oldViewMode = this.viewMode;
						this.showMode(-1);
						this.fill();
						if (oldViewMode == this.viewMode && this.autoclose) {
							this.hide();
						}
					} else {
						this.fill();
						if (this.autoclose) {
							this.hide();
						}
					}
					e.preventDefault();
					break;
				case 9: // tab
					this.hide();
					break;
			}
			if (dateChanged) {
				var element;
				if (this.isInput) {
					element = this.element;
				} else if (this.component) {
					element = this.element.find('input');
				}
				if (element) {
					element.change();
				}
				this.element.trigger({
					type: 'changeDate',
					date: this.date
				});
			}
		},

		showMode: function (dir) {
			if (dir) {
				var newViewMode = Math.max(0, Math.min(DPGlobal.modes.length - 1, this.viewMode + dir));
				if (newViewMode >= this.minView && newViewMode <= this.maxView) {
					this.element.trigger({
						type:        'changeMode',
						date:        this.viewDate,
						oldViewMode: this.viewMode,
						newViewMode: newViewMode
					});

					this.viewMode = newViewMode;
				}
			}
			/*
			 vitalets: fixing bug of very special conditions:
			 jquery 1.7.1 + webkit + show inline datetimepicker in bootstrap popover.
			 Method show() does not set display css correctly and datetimepicker is not shown.
			 Changed to .css('display', 'block') solve the problem.
			 See https://github.com/vitalets/x-editable/issues/37

			 In jquery 1.7.2+ everything works fine.
			 */
			//this.picker.find('>div').hide().filter('.datetimepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
			this.picker.find('>div').hide().filter('.datetimepicker-' + DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
			this.updateNavArrows();
		},

		reset: function (e) {
			this._setDate(null, 'date');
		},

		convertViewModeText:  function (viewMode) {
			switch (viewMode) {
				case 4:
					return 'decade';
				case 3:
					return 'year';
				case 2:
					return 'month';
				case 1:
					return 'day';
				case 0:
					return 'hour';
			}
		}
	};

	var old = $.fn.datetimepicker;
	$.fn.datetimepicker = function (option) {
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function () {
			var $this = $(this),
				data = $this.data('datetimepicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				$this.data('datetimepicker', (data = new Datetimepicker(this, $.extend({}, $.fn.datetimepicker.defaults, options))));
			}
			if (typeof option == 'string' && typeof data[option] == 'function') {
				internal_return = data[option].apply(data, args);
				if (internal_return !== undefined) {
					return false;
				}
			}
		});
		if (internal_return !== undefined)
			return internal_return;
		else
			return this;
	};

	$.fn.datetimepicker.defaults = {
	};
	$.fn.datetimepicker.Constructor = Datetimepicker;
	var dates = $.fn.datetimepicker.dates = {
		en: {
			days:        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort:   ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin:     ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months:      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			meridiem:    ["am", "pm"],
			suffix:      ["st", "nd", "rd", "th"],
			today:       "Today"
		}
	};

	var DPGlobal = {
		modes:            [
			{
				clsName: 'minutes',
				navFnc:  'Hours',
				navStep: 1
			},
			{
				clsName: 'hours',
				navFnc:  'Date',
				navStep: 1
			},
			{
				clsName: 'days',
				navFnc:  'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc:  'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc:  'FullYear',
				navStep: 10
			}
		],
		isLeapYear:       function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth:   function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		getDefaultFormat: function (type, field) {
			if (type == "standard") {
				if (field == 'input')
					return 'yyyy-mm-dd hh:ii';
				else
					return 'yyyy-mm-dd hh:ii:ss';
			} else if (type == "php") {
				if (field == 'input')
					return 'Y-m-d H:i';
				else
					return 'Y-m-d H:i:s';
			} else {
				throw new Error("Invalid format type.");
			}
		},
		validParts:       function (type) {
			if (type == "standard") {
				return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
			} else if (type == "php") {
				return /[dDjlNwzFmMnStyYaABgGhHis]/g;
			} else {
				throw new Error("Invalid format type.");
			}
		},
		nonpunctuation:   /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
		parseFormat:      function (format, type) {
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts(type), '\0').split('\0'),
				parts = format.match(this.validParts(type));
			if (!separators || !separators.length || !parts || parts.length == 0) {
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate:        function (date, format, language, type) {
			if (date instanceof Date) {
				var dateUTC = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
				dateUTC.setMilliseconds(0);
				return dateUTC;
			}
			if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
				format = this.parseFormat('yyyy-mm-dd', type);
			}
			if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
				format = this.parseFormat('yyyy-mm-dd hh:ii', type);
			}
			if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
				format = this.parseFormat('yyyy-mm-dd hh:ii:ss', type);
			}
			if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
				var part_re = /([-+]\d+)([dmwy])/,
					parts = date.match(/([-+]\d+)([dmwy])/g),
					part, dir;
				date = new Date();
				for (var i = 0; i < parts.length; i++) {
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch (part[2]) {
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datetimepicker.prototype.moveMonth.call(Datetimepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datetimepicker.prototype.moveYear.call(Datetimepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), 0);
			}
			var parts = date && date.toString().match(this.nonpunctuation) || [],
				date = new Date(0, 0, 0, 0, 0, 0, 0),
				parsed = {},
				setters_order = ['hh', 'h', 'ii', 'i', 'ss', 's', 'yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'D', 'DD', 'd', 'dd', 'H', 'HH', 'p', 'P'],
				setters_map = {
					hh:   function (d, v) {
						return d.setUTCHours(v);
					},
					h:    function (d, v) {
						return d.setUTCHours(v);
					},
					HH:   function (d, v) {
						return d.setUTCHours(v == 12 ? 0 : v);
					},
					H:    function (d, v) {
						return d.setUTCHours(v == 12 ? 0 : v);
					},
					ii:   function (d, v) {
						return d.setUTCMinutes(v);
					},
					i:    function (d, v) {
						return d.setUTCMinutes(v);
					},
					ss:   function (d, v) {
						return d.setUTCSeconds(v);
					},
					s:    function (d, v) {
						return d.setUTCSeconds(v);
					},
					yyyy: function (d, v) {
						return d.setUTCFullYear(v);
					},
					yy:   function (d, v) {
						return d.setUTCFullYear(2000 + v);
					},
					m:    function (d, v) {
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() != v)
							if (isNaN(d.getUTCMonth()))
								return d;
							else
								d.setUTCDate(d.getUTCDate() - 1);
						return d;
					},
					d:    function (d, v) {
						return d.setUTCDate(v);
					},
					p:    function (d, v) {
						return d.setUTCHours(v == 1 ? d.getUTCHours() + 12 : d.getUTCHours());
					}
				},
				val, filtered, part;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			setters_map['P'] = setters_map['p'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
			if (parts.length == format.parts.length) {
				for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10);
					part = format.parts[i];
					if (isNaN(val)) {
						switch (part) {
							case 'MM':
								filtered = $(dates[language].months).filter(function () {
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(function () {
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m.toLowerCase() == p.toLowerCase();
								});
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
							case 'p':
							case 'P':
								val = $.inArray(parts[i].toLowerCase(), dates[language].meridiem);
								break;
						}
					}
					parsed[part] = val;
				}
				for (var i = 0, s; i < setters_order.length; i++) {
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s]))
						setters_map[s](date, parsed[s])
				}
			}
			return date;
		},
		formatDate:       function (date, format, language, type) {
			if (date == null) {
				return '';
			}
			var val;
			if (type == 'standard') {
				val = {
					// year
					yy:   date.getUTCFullYear().toString().substring(2),
					yyyy: date.getUTCFullYear(),
					// month
					m:    date.getUTCMonth() + 1,
					M:    dates[language].monthsShort[date.getUTCMonth()],
					MM:   dates[language].months[date.getUTCMonth()],
					// day
					d:    date.getUTCDate(),
					D:    dates[language].daysShort[date.getUTCDay()],
					DD:   dates[language].days[date.getUTCDay()],
					p:    (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
					// hour
					h:    date.getUTCHours(),
					// minute
					i:    date.getUTCMinutes(),
					// second
					s:    date.getUTCSeconds()
				};

				if (dates[language].meridiem.length == 2) {
					val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
				}
				else {
					val.H = val.h;
				}
				val.HH = (val.H < 10 ? '0' : '') + val.H;
				val.P = val.p.toUpperCase();
				val.hh = (val.h < 10 ? '0' : '') + val.h;
				val.ii = (val.i < 10 ? '0' : '') + val.i;
				val.ss = (val.s < 10 ? '0' : '') + val.s;
				val.dd = (val.d < 10 ? '0' : '') + val.d;
				val.mm = (val.m < 10 ? '0' : '') + val.m;
			} else if (type == 'php') {
				// php format
				val = {
					// year
					y: date.getUTCFullYear().toString().substring(2),
					Y: date.getUTCFullYear(),
					// month
					F: dates[language].months[date.getUTCMonth()],
					M: dates[language].monthsShort[date.getUTCMonth()],
					n: date.getUTCMonth() + 1,
					t: DPGlobal.getDaysInMonth(date.getUTCFullYear(), date.getUTCMonth()),
					// day
					j: date.getUTCDate(),
					l: dates[language].days[date.getUTCDay()],
					D: dates[language].daysShort[date.getUTCDay()],
					w: date.getUTCDay(), // 0 -> 6
					N: (date.getUTCDay() == 0 ? 7 : date.getUTCDay()),       // 1 -> 7
					S: (date.getUTCDate() % 10 <= dates[language].suffix.length ? dates[language].suffix[date.getUTCDate() % 10 - 1] : ''),
					// hour
					a: (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
					g: (date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12),
					G: date.getUTCHours(),
					// minute
					i: date.getUTCMinutes(),
					// second
					s: date.getUTCSeconds()
				};
				val.m = (val.n < 10 ? '0' : '') + val.n;
				val.d = (val.j < 10 ? '0' : '') + val.j;
				val.A = val.a.toString().toUpperCase();
				val.h = (val.g < 10 ? '0' : '') + val.g;
				val.H = (val.G < 10 ? '0' : '') + val.G;
				val.i = (val.i < 10 ? '0' : '') + val.i;
				val.s = (val.s < 10 ? '0' : '') + val.s;
			} else {
				throw new Error("Invalid format type.");
			}
			var date = [],
				seps = $.extend([], format.separators);
			for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
				if (seps.length) {
					date.push(seps.shift());
				}
				date.push(val[format.parts[i]]);
			}
			if (seps.length) {
				date.push(seps.shift());
			}
			return date.join('');
		},
		convertViewMode:  function (viewMode) {
			switch (viewMode) {
				case 4:
				case 'decade':
					viewMode = 4;
					break;
				case 3:
				case 'year':
					viewMode = 3;
					break;
				case 2:
				case 'month':
					viewMode = 2;
					break;
				case 1:
				case 'day':
					viewMode = 1;
					break;
				case 0:
				case 'hour':
					viewMode = 0;
					break;
			}

			return viewMode;
		},
		headTemplate:     '<thead>' +
							  '<tr>' +
							  '<th class="prev"><i class="{leftArrow}"/></th>' +
							  '<th colspan="5" class="switch"></th>' +
							  '<th class="next"><i class="{rightArrow}"/></th>' +
							  '</tr>' +
			'</thead>',
		headTemplateV3:   '<thead>' +
							  '<tr>' +
							  '<th class="prev"><span class="{iconType} {leftArrow}"></span> </th>' +
							  '<th colspan="5" class="switch"></th>' +
							  '<th class="next"><span class="{iconType} {rightArrow}"></span> </th>' +
							  '</tr>' +
			'</thead>',
		contTemplate:     '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate:     '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
	};
	DPGlobal.template = '<div class="datetimepicker">' +
		'<div class="datetimepicker-minutes">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-hours">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-days">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplate +
		'<tbody></tbody>' +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-months">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-years">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'</div>';
	DPGlobal.templateV3 = '<div class="datetimepicker">' +
		'<div class="datetimepicker-minutes">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplateV3 +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-hours">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplateV3 +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-days">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplateV3 +
		'<tbody></tbody>' +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-months">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplateV3 +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-years">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplateV3 +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'</div>';
	$.fn.datetimepicker.DPGlobal = DPGlobal;

	/* DATETIMEPICKER NO CONFLICT
	 * =================== */

	$.fn.datetimepicker.noConflict = function () {
		$.fn.datetimepicker = old;
		return this;
	};

	/* DATETIMEPICKER DATA-API
	 * ================== */

	$(document).on(
		'focus.datetimepicker.data-api click.datetimepicker.data-api',
		'[data-provide="datetimepicker"]',
		function (e) {
			var $this = $(this);
			if ($this.data('datetimepicker')) return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.datetimepicker('show');
		}
	);
	$(function () {
		$('[data-provide="datetimepicker-inline"]').datetimepicker();
	});

}(window.jQuery);
/**
 * Simplified Chinese translation for bootstrap-datetimepicker
 * Yuan Cheung <advanimal@gmail.com>
 */

;(function($){
	$.fn.datetimepicker.dates['zh-CN'] = {
			days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
			daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
			months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			today: "今天",
			suffix: [],
			meridiem: ["上午", "下午"]
	};
}(jQuery));
/*! boostrapDemo 2015-03-03 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.2",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.2",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.2",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.2",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.2",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.2",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()
}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.2",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/*
 CanvasJS HTML5 & JavaScript Charts - v1.8.0 Beta 4 - http://canvasjs.com/
 Copyright 2013 fenopix
 */

(function(){function O(a,b){a.prototype=Aa(b.prototype);a.prototype.constructor=a;a.base=b.prototype}function Aa(a){function b(){}b.prototype=a;return new b}function sa(a,b,c){"millisecond"===c?a.setMilliseconds(a.getMilliseconds()+1*b):"second"===c?a.setSeconds(a.getSeconds()+1*b):"minute"===c?a.setMinutes(a.getMinutes()+1*b):"hour"===c?a.setHours(a.getHours()+1*b):"day"===c?a.setDate(a.getDate()+1*b):"week"===c?a.setDate(a.getDate()+7*b):"month"===c?a.setMonth(a.getMonth()+1*b):"year"===c&&a.setFullYear(a.getFullYear()+
    1*b);return a}function L(a,b){var c=!1;0>a&&(c=!0,a*=-1);a=""+a;for(b=b?b:1;a.length<b;)a="0"+a;return c?"-"+a:a}function Z(a){if(!a)return a;a=a.replace(/^\s\s*/,"");for(var b=/\s/,c=a.length;b.test(a.charAt(--c)););return a.slice(0,c+1)}function Ba(a){a.roundRect=function(a,c,d,e,f,g,k,p){k&&(this.fillStyle=k);p&&(this.strokeStyle=p);"undefined"===typeof f&&(f=5);this.lineWidth=g;this.beginPath();this.moveTo(a+f,c);this.lineTo(a+d-f,c);this.quadraticCurveTo(a+d,c,a+d,c+f);this.lineTo(a+d,c+e-f);
    this.quadraticCurveTo(a+d,c+e,a+d-f,c+e);this.lineTo(a+f,c+e);this.quadraticCurveTo(a,c+e,a,c+e-f);this.lineTo(a,c+f);this.quadraticCurveTo(a,c,a+f,c);this.closePath();k&&this.fill();p&&0<g&&this.stroke()}}function ta(a,b){return a-b}function Ca(a,b){return a.x-b.x}function B(a){var b=((a&16711680)>>16).toString(16),c=((a&65280)>>8).toString(16);a=((a&255)>>0).toString(16);b=2>b.length?"0"+b:b;c=2>c.length?"0"+c:c;a=2>a.length?"0"+a:a;return"#"+b+c+a}function Da(a,b){var c=this.length>>>0,d=Number(b)||
    0,d=0>d?Math.ceil(d):Math.floor(d);for(0>d&&(d+=c);d<c;d++)if(d in this&&this[d]===a)return d;return-1}function da(a,b,c){c=c||"normal";var d=a+"_"+b+"_"+c,e=ua[d];if(isNaN(e)){try{a="position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;font-family:"+a+"; font-size:"+b+"px; font-weight:"+c+";";if(!T){var f=document.body;T=document.createElement("span");T.innerHTML="";var g=document.createTextNode("Mpgyi");T.appendChild(g);f.appendChild(T)}T.style.display=
    "";T.setAttribute("style",a);e=Math.round(T.offsetHeight);T.style.display="none"}catch(k){e=Math.ceil(1.1*b)}e=Math.max(e,b);ua[d]=e}return e}function M(a,b){var c=[];lineDashTypeMap={solid:[],shortDash:[3,1],shortDot:[1,1],shortDashDot:[3,1,1,1],shortDashDotDot:[3,1,1,1,1,1],dot:[1,2],dash:[4,2],dashDot:[4,2,1,2],longDash:[8,2],longDashDot:[8,2,1,2],longDashDotDot:[8,2,1,2,1,2]};if(c=lineDashTypeMap[a||"solid"])for(var d=0;d<c.length;d++)c[d]*=b;else c=[];return c}function F(a,b,c,d){if(a.addEventListener)a.addEventListener(b,
    c,d||!1);else if(a.attachEvent)a.attachEvent("on"+b,function(b){b=b||window.event;b.preventDefault=b.preventDefault||function(){b.returnValue=!1};b.stopPropagation=b.stopPropagation||function(){b.cancelBubble=!0};c.call(a,b)});else return!1}function va(a,b,c){a*=J;b*=J;a=c.getImageData(a,b,2,2).data;b=!0;for(c=0;4>c;c++)if(a[c]!==a[c+4]|a[c]!==a[c+8]|a[c]!==a[c+12]){b=!1;break}return b?a[0]<<16|a[1]<<8|a[2]:0}function N(a,b,c){return a in b?b[a]:c[a]}function ea(a,b,c){if(t&&wa){var d=a.getContext("2d");
    fa=d.webkitBackingStorePixelRatio||d.mozBackingStorePixelRatio||d.msBackingStorePixelRatio||d.oBackingStorePixelRatio||d.backingStorePixelRatio||1;J=na/fa;a.width=b*J;a.height=c*J;na!==fa&&(a.style.width=b+"px",a.style.height=c+"px",d.scale(J,J))}else a.width=b,a.height=c}function U(a,b){var c=document.createElement("canvas");c.setAttribute("class","canvasjs-chart-canvas");ea(c,a,b);t||"undefined"===typeof G_vmlCanvasManager||G_vmlCanvasManager.initElement(c);return c}function xa(a,b,c){if(a&&b&&
    c){c=c+"."+("jpeg"===b?"jpg":b);var d="image/"+b;a=a.toDataURL(d);var e=!1,f=document.createElement("a");f.download=c;f.href=a;f.target="_blank";if("undefined"!==typeof Blob&&new Blob){for(var g=a.replace(/^data:[a-z/]*;base64,/,""),g=atob(g),k=new ArrayBuffer(g.length),p=new Uint8Array(k),h=0;h<g.length;h++)p[h]=g.charCodeAt(h);b=new Blob([k],{type:"image/"+b});try{window.navigator.msSaveBlob(b,c),e=!0}catch(l){f.dataset.downloadurl=[d,f.download,f.href].join(":"),f.href=window.URL.createObjectURL(b)}}if(!e)try{event=
    document.createEvent("MouseEvents"),event.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),f.dispatchEvent?f.dispatchEvent(event):f.fireEvent&&f.fireEvent("onclick")}catch(n){b=window.open(),b.document.write("<img src='"+a+"'></img><div>Please right click on the image and save it to your device</div>"),b.document.close()}}}function P(a,b,c){b.getAttribute("state")!==c&&(b.setAttribute("state",c),b.setAttribute("type","button"),b.style.position="relative",b.style.margin="0px 0px 0px 0px",
    b.style.padding="3px 4px 0px 4px",b.style.cssFloat="left",b.setAttribute("title",a._cultureInfo[c+"Text"]),b.innerHTML="<img style='height:16px;' src='"+Ea[c].image+"' alt='"+a._cultureInfo[c+"Text"]+"' />")}function ga(){for(var a=null,b=0;b<arguments.length;b++)a=arguments[b],a.style&&(a.style.display="inline")}function R(){for(var a=null,b=0;b<arguments.length;b++)(a=arguments[b])&&a.style&&(a.style.display="none")}function G(a,b,c,d){this._defaultsKey=a;this.parent=d;this._eventListeners=[];d=
{};c&&(X[c]&&X[c][a])&&(d=X[c][a]);this._options=b?b:{};this.setOptions(this._options,d)}function u(a,b,c){this._publicChartReference=c;b=b||{};u.base.constructor.call(this,"Chart",b,b.theme?b.theme:"theme1");var d=this;this._containerId=a;this._objectsInitialized=!1;this.overlaidCanvasCtx=this.ctx=null;this._indexLabels=[];this._panTimerId=0;this._lastTouchEventType="";this._lastTouchData=null;this.isAnimating=!1;this.renderCount=0;this.panEnabled=this.disableToolTip=this.animatedRender=!1;this._defaultCursor=
    "default";this.plotArea={canvas:null,ctx:null,x1:0,y1:0,x2:0,y2:0,width:0,height:0};this._dataInRenderedOrder=[];(this._container="string"===typeof this._containerId?document.getElementById(this._containerId):this._containerId)?(this._container.innerHTML="",b=a=0,a=this._options.width?this.width:0<this._container.clientWidth?this._container.clientWidth:this.width,b=this._options.height?this.height:0<this._container.clientHeight?this._container.clientHeight:this.height,this.width=a,this.height=b,this.x1=
    this.y1=0,this.x2=this.width,this.y2=this.height,this._selectedColorSet="undefined"!==typeof V[this.colorSet]?V[this.colorSet]:V.colorSet1,this._canvasJSContainer=document.createElement("div"),this._canvasJSContainer.setAttribute("class","canvasjs-chart-container"),this._canvasJSContainer.style.position="relative",this._canvasJSContainer.style.textAlign="left",this._canvasJSContainer.style.cursor="auto",t||(this._canvasJSContainer.style.height="0px"),this._container.appendChild(this._canvasJSContainer),
    this.canvas=U(a,b),this.canvas.style.position="absolute",this.canvas.getContext&&(this._canvasJSContainer.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.ctx.textBaseline="top",Ba(this.ctx),t?this.plotArea.ctx=this.ctx:(this.plotArea.canvas=U(a,b),this.plotArea.canvas.style.position="absolute",this.plotArea.canvas.setAttribute("class","plotAreaCanvas"),this._canvasJSContainer.appendChild(this.plotArea.canvas),this.plotArea.ctx=this.plotArea.canvas.getContext("2d")),this.overlaidCanvas=
    U(a,b),this.overlaidCanvas.style.position="absolute",this._canvasJSContainer.appendChild(this.overlaidCanvas),this.overlaidCanvasCtx=this.overlaidCanvas.getContext("2d"),this.overlaidCanvasCtx.textBaseline="top",this._eventManager=new $(this),F(window,"resize",function(){d._updateSize()&&d.render()}),this._toolBar=document.createElement("div"),this._toolBar.setAttribute("class","canvasjs-chart-toolbar"),this._toolBar.style.cssText="position: absolute; right: 1px; top: 1px;",this._canvasJSContainer.appendChild(this._toolBar),
    this.bounds={x1:0,y1:0,x2:this.width,y2:this.height},F(this.overlaidCanvas,"click",function(a){d._mouseEventHandler(a)}),F(this.overlaidCanvas,"mousemove",function(a){d._mouseEventHandler(a)}),F(this.overlaidCanvas,"mouseup",function(a){d._mouseEventHandler(a)}),F(this.overlaidCanvas,"mousedown",function(a){d._mouseEventHandler(a);R(d._dropdownMenu)}),F(this.overlaidCanvas,"mouseout",function(a){d._mouseEventHandler(a)}),F(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerDown":"touchstart",
    function(a){d._touchEventHandler(a)}),F(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerMove":"touchmove",function(a){d._touchEventHandler(a)}),F(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerUp":"touchend",function(a){d._touchEventHandler(a)}),F(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerCancel":"touchcancel",function(a){d._touchEventHandler(a)}),this._creditLink||(this._creditLink=document.createElement("a"),this._creditLink.setAttribute("class",
    "canvasjs-chart-credit"),this._creditLink.setAttribute("style","outline:none;margin:0px;position:absolute;right:3px;top:"+(this.height-14)+"px;color:dimgrey;text-decoration:none;font-size:10px;font-family:Lucida Grande, Lucida Sans Unicode, Arial, sans-serif"),this._creditLink.setAttribute("tabIndex",-1),this._creditLink.setAttribute("target","_blank")),this._toolTip=new Q(this,this._options.toolTip,this.theme),this.axisY2=this.axisY=this.axisX=this.data=null,this.sessionVariables={axisX:{},axisY:{},
    axisY2:{}})):window.console&&window.console.log('CanvasJS Error: Chart Container with id "'+this._containerId+'" was not found')}function ha(a,b){for(var c=[],d=0;d<a.length;d++)if(0==d)c.push(a[0]);else{var e,f,g;g=d-1;e=0===g?0:g-1;f=g===a.length-1?g:g+1;c[c.length]={x:a[g].x+(a[f].x-a[e].x)/b/3,y:a[g].y+(a[f].y-a[e].y)/b/3};g=d;e=0===g?0:g-1;f=g===a.length-1?g:g+1;c[c.length]={x:a[g].x-(a[f].x-a[e].x)/b/3,y:a[g].y-(a[f].y-a[e].y)/b/3};c[c.length]=a[d]}return c}function ya(a,b){if(null===a||"undefined"===
    typeof a)return b;var c=parseFloat(a.toString())*(0<=a.toString().indexOf("%")?b/100:1);return!isNaN(c)&&c<=b&&0<=c?c:b}function Y(a,b,c,d,e){"undefined"===typeof e&&(e=0);this._padding=e;this._x1=a;this._y1=b;this._x2=c;this._y2=d;this._rightOccupied=this._leftOccupied=this._bottomOccupied=this._topOccupied=this._padding}function H(a,b){H.base.constructor.call(this,"TextBlock",b);this.ctx=a;this._isDirty=!0;this._wrappedText=null;this._lineHeight=da(this.fontFamily,this.fontSize,this.fontWeight)}
    function aa(a,b){aa.base.constructor.call(this,"Title",b,a.theme);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;"undefined"===typeof this._options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));this.height=this.width=null;this.bounds={x1:null,y1:null,x2:null,y2:null}}function ia(a,b){ia.base.constructor.call(this,"Subtitle",b,a.theme);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;"undefined"===typeof this._options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));
        this.height=this.width=null;this.bounds={x1:null,y1:null,x2:null,y2:null}}function ja(a,b,c){ja.base.constructor.call(this,"Legend",b,c);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;this.ghostCtx=this.chart._eventManager.ghostCtx;this.items=[];this.height=this.width=0;this.orientation=null;this.dataSeries=[];this.bounds={x1:null,y1:null,x2:null,y2:null};"undefined"===typeof this._options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));this.lineHeight=da(this.fontFamily,
        this.fontSize,this.fontWeight);this.horizontalSpacing=this.fontSize}function oa(a,b){oa.base.constructor.call(this,b);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx}function S(a,b,c,d,e){S.base.constructor.call(this,"DataSeries",b,c);this.chart=a;this.canvas=a.canvas;this._ctx=a.canvas.ctx;this.index=d;this.noDataPointsInPlotArea=0;this.id=e;this.chart._eventManager.objectMap[e]={id:e,objectType:"dataSeries",dataSeriesIndex:d};this.dataPointIds=[];this.plotUnit=[];this.axisY=this.axisX=
        null;null===this.fillOpacity&&(this.type.match(/area/i)?this.fillOpacity=0.7:this.fillOpacity=1);this.axisPlacement=this.getDefaultAxisPlacement();"undefined"===typeof this._options.indexLabelFontSize&&(this.indexLabelFontSize=this.chart.getAutoFontSize(this.indexLabelFontSize))}function C(a,b,c,d){C.base.constructor.call(this,"Axis",b,a.theme);this.chart=a;this.canvas=a.canvas;this.ctx=a.ctx;this.intervalStartPosition=this.maxHeight=this.maxWidth=0;this.labels=[];this._labels=null;this.dataInfo=
    {min:Infinity,max:-Infinity,viewPortMin:Infinity,viewPortMax:-Infinity,minDiff:Infinity};"axisX"===c?(this.sessionVariables=this.chart.sessionVariables[c],this._options.interval||(this.intervalType=null)):this.sessionVariables="left"===d||"top"===d?this.chart.sessionVariables.axisY:this.chart.sessionVariables.axisY2;"undefined"===typeof this._options.titleFontSize&&(this.titleFontSize=this.chart.getAutoFontSize(this.titleFontSize));"undefined"===typeof this._options.labelFontSize&&(this.labelFontSize=
        this.chart.getAutoFontSize(this.labelFontSize));this.type=c;"axisX"!==c||b&&"undefined"!==typeof b.gridThickness||(this.gridThickness=0);this._position=d;this.lineCoordinates={x1:null,y1:null,x2:null,y2:null,width:null};this.labelAngle=(this.labelAngle%360+360)%360;90<this.labelAngle&&270>=this.labelAngle?this.labelAngle-=180:180<this.labelAngle&&270>=this.labelAngle?this.labelAngle-=180:270<this.labelAngle&&360>=this.labelAngle&&(this.labelAngle-=360);if(this._options.stripLines&&0<this._options.stripLines.length)for(this.stripLines=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        [],b=0;b<this._options.stripLines.length;b++)this.stripLines.push(new ka(this.chart,this._options.stripLines[b],a.theme,++this.chart._eventManager.lastObjectId,this));this._titleTextBlock=null;this.hasOptionChanged("viewportMinimum")&&null===this.viewportMinimum&&(this._options.viewportMinimum=void 0,this.sessionVariables.viewportMinimum=null);this.hasOptionChanged("viewportMinimum")||isNaN(this.sessionVariables.newViewportMinimum)||null===this.sessionVariables.newViewportMinimum?this.sessionVariables.newViewportMinimum=
        null:this.viewportMinimum=this.sessionVariables.newViewportMinimum;this.hasOptionChanged("viewportMaximum")&&null===this.viewportMaximum&&(this._options.viewportMaximum=void 0,this.sessionVariables.viewportMaximum=null);this.hasOptionChanged("viewportMaximum")||isNaN(this.sessionVariables.newViewportMaximum)||null===this.sessionVariables.newViewportMaximum?this.sessionVariables.newViewportMaximum=null:this.viewportMaximum=this.sessionVariables.newViewportMaximum;null!==this.minimum&&null!==this.viewportMinimum&&
    (this.viewportMinimum=Math.max(this.viewportMinimum,this.minimum));null!==this.maximum&&null!==this.viewportMaximum&&(this.viewportMaximum=Math.min(this.viewportMaximum,this.maximum));this.trackChanges("viewportMinimum");this.trackChanges("viewportMaximum")}function ka(a,b,c,d,e){ka.base.constructor.call(this,"StripLine",b,c,e);this.id=d;this.chart=a;this.ctx=this.chart.ctx;this.label=this.label;this._thicknessType="pixel";null!==this.startValue&&null!==this.endValue&&(this.value=((this.startValue.getTime?
            this.startValue.getTime():this.startValue)+(this.endValue.getTime?this.endValue.getTime():this.endValue))/2,this.thickness=Math.max(this.endValue-this.startValue),this._thicknessType="value")}function Q(a,b,c){Q.base.constructor.call(this,"ToolTip",b,c);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;this.currentDataPointIndex=this.currentSeriesIndex=-1;this._timerId=0;this._prevY=this._prevX=NaN;this._initialize()}function $(a){this.chart=a;this.lastObjectId=0;this.objectMap=[];this.rectangularRegionEventSubscriptions=
        [];this.previousDataPointEventObject=null;this.ghostCanvas=U(this.chart.width,this.chart.height);this.ghostCtx=this.ghostCanvas.getContext("2d");this.mouseoveredObjectMaps=[]}function ba(a){var b;a&&ca[a]&&(b=ca[a]);ba.base.constructor.call(this,"CultureInfo",b)}function pa(a){this.chart=a;this.ctx=this.chart.plotArea.ctx;this.animations=[];this.animationRequestId=null}var t=!!document.createElement("canvas").getContext,la={Chart:{width:500,height:400,zoomEnabled:!1,zoomType:"x",backgroundColor:"white",
        theme:"theme1",animationEnabled:!1,animationDuration:1200,dataPointWidth:null,dataPointMinWidth:null,dataPointMaxWidth:null,colorSet:"colorSet1",culture:"en",creditText:"CanvasJS.com",interactivityEnabled:!0,exportEnabled:!1,exportFileName:"Chart",rangeChanging:null,rangeChanged:null},Title:{padding:0,text:null,verticalAlign:"top",horizontalAlign:"center",fontSize:20,fontFamily:"Calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,
        backgroundColor:null,margin:5,wrap:!0,maxWidth:null,dockInsidePlotArea:!1},Subtitle:{padding:0,text:null,verticalAlign:"top",horizontalAlign:"center",fontSize:14,fontFamily:"Calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,backgroundColor:null,margin:2,wrap:!0,maxWidth:null,dockInsidePlotArea:!1},Legend:{name:null,verticalAlign:"center",horizontalAlign:"right",fontSize:14,fontFamily:"calibri",fontWeight:"normal",fontColor:"black",
        fontStyle:"normal",cursor:null,itemmouseover:null,itemmouseout:null,itemmousemove:null,itemclick:null,dockInsidePlotArea:!1,reversed:!1,maxWidth:null,maxHeight:null,itemMaxWidth:null,itemWidth:null,itemWrap:!0,itemTextFormatter:null},ToolTip:{enabled:!0,shared:!1,animationEnabled:!0,content:null,contentFormatter:null,reversed:!1,backgroundColor:null,borderColor:null,borderThickness:2,cornerRadius:5,fontSize:14,fontColor:"#000000",fontFamily:"Calibri, Arial, Georgia, serif;",fontWeight:"normal",fontStyle:"italic"},
        Axis:{minimum:null,maximum:null,viewportMinimum:null,viewportMaximum:null,interval:null,intervalType:null,title:null,titleFontColor:"black",titleFontSize:20,titleFontFamily:"arial",titleFontWeight:"normal",titleFontStyle:"normal",labelAngle:0,labelFontFamily:"arial",labelFontColor:"black",labelFontSize:12,labelFontWeight:"normal",labelFontStyle:"normal",labelAutoFit:!1,labelWrap:!0,labelMaxWidth:null,labelFormatter:null,prefix:"",suffix:"",includeZero:!0,tickLength:5,tickColor:"black",tickThickness:1,
            lineColor:"black",lineThickness:1,lineDashType:"solid",gridColor:"A0A0A0",gridThickness:0,gridDashType:"solid",interlacedColor:null,valueFormatString:null,margin:2,stripLines:[]},StripLine:{value:null,startValue:null,endValue:null,color:"orange",opacity:null,thickness:2,lineDashType:"solid",label:"",labelBackgroundColor:"#EEEEEE",labelFontFamily:"arial",labelFontColor:"orange",labelFontSize:12,labelFontWeight:"normal",labelFontStyle:"normal",labelFormatter:null,showOnTop:!1},DataSeries:{name:null,
            dataPoints:null,label:"",bevelEnabled:!1,highlightEnabled:!0,cursor:null,indexLabel:"",indexLabelPlacement:"auto",indexLabelOrientation:"horizontal",indexLabelFontColor:"black",indexLabelFontSize:12,indexLabelFontStyle:"normal",indexLabelFontFamily:"Arial",indexLabelFontWeight:"normal",indexLabelBackgroundColor:null,indexLabelLineColor:null,indexLabelLineThickness:1,indexLabelLineDashType:"solid",indexLabelMaxWidth:null,indexLabelWrap:!0,indexLabelFormatter:null,lineThickness:2,lineDashType:"solid",
            color:null,risingColor:"white",fillOpacity:null,startAngle:0,radius:null,innerRadius:null,type:"column",xValueType:"number",axisYType:"primary",xValueFormatString:null,yValueFormatString:null,zValueFormatString:null,percentFormatString:null,showInLegend:null,legendMarkerType:null,legendMarkerColor:null,legendText:null,legendMarkerBorderColor:null,legendMarkerBorderThickness:null,markerType:"circle",markerColor:null,markerSize:null,markerBorderColor:null,markerBorderThickness:null,mouseover:null,mouseout:null,
            mousemove:null,click:null,toolTipContent:null,visible:!0},TextBlock:{x:0,y:0,width:null,height:null,maxWidth:null,maxHeight:null,padding:0,angle:0,text:"",horizontalAlign:"center",fontSize:12,fontFamily:"calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,backgroundColor:null,textBaseline:"top"},CultureInfo:{decimalSeparator:".",digitGroupSeparator:",",zoomText:"Zoom",panText:"Pan",resetText:"Reset",menuText:"More Options",saveJPGText:"Save as JPG",
            savePNGText:"Save as PNG",days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),shortDays:"Sun Mon Tue Wed Thu Fri Sat".split(" "),months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")}},ca={en:{}},V={colorSet1:"#369EAD #C24642 #7F6084 #86B402 #A2D1CF #C8B631 #6DBCEB #52514E #4F81BC #A064A1 #F79647".split(" "),colorSet2:"#4F81BC #C0504E #9BBB58 #23BFAA #8064A1 #4AACC5 #F79647 #33558B".split(" "),
        colorSet3:"#8CA1BC #36845C #017E82 #8CB9D0 #708C98 #94838D #F08891 #0366A7 #008276 #EE7757 #E5BA3A #F2990B #03557B #782970".split(" ")},X={theme1:{Chart:{colorSet:"colorSet1"},Title:{fontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",fontSize:33,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Subtitle:{fontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",fontSize:16,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",
        margin:5},Axis:{titleFontSize:26,titleFontColor:"#666666",titleFontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",labelFontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",labelFontSize:18,labelFontColor:"grey",tickColor:"#BBBBBB",tickThickness:2,gridThickness:2,gridColor:"#BBBBBB",lineThickness:2,lineColor:"#BBBBBB"},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:t?"monospace, sans-serif,arial black":"calibri"},DataSeries:{indexLabelFontColor:"grey",
        indexLabelFontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",indexLabelFontSize:18,indexLabelLineThickness:1}},theme2:{Chart:{colorSet:"colorSet2"},Title:{fontFamily:"impact, charcoal, arial black, sans-serif",fontSize:32,fontColor:"#333333",verticalAlign:"top",margin:5},Subtitle:{fontFamily:"impact, charcoal, arial black, sans-serif",fontSize:14,fontColor:"#333333",verticalAlign:"top",margin:5},Axis:{titleFontSize:22,titleFontColor:"rgb(98,98,98)",titleFontFamily:t?"monospace, sans-serif,arial black":
        "arial",titleFontWeight:"bold",labelFontFamily:t?"monospace, Courier New, Courier":"arial",labelFontSize:16,labelFontColor:"grey",labelFontWeight:"bold",tickColor:"grey",tickThickness:2,gridThickness:2,gridColor:"grey",lineColor:"grey",lineThickness:0},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:t?"monospace, sans-serif,arial black":"arial"},DataSeries:{indexLabelFontColor:"grey",indexLabelFontFamily:t?"Courier New, Courier, monospace":"arial",indexLabelFontWeight:"bold",indexLabelFontSize:18,
        indexLabelLineThickness:1}},theme3:{Chart:{colorSet:"colorSet1"},Title:{fontFamily:t?"Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif":"calibri",fontSize:32,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Subtitle:{fontFamily:t?"Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif":"calibri",fontSize:16,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Axis:{titleFontSize:22,titleFontColor:"rgb(98,98,98)",
        titleFontFamily:t?"Verdana, Geneva, Calibri, sans-serif":"calibri",labelFontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",labelFontSize:18,labelFontColor:"grey",tickColor:"grey",tickThickness:2,gridThickness:2,gridColor:"grey",lineThickness:2,lineColor:"grey"},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:t?"monospace, sans-serif,arial black":"calibri"},DataSeries:{bevelEnabled:!0,indexLabelFontColor:"grey",indexLabelFontFamily:t?"Candara, Optima, Calibri, Verdana, Geneva, sans-serif":
        "calibri",indexLabelFontSize:18,indexLabelLineColor:"lightgrey",indexLabelLineThickness:2}}},D={numberDuration:1,yearDuration:314496E5,monthDuration:2592E6,weekDuration:6048E5,dayDuration:864E5,hourDuration:36E5,minuteDuration:6E4,secondDuration:1E3,millisecondDuration:1,dayOfWeekFromInt:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")},ua={},T=null,qa=function(){var a=/D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g,b="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        c="Sun Mon Tue Wed Thu Fri Sat".split(" "),d="January February March April May June July August September October November December".split(" "),e="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),f=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,g=/[^-+\dA-Z]/g;return function(k,p,h){var l=h?h.days:b,n=h?h.months:d,m=h?h.shortDays:c,q=h?h.shortMonths:e;h="";var r=!1;k=k&&k.getTime?k:k?new Date(k):new Date;
        if(isNaN(k))throw SyntaxError("invalid date");"UTC:"===p.slice(0,4)&&(p=p.slice(4),r=!0);h=r?"getUTC":"get";var s=k[h+"Date"](),w=k[h+"Day"](),v=k[h+"Month"](),x=k[h+"FullYear"](),t=k[h+"Hours"](),y=k[h+"Minutes"](),z=k[h+"Seconds"](),u=k[h+"Milliseconds"](),A=r?0:k.getTimezoneOffset();return h=p.replace(a,function(a){switch(a){case "D":return s;case "DD":return L(s,2);case "DDD":return m[w];case "DDDD":return l[w];case "M":return v+1;case "MM":return L(v+1,2);case "MMM":return q[v];case "MMMM":return n[v];
            case "Y":return parseInt(String(x).slice(-2));case "YY":return L(String(x).slice(-2),2);case "YYY":return L(String(x).slice(-3),3);case "YYYY":return L(x,4);case "h":return t%12||12;case "hh":return L(t%12||12,2);case "H":return t;case "HH":return L(t,2);case "m":return y;case "mm":return L(y,2);case "s":return z;case "ss":return L(z,2);case "f":return String(u).slice(0,1);case "ff":return L(String(u).slice(0,2),2);case "fff":return L(String(u).slice(0,3),3);case "t":return 12>t?"a":"p";case "tt":return 12>
            t?"am":"pm";case "T":return 12>t?"A":"P";case "TT":return 12>t?"AM":"PM";case "K":return r?"UTC":(String(k).match(f)||[""]).pop().replace(g,"");case "z":return(0<A?"-":"+")+Math.floor(Math.abs(A)/60);case "zz":return(0<A?"-":"+")+L(Math.floor(Math.abs(A)/60),2);case "zzz":return(0<A?"-":"+")+L(Math.floor(Math.abs(A)/60),2)+L(Math.abs(A)%60,2);default:return a.slice(1,a.length-1)}})}}(),W=function(a,b,c){if(null===a)return"";a=Number(a);var d=0>a?!0:!1;d&&(a*=-1);var e=c?c.decimalSeparator:".",f=c?
        c.digitGroupSeparator:",",g="";b=String(b);var g=1,k=c="",p=-1,h=[],l=[],n=0,m=0,q=0,r=!1,s=0,k=b.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|\u2030|./g);b=null;for(var w=0;k&&w<k.length;w++)if(b=k[w],"."===b&&0>p)p=w;else{if("%"===b)g*=100;else if("\u2030"===b){g*=1E3;continue}else if(","===b[0]&&"."===b[b.length-1]){g/=Math.pow(1E3,b.length-1);p=w+b.length-1;continue}else"E"!==b[0]&&"e"!==b[0]||"0"!==b[b.length-1]||(r=!0);0>p?(h.push(b),"#"===b||"0"===b?n++:","===b&&q++):(l.push(b),"#"!==b&&"0"!==
    b||m++)}r&&(b=Math.floor(a),s=(0===b?"":String(b)).length-n,g/=Math.pow(10,s));0>p&&(p=w);g=(a*g).toFixed(m);b=g.split(".");g=(b[0]+"").split("");a=(b[1]+"").split("");g&&"0"===g[0]&&g.shift();for(w=r=k=m=p=0;0<h.length;)if(b=h.pop(),"#"===b||"0"===b)if(p++,p===n){var v=g,g=[];if("0"===b)for(b=n-m-(v?v.length:0);0<b;)v.unshift("0"),b--;for(;0<v.length;)c=v.pop()+c,w++,0===w%r&&(k===q&&0<v.length)&&(c=f+c);d&&(c="-"+c)}else 0<g.length?(c=g.pop()+c,m++,w++):"0"===b&&(c="0"+c,m++,w++),0===w%r&&(k===
    q&&0<g.length)&&(c=f+c);else"E"!==b[0]&&"e"!==b[0]||"0"!==b[b.length-1]||!/[eE][+-]*[0]+/.test(b)?","===b?(k++,r=w,w=0,0<g.length&&(c=f+c)):c=1<b.length&&('"'===b[0]&&'"'===b[b.length-1]||"'"===b[0]&&"'"===b[b.length-1])?b.slice(1,b.length-1)+c:b+c:(b=0>s?b.replace("+","").replace("-",""):b.replace("-",""),c+=b.replace(/[0]+/,function(a){return L(s,a.length)}));d="";for(f=!1;0<l.length;)b=l.shift(),"#"===b||"0"===b?0<a.length&&0!==Number(a.join(""))?(d+=a.shift(),f=!0):"0"===b&&(d+="0",f=!0):1<b.length&&
    ('"'===b[0]&&'"'===b[b.length-1]||"'"===b[0]&&"'"===b[b.length-1])?d+=b.slice(1,b.length-1):"E"!==b[0]&&"e"!==b[0]||"0"!==b[b.length-1]||!/[eE][+-]*[0]+/.test(b)?d+=b:(b=0>s?b.replace("+","").replace("-",""):b.replace("-",""),d+=b.replace(/[0]+/,function(a){return L(s,a.length)}));return c+((f?e:"")+d)},ma=function(a){var b=0,c=0;a=a||window.event;a.offsetX||0===a.offsetX?(b=a.offsetX,c=a.offsetY):a.layerX||0==a.layerX?(b=a.layerX,c=a.layerY):(b=a.pageX-a.target.offsetLeft,c=a.pageY-a.target.offsetTop);
        return{x:b,y:c}},wa=!0,na=window.devicePixelRatio||1,fa=1,J=wa?na/fa:1,Ea={reset:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAKRSURBVEiJrdY/iF1FFMfxzwnZrGISUSR/JLGIhoh/QiRNBLWxMLIWEkwbgiAoFgoW2mhlY6dgpY2IlRBRxBSKhSAKIklWJRYuMZKAhiyopAiaTY7FvRtmZ+/ed9/zHRjezLw5v/O9d86cuZGZpmURAfdn5o9DfdZNLXpjz+LziPgyIl6MiG0jPTJzZBuyDrP4BVm0P/AKbljTb4ToY/gGewYA7KyCl+1b3DUYANvwbiHw0gCAGRzBOzjTAXEOu0cC4Ch+r5x/HrpdrcZmvIDFSucMtnYCYC++6HmNDw8FKDT34ETrf639/azOr5vwRk/g5fbeuABtgC04XWk9VQLciMP4EH/3AFzErRNC7MXlQmsesSoHsGPE23hmEoBW+61K66HMXFmIMvN8myilXS36R01ub+KfYvw43ZXwYDX+AHP4BAci4pFJomfmr/ihmNofESsBImJGk7mlncrM45n5JPbhz0kAWpsv+juxaX21YIPmVJS2uNzJMS6ZNexC0d+I7fUWXLFyz2kSZlpWPvASlmqAf/FXNXf3FAF2F/1LuFifAlionB6dRuSI2IwHi6lzmXmp6xR8XY0fiIh7psAwh+3FuDkRHQVjl+a8lkXjo0kLUKH7XaV5oO86PmZ1FTzyP4K/XGl9v/zwfbW7BriiuETGCP5ch9bc9f97HF/vcFzCa5gdEPgWq+t/4v0V63oE1uF4h0DiFJ7HnSWMppDdh1dxtsPvJ2wcBNAKbsJXa0Ck5opdaBPsRNu/usba09i1KsaAVzmLt3sghrRjuK1Tf4xkegInxwy8gKf7dKMVH2QRsV5zXR/Cftyu+aKaKbbkQrsdH+PTzLzcqzkOQAVzM+7FHdiqqe2/YT4zF/t8S/sPmawyvC974vcAAAAASUVORK5CYII="},
        pan:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJVSURBVFiFvZe7a1RBGMV/x2hWI4JpfKCIiSBKOoOCkID/wP4BFqIIFkE02ChIiC8QDKlSiI3YqRBsBVGwUNAUdiIEUgjiAzQIIsuKJsfizsXr5t7d+8jmwLDfzHz3nLOzc7+ZxTZlGyDgZiWOCuJ9wH2gCUyuqQFgF/AGcKJNrYkBYBj40CIet+muGQi/96kM4WS7C/Tm5VUg7whJg8BkEGkCR4BDYfodsADUgP6wErO5iCtswsuJb32hdbXy8qzL5TIdmzJinHdZoZIBZcSFkGlAKs1Z3YCketZcBtouuaQNkrblMiBpBrhme7mAgU4wMCvpcFsDkq4C54DFVRTH9h+i6vlE0r5UA5ImgCuh28jB28iIs7BIVCOeStoZD64P4uPAjUTygKSx2FsK2TIwkugfk9Qkfd/E+yMWHQCeSRqx/R3gOp3LazfaS2C4B5gHDgD7U9x3E3uAH7KNpC3AHHAwTL4FHgM9GQ8vAaPA0dB/Abxqk2/gBLA9MXba9r1k/d4LfA3JtwueBeM58ucS+edXnAW23wP10N3advEi9CXizTnyN4bPS7Zn4sH/dq3t18AY4e1YLYSy3g/csj2VnFshZPuOpOeSKHCodUINuGj7YetE6je1PV9QoNPJ9StNHKodx7nRbiWrGHBGXAi5DUiqtQwtpcWK0Jubt8CltA5MEV1IfwO7+VffPwGfia5m34CT4bXujIIX0Qna1/cGMNqV/wUJE2czxD8CQ4X5Sl7Jz7SILwCDpbjKPBRMHAd+EtX4HWV5Spdc2w8kDQGPbH8py/MXMygM69/FKz4AAAAASUVORK5CYII="},
        zoom:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAMqSURBVFiFvdfbj91TFMDxz57U6GUEMS1aYzyMtCSSDhWjCZMInpAI3khE/QHtgzdRkXgSCS8SES9epKLi0oRKNETjRahREq2KS1stdRujtDPtbA97n5zdn9+5zJxTK9k5v3POXmt991p7r71+IcaoGwkhTOIebMRqzOBTvIG3Y4zTXRmqSoyx5cAKbMJOHMFJnMZ8/jyFaXyMR7G6nb1aH22cP4BvcBxziG3GKfyTIR9D6BYg1KUghPBCDveFlb/24Av8iuUYw41YVsz5G7uxKcZ4aMEpwGt5NY3V/YbHsQ6rcAHOw/kYxigewr5CZw4fYGxBKcCLOFEYehXrMdRhr5yLETxVScsOLOkKAPfn1TYMPIvLFrShUlS2FDZm8XRHACzFAWl3R2xbqPMCYhmeLCAOYEMngAczbcTvuHYxzguIy/FesR9e6gSwU/OoPYHBHgHgviIKX2Flq7k34KhmcVnbi/PC8JX4MgMcxb118wZwdz5aISscqx7VRcox7MrPQ7i+btIAJrAkf9+bI9EPmZY2IAxiTSuAldLq4Y9+AcSUh78KP0tbAcwU35cXMD1JCIFUoGiehlqAz6TNB1f1C0DK+0h+nsNPrQC2a4bqGmlD9kOGcWt+Po6pVgDvSxfJaSkFd4UQBvoAsBYbCoB3a2flM7slA0R8iyt6rAFDeDPbm8eOTpVwGD9qVq7nLbIaZnmksPU1JtsCZMXNmpdRxFasWITzh6Xj3LCzra1OxcD2QjHiGVzdpfORnMqZio2PcF23ABdJF1Np4BPptlyPi6WzPYBzpJZtHe7A6xW9cnyP8TqA//SEIYRL8Bxul7rihvwgtVn78WcGGZXa9HGd5TDujDHuOePXNiHdKjWgZX/YbsxLx/ktqbjVzTlcjUSnvI5JrdlUVp6WesZZ6R1hRrpq9+EVTGS9jTjYAuKIouGpbcurEkIYxC051KNSamazsc+xK8b4S0VnEi/j0hqTP+M27O258egQwZuzs7pI7Mf4WQXIEDc5s9sux+5+1Py2EmP8UOq6GvWhIScxfdYjUERiAt9Jd84J6a16zf8JEKT3yCm8g1UxRv8CC4pyRhzR1uUAAAAASUVORK5CYII="},
        menu:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTUvMTTPsvU0AAAAP0lEQVRIie2SMQoAIBDDUvH/X667g8sJJ9KOhYYOkW0qGaU1MPdC0vGSbV19EACo3YMPAFH5BUBUjsqfAPpVXtNgGDfxEDCtAAAAAElFTkSuQmCC"}};G.prototype.setOptions=function(a,b){if(la[this._defaultsKey]){var c=la[this._defaultsKey],d;for(d in c)c.hasOwnProperty(d)&&(this[d]=a&&d in a?a[d]:b&&d in
    b?b[d]:c[d])}};G.prototype.updateOption=function(a){var b=la[this._defaultsKey],c=this._options.theme?this._options.theme:this.chart&&this.chart._options.theme?this.chart._options.theme:"theme1",d={},e=this[a];c&&(X[c]&&X[c][this._defaultsKey])&&(d=X[c][this._defaultsKey]);a in b&&(e=a in this._options?this._options[a]:d&&a in d?d[a]:b[a]);if(e===this[a])return!1;this[a]=e;return!0};G.prototype.trackChanges=function(a){if(!this.sessionVariables)throw"Session Variable Store not set";this.sessionVariables[a]=
        this._options[a]};G.prototype.isBeingTracked=function(a){this._options._oldOptions||(this._options._oldOptions={});return this._options._oldOptions[a]?!0:!1};G.prototype.hasOptionChanged=function(a){if(!this.sessionVariables)throw"Session Variable Store not set";return this.sessionVariables[a]!==this._options[a]};G.prototype.addEventListener=function(a,b,c){a&&b&&(this._eventListeners[a]=this._eventListeners[a]||[],this._eventListeners[a].push({context:c||this,eventHandler:b}))};G.prototype.removeEventListener=
        function(a,b){if(a&&b&&this._eventListeners[a])for(var c=this._eventListeners[a],d=0;d<c.length;d++)if(c[d].eventHandler===b){c[d].splice(d,1);break}};G.prototype.removeAllEventListeners=function(){this._eventListeners=[]};G.prototype.dispatchEvent=function(a,b,c){if(a&&this._eventListeners[a]){b=b||{};for(var d=this._eventListeners[a],e=0;e<d.length;e++)d[e].eventHandler.call(d[e].context,b)}"function"===typeof this[a]&&this[a].call(c||this.chart._publicChartReference,b)};O(u,G);u.prototype._updateOptions=
        function(){var a=this;this.updateOption("width");this.updateOption("height");this.updateOption("dataPointWidth");this.updateOption("dataPointMinWidth");this.updateOption("dataPointMaxWidth");this.updateOption("interactivityEnabled");this.updateOption("theme");this.updateOption("colorSet")&&(this._selectedColorSet="undefined"!==typeof V[this.colorSet]?V[this.colorSet]:V.colorSet1);this.updateOption("backgroundColor");this.backgroundColor||(this.backgroundColor="rgba(0,0,0,0)");this.updateOption("culture");
            this._cultureInfo=new ba(this._options.culture);this.updateOption("animationEnabled");this.animationEnabled=this.animationEnabled&&t;this.updateOption("animationDuration");this.updateOption("rangeChanging");this.updateOption("rangeChanged");this.updateOption("exportEnabled");this.updateOption("exportFileName");this.updateOption("zoomType");this._options.zoomEnabled?(this._zoomButton||(R(this._zoomButton=document.createElement("button")),P(this,this._zoomButton,"pan"),this._toolBar.appendChild(this._zoomButton),
                F(this._zoomButton,"click",function(){a.zoomEnabled?(a.zoomEnabled=!1,a.panEnabled=!0,P(a,a._zoomButton,"zoom")):(a.zoomEnabled=!0,a.panEnabled=!1,P(a,a._zoomButton,"pan"));a.render()})),this._resetButton||(R(this._resetButton=document.createElement("button")),P(this,this._resetButton,"reset"),this._toolBar.appendChild(this._resetButton),F(this._resetButton,"click",function(){a._toolTip.hide();a.zoomEnabled||a.panEnabled?(a.zoomEnabled=!0,a.panEnabled=!1,P(a,a._zoomButton,"pan"),a._defaultCursor=
                "default",a.overlaidCanvas.style.cursor=a._defaultCursor):(a.zoomEnabled=!1,a.panEnabled=!1);a.sessionVariables.axisX&&(a.sessionVariables.axisX.newViewportMinimum=null,a.sessionVariables.axisX.newViewportMaximum=null);a.sessionVariables.axisY&&(a.sessionVariables.axisY.newViewportMinimum=null,a.sessionVariables.axisY.newViewportMaximum=null);a.sessionVariables.axisY2&&(a.sessionVariables.axisY2.newViewportMinimum=null,a.sessionVariables.axisY2.newViewportMaximum=null);a.resetOverlayedCanvas();R(a._zoomButton,
                a._resetButton);a._dispatchRangeEvent("rangeChanging","reset");a.render();a._dispatchRangeEvent("rangeChanged","reset")}),this.overlaidCanvas.style.cursor=a._defaultCursor),this.zoomEnabled||this.panEnabled||(this._zoomButton?(a._zoomButton.getAttribute("state")===a._cultureInfo.zoomText?(this.panEnabled=!0,this.zoomEnabled=!1):(this.zoomEnabled=!0,this.panEnabled=!1),ga(a._zoomButton,a._resetButton)):(this.zoomEnabled=!0,this.panEnabled=!1))):this.panEnabled=this.zoomEnabled=!1;this._menuButton?
                this.exportEnabled?ga(this._menuButton):R(this._menuButton):this.exportEnabled&&t&&(this._menuButton=document.createElement("button"),P(this,this._menuButton,"menu"),this._toolBar.appendChild(this._menuButton),F(this._menuButton,"click",function(){"none"!==a._dropdownMenu.style.display||a._dropDownCloseTime&&500>=(new Date).getTime()-a._dropDownCloseTime.getTime()||(a._dropdownMenu.style.display="block",a._menuButton.blur(),a._dropdownMenu.focus())},!0));if(!this._dropdownMenu&&this.exportEnabled&&
                t){this._dropdownMenu=document.createElement("div");this._dropdownMenu.setAttribute("tabindex",-1);this._dropdownMenu.style.cssText="position: absolute; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 1px;top: 25px;min-width: 120px;outline: 0;border: 1px solid silver;font-size: 14px;font-family: Calibri, Verdana, sans-serif;padding: 5px 0px 5px 0px;text-align: left;background-color: #fff;line-height: 20px;box-shadow: 2px 2px 10px #888888;";
                a._dropdownMenu.style.display="none";this._toolBar.appendChild(this._dropdownMenu);F(this._dropdownMenu,"blur",function(){R(a._dropdownMenu);a._dropDownCloseTime=new Date},!0);var b=document.createElement("div");b.style.cssText="padding: 2px 15px 2px 10px";b.innerHTML=this._cultureInfo.saveJPGText;this._dropdownMenu.appendChild(b);F(b,"mouseover",function(){this.style.backgroundColor="#EEEEEE"},!0);F(b,"mouseout",function(){this.style.backgroundColor="transparent"},!0);F(b,"click",function(){xa(a.canvas,
                    "jpg",a.exportFileName);R(a._dropdownMenu)},!0);b=document.createElement("div");b.style.cssText="padding: 2px 15px 2px 10px";b.innerHTML=this._cultureInfo.savePNGText;this._dropdownMenu.appendChild(b);F(b,"mouseover",function(){this.style.backgroundColor="#EEEEEE"},!0);F(b,"mouseout",function(){this.style.backgroundColor="transparent"},!0);F(b,"click",function(){xa(a.canvas,"png",a.exportFileName);R(a._dropdownMenu)},!0)}"none"!==this._toolBar.style.display&&this._zoomButton&&(this.panEnabled?P(a,
                a._zoomButton,"zoom"):P(a,a._zoomButton,"pan"),a._resetButton.getAttribute("state")!==a._cultureInfo.resetText&&P(a,a._resetButton,"reset"));if("undefined"===typeof la.Chart.creditHref)this.creditHref="http://canvasjs.com/",this.creditText="CanvasJS.com";else var c=this.updateOption("creditText"),d=this.updateOption("creditHref");if(0===this.renderCount||c||d)this._creditLink.setAttribute("href",this.creditHref),this._creditLink.innerHTML=this.creditText;this.creditHref&&this.creditText?this._creditLink.parentElement||
            this._canvasJSContainer.appendChild(this._creditLink):this._creditLink.parentElement&&this._canvasJSContainer.removeChild(this._creditLink);this._options.toolTip&&this._toolTip._options!==this._options.toolTip&&(this._toolTip._options=this._options.toolTip);for(var e in this._toolTip._options)this._toolTip._options.hasOwnProperty(e)&&this._toolTip.updateOption(e)};u.prototype._updateSize=function(){var a=0,b=0;this._options.width?a=this.width:this.width=a=0<this._container.clientWidth?this._container.clientWidth:
        this.width;this._options.height?b=this.height:this.height=b=0<this._container.clientHeight?this._container.clientHeight:this.height;return this.canvas.width!==a*J||this.canvas.height!==b*J?(ea(this.canvas,a,b),ea(this.overlaidCanvas,a,b),ea(this._eventManager.ghostCanvas,a,b),!0):!1};u.prototype._initialize=function(){this._animator?this._animator.cancelAllAnimations():this._animator=new pa(this);this.removeAllEventListeners();this.disableToolTip=!1;this._axes=[];this.pieDoughnutClickHandler=null;
        this.animationRequestId&&this.cancelRequestAnimFrame.call(window,this.animationRequestId);this._updateOptions();this.animatedRender=t&&this.animationEnabled&&0===this.renderCount;this._updateSize();this.clearCanvas();this.ctx.beginPath();this.axisY2=this.axisY=this.axisX=null;this._indexLabels=[];this._dataInRenderedOrder=[];this._events=[];this._eventManager&&this._eventManager.reset();this.plotInfo={axisPlacement:null,axisXValueType:null,plotTypes:[]};this.layoutManager=new Y(0,0,this.width,this.height,
            2);this.plotArea.layoutManager&&this.plotArea.layoutManager.reset();this.data=[];for(var a=0,b=0;b<this._options.data.length;b++)if(a++,!this._options.data[b].type||0<=u._supportedChartTypes.indexOf(this._options.data[b].type)){var c=new S(this,this._options.data[b],this.theme,a-1,++this._eventManager.lastObjectId);null===c.name&&(c.name="DataSeries "+a);null===c.color?1<this._options.data.length?(c._colorSet=[this._selectedColorSet[c.index%this._selectedColorSet.length]],c.color=this._selectedColorSet[c.index%
        this._selectedColorSet.length]):c._colorSet="line"===c.type||"stepLine"===c.type||"spline"===c.type||"area"===c.type||"stepArea"===c.type||"splineArea"===c.type||"stackedArea"===c.type||"stackedArea100"===c.type||"rangeArea"===c.type||"rangeSplineArea"===c.type||"candlestick"===c.type||"ohlc"===c.type?[this._selectedColorSet[0]]:this._selectedColorSet:c._colorSet=[c.color];null===c.markerSize&&(("line"===c.type||"stepLine"===c.type||"spline"===c.type)&&c.dataPoints&&c.dataPoints.length<this.width/
        16||"scatter"===c.type)&&(c.markerSize=8);"bubble"!==c.type&&"scatter"!==c.type||!c.dataPoints||c.dataPoints.sort(Ca);this.data.push(c);var d=c.axisPlacement,e;"normal"===d?"xySwapped"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with bar chart':"none"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with pie chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement="normal"):"xySwapped"===d?"normal"===this.plotInfo.axisPlacement?e='You cannot combine "'+
            c.type+'" with line, area, column or pie chart':"none"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with pie chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement="xySwapped"):"none"==d&&("normal"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with line, area, column or bar chart':"xySwapped"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with bar chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement="none"));
            if(e&&window.console){window.console.log(e);return}}this._objectsInitialized=!0};u._supportedChartTypes=function(a){a.indexOf||(a.indexOf=Da);return a}("line stepLine spline column area stepArea splineArea bar bubble scatter stackedColumn stackedColumn100 stackedBar stackedBar100 stackedArea stackedArea100 candlestick ohlc rangeColumn rangeBar rangeArea rangeSplineArea pie doughnut funnel".split(" "));u.prototype.render=function(a){a&&(this._options=a);this._initialize();var b=[];for(a=0;a<this.data.length;a++)if("normal"===
        this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement)this.data[a].axisYType&&"primary"!==this.data[a].axisYType?"secondary"===this.data[a].axisYType&&(this.axisY2||("normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisY2=new C(this,this._options.axisY2,"axisY","right")):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisY2=new C(this,this._options.axisY2,"axisY","top"))),this.data[a].axisY=this.axisY2):(this.axisY||("normal"===this.plotInfo.axisPlacement?
        this._axes.push(this.axisY=new C(this,this._options.axisY,"axisY","left")):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisY=new C(this,this._options.axisY,"axisY","bottom"))),this.data[a].axisY=this.axisY),this.axisX||("normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisX=new C(this,this._options.axisX,"axisX","bottom")):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisX=new C(this,this._options.axisX,"axisX","left"))),this.data[a].axisX=this.axisX;
        this.axisY&&this.axisY2&&(0<this.axisY.gridThickness&&"undefined"===typeof this.axisY2._options.gridThickness?this.axisY2.gridThickness=0:0<this.axisY2.gridThickness&&"undefined"===typeof this.axisY._options.gridThickness&&(this.axisY.gridThickness=0));var c=!1;if(0<this._axes.length&&(this.zoomEnabled||this.panEnabled))for(a=0;a<this._axes.length;a++)if(null!==this._axes[a].viewportMinimum||null!==this._axes[a].viewportMaximum){c=!0;break}c?ga(this._zoomButton,this._resetButton):R(this._zoomButton,
            this._resetButton);this._processData();this._options.title&&(this._title=new aa(this,this._options.title),this._title.dockInsidePlotArea?b.push(this._title):this._title.render());if(this._options.subtitles)for(a=0;a<this._options.subtitles.length;a++)this.subtitles=[],c=new ia(this,this._options.subtitles[a]),this.subtitles.push(c),c.dockInsidePlotArea?b.push(c):c.render();this.legend=new ja(this,this._options.legend,this.theme);for(a=0;a<this.data.length;a++)(this.data[a].showInLegend||"pie"===this.data[a].type||
        "doughnut"===this.data[a].type)&&this.legend.dataSeries.push(this.data[a]);this.legend.dockInsidePlotArea?b.push(this.legend):this.legend.render();if("normal"===this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement)C.setLayoutAndRender(this.axisX,this.axisY,this.axisY2,this.plotInfo.axisPlacement,this.layoutManager.getFreeSpace());else if("none"===this.plotInfo.axisPlacement)this.preparePlotArea();else return;for(a=0;a<b.length;a++)b[a].render();var d=[];if(this.animatedRender){var e=
            U(this.width,this.height);e.getContext("2d").drawImage(this.canvas,0,0,this.width,this.height)}for(a=0;a<this.plotInfo.plotTypes.length;a++)for(b=this.plotInfo.plotTypes[a],c=0;c<b.plotUnits.length;c++){var f=b.plotUnits[c],g=null;f.targetCanvas=null;this.animatedRender&&(f.targetCanvas=U(this.width,this.height),f.targetCanvasCtx=f.targetCanvas.getContext("2d"));"line"===f.type?g=this.renderLine(f):"stepLine"===f.type?g=this.renderStepLine(f):"spline"===f.type?g=this.renderSpline(f):"column"===f.type?
            g=this.renderColumn(f):"bar"===f.type?g=this.renderBar(f):"area"===f.type?g=this.renderArea(f):"stepArea"===f.type?g=this.renderStepArea(f):"splineArea"===f.type?g=this.renderSplineArea(f):"stackedColumn"===f.type?g=this.renderStackedColumn(f):"stackedColumn100"===f.type?g=this.renderStackedColumn100(f):"stackedBar"===f.type?g=this.renderStackedBar(f):"stackedBar100"===f.type?g=this.renderStackedBar100(f):"stackedArea"===f.type?g=this.renderStackedArea(f):"stackedArea100"===f.type?g=this.renderStackedArea100(f):
            "bubble"===f.type?g=g=this.renderBubble(f):"scatter"===f.type?g=this.renderScatter(f):"pie"===f.type?this.renderPie(f):"doughnut"===f.type?this.renderPie(f):"candlestick"===f.type?g=this.renderCandlestick(f):"ohlc"===f.type?g=this.renderCandlestick(f):"rangeColumn"===f.type?g=this.renderRangeColumn(f):"rangeBar"===f.type?g=this.renderRangeBar(f):"rangeArea"===f.type?g=this.renderRangeArea(f):"rangeSplineArea"===f.type&&(g=this.renderRangeSplineArea(f));for(var k=0;k<f.dataSeriesIndexes.length;k++)this._dataInRenderedOrder.push(this.data[f.dataSeriesIndexes[k]]);
            this.animatedRender&&g&&d.push(g)}this.animatedRender&&0<this._indexLabels.length&&(a=U(this.width,this.height).getContext("2d"),d.push(this.renderIndexLabels(a)));var p=this;0<d.length?(p.disableToolTip=!0,p._animator.animate(200,p.animationDuration,function(a){p.ctx.clearRect(0,0,p.width,p.height);p.ctx.drawImage(e,0,0,Math.floor(p.width*J),Math.floor(p.height*J),0,0,p.width,p.height);for(var c=0;c<d.length;c++)g=d[c],1>a&&"undefined"!==typeof g.startTimePercent?a>=g.startTimePercent&&g.animationCallback(g.easingFunction(a-
            g.startTimePercent,0,1,1-g.startTimePercent),g):g.animationCallback(g.easingFunction(a,0,1,1),g);p.dispatchEvent("dataAnimationIterationEnd",{chart:p})},function(){d=[];for(var a=0;a<p.plotInfo.plotTypes.length;a++)for(var c=p.plotInfo.plotTypes[a],b=0;b<c.plotUnits.length;b++)c.plotUnits[b].targetCanvas=null;e=null;p.disableToolTip=!1})):(0<p._indexLabels.length&&p.renderIndexLabels(),p.dispatchEvent("dataAnimationIterationEnd",{chart:p}));this.attachPlotAreaEventHandlers();this.zoomEnabled||(this.panEnabled||
        !this._zoomButton||"none"===this._zoomButton.style.display)||R(this._zoomButton,this._resetButton);this._toolTip._updateToolTip();this.renderCount++};u.prototype.attachPlotAreaEventHandlers=function(){this.attachEvent({context:this,chart:this,mousedown:this._plotAreaMouseDown,mouseup:this._plotAreaMouseUp,mousemove:this._plotAreaMouseMove,cursor:this.zoomEnabled?"col-resize":"move",cursor:this.panEnabled?"move":"default",capture:!0,bounds:this.plotArea})};u.prototype.categoriseDataSeries=function(){for(var a=
        "",b=0;b<this.data.length;b++)if(a=this.data[b],a.dataPoints&&(0!==a.dataPoints.length&&a.visible)&&0<=u._supportedChartTypes.indexOf(a.type)){for(var c=null,d=!1,e=null,f=!1,g=0;g<this.plotInfo.plotTypes.length;g++)if(this.plotInfo.plotTypes[g].type===a.type){d=!0;c=this.plotInfo.plotTypes[g];break}d||(c={type:a.type,totalDataSeries:0,plotUnits:[]},this.plotInfo.plotTypes.push(c));for(g=0;g<c.plotUnits.length;g++)if(c.plotUnits[g].axisYType===a.axisYType){f=!0;e=c.plotUnits[g];break}f||(e={type:a.type,
        previousDataSeriesCount:0,index:c.plotUnits.length,plotType:c,axisYType:a.axisYType,axisY:"primary"===a.axisYType?this.axisY:this.axisY2,axisX:this.axisX,dataSeriesIndexes:[],yTotals:[]},c.plotUnits.push(e));c.totalDataSeries++;e.dataSeriesIndexes.push(b);a.plotUnit=e}for(b=0;b<this.plotInfo.plotTypes.length;b++)for(c=this.plotInfo.plotTypes[b],g=a=0;g<c.plotUnits.length;g++)c.plotUnits[g].previousDataSeriesCount=a,a+=c.plotUnits[g].dataSeriesIndexes.length};u.prototype.assignIdToDataPoints=function(){for(var a=
        0;a<this.data.length;a++){var b=this.data[a];if(b.dataPoints)for(var c=b.dataPoints.length,d=0;d<c;d++)b.dataPointIds[d]=++this._eventManager.lastObjectId}};u.prototype._processData=function(){this.assignIdToDataPoints();this.categoriseDataSeries();for(var a=0;a<this.plotInfo.plotTypes.length;a++)for(var b=this.plotInfo.plotTypes[a],c=0;c<b.plotUnits.length;c++){var d=b.plotUnits[c];"line"===d.type||"stepLine"===d.type||"spline"===d.type||"column"===d.type||"area"===d.type||"stepArea"===d.type||"splineArea"===
    d.type||"bar"===d.type||"bubble"===d.type||"scatter"===d.type?this._processMultiseriesPlotUnit(d):"stackedColumn"===d.type||"stackedBar"===d.type||"stackedArea"===d.type?this._processStackedPlotUnit(d):"stackedColumn100"===d.type||"stackedBar100"===d.type||"stackedArea100"===d.type?this._processStacked100PlotUnit(d):"candlestick"!==d.type&&"ohlc"!==d.type&&"rangeColumn"!==d.type&&"rangeBar"!==d.type&&"rangeArea"!==d.type&&"rangeSplineArea"!==d.type||this._processMultiYPlotUnit(d)}};u.prototype._processMultiseriesPlotUnit=
        function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length))for(var b=a.axisY.dataInfo,c=a.axisX.dataInfo,d,e,f=!1,g=0;g<a.dataSeriesIndexes.length;g++){var k=this.data[a.dataSeriesIndexes[g]],p=0,h=!1,l=!1;if("normal"===k.axisPlacement||"xySwapped"===k.axisPlacement)var n=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this._options.axisX&&this._options.axisX.viewportMinimum?this._options.axisX.viewportMinimum:this._options.axisX&&this._options.axisX.minimum?
            this._options.axisX.minimum:-Infinity,m=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this._options.axisX&&this._options.axisX.viewportMaximum?this._options.axisX.viewportMaximum:this._options.axisX&&this._options.axisX.maximum?this._options.axisX.maximum:Infinity;if(k.dataPoints[p].x&&k.dataPoints[p].x.getTime||"dateTime"===k.xValueType)f=!0;for(p=0;p<k.dataPoints.length;p++){"undefined"===typeof k.dataPoints[p].x&&(k.dataPoints[p].x=p);k.dataPoints[p].x.getTime?
            (f=!0,d=k.dataPoints[p].x.getTime()):d=k.dataPoints[p].x;e=k.dataPoints[p].y;d<c.min&&(c.min=d);d>c.max&&(c.max=d);e<b.min&&(b.min=e);e>b.max&&(b.max=e);if(0<p){var q=d-k.dataPoints[p-1].x;0>q&&(q*=-1);c.minDiff>q&&0!==q&&(c.minDiff=q);null!==e&&null!==k.dataPoints[p-1].y&&(q=e-k.dataPoints[p-1].y,0>q&&(q*=-1),b.minDiff>q&&0!==q&&(b.minDiff=q))}if(!(d<n)||h){if(!h&&(h=!0,0<p)){p-=2;continue}if(d>m&&!l)l=!0;else if(d>m&&l)continue;k.dataPoints[p].label&&(a.axisX.labels[d]=k.dataPoints[p].label);d<
        c.viewPortMin&&(c.viewPortMin=d);d>c.viewPortMax&&(c.viewPortMax=d);null!==e&&(e<b.viewPortMin&&(b.viewPortMin=e),e>b.viewPortMax&&(b.viewPortMax=e))}}this.plotInfo.axisXValueType=k.xValueType=f?"dateTime":"number"}};u.prototype._processStackedPlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length)){for(var b=a.axisY.dataInfo,c=a.axisX.dataInfo,d,e,f=!1,g=[],k=[],p=0;p<a.dataSeriesIndexes.length;p++){var h=this.data[a.dataSeriesIndexes[p]],l=0,n=!1,m=!1;if("normal"===h.axisPlacement||
        "xySwapped"===h.axisPlacement)var q=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this._options.axisX&&this._options.axisX.viewportMinimum?this._options.axisX.viewportMinimum:this._options.axisX&&this._options.axisX.minimum?this._options.axisX.minimum:-Infinity,r=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this._options.axisX&&this._options.axisX.viewportMaximum?this._options.axisX.viewportMaximum:this._options.axisX&&
    this._options.axisX.maximum?this._options.axisX.maximum:Infinity;if(h.dataPoints[l].x&&h.dataPoints[l].x.getTime||"dateTime"===h.xValueType)f=!0;for(l=0;l<h.dataPoints.length;l++){"undefined"===typeof h.dataPoints[l].x&&(h.dataPoints[l].x=l);h.dataPoints[l].x.getTime?(f=!0,d=h.dataPoints[l].x.getTime()):d=h.dataPoints[l].x;e=h.dataPoints[l].y;d<c.min&&(c.min=d);d>c.max&&(c.max=d);if(0<l){var s=d-h.dataPoints[l-1].x;0>s&&(s*=-1);c.minDiff>s&&0!==s&&(c.minDiff=s);null!==e&&null!==h.dataPoints[l-1].y&&
    (s=e-h.dataPoints[l-1].y,0>s&&(s*=-1),b.minDiff>s&&0!==s&&(b.minDiff=s))}if(!(d<q)||n){if(!n&&(n=!0,0<l)){l-=2;continue}if(d>r&&!m)m=!0;else if(d>r&&m)continue;h.dataPoints[l].label&&(a.axisX.labels[d]=h.dataPoints[l].label);d<c.viewPortMin&&(c.viewPortMin=d);d>c.viewPortMax&&(c.viewPortMax=d);null!==e&&(a.yTotals[d]=(a.yTotals[d]?a.yTotals[d]:0)+Math.abs(e),0<=e?g[d]=g[d]?g[d]+e:e:k[d]=k[d]?k[d]+e:e)}}this.plotInfo.axisXValueType=h.xValueType=f?"dateTime":"number"}for(l in g)g.hasOwnProperty(l)&&
    !isNaN(l)&&(a=g[l],a<b.min&&(b.min=a),a>b.max&&(b.max=a),l<c.viewPortMin||l>c.viewPortMax||(a<b.viewPortMin&&(b.viewPortMin=a),a>b.viewPortMax&&(b.viewPortMax=a)));for(l in k)k.hasOwnProperty(l)&&!isNaN(l)&&(a=k[l],a<b.min&&(b.min=a),a>b.max&&(b.max=a),l<c.viewPortMin||l>c.viewPortMax||(a<b.viewPortMin&&(b.viewPortMin=a),a>b.viewPortMax&&(b.viewPortMax=a)))}};u.prototype._processStacked100PlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length)){for(var b=a.axisY.dataInfo,c=a.axisX.dataInfo,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  d,e,f=!1,g=!1,k=!1,p=[],h=0;h<a.dataSeriesIndexes.length;h++){var l=this.data[a.dataSeriesIndexes[h]],n=0,m=!1,q=!1;if("normal"===l.axisPlacement||"xySwapped"===l.axisPlacement)var r=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this._options.axisX&&this._options.axisX.viewportMinimum?this._options.axisX.viewportMinimum:this._options.axisX&&this._options.axisX.minimum?this._options.axisX.minimum:-Infinity,s=this.sessionVariables.axisX.newViewportMaximum?
        this.sessionVariables.axisX.newViewportMaximum:this._options.axisX&&this._options.axisX.viewportMaximum?this._options.axisX.viewportMaximum:this._options.axisX&&this._options.axisX.maximum?this._options.axisX.maximum:Infinity;if(l.dataPoints[n].x&&l.dataPoints[n].x.getTime||"dateTime"===l.xValueType)f=!0;for(n=0;n<l.dataPoints.length;n++){"undefined"===typeof l.dataPoints[n].x&&(l.dataPoints[n].x=n);l.dataPoints[n].x.getTime?(f=!0,d=l.dataPoints[n].x.getTime()):d=l.dataPoints[n].x;e=l.dataPoints[n].y;
        d<c.min&&(c.min=d);d>c.max&&(c.max=d);if(0<n){var w=d-l.dataPoints[n-1].x;0>w&&(w*=-1);c.minDiff>w&&0!==w&&(c.minDiff=w);null!==e&&null!==l.dataPoints[n-1].y&&(w=e-l.dataPoints[n-1].y,0>w&&(w*=-1),b.minDiff>w&&0!==w&&(b.minDiff=w))}if(!(d<r)||m){if(!m&&(m=!0,0<n)){n-=2;continue}if(d>s&&!q)q=!0;else if(d>s&&q)continue;l.dataPoints[n].label&&(a.axisX.labels[d]=l.dataPoints[n].label);d<c.viewPortMin&&(c.viewPortMin=d);d>c.viewPortMax&&(c.viewPortMax=d);null!==e&&(a.yTotals[d]=(a.yTotals[d]?a.yTotals[d]:
                0)+Math.abs(e),0<=e?g=!0:k=!0,p[d]=p[d]?p[d]+Math.abs(e):Math.abs(e))}}this.plotInfo.axisXValueType=l.xValueType=f?"dateTime":"number"}g&&!k?(b.max=99,b.min=1):g&&k?(b.max=99,b.min=-99):!g&&k&&(b.max=-1,b.min=-99);b.viewPortMin=b.min;b.viewPortMax=b.max;a.dataPointYSums=p}};u.prototype._processMultiYPlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length))for(var b=a.axisY.dataInfo,c=a.axisX.dataInfo,d,e,f,g,k=!1,p=0;p<a.dataSeriesIndexes.length;p++){var h=this.data[a.dataSeriesIndexes[p]],
        l=0,n=!1,m=!1;if("normal"===h.axisPlacement||"xySwapped"===h.axisPlacement)var q=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this._options.axisX&&this._options.axisX.viewportMinimum?this._options.axisX.viewportMinimum:this._options.axisX&&this._options.axisX.minimum?this._options.axisX.minimum:-Infinity,r=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this._options.axisX&&this._options.axisX.viewportMaximum?
        this._options.axisX.viewportMaximum:this._options.axisX&&this._options.axisX.maximum?this._options.axisX.maximum:Infinity;if(h.dataPoints[l].x&&h.dataPoints[l].x.getTime||"dateTime"===h.xValueType)k=!0;for(l=0;l<h.dataPoints.length;l++){"undefined"===typeof h.dataPoints[l].x&&(h.dataPoints[l].x=l);h.dataPoints[l].x.getTime?(k=!0,d=h.dataPoints[l].x.getTime()):d=h.dataPoints[l].x;(e=h.dataPoints[l].y)&&e.length&&(f=Math.min.apply(null,e),g=Math.max.apply(null,e));d<c.min&&(c.min=d);d>c.max&&(c.max=
        d);f<b.min&&(b.min=f);g>b.max&&(b.max=g);if(0<l){var s=d-h.dataPoints[l-1].x;0>s&&(s*=-1);c.minDiff>s&&0!==s&&(c.minDiff=s);null!==e[0]&&null!==h.dataPoints[l-1].y[0]&&(s=e[0]-h.dataPoints[l-1].y[0],0>s&&(s*=-1),b.minDiff>s&&0!==s&&(b.minDiff=s))}if(!(d<q)||n){if(!n&&(n=!0,0<l)){l-=2;continue}if(d>r&&!m)m=!0;else if(d>r&&m)continue;h.dataPoints[l].label&&(a.axisX.labels[d]=h.dataPoints[l].label);d<c.viewPortMin&&(c.viewPortMin=d);d>c.viewPortMax&&(c.viewPortMax=d);null!==e&&(f<b.viewPortMin&&(b.viewPortMin=
        f),g>b.viewPortMax&&(b.viewPortMax=g))}}this.plotInfo.axisXValueType=h.xValueType=k?"dateTime":"number"}};u.prototype.getDataPointAtXY=function(a,b,c){c=c||!1;for(var d=[],e=this._dataInRenderedOrder.length-1;0<=e;e--){var f=null;(f=this._dataInRenderedOrder[e].getDataPointAtXY(a,b,c))&&d.push(f)}a=null;b=!1;for(c=0;c<d.length;c++)if("line"===d[c].dataSeries.type||"stepLine"===d[c].dataSeries.type||"area"===d[c].dataSeries.type||"stepArea"===d[c].dataSeries.type)if(e=N("markerSize",d[c].dataPoint,
                d[c].dataSeries)||8,d[c].distance<=e/2){b=!0;break}for(c=0;c<d.length;c++)b&&"line"!==d[c].dataSeries.type&&"stepLine"!==d[c].dataSeries.type&&"area"!==d[c].dataSeries.type&&"stepArea"!==d[c].dataSeries.type||(a?d[c].distance<=a.distance&&(a=d[c]):a=d[c]);return a};u.prototype.getObjectAtXY=function(a,b,c){var d=null;if(c=this.getDataPointAtXY(a,b,c||!1))d=c.dataSeries.dataPointIds[c.dataPointIndex];else if(t)d=va(a,b,this._eventManager.ghostCtx);else for(c=0;c<this.legend.items.length;c++){var e=
        this.legend.items[c];a>=e.x1&&(a<=e.x2&&b>=e.y1&&b<=e.y2)&&(d=e.id)}return d};u.prototype.getAutoFontSize=function(a,b,c){a/=400;return Math.round(Math.min(this.width,this.height)*a)};u.prototype.resetOverlayedCanvas=function(){this.overlaidCanvasCtx.clearRect(0,0,this.width,this.height)};u.prototype.clearCanvas=function(){this.ctx.clearRect(0,0,this.width,this.height);this.backgroundColor&&(this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.width,this.height))};u.prototype.attachEvent=
        function(a){this._events.push(a)};u.prototype._touchEventHandler=function(a){if(a.changedTouches&&this.interactivityEnabled){var b=[],c=a.changedTouches,d=c?c[0]:a,e=null;switch(a.type){case "touchstart":case "MSPointerDown":b=["mousemove","mousedown"];this._lastTouchData=ma(d);this._lastTouchData.time=new Date;break;case "touchmove":case "MSPointerMove":b=["mousemove"];break;case "touchend":case "MSPointerUp":b="touchstart"===this._lastTouchEventType||"MSPointerDown"===this._lastTouchEventType?["mouseup",
        "click"]:["mouseup"];break;default:return}if(!(c&&1<c.length)){e=ma(d);e.time=new Date;try{var f=e.y-this._lastTouchData.y,g=e.time-this._lastTouchData.time;if(15<Math.abs(f)&&(this._lastTouchData.scroll||200>g)){this._lastTouchData.scroll=!0;var k=window.parent||window;k&&k.scrollBy&&k.scrollBy(0,-f)}}catch(p){}this._lastTouchEventType=a.type;if(this._lastTouchData.scroll&&this.zoomEnabled)this.isDrag&&this.resetOverlayedCanvas(),this.isDrag=!1;else for(c=0;c<b.length;c++)e=b[c],f=document.createEvent("MouseEvent"),
        f.initMouseEvent(e,!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),d.target.dispatchEvent(f),a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault()}}};u.prototype._dispatchRangeEvent=function(a,b){var c={};c.chart=this._publicChartReference;c.type=a;c.trigger=b;var d=[];this.axisX&&d.push("axisX");this.axisY&&d.push("axisY");this.axisY2&&d.push("axisY2");for(var e=0;e<d.length;e++)c[d[e]]={viewportMinimum:this[d[e]].sessionVariables.newViewportMinimum,
        viewportMaximum:this[d[e]].sessionVariables.newViewportMaximum};this.dispatchEvent(a,c,this._publicChartReference)};u.prototype._mouseEventHandler=function(a){if(this.interactivityEnabled)if(this._ignoreNextEvent)this._ignoreNextEvent=!1;else{a.preventManipulation&&a.preventManipulation();a.preventDefault&&a.preventDefault();"undefined"===typeof a.target&&a.srcElement&&(a.target=a.srcElement);var b=ma(a),c=a.type,d,e;a.which?e=3==a.which:a.button&&(e=2==a.button);if(!e){if(u.capturedEventParam)d=
        u.capturedEventParam,"mouseup"===c&&(u.capturedEventParam=null,d.chart.overlaidCanvas.releaseCapture?d.chart.overlaidCanvas.releaseCapture():document.body.removeEventListener("mouseup",d.chart._mouseEventHandler,!1)),d.hasOwnProperty(c)&&d[c].call(d.context,b.x,b.y);else if(this._events){for(e=0;e<this._events.length;e++)if(this._events[e].hasOwnProperty(c)){d=this._events[e];var f=d.bounds;if(b.x>=f.x1&&b.x<=f.x2&&b.y>=f.y1&&b.y<=f.y2){d[c].call(d.context,b.x,b.y);"mousedown"===c&&!0===d.capture?
        (u.capturedEventParam=d,this.overlaidCanvas.setCapture?this.overlaidCanvas.setCapture():document.body.addEventListener("mouseup",this._mouseEventHandler,!1)):"mouseup"===c&&(d.chart.overlaidCanvas.releaseCapture?d.chart.overlaidCanvas.releaseCapture():document.body.removeEventListener("mouseup",this._mouseEventHandler,!1));break}else d=null}a.target.style.cursor=d&&d.cursor?d.cursor:this._defaultCursor}this._toolTip&&this._toolTip.enabled&&(c=this.plotArea,(b.x<c.x1||b.x>c.x2||b.y<c.y1||b.y>c.y2)&&
    this._toolTip.hide());this.isDrag&&this.zoomEnabled||!this._eventManager||this._eventManager.mouseEventHandler(a)}}};u.prototype._plotAreaMouseDown=function(a,b){this.isDrag=!0;this.dragStartPoint={x:a,y:b}};u.prototype._plotAreaMouseUp=function(a,b){if(("normal"===this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement)&&this.isDrag){var c=b-this.dragStartPoint.y,d=a-this.dragStartPoint.x,e=0<=this.zoomType.indexOf("x"),f=0<=this.zoomType.indexOf("y"),g=!1;this.resetOverlayedCanvas();
        if("xySwapped"===this.plotInfo.axisPlacement)var k=f,f=e,e=k;if(this.panEnabled||this.zoomEnabled){if(this.panEnabled)for(e=f=0;e<this._axes.length;e++)c=this._axes[e],c.viewportMinimum<c.minimum?(f=c.minimum-c.viewportMinimum,c.sessionVariables.newViewportMinimum=c.viewportMinimum+f,c.sessionVariables.newViewportMaximum=c.viewportMaximum+f,g=!0):c.viewportMaximum>c.maximum&&(f=c.viewportMaximum-c.maximum,c.sessionVariables.newViewportMinimum=c.viewportMinimum-f,c.sessionVariables.newViewportMaximum=
            c.viewportMaximum-f,g=!0);else if((!e||2<Math.abs(d))&&(!f||2<Math.abs(c))&&this.zoomEnabled){if(!this.dragStartPoint)return;c=e?this.dragStartPoint.x:this.plotArea.x1;d=f?this.dragStartPoint.y:this.plotArea.y1;e=e?a:this.plotArea.x2;f=f?b:this.plotArea.y2;2<Math.abs(c-e)&&2<Math.abs(d-f)&&this._zoomPanToSelectedRegion(c,d,e,f)&&(g=!0)}g&&(this._ignoreNextEvent=!0,this._dispatchRangeEvent("rangeChanging","zoom"),this.render(),this._dispatchRangeEvent("rangeChanged","zoom"),g&&(this.zoomEnabled&&"none"===
        this._zoomButton.style.display)&&(ga(this._zoomButton,this._resetButton),P(this,this._zoomButton,"pan"),P(this,this._resetButton,"reset")))}}this.isDrag=!1};u.prototype._plotAreaMouseMove=function(a,b){if(this.isDrag&&"none"!==this.plotInfo.axisPlacement){var c=0,d=0,e=c=null,e=0<=this.zoomType.indexOf("x"),f=0<=this.zoomType.indexOf("y");"xySwapped"===this.plotInfo.axisPlacement&&(c=f,f=e,e=c);c=this.dragStartPoint.x-a;d=this.dragStartPoint.y-b;2<Math.abs(c)&&8>Math.abs(c)&&(this.panEnabled||this.zoomEnabled)?
        this._toolTip.hide():this.panEnabled||this.zoomEnabled||this._toolTip.mouseMoveHandler(a,b);(!e||2<Math.abs(c)||!f||2<Math.abs(d))&&(this.panEnabled||this.zoomEnabled)&&(this.panEnabled?(e={x1:e?this.plotArea.x1+c:this.plotArea.x1,y1:f?this.plotArea.y1+d:this.plotArea.y1,x2:e?this.plotArea.x2+c:this.plotArea.x2,y2:f?this.plotArea.y2+d:this.plotArea.y2},this._zoomPanToSelectedRegion(e.x1,e.y1,e.x2,e.y2,!0)&&(this._dispatchRangeEvent("rangeChanging","pan"),this.render(),this._dispatchRangeEvent("rangeChanged",
        "pan"),this.dragStartPoint.x=a,this.dragStartPoint.y=b)):this.zoomEnabled&&(this.resetOverlayedCanvas(),c=this.overlaidCanvasCtx.globalAlpha,this.overlaidCanvasCtx.globalAlpha=0.7,this.overlaidCanvasCtx.fillStyle="#A0ABB8",this.overlaidCanvasCtx.fillRect(e?this.dragStartPoint.x:this.plotArea.x1,f?this.dragStartPoint.y:this.plotArea.y1,e?a-this.dragStartPoint.x:this.plotArea.x2-this.plotArea.x1,f?b-this.dragStartPoint.y:this.plotArea.y2-this.plotArea.y1),this.overlaidCanvasCtx.globalAlpha=c))}else this._toolTip.mouseMoveHandler(a,
        b)};u.prototype._zoomPanToSelectedRegion=function(a,b,c,d,e){e=e||!1;var f=0<=this.zoomType.indexOf("x"),g=0<=this.zoomType.indexOf("y"),k=!1,p=[],h=[];this.axisX&&f&&p.push(this.axisX);this.axisY&&g&&p.push(this.axisY);this.axisY2&&g&&p.push(this.axisY2);f=[];for(g=0;g<p.length;g++){var l=p[g],n=l.convertPixelToValue({x:a,y:b}),m=l.convertPixelToValue({x:c,y:d});if(n>m)var q=m,m=n,n=q;if(isFinite(l.dataInfo.minDiff))if(!(Math.abs(m-n)<3*Math.abs(l.dataInfo.minDiff)||n<l.minimum||m>l.maximum))h.push(l),
        f.push({val1:n,val2:m}),k=!0;else if(!e){k=!1;break}}if(k)for(g=0;g<h.length;g++)l=h[g],a=f[g],l.setViewPortRange(a.val1,a.val2);return k};u.prototype.preparePlotArea=function(){var a=this.plotArea,b=this.axisY?this.axisY:this.axisY2;!t&&(0<a.x1||0<a.y1)&&a.ctx.translate(a.x1,a.y1);this.axisX&&b?(a.x1=this.axisX.lineCoordinates.x1<this.axisX.lineCoordinates.x2?this.axisX.lineCoordinates.x1:b.lineCoordinates.x1,a.y1=this.axisX.lineCoordinates.y1<b.lineCoordinates.y1?this.axisX.lineCoordinates.y1:b.lineCoordinates.y1,
        a.x2=this.axisX.lineCoordinates.x2>b.lineCoordinates.x2?this.axisX.lineCoordinates.x2:b.lineCoordinates.x2,a.y2=this.axisX.lineCoordinates.y2>this.axisX.lineCoordinates.y1?this.axisX.lineCoordinates.y2:b.lineCoordinates.y2,a.width=a.x2-a.x1,a.height=a.y2-a.y1):(b=this.layoutManager.getFreeSpace(),a.x1=b.x1,a.x2=b.x2,a.y1=b.y1,a.y2=b.y2,a.width=b.width,a.height=b.height);t||(a.canvas.width=a.width,a.canvas.height=a.height,a.canvas.style.left=a.x1+"px",a.canvas.style.top=a.y1+"px",(0<a.x1||0<a.y1)&&
    a.ctx.translate(-a.x1,-a.y1));a.layoutManager=new Y(a.x1,a.y1,a.x2,a.y2,2)};u.prototype.getPixelCoordinatesOnPlotArea=function(a,b){return{x:this.axisX.getPixelCoordinatesOnAxis(a).x,y:this.axisY.getPixelCoordinatesOnAxis(b).y}};u.prototype.renderIndexLabels=function(a){a=a||this.plotArea.ctx;for(var b=this.plotArea,c=0,d=0,e=0,f=0,g=0,k=d=f=e=0,p=0;p<this._indexLabels.length;p++){var h=this._indexLabels[p],g=h.chartType.toLowerCase(),l,n,m=N("indexLabelFontColor",h.dataPoint,h.dataSeries),k=N("indexLabelFontSize",
        h.dataPoint,h.dataSeries);l=N("indexLabelFontFamily",h.dataPoint,h.dataSeries);n=N("indexLabelFontStyle",h.dataPoint,h.dataSeries);var f=N("indexLabelFontWeight",h.dataPoint,h.dataSeries),d=N("indexLabelBackgroundColor",h.dataPoint,h.dataSeries),e=N("indexLabelMaxWidth",h.dataPoint,h.dataSeries),q=N("indexLabelWrap",h.dataPoint,h.dataSeries),r={percent:null,total:null},s=null;if(0<=h.dataSeries.type.indexOf("stacked")||"pie"===h.dataSeries.type||"doughnut"===h.dataSeries.type)r=this.getPercentAndTotal(h.dataSeries,
        h.dataPoint);if(h.dataSeries.indexLabelFormatter||h.dataPoint.indexLabelFormatter)s={chart:this._options,dataSeries:h.dataSeries,dataPoint:h.dataPoint,index:h.indexKeyword,total:r.total,percent:r.percent};var w=h.dataPoint.indexLabelFormatter?h.dataPoint.indexLabelFormatter(s):h.dataPoint.indexLabel?this.replaceKeywordsWithValue(h.dataPoint.indexLabel,h.dataPoint,h.dataSeries,null,h.indexKeyword):h.dataSeries.indexLabelFormatter?h.dataSeries.indexLabelFormatter(s):h.dataSeries.indexLabel?this.replaceKeywordsWithValue(h.dataSeries.indexLabel,
        h.dataPoint,h.dataSeries,null,h.indexKeyword):null;if(null!==w&&""!==w){var c=N("indexLabelPlacement",h.dataPoint,h.dataSeries),r=N("indexLabelOrientation",h.dataPoint,h.dataSeries),s=h.direction,v=h.dataSeries.axisX,x=h.dataSeries.axisY,m=new H(a,{x:0,y:0,maxWidth:e?e:0.5*this.width,maxHeight:q?5*k:1.5*k,angle:"horizontal"===r?0:-90,text:w,padding:0,backgroundColor:d,horizontalAlign:"left",fontSize:k,fontFamily:l,fontWeight:f,fontColor:m,fontStyle:n,textBaseline:"top"});m.measureText();if(0<=g.indexOf("line")||
        0<=g.indexOf("area")||0<=g.indexOf("bubble")||0<=g.indexOf("scatter")){if(h.dataPoint.x<v.viewportMinimum||h.dataPoint.x>v.viewportMaximum||h.dataPoint.y<x.viewportMinimum||h.dataPoint.y>x.viewportMaximum)continue}else if(h.dataPoint.x<v.viewportMinimum||h.dataPoint.x>v.viewportMaximum)continue;e=f=2;"horizontal"===r?(d=m.width,k=m.height):(k=m.width,d=m.height);if("normal"===this.plotInfo.axisPlacement){if(0<=g.indexOf("line")||0<=g.indexOf("area"))c="auto",f=4;else if(0<=g.indexOf("stacked"))"auto"===
    c&&(c="inside");else if("bubble"===g||"scatter"===g)c="inside";l=h.point.x-d/2;"inside"!==c?(d=b.y1,e=b.y2,0<s?(n=h.point.y-k-f,n<d&&(n="auto"===c?Math.max(h.point.y,d)+f:d+f)):(n=h.point.y+f,n>e-k-f&&(n="auto"===c?Math.min(h.point.y,e)-k-f:e-k-f))):(d=Math.max(h.bounds.y1,b.y1),e=Math.min(h.bounds.y2,b.y2),c=0<=g.indexOf("range")?0<s?Math.max(h.bounds.y1,b.y1)+k/2+f:Math.min(h.bounds.y2,b.y2)-k/2-f:(Math.max(h.bounds.y1,b.y1)+Math.min(h.bounds.y2,b.y2))/2,0<s?(n=Math.max(h.point.y,c)-k/2,n<d&&("bubble"===
    g||"scatter"===g)&&(n=Math.max(h.point.y-k-f,b.y1+f))):(n=Math.min(h.point.y,c)-k/2,n>e-k-f&&("bubble"===g||"scatter"===g)&&(n=Math.min(h.point.y+f,b.y2-k-f))),n=Math.min(n,e-k))}else 0<=g.indexOf("line")||0<=g.indexOf("area")||0<=g.indexOf("scatter")?(c="auto",e=4):0<=g.indexOf("stacked")?"auto"===c&&(c="inside"):"bubble"===g&&(c="inside"),n=h.point.y-k/2,"inside"!==c?(f=b.x1,g=b.x2,0>s?(l=h.point.x-d-e,l<f&&(l="auto"===c?Math.max(h.point.x,f)+e:f+e)):(l=h.point.x+e,l>g-d-e&&(l="auto"===c?Math.min(h.point.x,
        g)-d-e:g-d-e))):(f=Math.max(h.bounds.x1,b.x1),Math.min(h.bounds.x2,b.x2),c=0<=g.indexOf("range")?0>s?Math.max(h.bounds.x1,b.x1)+d/2+e:Math.min(h.bounds.x2,b.x2)-d/2-e:(Math.max(h.bounds.x1,b.x1)+Math.min(h.bounds.x2,b.x2))/2,l=0>s?Math.max(h.point.x,c)-d/2:Math.min(h.point.x,c)-d/2,l=Math.max(l,f));"vertical"===r&&(n+=k);m.x=l;m.y=n;m.render(!0)}}return{source:a,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0,startTimePercent:0.7}};u.prototype.renderLine=
        function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=this._eventManager.ghostCtx;b.save();var d=this.plotArea;b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();for(var d=[],e=0;e<a.dataSeriesIndexes.length;e++){var f=a.dataSeriesIndexes[e],g=this.data[f];b.lineWidth=g.lineThickness;var k=g.dataPoints;b.setLineDash&&b.setLineDash(M(g.lineDashType,g.lineThickness));var p=g.id;this._eventManager.objectMap[p]={objectType:"dataSeries",dataSeriesIndex:f};
            p=B(p);c.strokeStyle=p;c.lineWidth=0<g.lineThickness?Math.max(g.lineThickness,4):0;p=g._colorSet[0];b.strokeStyle=p;var h=!0,l=0,n,m;b.beginPath();if(0<k.length){for(var q=!1,l=0;l<k.length;l++)if(n=k[l].x.getTime?k[l].x.getTime():k[l].x,!(n<a.axisX.dataInfo.viewPortMin||n>a.axisX.dataInfo.viewPortMax))if("number"!==typeof k[l].y)0<l&&(b.stroke(),t&&c.stroke()),q=!0;else{n=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(n-a.axisX.conversionParameters.minimum)+0.5<<
                0;m=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(k[l].y-a.axisY.conversionParameters.minimum)+0.5<<0;var r=g.dataPointIds[l];this._eventManager.objectMap[r]={id:r,objectType:"dataPoint",dataSeriesIndex:f,dataPointIndex:l,x1:n,y1:m};h||q?(b.beginPath(),b.moveTo(n,m),t&&(c.beginPath(),c.moveTo(n,m)),q=h=!1):(b.lineTo(n,m),t&&c.lineTo(n,m),0==l%500&&(b.stroke(),b.beginPath(),b.moveTo(n,m),t&&(c.stroke(),c.beginPath(),c.moveTo(n,m))));if(0<k[l].markerSize||0<g.markerSize){var s=
                g.getMarkerProperties(l,n,m,b);d.push(s);r=B(r);t&&d.push({x:n,y:m,ctx:c,type:s.type,size:s.size,color:r,borderColor:r,borderThickness:s.borderThickness})}(k[l].indexLabel||g.indexLabel||k[l].indexLabelFormatter||g.indexLabelFormatter)&&this._indexLabels.push({chartType:"line",dataPoint:k[l],dataSeries:g,point:{x:n,y:m},direction:0<=k[l].y?1:-1,color:p})}b.stroke();t&&c.stroke()}}K.drawMarkers(d);b.restore();b.beginPath();t&&c.beginPath();return{source:b,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,
            easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderStepLine=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=this._eventManager.ghostCtx;b.save();var d=this.plotArea;b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();for(var d=[],e=0;e<a.dataSeriesIndexes.length;e++){var f=a.dataSeriesIndexes[e],g=this.data[f];b.lineWidth=g.lineThickness;var k=g.dataPoints;b.setLineDash&&b.setLineDash(M(g.lineDashType,g.lineThickness));var p=
        g.id;this._eventManager.objectMap[p]={objectType:"dataSeries",dataSeriesIndex:f};p=B(p);c.strokeStyle=p;c.lineWidth=0<g.lineThickness?Math.max(g.lineThickness,4):0;p=g._colorSet[0];b.strokeStyle=p;var h=!0,l=0,n,m;b.beginPath();if(0<k.length){for(var q=!1,l=0;l<k.length;l++)if(n=k[l].getTime?k[l].x.getTime():k[l].x,!(n<a.axisX.dataInfo.viewPortMin||n>a.axisX.dataInfo.viewPortMax))if("number"!==typeof k[l].y)0<l&&(b.stroke(),t&&c.stroke()),q=!0;else{var r=m;n=a.axisX.conversionParameters.reference+
        a.axisX.conversionParameters.pixelPerUnit*(n-a.axisX.conversionParameters.minimum)+0.5<<0;m=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(k[l].y-a.axisY.conversionParameters.minimum)+0.5<<0;var s=g.dataPointIds[l];this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:f,dataPointIndex:l,x1:n,y1:m};h||q?(b.beginPath(),b.moveTo(n,m),t&&(c.beginPath(),c.moveTo(n,m)),q=h=!1):(b.lineTo(n,r),t&&c.lineTo(n,r),b.lineTo(n,m),t&&c.lineTo(n,m),0==l%500&&
    (b.stroke(),b.beginPath(),b.moveTo(n,m),t&&(c.stroke(),c.beginPath(),c.moveTo(n,m))));if(0<k[l].markerSize||0<g.markerSize)r=g.getMarkerProperties(l,n,m,b),d.push(r),s=B(s),t&&d.push({x:n,y:m,ctx:c,type:r.type,size:r.size,color:s,borderColor:s,borderThickness:r.borderThickness});(k[l].indexLabel||g.indexLabel||k[l].indexLabelFormatter||g.indexLabelFormatter)&&this._indexLabels.push({chartType:"stepLine",dataPoint:k[l],dataSeries:g,point:{x:n,y:m},direction:0<=k[l].y?1:-1,color:p})}b.stroke();t&&c.stroke()}}K.drawMarkers(d);
        b.restore();b.beginPath();t&&c.beginPath();return{source:b,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderSpline=function(a){function b(a){a=ha(a,2);if(0<a.length){c.beginPath();t&&d.beginPath();c.moveTo(a[0].x,a[0].y);t&&d.moveTo(a[0].x,a[0].y);for(var b=0;b<a.length-3;b+=3)c.bezierCurveTo(a[b+1].x,a[b+1].y,a[b+2].x,a[b+2].y,a[b+3].x,a[b+3].y),t&&d.bezierCurveTo(a[b+1].x,a[b+1].y,a[b+2].x,a[b+2].y,a[b+3].x,a[b+3].y),0<
    b&&0===b%3E3&&(c.stroke(),c.beginPath(),c.moveTo(a[b+3].x,a[b+3].y),t&&(d.stroke(),d.beginPath(),d.moveTo(a[b+3].x,a[b+3].y)));c.stroke();t&&d.stroke()}}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx;c.save();var e=this.plotArea;c.beginPath();c.rect(e.x1,e.y1,e.width,e.height);c.clip();for(var e=[],f=0;f<a.dataSeriesIndexes.length;f++){var g=a.dataSeriesIndexes[f],k=this.data[g];c.lineWidth=k.lineThickness;var p=k.dataPoints;c.setLineDash&&
    c.setLineDash(M(k.lineDashType,k.lineThickness));var h=k.id;this._eventManager.objectMap[h]={objectType:"dataSeries",dataSeriesIndex:g};h=B(h);d.strokeStyle=h;d.lineWidth=0<k.lineThickness?Math.max(k.lineThickness,4):0;h=k._colorSet[0];c.strokeStyle=h;var l=0,n,m,q=[];c.beginPath();if(0<p.length)for(l=0;l<p.length;l++)if(n=p[l].getTime?p[l].x.getTime():p[l].x,!(n<a.axisX.dataInfo.viewPortMin||n>a.axisX.dataInfo.viewPortMax))if("number"!==typeof p[l].y)0<l&&(b(q),q=[]);else{n=a.axisX.conversionParameters.reference+
        a.axisX.conversionParameters.pixelPerUnit*(n-a.axisX.conversionParameters.minimum)+0.5<<0;m=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(p[l].y-a.axisY.conversionParameters.minimum)+0.5<<0;var r=k.dataPointIds[l];this._eventManager.objectMap[r]={id:r,objectType:"dataPoint",dataSeriesIndex:g,dataPointIndex:l,x1:n,y1:m};q[q.length]={x:n,y:m};if(0<p[l].markerSize||0<k.markerSize){var s=k.getMarkerProperties(l,n,m,c);e.push(s);r=B(r);t&&e.push({x:n,y:m,ctx:d,type:s.type,
        size:s.size,color:r,borderColor:r,borderThickness:s.borderThickness})}(p[l].indexLabel||k.indexLabel||p[l].indexLabelFormatter||k.indexLabelFormatter)&&this._indexLabels.push({chartType:"spline",dataPoint:p[l],dataSeries:k,point:{x:n,y:m},direction:0<=p[l].y?1:-1,color:h})}b(q)}K.drawMarkers(e);c.restore();c.beginPath();t&&d.beginPath();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};var I=function(a,b,c,d,e,f,g,k,p,h,l,n,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      m){"undefined"===typeof m&&(m=1);g=g||0;k=k||"black";var q=15<d-b&&15<e-c?8:0.35*Math.min(d-b,e-c);a.beginPath();a.moveTo(b,c);a.save();a.fillStyle=f;a.globalAlpha=m;a.fillRect(b,c,d-b,e-c);a.globalAlpha=1;0<g&&(m=0===g%2?0:0.5,a.beginPath(),a.lineWidth=g,a.strokeStyle=k,a.moveTo(b,c),a.rect(b-m,c-m,d-b+2*m,e-c+2*m),a.stroke());a.restore();!0===p&&(a.save(),a.beginPath(),a.moveTo(b,c),a.lineTo(b+q,c+q),a.lineTo(d-q,c+q),a.lineTo(d,c),a.closePath(),g=a.createLinearGradient((d+b)/2,c+q,(d+b)/2,c),g.addColorStop(0,
        f),g.addColorStop(1,"rgba(255, 255, 255, .4)"),a.fillStyle=g,a.fill(),a.restore());!0===h&&(a.save(),a.beginPath(),a.moveTo(b,e),a.lineTo(b+q,e-q),a.lineTo(d-q,e-q),a.lineTo(d,e),a.closePath(),g=a.createLinearGradient((d+b)/2,e-q,(d+b)/2,e),g.addColorStop(0,f),g.addColorStop(1,"rgba(255, 255, 255, .4)"),a.fillStyle=g,a.fill(),a.restore());!0===l&&(a.save(),a.beginPath(),a.moveTo(b,c),a.lineTo(b+q,c+q),a.lineTo(b+q,e-q),a.lineTo(b,e),a.closePath(),g=a.createLinearGradient(b+q,(e+c)/2,b,(e+c)/2),g.addColorStop(0,
        f),g.addColorStop(1,"rgba(255, 255, 255, 0.1)"),a.fillStyle=g,a.fill(),a.restore());!0===n&&(a.save(),a.beginPath(),a.moveTo(d,c),a.lineTo(d-q,c+q),a.lineTo(d-q,e-q),a.lineTo(d,e),g=a.createLinearGradient(d-q,(e+c)/2,d,(e+c)/2),g.addColorStop(0,f),g.addColorStop(1,"rgba(255, 255, 255, 0.1)"),a.fillStyle=g,g.addColorStop(0,f),g.addColorStop(1,"rgba(255, 255, 255, 0.1)"),a.fillStyle=g,a.fill(),a.closePath(),a.restore())};u.prototype.renderColumn=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;
        if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=0,f,g,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:Math.min(0.15*this.width,0.9*(this.plotArea.width/a.plotType.totalDataSeries))<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||
        (l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&e>h&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<e)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,e));l<e&&(l=e);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();
            b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(d=0;d<a.dataSeriesIndexes.length;d++){var h=a.dataSeriesIndexes[d],n=this.data[h],m=n.dataPoints;if(0<m.length)for(var q=5<l&&n.bevelEnabled?!0:!1,e=0;e<m.length;e++)if(m[e].getTime?k=m[e].x.getTime():k=m[e].x,!(k<a.axisX.dataInfo.viewPortMin||k>a.axisX.dataInfo.viewPortMax)&&"number"===typeof m[e].y){f=a.axisX.conversionParameters.reference+
                a.axisX.conversionParameters.pixelPerUnit*(k-a.axisX.conversionParameters.minimum)+0.5<<0;g=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(m[e].y-a.axisY.conversionParameters.minimum)+0.5<<0;f=f-a.plotType.totalDataSeries*l/2+(a.previousDataSeriesCount+d)*l<<0;var r=f+l<<0,s;0<=m[e].y?s=p:(s=g,g=p);g>s&&(s=g=s);c=m[e].color?m[e].color:n._colorSet[e%n._colorSet.length];I(b,f,g,r,s,c,0,null,q&&0<=m[e].y,0>m[e].y&&q,!1,!1,n.fillOpacity);c=n.dataPointIds[e];this._eventManager.objectMap[c]=
            {id:c,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:e,x1:f,y1:g,x2:r,y2:s};c=B(c);t&&I(this._eventManager.ghostCtx,f,g,r,s,c,0,null,!1,!1,!1,!1);(m[e].indexLabel||n.indexLabel||m[e].indexLabelFormatter||n.indexLabelFormatter)&&this._indexLabels.push({chartType:"column",dataPoint:m[e],dataSeries:n,point:{x:f+(r-f)/2,y:0<=m[e].y?g:s},direction:0<=m[e].y?1:-1,bounds:{x1:f,y1:Math.min(g,s),x2:r,y2:Math.max(g,s)},color:c})}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.min(p,a.axisY.boundingRect.y2);
            return{source:b,dest:this.plotArea.ctx,animationCallback:A.yScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderStackedColumn=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=[],f=[],g=0,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,g=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:
        1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.width<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&g>h&&(g=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&
    h<g)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,g));l<g&&(l=g);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(h=0;h<a.dataSeriesIndexes.length;h++){var n=a.dataSeriesIndexes[h],m=this.data[n],q=m.dataPoints;if(0<q.length){var r=5<l&&m.bevelEnabled?!0:!1;b.strokeStyle="#4572A7 ";for(g=0;g<q.length;g++)if(c=
            q[g].x.getTime?q[g].x.getTime():q[g].x,!(c<a.axisX.dataInfo.viewPortMin||c>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[g].y){d=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(c-a.axisX.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(q[g].y-a.axisY.conversionParameters.minimum);var s=d-a.plotType.plotUnits.length*l/2+a.index*l<<0,w=s+l<<0,v;if(0<=q[g].y){var x=e[c]?e[c]:0;k-=x;v=p-x;e[c]=
        x+(v-k)}else x=f[c]?f[c]:0,v=k+x,k=p+x,f[c]=x+(v-k);c=q[g].color?q[g].color:m._colorSet[g%m._colorSet.length];I(b,s,k,w,v,c,0,null,r&&0<=q[g].y,0>q[g].y&&r,!1,!1,m.fillOpacity);c=m.dataPointIds[g];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:n,dataPointIndex:g,x1:s,y1:k,x2:w,y2:v};c=B(c);t&&I(this._eventManager.ghostCtx,s,k,w,v,c,0,null,!1,!1,!1,!1);(q[g].indexLabel||m.indexLabel||q[g].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedColumn",
        dataPoint:q[g],dataSeries:m,point:{x:d,y:0<=q[g].y?k:v},direction:0<=q[g].y?1:-1,bounds:{x1:s,y1:Math.min(k,v),x2:w,y2:Math.max(k,v)},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.min(p,a.axisY.boundingRect.y2);return{source:b,dest:this.plotArea.ctx,animationCallback:A.yScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderStackedColumn100=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=
        null,d=this.plotArea,e=[],f=[],g=0,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,g=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.width<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:
    0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&g>h&&(g=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<g)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,g));l<g&&(l=g);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,
        d.width,d.height),this._eventManager.ghostCtx.clip());for(h=0;h<a.dataSeriesIndexes.length;h++){var n=a.dataSeriesIndexes[h],m=this.data[n],q=m.dataPoints;if(0<q.length)for(var r=5<l&&m.bevelEnabled?!0:!1,g=0;g<q.length;g++)if(c=q[g].x.getTime?q[g].x.getTime():q[g].x,!(c<a.axisX.dataInfo.viewPortMin||c>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[g].y){d=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(c-a.axisX.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+
        a.axisY.conversionParameters.pixelPerUnit*((0!==a.dataPointYSums[c]?100*(q[g].y/a.dataPointYSums[c]):0)-a.axisY.conversionParameters.minimum);var s=d-a.plotType.plotUnits.length*l/2+a.index*l<<0,w=s+l<<0,v;if(0<=q[g].y){var x=e[c]?e[c]:0;k-=x;v=p-x;e[c]=x+(v-k)}else x=f[c]?f[c]:0,v=k+x,k=p+x,f[c]=x+(v-k);c=q[g].color?q[g].color:m._colorSet[g%m._colorSet.length];I(b,s,k,w,v,c,0,null,r&&0<=q[g].y,0>q[g].y&&r,!1,!1,m.fillOpacity);c=m.dataPointIds[g];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",
        dataSeriesIndex:n,dataPointIndex:g,x1:s,y1:k,x2:w,y2:v};c=B(c);t&&I(this._eventManager.ghostCtx,s,k,w,v,c,0,null,!1,!1,!1,!1);(q[g].indexLabel||m.indexLabel||q[g].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedColumn100",dataPoint:q[g],dataSeries:m,point:{x:d,y:0<=q[g].y?k:v},direction:0<=q[g].y?1:-1,bounds:{x1:s,y1:Math.min(k,v),x2:w,y2:Math.max(k,v)},color:c})}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.min(p,a.axisY.boundingRect.y2);return{source:b,
        dest:this.plotArea.ctx,animationCallback:A.yScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderBar=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=0,f,g,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?
        this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:Math.min(0.15*this.height,0.9*(this.plotArea.height/a.plotType.totalDataSeries))<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.height/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&e>h&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));
        !this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<e)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,e));l<e&&(l=e);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(d=0;d<a.dataSeriesIndexes.length;d++){var h=a.dataSeriesIndexes[d],n=this.data[h],m=n.dataPoints;if(0<m.length){var q=5<l&&n.bevelEnabled?!0:!1;b.strokeStyle=
            "#4572A7 ";for(e=0;e<m.length;e++)if(m[e].getTime?k=m[e].x.getTime():k=m[e].x,!(k<a.axisX.dataInfo.viewPortMin||k>a.axisX.dataInfo.viewPortMax)&&"number"===typeof m[e].y){g=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(k-a.axisX.conversionParameters.minimum)+0.5<<0;f=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(m[e].y-a.axisY.conversionParameters.minimum)+0.5<<0;g=g-a.plotType.totalDataSeries*l/2+(a.previousDataSeriesCount+d)*
            l<<0;var r=g+l<<0,s;0<=m[e].y?s=p:(s=f,f=p);c=m[e].color?m[e].color:n._colorSet[e%n._colorSet.length];I(b,s,g,f,r,c,0,null,q,!1,!1,!1,n.fillOpacity);c=n.dataPointIds[e];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:e,x1:s,y1:g,x2:f,y2:r};c=B(c);t&&I(this._eventManager.ghostCtx,s,g,f,r,c,0,null,!1,!1,!1,!1);(m[e].indexLabel||n.indexLabel||m[e].indexLabelFormatter||n.indexLabelFormatter)&&this._indexLabels.push({chartType:"bar",dataPoint:m[e],dataSeries:n,
            point:{x:0<=m[e].y?f:s,y:g+(r-g)/2},direction:0<=m[e].y?1:-1,bounds:{x1:Math.min(s,f),y1:g,x2:Math.max(s,f),y2:r},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.max(p,a.axisX.boundingRect.x2);return{source:b,dest:this.plotArea.ctx,animationCallback:A.xScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderStackedBar=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=[],
        f=[],g=0,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,g=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.height<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.height/Math.abs(a.axisX.viewportMaximum-
        a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&g>h&&(g=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<g)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,g));l<g&&(l=g);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());
        for(h=0;h<a.dataSeriesIndexes.length;h++){var n=a.dataSeriesIndexes[h],m=this.data[n],q=m.dataPoints;if(0<q.length){var r=5<l&&m.bevelEnabled?!0:!1;b.strokeStyle="#4572A7 ";for(g=0;g<q.length;g++)if(c=q[g].x.getTime?q[g].x.getTime():q[g].x,!(c<a.axisX.dataInfo.viewPortMin||c>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[g].y){d=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(c-a.axisX.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+
            a.axisY.conversionParameters.pixelPerUnit*(q[g].y-a.axisY.conversionParameters.minimum);var s=d-a.plotType.plotUnits.length*l/2+a.index*l<<0,w=s+l<<0,v;if(0<=q[g].y){var x=e[c]?e[c]:0;v=p+x;k+=x;e[c]=x+(k-v)}else x=f[c]?f[c]:0,v=k-x,k=p-x,f[c]=x+(k-v);c=q[g].color?q[g].color:m._colorSet[g%m._colorSet.length];I(b,v,s,k,w,c,0,null,r,!1,!1,!1,m.fillOpacity);c=m.dataPointIds[g];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:n,dataPointIndex:g,x1:v,y1:s,x2:k,y2:w};c=B(c);
            t&&I(this._eventManager.ghostCtx,v,s,k,w,c,0,null,!1,!1,!1,!1);(q[g].indexLabel||m.indexLabel||q[g].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedBar",dataPoint:q[g],dataSeries:m,point:{x:0<=q[g].y?k:v,y:d},direction:0<=q[g].y?1:-1,bounds:{x1:Math.min(v,k),y1:s,x2:Math.max(v,k),y2:w},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.max(p,a.axisX.boundingRect.x2);return{source:b,dest:this.plotArea.ctx,animationCallback:A.xScaleAnimation,
            easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderStackedBar100=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=[],f=[],g=0,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,g=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?
        this.dataPointWidth:0.15*this.height<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.height/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&g>h&&(g=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<g)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:
        -Infinity,g));l<g&&(l=g);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(h=0;h<a.dataSeriesIndexes.length;h++){var n=a.dataSeriesIndexes[h],m=this.data[n],q=m.dataPoints;if(0<q.length){var r=5<l&&m.bevelEnabled?!0:!1;b.strokeStyle="#4572A7 ";for(g=0;g<q.length;g++)if(c=q[g].x.getTime?q[g].x.getTime():q[g].x,!(c<a.axisX.dataInfo.viewPortMin||
        c>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[g].y){d=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(c-a.axisX.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*((0!==a.dataPointYSums[c]?100*(q[g].y/a.dataPointYSums[c]):0)-a.axisY.conversionParameters.minimum);var s=d-a.plotType.plotUnits.length*l/2+a.index*l<<0,w=s+l<<0,v;if(0<=q[g].y){var x=e[c]?e[c]:0;v=p+x;k+=x;e[c]=x+(k-v)}else x=f[c]?
        f[c]:0,v=k-x,k=p-x,f[c]=x+(k-v);c=q[g].color?q[g].color:m._colorSet[g%m._colorSet.length];I(b,v,s,k,w,c,0,null,r,!1,!1,!1,m.fillOpacity);c=m.dataPointIds[g];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:n,dataPointIndex:g,x1:v,y1:s,x2:k,y2:w};c=B(c);t&&I(this._eventManager.ghostCtx,v,s,k,w,c,0,null,!1,!1,!1,!1);(q[g].indexLabel||m.indexLabel||q[g].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedBar100",dataPoint:q[g],dataSeries:m,
        point:{x:0<=q[g].y?k:v,y:d},direction:0<=q[g].y?1:-1,bounds:{x1:Math.min(v,k),y1:s,x2:Math.max(v,k),y2:w},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.max(p,a.axisX.boundingRect.x2);return{source:b,dest:this.plotArea.ctx,animationCallback:A.xScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderArea=function(a){function b(){x&&(0<h.lineThickness&&c.stroke(),0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?v=w:0>a.axisY.viewportMaximum?
        v=f.y1:0<a.axisY.viewportMinimum&&(v=e.y2),c.lineTo(q,v),c.lineTo(x.x,v),c.closePath(),c.globalAlpha=h.fillOpacity,c.fill(),c.globalAlpha=1,t&&(d.lineTo(q,v),d.lineTo(x.x,v),d.closePath(),d.fill()),c.beginPath(),c.moveTo(q,r),d.beginPath(),d.moveTo(q,r),x={x:q,y:r})}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=a.axisX.lineCoordinates,f=a.axisY.lineCoordinates,g=[],k=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(k.x1,
        k.y1,k.width,k.height);c.clip();t&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=0;k<a.dataSeriesIndexes.length;k++){var p=a.dataSeriesIndexes[k],h=this.data[p],l=h.dataPoints,g=h.id;this._eventManager.objectMap[g]={objectType:"dataSeries",dataSeriesIndex:p};g=B(g);d.fillStyle=g;var g=[],n=!0,m=0,q,r,s,w=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)+0.5<<0,v,x=null;if(0<l.length){var E=h._colorSet[m%h._colorSet.length];
        c.fillStyle=E;c.strokeStyle=E;c.lineWidth=h.lineThickness;c.setLineDash&&c.setLineDash(M(h.lineDashType,h.lineThickness));for(var y=!0;m<l.length;m++)if(s=l[m].x.getTime?l[m].x.getTime():l[m].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax))if("number"!==typeof l[m].y)b(),y=!0;else{q=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(s-a.axisX.conversionParameters.minimum)+0.5<<0;r=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*
            (l[m].y-a.axisY.conversionParameters.minimum)+0.5<<0;n||y?(c.beginPath(),c.moveTo(q,r),x={x:q,y:r},t&&(d.beginPath(),d.moveTo(q,r)),y=n=!1):(c.lineTo(q,r),t&&d.lineTo(q,r),0==m%250&&b());var z=h.dataPointIds[m];this._eventManager.objectMap[z]={id:z,objectType:"dataPoint",dataSeriesIndex:p,dataPointIndex:m,x1:q,y1:r};0!==l[m].markerSize&&(0<l[m].markerSize||0<h.markerSize)&&(s=h.getMarkerProperties(m,q,r,c),g.push(s),z=B(z),t&&g.push({x:q,y:r,ctx:d,type:s.type,size:s.size,color:z,borderColor:z,borderThickness:s.borderThickness}));
            (l[m].indexLabel||h.indexLabel||l[m].indexLabelFormatter||h.indexLabelFormatter)&&this._indexLabels.push({chartType:"area",dataPoint:l[m],dataSeries:h,point:{x:q,y:r},direction:0<=l[m].y?1:-1,color:E})}b();K.drawMarkers(g)}}c.restore();t&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderSplineArea=function(a){function b(){var b=ha(v,2);if(0<b.length){c.beginPath();c.moveTo(b[0].x,
        b[0].y);t&&(d.beginPath(),d.moveTo(b[0].x,b[0].y));for(var g=0;g<b.length-3;g+=3)c.bezierCurveTo(b[g+1].x,b[g+1].y,b[g+2].x,b[g+2].y,b[g+3].x,b[g+3].y),t&&d.bezierCurveTo(b[g+1].x,b[g+1].y,b[g+2].x,b[g+2].y,b[g+3].x,b[g+3].y);0<h.lineThickness&&c.stroke();0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?s=r:0>a.axisY.viewportMaximum?s=f.y1:0<a.axisY.viewportMinimum&&(s=e.y2);w={x:b[0].x,y:b[0].y};c.lineTo(b[b.length-1].x,s);c.lineTo(w.x,s);c.closePath();c.globalAlpha=h.fillOpacity;c.fill();
        c.globalAlpha=1;t&&(d.lineTo(b[b.length-1].x,s),d.lineTo(w.x,s),d.closePath(),d.fill())}}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=a.axisX.lineCoordinates,f=a.axisY.lineCoordinates,g=[],k=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(k.x1,k.y1,k.width,k.height);c.clip();t&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=0;k<a.dataSeriesIndexes.length;k++){var p=a.dataSeriesIndexes[k],h=this.data[p],
        l=h.dataPoints,g=h.id;this._eventManager.objectMap[g]={objectType:"dataSeries",dataSeriesIndex:p};g=B(g);d.fillStyle=g;var g=[],n=0,m,q,r=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)+0.5<<0,s,w=null,v=[];if(0<l.length){color=h._colorSet[n%h._colorSet.length];c.fillStyle=color;c.strokeStyle=color;c.lineWidth=h.lineThickness;for(c.setLineDash&&c.setLineDash(M(h.lineDashType,h.lineThickness));n<l.length;n++)if(m=l[n].x.getTime?
            l[n].x.getTime():l[n].x,!(m<a.axisX.dataInfo.viewPortMin||m>a.axisX.dataInfo.viewPortMax))if("number"!==typeof l[n].y)0<n&&(b(),v=[]);else{m=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(m-a.axisX.conversionParameters.minimum)+0.5<<0;q=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(l[n].y-a.axisY.conversionParameters.minimum)+0.5<<0;var x=h.dataPointIds[n];this._eventManager.objectMap[x]={id:x,objectType:"dataPoint",dataSeriesIndex:p,
        dataPointIndex:n,x1:m,y1:q};v[v.length]={x:m,y:q};if(0!==l[n].markerSize&&(0<l[n].markerSize||0<h.markerSize)){var E=h.getMarkerProperties(n,m,q,c);g.push(E);x=B(x);t&&g.push({x:m,y:q,ctx:d,type:E.type,size:E.size,color:x,borderColor:x,borderThickness:E.borderThickness})}(l[n].indexLabel||h.indexLabel||l[n].indexLabelFormatter||h.indexLabelFormatter)&&this._indexLabels.push({chartType:"splineArea",dataPoint:l[n],dataSeries:h,point:{x:m,y:q},direction:0<=l[n].y?1:-1,color:color})}b();K.drawMarkers(g)}}c.restore();
        t&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderStepArea=function(a){function b(){x&&(0<h.lineThickness&&c.stroke(),0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?v=w:0>a.axisY.viewportMaximum?v=f.y1:0<a.axisY.viewportMinimum&&(v=e.y2),c.lineTo(q,v),c.lineTo(x.x,v),c.closePath(),c.globalAlpha=h.fillOpacity,c.fill(),c.globalAlpha=1,t&&(d.lineTo(q,v),d.lineTo(x.x,
        v),d.closePath(),d.fill()),c.beginPath(),c.moveTo(q,r),d.beginPath(),d.moveTo(q,r),x={x:q,y:r})}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=a.axisX.lineCoordinates,f=a.axisY.lineCoordinates,g=[],k=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(k.x1,k.y1,k.width,k.height);c.clip();t&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=0;k<a.dataSeriesIndexes.length;k++){var p=a.dataSeriesIndexes[k],h=this.data[p],
        l=h.dataPoints,g=h.id;this._eventManager.objectMap[g]={objectType:"dataSeries",dataSeriesIndex:p};g=B(g);d.fillStyle=g;var g=[],n=!0,m=0,q,r,s,w=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)+0.5<<0,v,x=null,E=!1;if(0<l.length){var y=h._colorSet[m%h._colorSet.length];c.fillStyle=y;c.strokeStyle=y;c.lineWidth=h.lineThickness;for(c.setLineDash&&c.setLineDash(M(h.lineDashType,h.lineThickness));m<l.length;m++)if(s=l[m].x.getTime?
            l[m].x.getTime():l[m].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax)){var z=r;"number"!==typeof l[m].y?(b(),E=!0):(q=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(s-a.axisX.conversionParameters.minimum)+0.5<<0,r=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(l[m].y-a.axisY.conversionParameters.minimum)+0.5<<0,n||E?(c.beginPath(),c.moveTo(q,r),x={x:q,y:r},t&&(d.beginPath(),d.moveTo(q,r)),E=n=!1):(c.lineTo(q,
        z),t&&d.lineTo(q,z),c.lineTo(q,r),t&&d.lineTo(q,r),0==m%250&&b()),z=h.dataPointIds[m],this._eventManager.objectMap[z]={id:z,objectType:"dataPoint",dataSeriesIndex:p,dataPointIndex:m,x1:q,y1:r},0!==l[m].markerSize&&(0<l[m].markerSize||0<h.markerSize)&&(s=h.getMarkerProperties(m,q,r,c),g.push(s),z=B(z),t&&g.push({x:q,y:r,ctx:d,type:s.type,size:s.size,color:z,borderColor:z,borderThickness:s.borderThickness})),(l[m].indexLabel||h.indexLabel||l[m].indexLabelFormatter||h.indexLabelFormatter)&&this._indexLabels.push({chartType:"stepArea",
        dataPoint:l[m],dataSeries:h,point:{x:q,y:r},direction:0<=l[m].y?1:-1,color:y}))}b();K.drawMarkers(g)}}c.restore();t&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderStackedArea=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=[],e=this.plotArea,f=[],g=[],k=0,p,h,l,n=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*
        (0-a.axisY.conversionParameters.minimum)<<0,m=this._eventManager.ghostCtx;t&&m.beginPath();b.save();t&&m.save();b.beginPath();b.rect(e.x1,e.y1,e.width,e.height);b.clip();t&&(m.beginPath(),m.rect(e.x1,e.y1,e.width,e.height),m.clip());xValuePresent=[];for(e=0;e<a.dataSeriesIndexes.length;e++){var q=a.dataSeriesIndexes[e],r=this.data[q],s=r.dataPoints;r.dataPointIndexes=[];for(k=0;k<s.length;k++)q=s[k].x.getTime?s[k].x.getTime():s[k].x,r.dataPointIndexes[q]=k,xValuePresent[q]||(g.push(q),xValuePresent[q]=
        !0);g.sort(ta)}for(e=0;e<a.dataSeriesIndexes.length;e++){var q=a.dataSeriesIndexes[e],r=this.data[q],s=r.dataPoints,w=!0,v=[],k=r.id;this._eventManager.objectMap[k]={objectType:"dataSeries",dataSeriesIndex:q};k=B(k);m.fillStyle=k;if(0<g.length){c=r._colorSet[0];b.fillStyle=c;b.strokeStyle=c;b.lineWidth=r.lineThickness;b.setLineDash&&b.setLineDash(M(r.lineDashType,r.lineThickness));for(k=0;k<g.length;k++){l=g[k];var x=null,x=0<=r.dataPointIndexes[l]?s[r.dataPointIndexes[l]]:{x:l,y:0};if(!(l<a.axisX.dataInfo.viewPortMin||
        l>a.axisX.dataInfo.viewPortMax)&&"number"===typeof x.y){p=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(l-a.axisX.conversionParameters.minimum)+0.5<<0;h=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(x.y-a.axisY.conversionParameters.minimum);var E=f[l]?f[l]:0;h-=E;v.push({x:p,y:n-E});f[l]=n-h;if(w)b.beginPath(),b.moveTo(p,h),t&&(m.beginPath(),m.moveTo(p,h)),w=!1;else if(b.lineTo(p,h),t&&m.lineTo(p,h),0==k%250){for(0<r.lineThickness&&
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 b.stroke();0<v.length;){var y=v.pop();b.lineTo(y.x,y.y);t&&m.lineTo(y.x,y.y)}b.closePath();b.globalAlpha=r.fillOpacity;b.fill();b.globalAlpha=1;b.beginPath();b.moveTo(p,h);t&&(m.closePath(),m.fill(),m.beginPath(),m.moveTo(p,h));v.push({x:p,y:n-E})}if(0<=r.dataPointIndexes[l]){var z=r.dataPointIds[r.dataPointIndexes[l]];this._eventManager.objectMap[z]={id:z,objectType:"dataPoint",dataSeriesIndex:q,dataPointIndex:r.dataPointIndexes[l],x1:p,y1:h}}0<=r.dataPointIndexes[l]&&0!==x.markerSize&&(0<x.markerSize||
    0<r.markerSize)&&(l=r.getMarkerProperties(k,p,h,b),d.push(l),markerColor=B(z),t&&d.push({x:p,y:h,ctx:m,type:l.type,size:l.size,color:markerColor,borderColor:markerColor,borderThickness:l.borderThickness}));(x.indexLabel||r.indexLabel||x.indexLabelFormatter||r.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedArea",dataPoint:x,dataSeries:r,point:{x:p,y:h},direction:0<=s[k].y?1:-1,color:c})}}for(0<r.lineThickness&&b.stroke();0<v.length;)y=v.pop(),b.lineTo(y.x,y.y),t&&m.lineTo(y.x,y.y);
        b.closePath();b.globalAlpha=r.fillOpacity;b.fill();b.globalAlpha=1;b.beginPath();b.moveTo(p,h);t&&(m.closePath(),m.fill(),m.beginPath(),m.moveTo(p,h))}delete r.dataPointIndexes}K.drawMarkers(d);b.restore();t&&m.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderStackedArea100=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=[],
        f=[],g=[],k=0,p,h,l,n=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,m=this.dataPointMaxWidth?this.dataPointMaxWidth:0.15*this.width<<0,q=a.axisX.dataInfo.minDiff,q=0.9*d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(q)<<0,r=this._eventManager.ghostCtx;b.save();t&&r.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(r.beginPath(),r.rect(d.x1,d.y1,d.width,d.height),r.clip());xValuePresent=
        [];for(d=0;d<a.dataSeriesIndexes.length;d++){var s=a.dataSeriesIndexes[d],w=this.data[s],v=w.dataPoints;w.dataPointIndexes=[];for(k=0;k<v.length;k++)s=v[k].x.getTime?v[k].x.getTime():v[k].x,w.dataPointIndexes[s]=k,xValuePresent[s]||(g.push(s),xValuePresent[s]=!0);g.sort(ta)}for(d=0;d<a.dataSeriesIndexes.length;d++){var s=a.dataSeriesIndexes[d],w=this.data[s],v=w.dataPoints,x=!0,c=w.id;this._eventManager.objectMap[c]={objectType:"dataSeries",dataSeriesIndex:s};c=B(c);r.fillStyle=c;1==v.length&&(q=
        m);1>q?q=1:q>m&&(q=m);var E=[];if(0<g.length){c=w._colorSet[k%w._colorSet.length];b.fillStyle=c;b.strokeStyle=c;b.lineWidth=w.lineThickness;b.setLineDash&&b.setLineDash(M(w.lineDashType,w.lineThickness));for(k=0;k<g.length;k++){l=g[k];var y=null,y=0<=w.dataPointIndexes[l]?v[w.dataPointIndexes[l]]:{x:l,y:0};if(!(l<a.axisX.dataInfo.viewPortMin||l>a.axisX.dataInfo.viewPortMax)&&"number"===typeof y.y){h=0!==a.dataPointYSums[l]?100*(y.y/a.dataPointYSums[l]):0;p=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*
        (l-a.axisX.conversionParameters.minimum)+0.5<<0;h=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(h-a.axisY.conversionParameters.minimum);var z=f[l]?f[l]:0;h-=z;E.push({x:p,y:n-z});f[l]=n-h;if(x)b.beginPath(),b.moveTo(p,h),t&&(r.beginPath(),r.moveTo(p,h)),x=!1;else if(b.lineTo(p,h),t&&r.lineTo(p,h),0==k%250){for(0<w.lineThickness&&b.stroke();0<E.length;){var u=E.pop();b.lineTo(u.x,u.y);t&&r.lineTo(u.x,u.y)}b.closePath();b.globalAlpha=w.fillOpacity;b.fill();b.globalAlpha=
        1;b.beginPath();b.moveTo(p,h);t&&(r.closePath(),r.fill(),r.beginPath(),r.moveTo(p,h));E.push({x:p,y:n-z})}if(0<=w.dataPointIndexes[l]){var D=w.dataPointIds[w.dataPointIndexes[l]];this._eventManager.objectMap[D]={id:D,objectType:"dataPoint",dataSeriesIndex:s,dataPointIndex:w.dataPointIndexes[l],x1:p,y1:h}}0<=w.dataPointIndexes[l]&&0!==y.markerSize&&(0<y.markerSize||0<w.markerSize)&&(l=w.getMarkerProperties(k,p,h,b),e.push(l),markerColor=B(D),t&&e.push({x:p,y:h,ctx:r,type:l.type,size:l.size,color:markerColor,
        borderColor:markerColor,borderThickness:l.borderThickness}));(y.indexLabel||w.indexLabel||y.indexLabelFormatter||w.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedArea100",dataPoint:y,dataSeries:w,point:{x:p,y:h},direction:0<=v[k].y?1:-1,color:c})}}for(0<w.lineThickness&&b.stroke();0<E.length;)u=E.pop(),b.lineTo(u.x,u.y),t&&r.lineTo(u.x,u.y);b.closePath();b.globalAlpha=w.fillOpacity;b.fill();b.globalAlpha=1;b.beginPath();b.moveTo(p,h);t&&(r.closePath(),r.fill(),r.beginPath(),r.moveTo(p,
        h))}delete w.dataPointIndexes}K.drawMarkers(e);b.restore();t&&r.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderBubble=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx,c=a.dataSeriesIndexes.length;if(!(0>=c)){var d=this.plotArea,e=0,f,g,k=this.dataPointMaxWidth?this.dataPointMaxWidth:0.15*this.width<<0,e=a.axisX.dataInfo.minDiff,c=0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*
        Math.abs(e)/c)<<0;b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var p=-Infinity,h=Infinity,l=0;l<a.dataSeriesIndexes.length;l++)for(var n=a.dataSeriesIndexes[l],m=this.data[n],q=m.dataPoints,r=0,e=0;e<q.length;e++)f=q[e].getTime?f=q[e].x.getTime():f=q[e].x,f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax||"undefined"===typeof q[e].z||
    (r=q[e].z,r>p&&(p=r),r<h&&(h=r));for(var s=25*Math.PI,d=Math.max(Math.pow(0.25*Math.min(d.height,d.width)/2,2)*Math.PI,s),l=0;l<a.dataSeriesIndexes.length;l++)if(n=a.dataSeriesIndexes[l],m=this.data[n],q=m.dataPoints,1==q.length&&(c=k),1>c?c=1:c>k&&(c=k),0<q.length)for(b.strokeStyle="#4572A7 ",e=0;e<q.length;e++)if(f=q[e].getTime?f=q[e].x.getTime():f=q[e].x,!(f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[e].y){f=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*
        (f-a.axisX.conversionParameters.minimum)+0.5<<0;g=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(q[e].y-a.axisY.conversionParameters.minimum)+0.5<<0;var r=q[e].z,w=2*Math.max(Math.sqrt((p===h?d/2:s+(d-s)/(p-h)*(r-h))/Math.PI)<<0,1),r=m.getMarkerProperties(e,b);r.size=w;b.globalAlpha=m.fillOpacity;K.drawMarker(f,g,b,r.type,r.size,r.color,r.borderColor,r.borderThickness);b.globalAlpha=1;var v=m.dataPointIds[e];this._eventManager.objectMap[v]={id:v,objectType:"dataPoint",
        dataSeriesIndex:n,dataPointIndex:e,x1:f,y1:g,size:w};w=B(v);t&&K.drawMarker(f,g,this._eventManager.ghostCtx,r.type,r.size,w,w,r.borderThickness);(q[e].indexLabel||m.indexLabel||q[e].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"bubble",dataPoint:q[e],dataSeries:m,point:{x:f,y:g},direction:1,bounds:{x1:f-r.size/2,y1:g-r.size/2,x2:f+r.size/2,y2:g+r.size/2},color:null})}b.restore();t&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,
        easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderScatter=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx,c=a.dataSeriesIndexes.length;if(!(0>=c)){var d=this.plotArea,e=0,f,g,k=this.dataPointMaxWidth?this.dataPointMaxWidth:0.15*this.width<<0,e=a.axisX.dataInfo.minDiff,c=0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(e)/c)<<0;b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,
        d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var p=0;p<a.dataSeriesIndexes.length;p++){var h=a.dataSeriesIndexes[p],l=this.data[h],n=l.dataPoints;1==n.length&&(c=k);1>c?c=1:c>k&&(c=k);if(0<n.length){b.strokeStyle="#4572A7 ";Math.pow(0.3*Math.min(d.height,d.width)/2,2);for(var m=0,q=0,e=0;e<n.length;e++)if(f=n[e].getTime?f=n[e].x.getTime():f=n[e].x,!(f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax)&&"number"===typeof n[e].y){f=a.axisX.conversionParameters.reference+
        a.axisX.conversionParameters.pixelPerUnit*(f-a.axisX.conversionParameters.minimum)+0.5<<0;g=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(n[e].y-a.axisY.conversionParameters.minimum)+0.5<<0;var r=l.getMarkerProperties(e,f,g,b);b.globalAlpha=l.fillOpacity;K.drawMarker(r.x,r.y,r.ctx,r.type,r.size,r.color,r.borderColor,r.borderThickness);b.globalAlpha=1;Math.sqrt((m-f)*(m-f)+(q-g)*(q-g))<Math.min(r.size,5)&&n.length>Math.min(this.plotArea.width,this.plotArea.height)||
    (m=l.dataPointIds[e],this._eventManager.objectMap[m]={id:m,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:e,x1:f,y1:g},m=B(m),t&&K.drawMarker(r.x,r.y,this._eventManager.ghostCtx,r.type,r.size,m,m,r.borderThickness),(n[e].indexLabel||l.indexLabel||n[e].indexLabelFormatter||l.indexLabelFormatter)&&this._indexLabels.push({chartType:"scatter",dataPoint:n[e],dataSeries:l,point:{x:f,y:g},direction:1,bounds:{x1:f-r.size/2,y1:g-r.size/2,x2:f+r.size/2,y2:g+r.size/2},color:null}),m=f,q=g)}}}b.restore();
        t&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderCandlestick=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx,c=this._eventManager.ghostCtx;if(!(0>=a.dataSeriesIndexes.length)){var d=null,d=this.plotArea,e=0,f,g,k,p,h,l,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1;f=this.dataPointMaxWidth?this.dataPointMaxWidth:
        this.dataPointWidth?this.dataPointWidth:0.015*this.width;var n=a.axisX.dataInfo.minDiff;isFinite(n)||(n=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));n=this.dataPointWidth?this.dataPointWidth:0.7*d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(n)<<0;this.dataPointMaxWidth&&e>f&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,f));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&f<e)&&(f=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,
        e));n<e&&(n=e);n>f&&(n=f);b.save();t&&c.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(c.rect(d.x1,d.y1,d.width,d.height),c.clip());for(var m=0;m<a.dataSeriesIndexes.length;m++){var q=a.dataSeriesIndexes[m],r=this.data[q],s=r.dataPoints;if(0<s.length)for(var w=5<n&&r.bevelEnabled?!0:!1,e=0;e<s.length;e++)if(s[e].getTime?l=s[e].x.getTime():l=s[e].x,!(l<a.axisX.dataInfo.viewPortMin||l>a.axisX.dataInfo.viewPortMax)&&null!==s[e].y&&s[e].y.length&&"number"===typeof s[e].y[0]&&"number"===
        typeof s[e].y[1]&&"number"===typeof s[e].y[2]&&"number"===typeof s[e].y[3]){f=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(l-a.axisX.conversionParameters.minimum)+0.5<<0;g=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(s[e].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(s[e].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;p=a.axisY.conversionParameters.reference+
        a.axisY.conversionParameters.pixelPerUnit*(s[e].y[2]-a.axisY.conversionParameters.minimum)+0.5<<0;h=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(s[e].y[3]-a.axisY.conversionParameters.minimum)+0.5<<0;var v=f-n/2<<0,x=v+n<<0,d=s[e].color?s[e].color:r._colorSet[0],E=Math.round(Math.max(1,0.15*n)),u=0===E%2?0:0.5,z=r.dataPointIds[e];this._eventManager.objectMap[z]={id:z,objectType:"dataPoint",dataSeriesIndex:q,dataPointIndex:e,x1:v,y1:g,x2:x,y2:k,x3:f,y3:p,x4:f,y4:h,
        borderThickness:E,color:d};b.strokeStyle=d;b.beginPath();b.lineWidth=E;c.lineWidth=Math.max(E,4);"candlestick"===r.type?(b.moveTo(f-u,k),b.lineTo(f-u,Math.min(g,h)),b.stroke(),b.moveTo(f-u,Math.max(g,h)),b.lineTo(f-u,p),b.stroke(),I(b,v,Math.min(g,h),x,Math.max(g,h),s[e].y[0]<=s[e].y[3]?r.risingColor:d,E,d,w,w,!1,!1,r.fillOpacity),t&&(d=B(z),c.strokeStyle=d,c.moveTo(f-u,k),c.lineTo(f-u,Math.min(g,h)),c.stroke(),c.moveTo(f-u,Math.max(g,h)),c.lineTo(f-u,p),c.stroke(),I(c,v,Math.min(g,h),x,Math.max(g,
        h),d,0,null,!1,!1,!1,!1))):"ohlc"===r.type&&(b.moveTo(f-u,k),b.lineTo(f-u,p),b.stroke(),b.beginPath(),b.moveTo(f,g),b.lineTo(v,g),b.stroke(),b.beginPath(),b.moveTo(f,h),b.lineTo(x,h),b.stroke(),t&&(d=B(z),c.strokeStyle=d,c.moveTo(f-u,k),c.lineTo(f-u,p),c.stroke(),c.beginPath(),c.moveTo(f,g),c.lineTo(v,g),c.stroke(),c.beginPath(),c.moveTo(f,h),c.lineTo(x,h),c.stroke()));(s[e].indexLabel||r.indexLabel||s[e].indexLabelFormatter||r.indexLabelFormatter)&&this._indexLabels.push({chartType:r.type,dataPoint:s[e],
        dataSeries:r,point:{x:v+(x-v)/2,y:k},direction:1,bounds:{x1:v,y1:Math.min(k,p),x2:x,y2:Math.max(k,p)},color:d})}}b.restore();t&&c.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderRangeColumn=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=0,f,g,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:
        1;f=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.03*this.width;var k=a.axisX.dataInfo.minDiff;isFinite(k)||(k=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));k=this.dataPointWidth?this.dataPointWidth:0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(k)/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&e>f&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,f));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&
    f<e)&&(f=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,e));k<e&&(k=e);k>f&&(k=f);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var p=0;p<a.dataSeriesIndexes.length;p++){var h=a.dataSeriesIndexes[p],l=this.data[h],n=l.dataPoints;if(0<n.length)for(var m=5<k&&l.bevelEnabled?!0:!1,e=0;e<n.length;e++)if(n[e].getTime?g=n[e].x.getTime():
            g=n[e].x,!(g<a.axisX.dataInfo.viewPortMin||g>a.axisX.dataInfo.viewPortMax)&&null!==n[e].y&&n[e].y.length&&"number"===typeof n[e].y[0]&&"number"===typeof n[e].y[1]){c=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(g-a.axisX.conversionParameters.minimum)+0.5<<0;d=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(n[e].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;f=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*
        (n[e].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;var q=c-a.plotType.totalDataSeries*k/2+(a.previousDataSeriesCount+p)*k<<0,r=q+k<<0,c=n[e].color?n[e].color:l._colorSet[e%l._colorSet.length];if(d>f){var s=d,d=f;f=s}s=l.dataPointIds[e];this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:e,x1:q,y1:d,x2:r,y2:f};I(b,q,d,r,f,c,0,c,m,m,!1,!1,l.fillOpacity);c=B(s);t&&I(this._eventManager.ghostCtx,q,d,r,f,c,0,null,!1,!1,!1,!1);if(n[e].indexLabel||l.indexLabel||
        n[e].indexLabelFormatter||l.indexLabelFormatter)this._indexLabels.push({chartType:"rangeColumn",dataPoint:n[e],dataSeries:l,indexKeyword:0,point:{x:q+(r-q)/2,y:n[e].y[1]>=n[e].y[0]?f:d},direction:n[e].y[1]>=n[e].y[0]?-1:1,bounds:{x1:q,y1:Math.min(d,f),x2:r,y2:Math.max(d,f)},color:c}),this._indexLabels.push({chartType:"rangeColumn",dataPoint:n[e],dataSeries:l,indexKeyword:1,point:{x:q+(r-q)/2,y:n[e].y[1]>=n[e].y[0]?d:f},direction:n[e].y[1]>=n[e].y[0]?1:-1,bounds:{x1:q,y1:Math.min(d,f),x2:r,y2:Math.max(d,
        f)},color:c})}}b.restore();t&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderRangeBar=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=0,f,g,k,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1;f=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?
        this.dataPointWidth:Math.min(0.15*this.height,0.9*(this.plotArea.height/a.plotType.totalDataSeries))<<0;var p=a.axisX.dataInfo.minDiff;isFinite(p)||(p=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));p=this.dataPointWidth?this.dataPointWidth:0.9*(d.height/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(p)/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&e>f&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,f));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&
    f<e)&&(f=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,e));p<e&&(p=e);p>f&&(p=f);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var h=0;h<a.dataSeriesIndexes.length;h++){var l=a.dataSeriesIndexes[h],n=this.data[l],m=n.dataPoints;if(0<m.length){var q=5<p&&n.bevelEnabled?!0:!1;b.strokeStyle="#4572A7 ";for(e=0;e<m.length;e++)if(m[e].getTime?
            k=m[e].x.getTime():k=m[e].x,!(k<a.axisX.dataInfo.viewPortMin||k>a.axisX.dataInfo.viewPortMax)&&null!==m[e].y&&m[e].y.length&&"number"===typeof m[e].y[0]&&"number"===typeof m[e].y[1]){d=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(m[e].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;f=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(m[e].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;g=a.axisX.conversionParameters.reference+
        a.axisX.conversionParameters.pixelPerUnit*(k-a.axisX.conversionParameters.minimum)+0.5<<0;g=g-a.plotType.totalDataSeries*p/2+(a.previousDataSeriesCount+h)*p<<0;var r=g+p<<0;d>f&&(c=d,d=f,f=c);c=m[e].color?m[e].color:n._colorSet[e%n._colorSet.length];I(b,d,g,f,r,c,0,null,q,!1,!1,!1,n.fillOpacity);c=n.dataPointIds[e];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:l,dataPointIndex:e,x1:d,y1:g,x2:f,y2:r};c=B(c);t&&I(this._eventManager.ghostCtx,d,g,f,r,c,0,null,!1,!1,!1,!1);
        if(m[e].indexLabel||n.indexLabel||m[e].indexLabelFormatter||n.indexLabelFormatter)this._indexLabels.push({chartType:"rangeBar",dataPoint:m[e],dataSeries:n,indexKeyword:0,point:{x:m[e].y[1]>=m[e].y[0]?d:f,y:g+(r-g)/2},direction:m[e].y[1]>=m[e].y[0]?-1:1,bounds:{x1:Math.min(d,f),y1:g,x2:Math.max(d,f),y2:r},color:c}),this._indexLabels.push({chartType:"rangeBar",dataPoint:m[e],dataSeries:n,indexKeyword:1,point:{x:m[e].y[1]>=m[e].y[0]?f:d,y:g+(r-g)/2},direction:m[e].y[1]>=m[e].y[0]?1:-1,bounds:{x1:Math.min(d,
            f),y1:g,x2:Math.max(d,f),y2:r},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderRangeArea=function(a){function b(){if(w){var a=null;0<p.lineThickness&&c.stroke();for(var b=g.length-1;0<=b;b--)a=g[b],c.lineTo(a.x,a.y),d.lineTo(a.x,a.y);c.closePath();c.globalAlpha=p.fillOpacity;c.fill();c.globalAlpha=1;d.fill();if(0<p.lineThickness){c.beginPath();
        c.moveTo(a.x,a.y);for(b=0;b<g.length;b++)a=g[b],c.lineTo(a.x,a.y);c.stroke()}c.beginPath();c.moveTo(m,q);d.beginPath();d.moveTo(m,q);w={x:m,y:q};g=[];g.push({x:m,y:r})}}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=[],f=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(f.x1,f.y1,f.width,f.height);c.clip();t&&(d.beginPath(),d.rect(f.x1,f.y1,f.width,f.height),d.clip());for(f=0;f<a.dataSeriesIndexes.length;f++){var g=[],k=a.dataSeriesIndexes[f],
        p=this.data[k],h=p.dataPoints,e=p.id;this._eventManager.objectMap[e]={objectType:"dataSeries",dataSeriesIndex:k};e=B(e);d.fillStyle=e;var e=[],l=!0,n=0,m,q,r,s,w=null;if(0<h.length){var v=p._colorSet[n%p._colorSet.length];c.fillStyle=v;c.strokeStyle=v;c.lineWidth=p.lineThickness;c.setLineDash&&c.setLineDash(M(p.lineDashType,p.lineThickness));for(var x=!0;n<h.length;n++)if(s=h[n].x.getTime?h[n].x.getTime():h[n].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax))if(null!==h[n].y&&h[n].y.length&&
        "number"===typeof h[n].y[0]&&"number"===typeof h[n].y[1]){m=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(s-a.axisX.conversionParameters.minimum)+0.5<<0;q=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(h[n].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;r=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(h[n].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;l||x?(c.beginPath(),c.moveTo(m,q),
        w={x:m,y:q},g=[],g.push({x:m,y:r}),t&&(d.beginPath(),d.moveTo(m,q)),x=l=!1):(c.lineTo(m,q),g.push({x:m,y:r}),t&&d.lineTo(m,q),0==n%250&&b());s=p.dataPointIds[n];this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:k,dataPointIndex:n,x1:m,y1:q,y2:r};if(0!==h[n].markerSize&&(0<h[n].markerSize||0<p.markerSize)){var u=p.getMarkerProperties(n,m,r,c);e.push(u);var y=B(s);t&&e.push({x:m,y:r,ctx:d,type:u.type,size:u.size,color:y,borderColor:y,borderThickness:u.borderThickness});u=
        p.getMarkerProperties(n,m,q,c);e.push(u);y=B(s);t&&e.push({x:m,y:q,ctx:d,type:u.type,size:u.size,color:y,borderColor:y,borderThickness:u.borderThickness})}if(h[n].indexLabel||p.indexLabel||h[n].indexLabelFormatter||p.indexLabelFormatter)this._indexLabels.push({chartType:"rangeArea",dataPoint:h[n],dataSeries:p,indexKeyword:0,point:{x:m,y:q},direction:h[n].y[0]<=h[n].y[1]?-1:1,color:v}),this._indexLabels.push({chartType:"rangeArea",dataPoint:h[n],dataSeries:p,indexKeyword:1,point:{x:m,y:r},direction:h[n].y[0]<=
    h[n].y[1]?1:-1,color:v})}else b(),x=!0;b();K.drawMarkers(e)}}c.restore();t&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderRangeSplineArea=function(a){function b(){var a=ha(q,2);if(0<a.length){c.beginPath();c.moveTo(a[0].x,a[0].y);t&&(d.beginPath(),d.moveTo(a[0].x,a[0].y));for(var b=0;b<a.length-3;b+=3)c.bezierCurveTo(a[b+1].x,a[b+1].y,a[b+2].x,a[b+2].y,a[b+3].x,a[b+
    3].y),t&&d.bezierCurveTo(a[b+1].x,a[b+1].y,a[b+2].x,a[b+2].y,a[b+3].x,a[b+3].y);0<k.lineThickness&&c.stroke();a=ha(r,2);c.lineTo(r[r.length-1].x,r[r.length-1].y);for(b=a.length-1;2<b;b-=3)c.bezierCurveTo(a[b-1].x,a[b-1].y,a[b-2].x,a[b-2].y,a[b-3].x,a[b-3].y),t&&d.bezierCurveTo(a[b-1].x,a[b-1].y,a[b-2].x,a[b-2].y,a[b-3].x,a[b-3].y);c.closePath();c.globalAlpha=k.fillOpacity;c.fill();c.globalAlpha=1;if(0<k.lineThickness){c.beginPath();c.moveTo(r[r.length-1].x,r[r.length-1].y);for(b=a.length-1;2<b;b-=
        3)c.bezierCurveTo(a[b-1].x,a[b-1].y,a[b-2].x,a[b-2].y,a[b-3].x,a[b-3].y),t&&d.bezierCurveTo(a[b-1].x,a[b-1].y,a[b-2].x,a[b-2].y,a[b-3].x,a[b-3].y);c.stroke()}c.beginPath();t&&(d.closePath(),d.fill())}}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=[],f=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(f.x1,f.y1,f.width,f.height);c.clip();t&&(d.beginPath(),d.rect(f.x1,f.y1,f.width,f.height),d.clip());for(f=0;f<a.dataSeriesIndexes.length;f++){var g=
        a.dataSeriesIndexes[f],k=this.data[g],p=k.dataPoints,e=k.id;this._eventManager.objectMap[e]={objectType:"dataSeries",dataSeriesIndex:g};e=B(e);d.fillStyle=e;var e=[],h=0,l,n,m,q=[],r=[];if(0<p.length){color=k._colorSet[h%k._colorSet.length];c.fillStyle=color;c.strokeStyle=color;c.lineWidth=k.lineThickness;for(c.setLineDash&&c.setLineDash(M(k.lineDashType,k.lineThickness));h<p.length;h++)if(l=p[h].x.getTime?p[h].x.getTime():p[h].x,!(l<a.axisX.dataInfo.viewPortMin||l>a.axisX.dataInfo.viewPortMax))if(null!==
        p[h].y&&p[h].y.length&&"number"===typeof p[h].y[0]&&"number"===typeof p[h].y[1]){l=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(l-a.axisX.conversionParameters.minimum)+0.5<<0;n=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(p[h].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;m=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(p[h].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;var s=k.dataPointIds[h];
        this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:g,dataPointIndex:h,x1:l,y1:n,y2:m};q[q.length]={x:l,y:n};r[r.length]={x:l,y:m};if(0!==p[h].markerSize&&(0<p[h].markerSize||0<k.markerSize)){var w=k.getMarkerProperties(h,l,n,c);e.push(w);var v=B(s);t&&e.push({x:l,y:n,ctx:d,type:w.type,size:w.size,color:v,borderColor:v,borderThickness:w.borderThickness});w=k.getMarkerProperties(h,l,m,c);e.push(w);v=B(s);t&&e.push({x:l,y:m,ctx:d,type:w.type,size:w.size,color:v,borderColor:v,
            borderThickness:w.borderThickness})}if(p[h].indexLabel||k.indexLabel||p[h].indexLabelFormatter||k.indexLabelFormatter)this._indexLabels.push({chartType:"splineArea",dataPoint:p[h],dataSeries:k,indexKeyword:0,point:{x:l,y:n},direction:p[h].y[0]<=p[h].y[1]?-1:1,color:color}),this._indexLabels.push({chartType:"splineArea",dataPoint:p[h],dataSeries:k,indexKeyword:1,point:{x:l,y:m},direction:p[h].y[0]<=p[h].y[1]?1:-1,color:color})}else 0<h&&(b(),q=[],r=[]);b();K.drawMarkers(e)}}c.restore();t&&this._eventManager.ghostCtx.restore();
        return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};var ra=function(a,b,c,d,e,f,g,k,p){"undefined"===typeof k&&(k=1);if(!t){var h=Number((g%(2*Math.PI)).toFixed(8));Number((f%(2*Math.PI)).toFixed(8))===h&&(g-=1E-4)}a.save();a.globalAlpha=k;"pie"===e?(a.beginPath(),a.moveTo(b.x,b.y),a.arc(b.x,b.y,c,f,g,!1),a.fillStyle=d,a.strokeStyle="white",a.lineWidth=2,a.closePath(),a.fill()):"doughnut"===e&&(a.beginPath(),a.arc(b.x,b.y,c,f,
        g,!1),a.arc(b.x,b.y,p*c,g,f,!0),a.closePath(),a.fillStyle=d,a.strokeStyle="white",a.lineWidth=2,a.fill());a.globalAlpha=1;a.restore()};u.prototype.renderPie=function(a){function b(){if(h&&l){var a=0,b=0,c=0,d=0;for(y=0;y<l.length;y++){var e=l[y],f=h.dataPointIds[y],g={id:f,objectType:"dataPoint",dataPointIndex:y,dataSeriesIndex:0};q.push(g);var k={percent:null,total:null},n=null,k=p.getPercentAndTotal(h,e);if(h.indexLabelFormatter||e.indexLabelFormatter)n={chart:p._options,dataSeries:h,dataPoint:e,
        total:k.total,percent:k.percent};k=e.indexLabelFormatter?e.indexLabelFormatter(n):e.indexLabel?p.replaceKeywordsWithValue(e.indexLabel,e,h,y):h.indexLabelFormatter?h.indexLabelFormatter(n):h.indexLabel?p.replaceKeywordsWithValue(h.indexLabel,e,h,y):e.label?e.label:"";p._eventManager.objectMap[f]=g;g.center={x:x.x,y:x.y};g.y=e.y;g.radius=z;g.percentInnerRadius=D;g.indexLabelText=k;g.indexLabelPlacement=h.indexLabelPlacement;g.indexLabelLineColor=e.indexLabelLineColor?e.indexLabelLineColor:h.indexLabelLineColor?
        h.indexLabelLineColor:e.color?e.color:h._colorSet[y%h._colorSet.length];g.indexLabelLineThickness=e.indexLabelLineThickness?e.indexLabelLineThickness:h.indexLabelLineThickness;g.indexLabelLineDashType=e.indexLabelLineDashType?e.indexLabelLineDashType:h.indexLabelLineDashType;g.indexLabelFontColor=e.indexLabelFontColor?e.indexLabelFontColor:h.indexLabelFontColor;g.indexLabelFontStyle=e.indexLabelFontStyle?e.indexLabelFontStyle:h.indexLabelFontStyle;g.indexLabelFontWeight=e.indexLabelFontWeight?e.indexLabelFontWeight:
        h.indexLabelFontWeight;g.indexLabelFontSize=e.indexLabelFontSize?e.indexLabelFontSize:h.indexLabelFontSize;g.indexLabelFontFamily=e.indexLabelFontFamily?e.indexLabelFontFamily:h.indexLabelFontFamily;g.indexLabelBackgroundColor=e.indexLabelBackgroundColor?e.indexLabelBackgroundColor:h.indexLabelBackgroundColor?h.indexLabelBackgroundColor:null;g.indexLabelMaxWidth=e.indexLabelMaxWidth?e.indexLabelMaxWidth:h.indexLabelMaxWidth?h.indexLabelMaxWidth:0.33*m.width;g.indexLabelWrap="undefined"!==typeof e.indexLabelWrap?
        e.indexLabelWrap:h.indexLabelWrap;g.startAngle=0===y?h.startAngle?h.startAngle/180*Math.PI:0:q[y-1].endAngle;g.startAngle=(g.startAngle+2*Math.PI)%(2*Math.PI);g.endAngle=g.startAngle+2*Math.PI/u*Math.abs(e.y);e=(g.endAngle+g.startAngle)/2;e=(e+2*Math.PI)%(2*Math.PI);g.midAngle=e;if(g.midAngle>Math.PI/2-t&&g.midAngle<Math.PI/2+t){if(0===a||q[c].midAngle>g.midAngle)c=y;a++}else if(g.midAngle>3*Math.PI/2-t&&g.midAngle<3*Math.PI/2+t){if(0===b||q[d].midAngle>g.midAngle)d=y;b++}g.hemisphere=e>Math.PI/2&&
    e<=3*Math.PI/2?"left":"right";g.indexLabelTextBlock=new H(p.plotArea.ctx,{fontSize:g.indexLabelFontSize,fontFamily:g.indexLabelFontFamily,fontColor:g.indexLabelFontColor,fontStyle:g.indexLabelFontStyle,fontWeight:g.indexLabelFontWeight,horizontalAlign:"left",backgroundColor:g.indexLabelBackgroundColor,maxWidth:g.indexLabelMaxWidth,maxHeight:g.indexLabelWrap?5*g.indexLabelFontSize:1.5*g.indexLabelFontSize,text:g.indexLabelText,padding:0,textBaseline:"top"});g.indexLabelTextBlock.measureText()}f=e=
        0;k=!1;for(y=0;y<l.length;y++)g=q[(c+y)%l.length],1<a&&(g.midAngle>Math.PI/2-t&&g.midAngle<Math.PI/2+t)&&(e<=a/2&&!k?(g.hemisphere="right",e++):(g.hemisphere="left",k=!0));k=!1;for(y=0;y<l.length;y++)g=q[(d+y)%l.length],1<b&&(g.midAngle>3*Math.PI/2-t&&g.midAngle<3*Math.PI/2+t)&&(f<=b/2&&!k?(g.hemisphere="left",f++):(g.hemisphere="right",k=!0))}}function c(a){var b=p.plotArea.ctx;b.clearRect(m.x1,m.y1,m.width,m.height);b.fillStyle=p.backgroundColor;b.fillRect(m.x1,m.y1,m.width,m.height);for(b=0;b<
    l.length;b++){var c=q[b].startAngle,d=q[b].endAngle;if(d>c){var e=0.07*z*Math.cos(q[b].midAngle),f=0.07*z*Math.sin(q[b].midAngle),g=!1;if(l[b].exploded){if(1E-9<Math.abs(q[b].center.x-(x.x+e))||1E-9<Math.abs(q[b].center.y-(x.y+f)))q[b].center.x=x.x+e*a,q[b].center.y=x.y+f*a,g=!0}else if(0<Math.abs(q[b].center.x-x.x)||0<Math.abs(q[b].center.y-x.y))q[b].center.x=x.x+e*(1-a),q[b].center.y=x.y+f*(1-a),g=!0;g&&(e={},e.dataSeries=h,e.dataPoint=h.dataPoints[b],e.index=b,p._toolTip.highlightObjects([e]));
        ra(p.plotArea.ctx,q[b].center,q[b].radius,l[b].color?l[b].color:h._colorSet[b%h._colorSet.length],h.type,c,d,h.fillOpacity,q[b].percentInnerRadius)}}a=p.plotArea.ctx;a.fillStyle="black";a.strokeStyle="grey";a.textBaseline="middle";a.lineJoin="round";for(b=b=0;b<l.length;b++)c=q[b],c.indexLabelText&&(c.indexLabelTextBlock.y-=c.indexLabelTextBlock.height/2,d=0,d="left"===c.hemisphere?"inside"!==h.indexLabelPlacement?-(c.indexLabelTextBlock.width+n):-c.indexLabelTextBlock.width/2:"inside"!==h.indexLabelPlacement?
        n:-c.indexLabelTextBlock.width/2,c.indexLabelTextBlock.x+=d,c.indexLabelTextBlock.render(!0),c.indexLabelTextBlock.x-=d,c.indexLabelTextBlock.y+=c.indexLabelTextBlock.height/2,"inside"!==c.indexLabelPlacement&&(d=c.center.x+z*Math.cos(c.midAngle),e=c.center.y+z*Math.sin(c.midAngle),a.strokeStyle=c.indexLabelLineColor,a.lineWidth=c.indexLabelLineThickness,a.setLineDash&&a.setLineDash(M(c.indexLabelLineDashType,c.indexLabelLineThickness)),a.beginPath(),a.moveTo(d,e),a.lineTo(c.indexLabelTextBlock.x,
        c.indexLabelTextBlock.y),a.lineTo(c.indexLabelTextBlock.x+("left"===c.hemisphere?-n:n),c.indexLabelTextBlock.y),a.stroke()),a.lineJoin="miter")}function d(a,b){var c=0,c=a.indexLabelTextBlock.y-a.indexLabelTextBlock.height/2,d=a.indexLabelTextBlock.y+a.indexLabelTextBlock.height/2,e=b.indexLabelTextBlock.y-b.indexLabelTextBlock.height/2,f=b.indexLabelTextBlock.y+b.indexLabelTextBlock.height/2;return c=b.indexLabelTextBlock.y>a.indexLabelTextBlock.y?e-d:c-f}function e(a){for(var b=null,c=1;c<l.length;c++)if(b=
            (a+c+q.length)%q.length,q[b].hemisphere!==q[a].hemisphere){b=null;break}else if(q[b].indexLabelText&&b!==a&&(0>d(q[b],q[a])||("right"===q[a].hemisphere?q[b].indexLabelTextBlock.y>=q[a].indexLabelTextBlock.y:q[b].indexLabelTextBlock.y<=q[a].indexLabelTextBlock.y)))break;else b=null;return b}function f(a,b,c){c=(c||0)+1;if(1E3<c)return 0;b=b||0;var g=0,h=x.y-1*indexLabelRadius,k=x.y+1*indexLabelRadius;if(0<=a&&a<l.length){var m=q[a];if(0>b&&m.indexLabelTextBlock.y<h||0<b&&m.indexLabelTextBlock.y>k)return 0;
        var n=0,p=0,p=n=n=0;0>b?m.indexLabelTextBlock.y-m.indexLabelTextBlock.height/2>h&&m.indexLabelTextBlock.y-m.indexLabelTextBlock.height/2+b<h&&(b=-(h-(m.indexLabelTextBlock.y-m.indexLabelTextBlock.height/2+b))):m.indexLabelTextBlock.y+m.indexLabelTextBlock.height/2<h&&m.indexLabelTextBlock.y+m.indexLabelTextBlock.height/2+b>k&&(b=m.indexLabelTextBlock.y+m.indexLabelTextBlock.height/2+b-k);b=m.indexLabelTextBlock.y+b;h=0;h="right"===m.hemisphere?x.x+Math.sqrt(Math.pow(indexLabelRadius,2)-Math.pow(b-
                x.y,2)):x.x-Math.sqrt(Math.pow(indexLabelRadius,2)-Math.pow(b-x.y,2));p=x.x+z*Math.cos(m.midAngle);n=x.y+z*Math.sin(m.midAngle);n=Math.sqrt(Math.pow(h-p,2)+Math.pow(b-n,2));p=Math.acos(z/indexLabelRadius);n=Math.acos((indexLabelRadius*indexLabelRadius+z*z-n*n)/(2*z*indexLabelRadius));b=n<p?b-m.indexLabelTextBlock.y:0;h=null;for(k=1;k<l.length;k++)if(h=(a-k+q.length)%q.length,q[h].hemisphere!==q[a].hemisphere){h=null;break}else if(q[h].indexLabelText&&q[h].hemisphere===q[a].hemisphere&&h!==a&&(0>d(q[h],
                q[a])||("right"===q[a].hemisphere?q[h].indexLabelTextBlock.y<=q[a].indexLabelTextBlock.y:q[h].indexLabelTextBlock.y>=q[a].indexLabelTextBlock.y)))break;else h=null;p=h;n=e(a);k=h=0;0>b?(k="right"===m.hemisphere?p:n,g=b,null!==k&&(p=-b,b=m.indexLabelTextBlock.y-m.indexLabelTextBlock.height/2-(q[k].indexLabelTextBlock.y+q[k].indexLabelTextBlock.height/2),b-p<r&&(h=-p,k=f(k,h,c+1),+k.toFixed(v)>+h.toFixed(v)&&(g=b>r?-(b-r):-(p-(k-h)))))):0<b&&(k="right"===m.hemisphere?n:p,g=b,null!==k&&(p=b,b=q[k].indexLabelTextBlock.y-
            q[k].indexLabelTextBlock.height/2-(m.indexLabelTextBlock.y+m.indexLabelTextBlock.height/2),b-p<r&&(h=p,k=f(k,h,c+1),+k.toFixed(v)<+h.toFixed(v)&&(g=b>r?b-r:p-(h-k)))));g&&(c=m.indexLabelTextBlock.y+g,b=0,b="right"===m.hemisphere?x.x+Math.sqrt(Math.pow(indexLabelRadius,2)-Math.pow(c-x.y,2)):x.x-Math.sqrt(Math.pow(indexLabelRadius,2)-Math.pow(c-x.y,2)),m.midAngle>Math.PI/2-t&&m.midAngle<Math.PI/2+t?(h=(a-1+q.length)%q.length,h=q[h],a=q[(a+1+q.length)%q.length],"left"===m.hemisphere&&"right"===h.hemisphere&&
        b>h.indexLabelTextBlock.x?b=h.indexLabelTextBlock.x-15:"right"===m.hemisphere&&("left"===a.hemisphere&&b<a.indexLabelTextBlock.x)&&(b=a.indexLabelTextBlock.x+15)):m.midAngle>3*Math.PI/2-t&&m.midAngle<3*Math.PI/2+t&&(h=(a-1+q.length)%q.length,h=q[h],a=q[(a+1+q.length)%q.length],"right"===m.hemisphere&&"left"===h.hemisphere&&b<h.indexLabelTextBlock.x?b=h.indexLabelTextBlock.x+15:"left"===m.hemisphere&&("right"===a.hemisphere&&b>a.indexLabelTextBlock.x)&&(b=a.indexLabelTextBlock.x-15)),m.indexLabelTextBlock.y=
            c,m.indexLabelTextBlock.x=b,m.indexLabelAngle=Math.atan2(m.indexLabelTextBlock.y-x.y,m.indexLabelTextBlock.x-x.x))}return g}function g(){var a=p.plotArea.ctx;a.fillStyle="grey";a.strokeStyle="grey";a.font="16px Arial";a.textBaseline="middle";for(var b=a=0,c=0,g=!0,b=0;10>b&&(1>b||0<c);b++){if(h.radius||!h.radius&&"undefined"!==typeof h.innerRadius&&null!==h.innerRadius&&z-c<=A)g=!1;g&&(z-=c);c=0;if("inside"!==h.indexLabelPlacement){indexLabelRadius=z*s;for(a=0;a<l.length;a++){var k=q[a];k.indexLabelTextBlock.x=
        x.x+indexLabelRadius*Math.cos(k.midAngle);k.indexLabelTextBlock.y=x.y+indexLabelRadius*Math.sin(k.midAngle);k.indexLabelAngle=k.midAngle;k.radius=z;k.percentInnerRadius=D}for(var t,w,a=0;a<l.length;a++){var k=q[a],u=e(a);if(null!==u){t=q[a];w=q[u];var y=0,y=d(t,w)-r;if(0>y){for(var B=w=0,C=0;C<l.length;C++)C!==a&&q[C].hemisphere===k.hemisphere&&(q[C].indexLabelTextBlock.y<k.indexLabelTextBlock.y?w++:B++);w=y/(w+B||1)*B;var B=-1*(y-w),E=C=0;"right"===k.hemisphere?(C=f(a,w),B=-1*(y-C),E=f(u,B),+E.toFixed(v)<
    +B.toFixed(v)&&+C.toFixed(v)<=+w.toFixed(v)&&f(a,-(B-E))):(C=f(u,w),B=-1*(y-C),E=f(a,B),+E.toFixed(v)<+B.toFixed(v)&&+C.toFixed(v)<=+w.toFixed(v)&&f(u,-(B-E)))}}}}else for(a=0;a<l.length;a++)k=q[a],indexLabelRadius="pie"===h.type?0.7*z:0.8*z,u=x.x+indexLabelRadius*Math.cos(k.midAngle),w=x.y+indexLabelRadius*Math.sin(k.midAngle),k.indexLabelTextBlock.x=u,k.indexLabelTextBlock.y=w;for(a=0;a<l.length;a++)if(k=q[a],u=k.indexLabelTextBlock.measureText(),0!==u.height&&0!==u.width)u=u=0,"right"===k.hemisphere?
        (u=m.x2-(k.indexLabelTextBlock.x+k.indexLabelTextBlock.width+n),u*=-1):u=m.x1-(k.indexLabelTextBlock.x-k.indexLabelTextBlock.width-n),0<u&&(!g&&k.indexLabelText&&(w="right"===k.hemisphere?m.x2-k.indexLabelTextBlock.x:k.indexLabelTextBlock.x-m.x1,0.3*k.indexLabelTextBlock.maxWidth>w?k.indexLabelText="":k.indexLabelTextBlock.maxWidth=0.85*w,0.3*k.indexLabelTextBlock.maxWidth<w&&(k.indexLabelTextBlock.x-="right"===k.hemisphere?2:-2)),Math.abs(k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2-x.y)<
    z||Math.abs(k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/2-x.y)<z)&&(u/=Math.abs(Math.cos(k.indexLabelAngle)),9<u&&(u*=0.3),u>c&&(c=u)),u=u=0,0<k.indexLabelAngle&&k.indexLabelAngle<Math.PI?(u=m.y2-(k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/2+5),u*=-1):u=m.y1-(k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2-5),0<u&&(!g&&k.indexLabelText&&(w=0<k.indexLabelAngle&&k.indexLabelAngle<Math.PI?-1:1,0===f(a,u*w)&&f(a,2*w)),Math.abs(k.indexLabelTextBlock.x-x.x)<z&&(u/=Math.abs(Math.sin(k.indexLabelAngle)),
    9<u&&(u*=0.3),u>c&&(c=u)));var F=function(a,b,c){for(var d=[],e=0;d.push(q[b]),b!==c;b=(b+1+l.length)%l.length);d.sort(function(a,b){return a.y-b.y});for(b=0;b<d.length;b++)if(c=d[b],e<0.7*a)e+=c.indexLabelTextBlock.height,c.indexLabelTextBlock.text="",c.indexLabelText="",c.indexLabelTextBlock.measureText();else break};(function(){for(var a=-1,b=-1,c=0,f=!1,g=0;g<l.length;g++)if(f=!1,t=q[g],t.indexLabelText){var h=e(g);if(null!==h){var k=q[h];y=0;y=d(t,k);var m;if(m=0>y){m=t.indexLabelTextBlock.x;
        var p=t.indexLabelTextBlock.y-t.indexLabelTextBlock.height/2,r=t.indexLabelTextBlock.y+t.indexLabelTextBlock.height/2,s=k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2,w=k.indexLabelTextBlock.x+k.indexLabelTextBlock.width,v=k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/2;m=t.indexLabelTextBlock.x+t.indexLabelTextBlock.width<k.indexLabelTextBlock.x-n||m>w+n||p>v+n||r<s-n?!1:!0}m?(0>a&&(a=g),h!==a&&(b=h,c+=-y),0===g%Math.max(l.length/10,3)&&(f=!0)):f=!0;f&&(0<c&&0<=a&&0<=b)&&(F(c,a,b),
        b=a=-1,c=0)}}0<c&&F(c,a,b)})()}}function k(){p.plotArea.layoutManager.reset();p._title&&(p._title.dockInsidePlotArea||"center"===p._title.horizontalAlign&&"center"===p._title.verticalAlign)&&p._title.render();if(p.subtitles)for(var a=0;a<p.subtitles.length;a++){var b=p.subtitles[a];(b.dockInsidePlotArea||"center"===b.horizontalAlign&&"center"===b.verticalAlign)&&b.render()}p.legend&&(p.legend.dockInsidePlotArea||"center"===p.legend.horizontalAlign&&"center"===p.legend.verticalAlign)&&p.legend.render()}
        var p=this;if(!(0>=a.dataSeriesIndexes.length)){var h=this.data[a.dataSeriesIndexes[0]],l=h.dataPoints,n=10,m=this.plotArea,q=[],r=2,s=1.3,t=20/180*Math.PI,v=6,x={x:(m.x2+m.x1)/2,y:(m.y2+m.y1)/2},u=0;a=!1;for(var y=0;y<l.length;y++)u+=Math.abs(l[y].y),!a&&("undefined"!==typeof l[y].indexLabel&&null!==l[y].indexLabel&&0<l[y].indexLabel.toString().length)&&(a=!0),!a&&("undefined"!==typeof l[y].label&&null!==l[y].label&&0<l[y].label.toString().length)&&(a=!0);if(0!==u){a=a||"undefined"!==typeof h.indexLabel&&
            null!==h.indexLabel&&0<h.indexLabel.toString().length;var z="inside"!==h.indexLabelPlacement&&a?0.75*Math.min(m.width,m.height)/2:0.92*Math.min(m.width,m.height)/2;h.radius&&(z=ya(h.radius,z));var A="undefined"!==typeof h.innerRadius&&null!==h.innerRadius?ya(h.innerRadius,z):0.7*z,D=Math.min(A/z,(z-1)/z);this.pieDoughnutClickHandler=function(a){p.isAnimating||(a=a.dataPoint,a.exploded=a.exploded?!1:!0,1<this.dataPoints.length&&p._animator.animate(0,500,function(a){c(a);k()}))};b();g();g();g();g();
            this.disableToolTip=!0;this._animator.animate(0,this.animatedRender?this.animationDuration:0,function(a){var b=p.plotArea.ctx;b.clearRect(m.x1,m.y1,m.width,m.height);b.fillStyle=p.backgroundColor;b.fillRect(m.x1,m.y1,m.width,m.height);a=q[0].startAngle+2*Math.PI*a;for(b=0;b<l.length;b++){var c=0===b?q[b].startAngle:d,d=c+(q[b].endAngle-q[b].startAngle),e=!1;d>a&&(d=a,e=!0);var f=l[b].color?l[b].color:h._colorSet[b%h._colorSet.length];d>c&&ra(p.plotArea.ctx,q[b].center,q[b].radius,f,h.type,c,d,h.fillOpacity,
                q[b].percentInnerRadius);if(e)break}k()},function(){p.disableToolTip=!1;p._animator.animate(0,p.animatedRender?500:0,function(a){c(a);k()})})}}};u.prototype.animationRequestId=null;u.prototype.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();u.prototype.cancelRequestAnimFrame=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||
        window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout;Y.prototype.registerSpace=function(a,b){"top"===a?this._topOccupied+=b.height:"bottom"===a?this._bottomOccupied+=b.height:"left"===a?this._leftOccupied+=b.width:"right"===a&&(this._rightOccupied+=b.width)};Y.prototype.unRegisterSpace=function(a,b){"top"===a?this._topOccupied-=b.height:"bottom"===a?this._bottomOccupied-=b.height:"left"===a?this._leftOccupied-=b.width:"right"===
    a&&(this._rightOccupied-=b.width)};Y.prototype.getFreeSpace=function(){return{x1:this._x1+this._leftOccupied,y1:this._y1+this._topOccupied,x2:this._x2-this._rightOccupied,y2:this._y2-this._bottomOccupied,width:this._x2-this._x1-this._rightOccupied-this._leftOccupied,height:this._y2-this._y1-this._bottomOccupied-this._topOccupied}};Y.prototype.reset=function(){this._rightOccupied=this._leftOccupied=this._bottomOccupied=this._topOccupied=this._padding};O(H,G);H.prototype.render=function(a){a&&this.ctx.save();
        var b=this.ctx.font;this.ctx.textBaseline=this.textBaseline;var c=0;this._isDirty&&this.measureText(this.ctx);this.ctx.translate(this.x,this.y+c);"middle"===this.textBaseline&&(c=-this._lineHeight/2);this.ctx.font=this._getFontString();this.ctx.rotate(Math.PI/180*this.angle);var d=0,e=this.padding,f=null;(0<this.borderThickness&&this.borderColor||this.backgroundColor)&&this.ctx.roundRect(0,c,this.width,this.height,this.cornerRadius,this.borderThickness,this.backgroundColor,this.borderColor);this.ctx.fillStyle=
            this.fontColor;for(c=0;c<this._wrappedText.lines.length;c++)f=this._wrappedText.lines[c],"right"===this.horizontalAlign?d=this.width-f.width-this.padding:"left"===this.horizontalAlign?d=this.padding:"center"===this.horizontalAlign&&(d=(this.width-2*this.padding)/2-f.width/2+this.padding),this.ctx.fillText(f.text,d,e),e+=f.height;this.ctx.font=b;a&&this.ctx.restore()};H.prototype.setText=function(a){this.text=a;this._isDirty=!0;this._wrappedText=null};H.prototype.measureText=function(){if(null===this.maxWidth)throw"Please set maxWidth and height for TextBlock";
        this._wrapText(this.ctx);this._isDirty=!1;return{width:this.width,height:this.height}};H.prototype._getLineWithWidth=function(a,b,c){a=String(a);if(!a)return{text:"",width:0};var d=c=0,e=a.length-1,f=Infinity;for(this.ctx.font=this._getFontString();d<=e;){var f=Math.floor((d+e)/2),g=a.substr(0,f+1);c=this.ctx.measureText(g).width;if(c<b)d=f+1;else if(c>b)e=f-1;else break}c>b&&1<g.length&&(g=g.substr(0,g.length-1),c=this.ctx.measureText(g).width);b=!0;if(g.length===a.length||" "===a[g.length])b=!1;
        b&&(a=g.split(" "),1<a.length&&a.pop(),g=a.join(" "),c=this.ctx.measureText(g).width);return{text:g,width:c}};H.prototype._wrapText=function(){var a=new String(Z(String(this.text))),b=[],c=this.ctx.font,d=0,e=0;for(this.ctx.font=this._getFontString();0<a.length;){var f=this.maxHeight-2*this.padding,g=this._getLineWithWidth(a,this.maxWidth-2*this.padding,!1);g.height=this._lineHeight;b.push(g);e=Math.max(e,g.width);d+=g.height;a=Z(a.slice(g.text.length,a.length));f&&d>f&&(g=b.pop(),d-=g.height)}this._wrappedText=
    {lines:b,width:e,height:d};this.width=e+2*this.padding;this.height=d+2*this.padding;this.ctx.font=c};H.prototype._getFontString=function(){var a;a=""+(this.fontStyle?this.fontStyle+" ":"");a+=this.fontWeight?this.fontWeight+" ":"";a+=this.fontSize?this.fontSize+"px ":"";var b=this.fontFamily?this.fontFamily+"":"";!t&&b&&(b=b.split(",")[0],"'"!==b[0]&&'"'!==b[0]&&(b="'"+b+"'"));return a+=b};O(aa,G);aa.prototype.render=function(){if(this.text){var a=this.dockInsidePlotArea?this.chart.plotArea:this.chart,
        b=a.layoutManager.getFreeSpace(),c=b.x1,d=b.y1,e=0,f=0,g=this.chart._menuButton&&this.chart.exportEnabled&&"top"===this.verticalAlign?22:0,k,p;"top"===this.verticalAlign||"bottom"===this.verticalAlign?(null===this.maxWidth&&(this.maxWidth=b.width-4-g*("center"===this.horizontalAlign?2:1)),f=0.5*b.height-this.margin-2,e=0):"center"===this.verticalAlign&&("left"===this.horizontalAlign||"right"===this.horizontalAlign?(null===this.maxWidth&&(this.maxWidth=b.height-4),f=0.5*b.width-this.margin-2):"center"===
    this.horizontalAlign&&(null===this.maxWidth&&(this.maxWidth=b.width-4),f=0.5*b.height-4));this.wrap||(f=Math.min(f,Math.max(1.5*this.fontSize,this.fontSize+2.5*this.padding)));var f=new H(this.ctx,{fontSize:this.fontSize,fontFamily:this.fontFamily,fontColor:this.fontColor,fontStyle:this.fontStyle,fontWeight:this.fontWeight,horizontalAlign:this.horizontalAlign,verticalAlign:this.verticalAlign,borderColor:this.borderColor,borderThickness:this.borderThickness,backgroundColor:this.backgroundColor,maxWidth:this.maxWidth,
        maxHeight:f,cornerRadius:this.cornerRadius,text:this.text,padding:this.padding,textBaseline:"top"}),h=f.measureText();"top"===this.verticalAlign||"bottom"===this.verticalAlign?("top"===this.verticalAlign?(d=b.y1+2,p="top"):"bottom"===this.verticalAlign&&(d=b.y2-2-h.height,p="bottom"),"left"===this.horizontalAlign?c=b.x1+2:"center"===this.horizontalAlign?c=b.x1+b.width/2-h.width/2:"right"===this.horizontalAlign&&(c=b.x2-2-h.width-g),k=this.horizontalAlign,this.width=h.width,this.height=h.height):"center"===
    this.verticalAlign&&("left"===this.horizontalAlign?(c=b.x1+2,d=b.y2-2-(this.maxWidth/2-h.width/2),e=-90,p="left",this.width=h.height,this.height=h.width):"right"===this.horizontalAlign?(c=b.x2-2,d=b.y1+2+(this.maxWidth/2-h.width/2),e=90,p="right",this.width=h.height,this.height=h.width):"center"===this.horizontalAlign&&(d=a.y1+(a.height/2-h.height/2),c=a.x1+(a.width/2-h.width/2),p="center",this.width=h.width,this.height=h.height),k="center");f.x=c;f.y=d;f.angle=e;f.horizontalAlign=k;f.render(!0);
        a.layoutManager.registerSpace(p,{width:this.width+("left"===p||"right"===p?this.margin+2:0),height:this.height+("top"===p||"bottom"===p?this.margin+2:0)});this.bounds={x1:c,y1:d,x2:c+this.width,y2:d+this.height};this.ctx.textBaseline="top"}};O(ia,G);ia.prototype.render=aa.prototype.render;O(ja,G);ja.prototype.render=function(){var a=this.dockInsidePlotArea?this.chart.plotArea:this.chart,b=a.layoutManager.getFreeSpace(),c=null,d=0,e=0,f=0,g=0,k=[],p=[];"top"===this.verticalAlign||"bottom"===this.verticalAlign?
        (this.orientation="horizontal",c=this.verticalAlign,f=null!==this.maxWidth?this.maxWidth:0.7*b.width,g=null!==this.maxHeight?this.maxHeight:0.5*b.height):"center"===this.verticalAlign&&(this.orientation="vertical",c=this.horizontalAlign,f=null!==this.maxWidth?this.maxWidth:0.5*b.width,g=null!==this.maxHeight?this.maxHeight:0.7*b.height);for(var h=0;h<this.dataSeries.length;h++){var l=this.dataSeries[h];if("pie"!==l.type&&"doughnut"!==l.type&&"funnel"!==l.type){var n=l.legendMarkerType?l.legendMarkerType:
        "line"!==l.type&&"stepLine"!==l.type&&"spline"!==l.type&&"scatter"!==l.type&&"bubble"!==l.type||!l.markerType?S.getDefaultLegendMarker(l.type):l.markerType,m=l.legendText?l.legendText:this.itemTextFormatter?this.itemTextFormatter({chart:this.chart,legend:this._options,dataSeries:l,dataPoint:null}):l.name,q=l.legendMarkerColor?l.legendMarkerColor:l.markerColor?l.markerColor:l._colorSet[0],r=l.markerSize||"line"!==l.type&&"stepLine"!==l.type&&"spline"!==l.type?0.6*this.lineHeight:0,s=l.legendMarkerBorderColor?
        l.legendMarkerBorderColor:l.markerBorderColor,t=l.legendMarkerBorderThickness?l.legendMarkerBorderThickness:l.markerBorderThickness?Math.max(1,Math.round(0.2*r)):0,m=this.chart.replaceKeywordsWithValue(m,l.dataPoints[0],l,h),n={markerType:n,markerColor:q,text:m,textBlock:null,chartType:l.type,markerSize:r,lineColor:l._colorSet[0],dataSeriesIndex:l.index,dataPointIndex:null,markerBorderColor:s,markerBorderThickness:t};k.push(n)}else for(var v=0;v<l.dataPoints.length;v++){var u=l.dataPoints[v],n=u.legendMarkerType?
        u.legendMarkerType:l.legendMarkerType?l.legendMarkerType:S.getDefaultLegendMarker(l.type),m=u.legendText?u.legendText:l.legendText?l.legendText:this.itemTextFormatter?this.itemTextFormatter({chart:this.chart,legend:this._options,dataSeries:l,dataPoint:u}):u.name?u.name:"DataPoint: "+(v+1),q=u.legendMarkerColor?u.legendMarkerColor:l.legendMarkerColor?l.legendMarkerColor:u.color?u.color:l.color?l.color:l._colorSet[v%l._colorSet.length],r=0.6*this.lineHeight,s=u.legendMarkerBorderColor?u.legendMarkerBorderColor:
        l.legendMarkerBorderColor?l.legendMarkerBorderColor:u.markerBorderColor?u.markerBorderColor:l.markerBorderColor,t=u.legendMarkerBorderThickness?u.legendMarkerBorderThickness:l.legendMarkerBorderThickness?l.legendMarkerBorderThickness:u.markerBorderThickness||l.markerBorderThickness?Math.max(1,Math.round(0.2*r)):0,m=this.chart.replaceKeywordsWithValue(m,u,l,v),n={markerType:n,markerColor:q,text:m,textBlock:null,chartType:l.type,markerSize:r,dataSeriesIndex:h,dataPointIndex:v,markerBorderColor:s,markerBorderThickness:t};
        (u.showInLegend||l.showInLegend&&!1!==u.showInLegend)&&k.push(n)}}!0===this.reversed&&k.reverse();if(0<k.length){l=null;v=m=u=0;m=null!==this.itemWidth?null!==this.itemMaxWidth?Math.min(this.itemWidth,this.itemMaxWidth,f):Math.min(this.itemWidth,f):null!==this.itemMaxWidth?Math.min(this.itemMaxWidth,f):f;r=0===r?0.6*this.lineHeight:r;m-=r+0.1*this.horizontalSpacing;for(h=0;h<k.length;h++){n=k[h];if("line"===n.chartType||"spline"===n.chartType||"stepLine"===n.chartType)m-=2*0.1*this.lineHeight;if(!(0>=
        g||"undefined"===typeof g||0>=m||"undefined"===typeof m)){if("horizontal"===this.orientation){n.textBlock=new H(this.ctx,{x:0,y:0,maxWidth:m,maxHeight:this.itemWrap?g:this.lineHeight,angle:0,text:n.text,horizontalAlign:"left",fontSize:this.fontSize,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontColor:this.fontColor,fontStyle:this.fontStyle,textBaseline:"top"});n.textBlock.measureText();null!==this.itemWidth&&(n.textBlock.width=this.itemWidth-(r+0.1*this.horizontalSpacing+("line"===n.chartType||
        "spline"===n.chartType||"stepLine"===n.chartType?2*0.1*this.lineHeight:0)));if(!l||l.width+Math.round(n.textBlock.width+0.1*this.horizontalSpacing+r+(0===l.width?0:this.horizontalSpacing)+("line"===n.chartType||"spline"===n.chartType||"stepLine"===n.chartType?2*0.1*this.lineHeight:0))>f)l={items:[],width:0},p.push(l),this.height+=v,v=0;v=Math.max(v,n.textBlock.height)}else n.textBlock=new H(this.ctx,{x:0,y:0,maxWidth:m,maxHeight:!0===this.itemWrap?g:1.5*this.fontSize,angle:0,text:n.text,horizontalAlign:"left",
        fontSize:this.fontSize,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontColor:this.fontColor,fontStyle:this.fontStyle,textBaseline:"top"}),n.textBlock.measureText(),null!==this.itemWidth&&(n.textBlock.width=this.itemWidth-(r+0.1*this.horizontalSpacing+("line"===n.chartType||"spline"===n.chartType||"stepLine"===n.chartType?2*0.1*this.lineHeight:0))),this.height<=g?(l={items:[],width:0},p.push(l)):(l=p[u],u=(u+1)%p.length),this.height+=n.textBlock.height;n.textBlock.x=l.width;n.textBlock.y=
        0;l.width+=Math.round(n.textBlock.width+0.1*this.horizontalSpacing+r+(0===l.width?0:this.horizontalSpacing)+("line"===n.chartType||"spline"===n.chartType||"stepLine"===n.chartType?2*0.1*this.lineHeight:0));l.items.push(n);this.width=Math.max(l.width,this.width)}}this.height=!1===this.itemWrap?p.length*this.lineHeight:this.height+v;this.height=Math.min(g,this.height);this.width=Math.min(f,this.width)}"top"===this.verticalAlign?(e="left"===this.horizontalAlign?b.x1:"right"===this.horizontalAlign?b.x2-
    this.width:b.x1+b.width/2-this.width/2,d=b.y1):"center"===this.verticalAlign?(e="left"===this.horizontalAlign?b.x1:"right"===this.horizontalAlign?b.x2-this.width:b.x1+b.width/2-this.width/2,d=b.y1+b.height/2-this.height/2):"bottom"===this.verticalAlign&&(e="left"===this.horizontalAlign?b.x1:"right"===this.horizontalAlign?b.x2-this.width:b.x1+b.width/2-this.width/2,d=b.y2-this.height);this.items=k;for(h=0;h<this.items.length;h++)n=k[h],n.id=++this.chart._eventManager.lastObjectId,this.chart._eventManager.objectMap[n.id]=
    {id:n.id,objectType:"legendItem",legendItemIndex:h,dataSeriesIndex:n.dataSeriesIndex,dataPointIndex:n.dataPointIndex};for(h=b=0;h<p.length;h++){l=p[h];for(k=v=0;k<l.items.length;k++){n=l.items[k];m=n.textBlock.x+e+(0===k?0.2*r:this.horizontalSpacing);q=d+b;u=m;this.chart.data[n.dataSeriesIndex].visible||(this.ctx.globalAlpha=0.5);this.ctx.save();this.ctx.rect(e,d,f,g);this.ctx.clip();if("line"===n.chartType||"stepLine"===n.chartType||"spline"===n.chartType)this.ctx.strokeStyle=n.lineColor,this.ctx.lineWidth=
        Math.ceil(this.lineHeight/8),this.ctx.beginPath(),this.ctx.moveTo(m-0.1*this.lineHeight,q+this.lineHeight/2),this.ctx.lineTo(m+0.7*this.lineHeight,q+this.lineHeight/2),this.ctx.stroke(),u-=0.1*this.lineHeight;K.drawMarker(m+r/2,q+this.lineHeight/2,this.ctx,n.markerType,n.markerSize,n.markerColor,n.markerBorderColor,n.markerBorderThickness);n.textBlock.x=m+0.1*this.horizontalSpacing+r;if("line"===n.chartType||"stepLine"===n.chartType||"spline"===n.chartType)n.textBlock.x+=0.1*this.lineHeight;n.textBlock.y=
        q;n.textBlock.render(!0);this.ctx.restore();v=0<k?Math.max(v,n.textBlock.height):n.textBlock.height;this.chart.data[n.dataSeriesIndex].visible||(this.ctx.globalAlpha=1);m=B(n.id);this.ghostCtx.fillStyle=m;this.ghostCtx.beginPath();this.ghostCtx.fillRect(u,n.textBlock.y,n.textBlock.x+n.textBlock.width-u,n.textBlock.height);n.x1=this.chart._eventManager.objectMap[n.id].x1=u;n.y1=this.chart._eventManager.objectMap[n.id].y1=n.textBlock.y;n.x2=this.chart._eventManager.objectMap[n.id].x2=n.textBlock.x+
        n.textBlock.width;n.y2=this.chart._eventManager.objectMap[n.id].y2=n.textBlock.y+n.textBlock.height}b+=v}a.layoutManager.registerSpace(c,{width:this.width+2+2,height:this.height+5+5});this.bounds={x1:e,y1:d,x2:e+this.width,y2:d+this.height}};O(oa,G);oa.prototype.render=function(){var a=this.chart.layoutManager.getFreeSpace();this.ctx.fillStyle="red";this.ctx.fillRect(a.x1,a.y1,a.x2,a.y2)};O(S,G);S.prototype.getDefaultAxisPlacement=function(){var a=this.type;if("column"===a||"line"===a||"stepLine"===
        a||"spline"===a||"area"===a||"stepArea"===a||"splineArea"===a||"stackedColumn"===a||"stackedLine"===a||"bubble"===a||"scatter"===a||"stackedArea"===a||"stackedColumn100"===a||"stackedLine100"===a||"stackedArea100"===a||"candlestick"===a||"ohlc"===a||"rangeColumn"===a||"rangeArea"===a||"rangeSplineArea"===a)return"normal";if("bar"===a||"stackedBar"===a||"stackedBar100"===a||"rangeBar"===a)return"xySwapped";if("pie"===a||"doughnut"===a||"funnel"===a)return"none";window.console.log("Unknown Chart Type: "+
        a);return null};S.getDefaultLegendMarker=function(a){if("column"===a||"stackedColumn"===a||"stackedLine"===a||"bar"===a||"stackedBar"===a||"stackedBar100"===a||"bubble"===a||"scatter"===a||"stackedColumn100"===a||"stackedLine100"===a||"stepArea"===a||"candlestick"===a||"ohlc"===a||"rangeColumn"===a||"rangeBar"===a||"rangeArea"===a||"rangeSplineArea"===a)return"square";if("line"===a||"stepLine"===a||"spline"===a||"pie"===a||"doughnut"===a||"funnel"===a)return"circle";if("area"===a||"splineArea"===
        a||"stackedArea"===a||"stackedArea100"===a)return"triangle";window.console.log("Unknown Chart Type: "+a);return null};S.prototype.getDataPointAtX=function(a,b){if(!this.dataPoints||0===this.dataPoints.length)return null;var c={dataPoint:null,distance:Infinity,index:NaN},d=null,e=0,f=0,g=1,k=Infinity,p=0,h=0,l=0;"none"!==this.chart.plotInfo.axisPlacement&&(l=this.dataPoints[this.dataPoints.length-1].x-this.dataPoints[0].x,l=0<l?Math.min(Math.max((this.dataPoints.length-1)/l*(a-this.dataPoints[0].x)>>
        0,0),this.dataPoints.length):0);for(;;){f=0<g?l+e:l-e;if(0<=f&&f<this.dataPoints.length){var d=this.dataPoints[f],n=Math.abs(d.x-a);n<c.distance&&(c.dataPoint=d,c.distance=n,c.index=f);d=Math.abs(d.x-a);d<=k?k=d:0<g?p++:h++;if(1E3<p&&1E3<h)break}else if(0>l-e&&l+e>=this.dataPoints.length)break;-1===g?(e++,g=1):g=-1}return b||c.dataPoint.x!==a?b&&null!==c.dataPoint?c:null:c};S.prototype.getDataPointAtXY=function(a,b,c){if(!this.dataPoints||0===this.dataPoints.length)return null;c=c||!1;var d=[],e=
        0,f=0,g=1,k=!1,p=Infinity,h=0,l=0,n=0;"none"!==this.chart.plotInfo.axisPlacement&&(n=this.chart.axisX.getXValueAt({x:a,y:b}),f=this.dataPoints[this.dataPoints.length-1].x-this.dataPoints[0].x,n=0<f?Math.min(Math.max((this.dataPoints.length-1)/f*(n-this.dataPoints[0].x)>>0,0),this.dataPoints.length):0);for(;;){f=0<g?n+e:n-e;if(0<=f&&f<this.dataPoints.length){var m=this.chart._eventManager.objectMap[this.dataPointIds[f]],q=this.dataPoints[f],r=null;if(m){switch(this.type){case "column":case "stackedColumn":case "stackedColumn100":case "bar":case "stackedBar":case "stackedBar100":case "rangeColumn":case "rangeBar":a>=
    m.x1&&(a<=m.x2&&b>=m.y1&&b<=m.y2)&&(d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:Math.min(Math.abs(m.x1-a),Math.abs(m.x2-a),Math.abs(m.y1-b),Math.abs(m.y2-b))}),k=!0);break;case "line":case "stepLine":case "spline":case "area":case "stepArea":case "stackedArea":case "stackedArea100":case "splineArea":case "scatter":var s=N("markerSize",q,this)||4,t=c?20:s,r=Math.sqrt(Math.pow(m.x1-a,2)+Math.pow(m.y1-b,2));r<=t&&d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:r});f=Math.abs(m.x1-
        a);f<=p?p=f:0<g?h++:l++;r<=s/2&&(k=!0);break;case "rangeArea":case "rangeSplineArea":s=N("markerSize",q,this)||4;t=c?20:s;r=Math.min(Math.sqrt(Math.pow(m.x1-a,2)+Math.pow(m.y1-b,2)),Math.sqrt(Math.pow(m.x1-a,2)+Math.pow(m.y2-b,2)));r<=t&&d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:r});f=Math.abs(m.x1-a);f<=p?p=f:0<g?h++:l++;r<=s/2&&(k=!0);break;case "bubble":s=m.size;r=Math.sqrt(Math.pow(m.x1-a,2)+Math.pow(m.y1-b,2));r<=s/2&&(d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,
        distance:r}),k=!0);break;case "pie":case "doughnut":s=m.center;t="doughnut"===this.type?m.percentInnerRadius*m.radius:0;r=Math.sqrt(Math.pow(s.x-a,2)+Math.pow(s.y-b,2));r<m.radius&&r>t&&(r=Math.atan2(b-s.y,a-s.x),0>r&&(r+=2*Math.PI),r=Number(((180*(r/Math.PI)%360+360)%360).toFixed(12)),s=Number(((180*(m.startAngle/Math.PI)%360+360)%360).toFixed(12)),t=Number(((180*(m.endAngle/Math.PI)%360+360)%360).toFixed(12)),0===t&&1<m.endAngle&&(t=360),s>=t&&0!==q.y&&(t+=360,r<s&&(r+=360)),r>s&&r<t&&(d.push({dataPoint:q,
        dataPointIndex:f,dataSeries:this,distance:0}),k=!0));break;case "candlestick":if(a>=m.x1-m.borderThickness/2&&a<=m.x2+m.borderThickness/2&&b>=m.y2-m.borderThickness/2&&b<=m.y3+m.borderThickness/2||Math.abs(m.x2-a+m.x1-a)<m.borderThickness&&b>=m.y1&&b<=m.y4)d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:Math.min(Math.abs(m.x1-a),Math.abs(m.x2-a),Math.abs(m.y2-b),Math.abs(m.y3-b))}),k=!0;break;case "ohlc":if(Math.abs(m.x2-a+m.x1-a)<m.borderThickness&&b>=m.y2&&b<=m.y3||a>=m.x1&&a<=(m.x2+
        m.x1)/2&&b>=m.y1-m.borderThickness/2&&b<=m.y1+m.borderThickness/2||a>=(m.x1+m.x2)/2&&a<=m.x2&&b>=m.y4-m.borderThickness/2&&b<=m.y4+m.borderThickness/2)d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:Math.min(Math.abs(m.x1-a),Math.abs(m.x2-a),Math.abs(m.y2-b),Math.abs(m.y3-b))}),k=!0}if(k||1E3<h&&1E3<l)break}}else if(0>n-e&&n+e>=this.dataPoints.length)break;-1===g?(e++,g=1):g=-1}a=null;for(b=0;b<d.length;b++)a?d[b].distance<=a.distance&&(a=d[b]):a=d[b];return a};S.prototype.getMarkerProperties=
        function(a,b,c,d){var e=this.dataPoints;return{x:b,y:c,ctx:d,type:e[a].markerType?e[a].markerType:this.markerType,size:e[a].markerSize?e[a].markerSize:this.markerSize,color:e[a].markerColor?e[a].markerColor:this.markerColor?this.markerColor:e[a].color?e[a].color:this.color?this.color:this._colorSet[a%this._colorSet.length],borderColor:e[a].markerBorderColor?e[a].markerBorderColor:this.markerBorderColor?this.markerBorderColor:null,borderThickness:e[a].markerBorderThickness?e[a].markerBorderThickness:
            this.markerBorderThickness?this.markerBorderThickness:null}};O(C,G);C.prototype.createLabels=function(){var a,b=0,c,d=0,e=0,b=0;if("bottom"===this._position||"top"===this._position)b=this.lineCoordinates.width/Math.abs(this.viewportMaximum-this.viewportMinimum)*this.interval,d=this.labelAutoFit?"undefined"===typeof this._options.labelMaxWidth?0.9*b>>0:this.labelMaxWidth:"undefined"===typeof this._options.labelMaxWidth?0.7*this.chart.width>>0:this.labelMaxWidth,e="undefined"===typeof this._options.labelWrap||
    this.labelWrap?0.5*this.chart.height>>0:1.5*this.labelFontSize;else if("left"===this._position||"right"===this._position)b=this.lineCoordinates.height/Math.abs(this.viewportMaximum-this.viewportMinimum)*this.interval,d=this.labelAutoFit?"undefined"===typeof this._options.labelMaxWidth?0.3*this.chart.width>>0:this.labelMaxWidth:"undefined"===typeof this._options.labelMaxWidth?0.5*this.chart.width>>0:this.labelMaxWidth,e="undefined"===typeof this._options.labelWrap||this.labelWrap?2*b>>0:1.5*this.labelFontSize;
        if("axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType)for(c=sa(new Date(this.viewportMaximum),this.interval,this.intervalType),b=this.intervalStartPosition;b<c;sa(b,this.interval,this.intervalType))a=b.getTime(),a=this.labelFormatter?this.labelFormatter({chart:this.chart,axis:this._options,value:b,label:this.labels[b]?this.labels[b]:null}):"axisX"===this.type&&this.labels[a]?this.labels[a]:qa(b,this.valueFormatString,this.chart._cultureInfo),a=new H(this.ctx,{x:0,y:0,maxWidth:d,
            maxHeight:e,angle:this.labelAngle,text:this.prefix+a+this.suffix,horizontalAlign:"left",fontSize:this.labelFontSize,fontFamily:this.labelFontFamily,fontWeight:this.labelFontWeight,fontColor:this.labelFontColor,fontStyle:this.labelFontStyle,textBaseline:"middle"}),this._labels.push({position:b.getTime(),textBlock:a,effectiveHeight:null});else{c=this.viewportMaximum;if(this.labels&&this.labels.length){a=Math.ceil(this.interval);for(var f=Math.ceil(this.intervalStartPosition),g=!1,b=f;b<this.viewportMaximum;b+=
            a)if(this.labels[b])g=!0;else{g=!1;break}g&&(this.interval=a,this.intervalStartPosition=f)}for(b=this.intervalStartPosition;b<=c;b=parseFloat((b+this.interval).toFixed(14)))a=this.labelFormatter?this.labelFormatter({chart:this.chart,axis:this._options,value:b,label:this.labels[b]?this.labels[b]:null}):"axisX"===this.type&&this.labels[b]?this.labels[b]:W(b,this.valueFormatString,this.chart._cultureInfo),a=new H(this.ctx,{x:0,y:0,maxWidth:d,maxHeight:e,angle:this.labelAngle,text:this.prefix+a+this.suffix,
            horizontalAlign:"left",fontSize:this.labelFontSize,fontFamily:this.labelFontFamily,fontWeight:this.labelFontWeight,fontColor:this.labelFontColor,fontStyle:this.labelFontStyle,textBaseline:"middle",borderThickness:0}),this._labels.push({position:b,textBlock:a,effectiveHeight:null})}for(b=0;b<this.stripLines.length;b++)c=this.stripLines[b],a=new H(this.ctx,{x:0,y:0,backgroundColor:c.labelBackgroundColor,maxWidth:d,maxHeight:e,angle:this.labelAngle,text:c.labelFormatter?c.labelFormatter({chart:this.chart,
            axis:this,stripLine:c}):c.label,horizontalAlign:"left",fontSize:c.labelFontSize,fontFamily:c.labelFontFamily,fontWeight:c.labelFontWeight,fontColor:c._options.labelFontColor||c.color,fontStyle:c.labelFontStyle,textBaseline:"middle",borderThickness:0}),this._labels.push({position:c.value,textBlock:a,effectiveHeight:null,stripLine:c})};C.prototype.createLabelsAndCalculateWidth=function(){var a=0;this._labels=[];if("left"===this._position||"right"===this._position)for(this.createLabels(),i=0;i<this._labels.length;i++){var b=
        this._labels[i].textBlock.measureText(),c=0,c=0===this.labelAngle?b.width:b.width*Math.cos(Math.PI/180*Math.abs(this.labelAngle))+b.height/2*Math.sin(Math.PI/180*Math.abs(this.labelAngle));a<c&&(a=c);this._labels[i].effectiveWidth=c}return(this.title?da(this.titleFontFamily,this.titleFontSize,this.titleFontWeight)+2:0)+a+this.tickLength+5};C.prototype.createLabelsAndCalculateHeight=function(){var a=0;this._labels=[];var b,c=0;this.createLabels();if("bottom"===this._position||"top"===this._position)for(c=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       0;c<this._labels.length;c++){b=this._labels[c].textBlock;b=b.measureText();var d=0,d=0===this.labelAngle?b.height:b.width*Math.sin(Math.PI/180*Math.abs(this.labelAngle))+b.height/2*Math.cos(Math.PI/180*Math.abs(this.labelAngle));a<d&&(a=d);this._labels[c].effectiveHeight=d}return(this.title?da(this.titleFontFamily,this.titleFontSize,this.titleFontWeight)+2:0)+a+this.tickLength+5};C.setLayoutAndRender=function(a,b,c,d,e){var f,g,k,p=a.chart,h=p.ctx;a.calculateAxisParameters();b&&b.calculateAxisParameters();
        c&&c.calculateAxisParameters();var l=b?b.margin:0;if("normal"===d){a.lineCoordinates={};var n=Math.ceil(b?b.createLabelsAndCalculateWidth():0);f=Math.round(e.x1+n+l);a.lineCoordinates.x1=f;l=Math.ceil(c?c.createLabelsAndCalculateWidth():0);g=Math.round(e.x2-l>a.chart.width-10?a.chart.width-10:e.x2-l);a.lineCoordinates.x2=g;a.lineCoordinates.width=Math.abs(g-f);var m=Math.ceil(a.createLabelsAndCalculateHeight());d=Math.round(e.y2-m-a.margin);k=Math.round(e.y2-a.margin);a.lineCoordinates.y1=d;a.lineCoordinates.y2=
            d;a.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:k-d};b&&(f=Math.round(e.x1+b.margin),d=Math.round(10>e.y1?10:e.y1),g=Math.round(e.x1+n+b.margin),k=Math.round(e.y2-m-a.margin),b.lineCoordinates={x1:g,y1:d,x2:g,y2:k,height:Math.abs(k-d)},b.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:k-d});c&&(f=Math.round(a.lineCoordinates.x2),d=Math.round(10>e.y1?10:e.y1),g=Math.round(f+l+c.margin),k=Math.round(e.y2-m-a.margin),c.lineCoordinates={x1:f,y1:d,x2:f,y2:k,height:Math.abs(k-d)},c.boundingRect=
        {x1:f,y1:d,x2:g,y2:k,width:g-f,height:k-d});a.calculateValueToPixelConversionParameters();b&&b.calculateValueToPixelConversionParameters();c&&c.calculateValueToPixelConversionParameters();h.save();h.rect(5,a.boundingRect.y1,a.chart.width-10,a.boundingRect.height);h.clip();a.renderLabelsTicksAndTitle();h.restore();b&&b.renderLabelsTicksAndTitle();c&&c.renderLabelsTicksAndTitle()}else{n=Math.ceil(a.createLabelsAndCalculateWidth());b&&(b.lineCoordinates={},f=Math.round(e.x1+n+a.margin),g=Math.round(e.x2>
        b.chart.width-10?b.chart.width-10:e.x2),b.lineCoordinates.x1=f,b.lineCoordinates.x2=g,b.lineCoordinates.width=Math.abs(g-f));c&&(c.lineCoordinates={},f=Math.round(e.x1+n+a.margin),g=Math.round(e.x2>c.chart.width-10?c.chart.width-10:e.x2),c.lineCoordinates.x1=f,c.lineCoordinates.x2=g,c.lineCoordinates.width=Math.abs(g-f));var m=Math.ceil(b?b.createLabelsAndCalculateHeight():0),q=Math.ceil(c?c.createLabelsAndCalculateHeight():0);b&&(d=Math.round(e.y2-m-b.margin),k=Math.round(e.y2-l>b.chart.height-10?
        b.chart.height-10:e.y2-l),b.lineCoordinates.y1=d,b.lineCoordinates.y2=d,b.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:m});c&&(d=Math.round(e.y1+c.margin),k=e.y1+c.margin+q,c.lineCoordinates.y1=k,c.lineCoordinates.y2=k,c.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:q});f=Math.round(e.x1+a.margin);d=Math.round(c?c.lineCoordinates.y2:10>e.y1?10:e.y1);g=Math.round(e.x1+n+a.margin);k=Math.round(b?b.lineCoordinates.y1:e.y2-l>a.chart.height-10?a.chart.height-10:e.y2-l);a.lineCoordinates={x1:g,
            y1:d,x2:g,y2:k,height:Math.abs(k-d)};a.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:k-d};a.calculateValueToPixelConversionParameters();b&&b.calculateValueToPixelConversionParameters();c&&c.calculateValueToPixelConversionParameters();b&&b.renderLabelsTicksAndTitle();c&&c.renderLabelsTicksAndTitle();a.renderLabelsTicksAndTitle()}p.preparePlotArea();e=a.chart.plotArea;h.save();h.rect(e.x1,e.y1,Math.abs(e.x2-e.x1),Math.abs(e.y2-e.y1));h.clip();a.renderStripLinesOfThicknessType("value");b&&b.renderStripLinesOfThicknessType("value");
        c&&c.renderStripLinesOfThicknessType("value");a.renderInterlacedColors();b&&b.renderInterlacedColors();c&&c.renderInterlacedColors();h.restore();a.renderGrid();b&&b.renderGrid();c&&c.renderGrid();a.renderAxisLine();b&&b.renderAxisLine();c&&c.renderAxisLine();a.renderStripLinesOfThicknessType("pixel");b&&b.renderStripLinesOfThicknessType("pixel");c&&c.renderStripLinesOfThicknessType("pixel")};C.prototype.renderLabelsTicksAndTitle=function(){var a=!1,b=0,c=1,d=0;0!==this.labelAngle&&360!==this.labelAngle&&
    (c=1.2);if("undefined"===typeof this._options.interval){if("bottom"===this._position||"top"===this._position){for(e=0;e<this._labels.length;e++)f=this._labels[e],f.position<this.viewportMinimum||f.stripLine||(f=f.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)+f.textBlock.height*Math.sin(Math.PI/180*this.labelAngle),b+=f);b>this.lineCoordinates.width*c&&(a=!0)}if("left"===this._position||"right"===this._position){for(e=0;e<this._labels.length;e++)f=this._labels[e],f.position<this.viewportMinimum||
    f.stripLine||(f=f.textBlock.height*Math.cos(Math.PI/180*this.labelAngle)+f.textBlock.width*Math.sin(Math.PI/180*this.labelAngle),b+=f);b>this.lineCoordinates.height*c&&(a=!0)}}if("bottom"===this._position){for(var e=0,f,e=0;e<this._labels.length;e++)if(f=this._labels[e],!(f.position<this.viewportMinimum||f.position>this.viewportMaximum)){b=this.getPixelCoordinatesOnAxis(f.position);if(this.tickThickness&&!this._labels[e].stripLine||this._labels[e].stripLine&&"pixel"===this._labels[e].stripLine._thicknessType)this._labels[e].stripLine?
        (c=this._labels[e].stripLine,this.ctx.lineWidth=c.thickness,this.ctx.strokeStyle=c.color):(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor),c=1===this.ctx.lineWidth%2?(b.x<<0)+0.5:b.x<<0,this.ctx.beginPath(),this.ctx.moveTo(c,b.y<<0),this.ctx.lineTo(c,b.y+this.tickLength<<0),this.ctx.stroke();if(!a||0===d++%2||this._labels[e].stripLine)0===f.textBlock.angle?(b.x-=f.textBlock.width/2,b.y+=this.tickLength+f.textBlock.fontSize/2):(b.x-=0>this.labelAngle?f.textBlock.width*Math.cos(Math.PI/
        180*this.labelAngle):0,b.y+=this.tickLength+Math.abs(0>this.labelAngle?f.textBlock.width*Math.sin(Math.PI/180*this.labelAngle)-5:5)),f.textBlock.x=b.x,f.textBlock.y=b.y,f.textBlock.render(!0)}this.title&&(this._titleTextBlock=new H(this.ctx,{x:this.lineCoordinates.x1,y:this.boundingRect.y2-this.titleFontSize-5,maxWidth:this.lineCoordinates.width,maxHeight:1.5*this.titleFontSize,angle:0,text:this.title,horizontalAlign:"center",fontSize:this.titleFontSize,fontFamily:this.titleFontFamily,fontWeight:this.titleFontWeight,
        fontColor:this.titleFontColor,fontStyle:this.titleFontStyle,textBaseline:"top"}),this._titleTextBlock.measureText(),this._titleTextBlock.x=this.lineCoordinates.x1+this.lineCoordinates.width/2-this._titleTextBlock.width/2,this._titleTextBlock.y=this.boundingRect.y2-this._titleTextBlock.height-3,this._titleTextBlock.render(!0))}else if("top"===this._position){for(e=0;e<this._labels.length;e++)if(f=this._labels[e],!(f.position<this.viewportMinimum||f.position>this.viewportMaximum)){b=this.getPixelCoordinatesOnAxis(f.position);
        if(this.tickThickness&&!this._labels[e].stripLine||this._labels[e].stripLine&&"pixel"===this._labels[e].stripLine._thicknessType)this._labels[e].stripLine?(c=this._labels[e].stripLine,this.ctx.lineWidth=c.thickness,this.ctx.strokeStyle=c.color):(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor),c=1===this.ctx.lineWidth%2?(b.x<<0)+0.5:b.x<<0,this.ctx.beginPath(),this.ctx.moveTo(c,b.y<<0),this.ctx.lineTo(c,b.y-this.tickLength<<0),this.ctx.stroke();if(!a||0===d++%2||this._labels[e].stripLine)0===
        f.textBlock.angle?(b.x-=f.textBlock.width/2,b.y-=this.tickLength+f.textBlock.height/2):(b.x-=0<this.labelAngle?f.textBlock.width*Math.cos(Math.PI/180*this.labelAngle):0,b.y-=this.tickLength+Math.abs(0<this.labelAngle?f.textBlock.width*Math.sin(Math.PI/180*this.labelAngle)+5:5)),f.textBlock.x=b.x,f.textBlock.y=b.y,f.textBlock.render(!0)}this.title&&(this._titleTextBlock=new H(this.ctx,{x:this.lineCoordinates.x1,y:this.boundingRect.y1+1,maxWidth:this.lineCoordinates.width,maxHeight:1.5*this.titleFontSize,
        angle:0,text:this.title,horizontalAlign:"center",fontSize:this.titleFontSize,fontFamily:this.titleFontFamily,fontWeight:this.titleFontWeight,fontColor:this.titleFontColor,fontStyle:this.titleFontStyle,textBaseline:"top"}),this._titleTextBlock.measureText(),this._titleTextBlock.x=this.lineCoordinates.x1+this.lineCoordinates.width/2-this._titleTextBlock.width/2,this._titleTextBlock.render(!0))}else if("left"===this._position){for(e=0;e<this._labels.length;e++)if(f=this._labels[e],!(f.position<this.viewportMinimum||
        f.position>this.viewportMaximum)){b=this.getPixelCoordinatesOnAxis(f.position);if(this.tickThickness&&!this._labels[e].stripLine||this._labels[e].stripLine&&"pixel"===this._labels[e].stripLine._thicknessType)this._labels[e].stripLine?(c=this._labels[e].stripLine,this.ctx.lineWidth=c.thickness,this.ctx.strokeStyle=c.color):(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor),c=1===this.ctx.lineWidth%2?(b.y<<0)+0.5:b.y<<0,this.ctx.beginPath(),this.ctx.moveTo(b.x<<0,c),this.ctx.lineTo(b.x-
        this.tickLength<<0,c),this.ctx.stroke();if(!a||0===d++%2||this._labels[e].stripLine)f.textBlock.x=b.x-f.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)-this.tickLength-5,f.textBlock.y=0===this.labelAngle?b.y:b.y-f.textBlock.width*Math.sin(Math.PI/180*this.labelAngle),f.textBlock.render(!0)}this.title&&(this._titleTextBlock=new H(this.ctx,{x:this.boundingRect.x1+1,y:this.lineCoordinates.y2,maxWidth:this.lineCoordinates.height,maxHeight:1.5*this.titleFontSize,angle:-90,text:this.title,horizontalAlign:"center",
        fontSize:this.titleFontSize,fontFamily:this.titleFontFamily,fontWeight:this.titleFontWeight,fontColor:this.titleFontColor,fontStyle:this.titleFontStyle,textBaseline:"top"}),this._titleTextBlock.measureText(),this._titleTextBlock.y=this.lineCoordinates.height/2+this._titleTextBlock.width/2+this.lineCoordinates.y1,this._titleTextBlock.render(!0))}else if("right"===this._position){for(e=0;e<this._labels.length;e++)if(f=this._labels[e],!(f.position<this.viewportMinimum||f.position>this.viewportMaximum)){b=
        this.getPixelCoordinatesOnAxis(f.position);if(this.tickThickness&&!this._labels[e].stripLine||this._labels[e].stripLine&&"pixel"===this._labels[e].stripLine._thicknessType)this._labels[e].stripLine?(c=this._labels[e].stripLine,this.ctx.lineWidth=c.thickness,this.ctx.strokeStyle=c.color):(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor),c=1===this.ctx.lineWidth%2?(b.y<<0)+0.5:b.y<<0,this.ctx.beginPath(),this.ctx.moveTo(b.x<<0,c),this.ctx.lineTo(b.x+this.tickLength<<0,c),this.ctx.stroke();
        if(!a||0===d++%2||this._labels[e].stripLine)f.textBlock.x=b.x+this.tickLength+5,f.textBlock.y=b.y,f.textBlock.render(!0)}this.title&&(this._titleTextBlock=new H(this.ctx,{x:this.boundingRect.x2-1,y:this.lineCoordinates.y2,maxWidth:this.lineCoordinates.height,maxHeight:1.5*this.titleFontSize,angle:90,text:this.title,horizontalAlign:"center",fontSize:this.titleFontSize,fontFamily:this.titleFontFamily,fontWeight:this.titleFontWeight,fontColor:this.titleFontColor,fontStyle:this.titleFontStyle,textBaseline:"top"}),
        this._titleTextBlock.measureText(),this._titleTextBlock.y=this.lineCoordinates.height/2-this._titleTextBlock.width/2+this.lineCoordinates.y1,this._titleTextBlock.render(!0))}};C.prototype.renderInterlacedColors=function(){var a=this.chart.plotArea.ctx,b,c,d=this.chart.plotArea,e=0;b=!0;if(("bottom"===this._position||"top"===this._position)&&this.interlacedColor)for(a.fillStyle=this.interlacedColor,e=0;e<this._labels.length;e++)this._labels[e].stripLine||(b?(b=this.getPixelCoordinatesOnAxis(this._labels[e].position),
        c=e+1>=this._labels.length-1?this.getPixelCoordinatesOnAxis(this.viewportMaximum):this.getPixelCoordinatesOnAxis(this._labels[e+1].position),a.fillRect(b.x,d.y1,Math.abs(c.x-b.x),Math.abs(d.y1-d.y2)),b=!1):b=!0);else if(("left"===this._position||"right"===this._position)&&this.interlacedColor)for(a.fillStyle=this.interlacedColor,e=0;e<this._labels.length;e++)this._labels[e].stripLine||(b?(c=this.getPixelCoordinatesOnAxis(this._labels[e].position),b=e+1>=this._labels.length-1?this.getPixelCoordinatesOnAxis(this.viewportMaximum):
        this.getPixelCoordinatesOnAxis(this._labels[e+1].position),a.fillRect(d.x1,b.y,Math.abs(d.x1-d.x2),Math.abs(b.y-c.y)),b=!1):b=!0);a.beginPath()};C.prototype.renderStripLinesOfThicknessType=function(a){if(this.stripLines&&0<this.stripLines.length&&a)for(var b=0,b=0;b<this.stripLines.length;b++){var c=this.stripLines[b];c._thicknessType===a&&("pixel"===a&&(c.value<this.viewportMinimum||c.value>this.viewportMaximum)||(c.showOnTop?this.chart.addEventListener("dataAnimationIterationEnd",c.render,c):c.render()))}};
    C.prototype.renderGrid=function(){if(this.gridThickness&&0<this.gridThickness){var a=this.chart.ctx,b,c=this.chart.plotArea;a.lineWidth=this.gridThickness;a.strokeStyle=this.gridColor;a.setLineDash&&a.setLineDash(M(this.gridDashType,this.gridThickness));if("bottom"===this._position||"top"===this._position)for(d=0;d<this._labels.length&&!this._labels[d].stripLine;d++)this._labels[d].position<this.viewportMinimum||this._labels[d].position>this.viewportMaximum||(a.beginPath(),b=this.getPixelCoordinatesOnAxis(this._labels[d].position),
        b=1===a.lineWidth%2?(b.x<<0)+0.5:b.x<<0,a.moveTo(b,c.y1<<0),a.lineTo(b,c.y2<<0),a.stroke());else if("left"===this._position||"right"===this._position)for(var d=0;d<this._labels.length&&!this._labels[d].stripLine;d++)0===d&&"axisY"===this.type&&this.chart.axisX&&this.chart.axisX.lineThickness||(this._labels[d].position<this.viewportMinimum||this._labels[d].position>this.viewportMaximum)||(a.beginPath(),b=this.getPixelCoordinatesOnAxis(this._labels[d].position),b=1===a.lineWidth%2?(b.y<<0)+0.5:b.y<<
    0,a.moveTo(c.x1<<0,b),a.lineTo(c.x2<<0,b),a.stroke())}};C.prototype.renderAxisLine=function(){var a=this.chart.ctx;if("bottom"===this._position||"top"===this._position){if(this.lineThickness){a.lineWidth=this.lineThickness;a.strokeStyle=this.lineColor?this.lineColor:"black";a.setLineDash&&a.setLineDash(M(this.lineDashType,this.lineThickness));var b=1===this.lineThickness%2?(this.lineCoordinates.y1<<0)+0.5:this.lineCoordinates.y1<<0;a.beginPath();a.moveTo(this.lineCoordinates.x1,b);a.lineTo(this.lineCoordinates.x2,
        b);a.stroke()}}else"left"!==this._position&&"right"!==this._position||!this.lineThickness||(a.lineWidth=this.lineThickness,a.strokeStyle=this.lineColor,a.setLineDash&&a.setLineDash(M(this.lineDashType,this.lineThickness)),b=1===this.lineThickness%2?(this.lineCoordinates.x1<<0)+0.5:this.lineCoordinates.x1<<0,a.beginPath(),a.moveTo(b,this.lineCoordinates.y1),a.lineTo(b,this.lineCoordinates.y2),a.stroke())};C.prototype.getPixelCoordinatesOnAxis=function(a){var b={};if("bottom"===this._position||"top"===
        this._position){var c=this.conversionParameters.pixelPerUnit;b.x=this.conversionParameters.reference+c*(a-this.viewportMinimum);b.y=this.lineCoordinates.y1}if("left"===this._position||"right"===this._position)c=-this.conversionParameters.pixelPerUnit,b.y=this.conversionParameters.reference-c*(a-this.viewportMinimum),b.x=this.lineCoordinates.x2;return b};C.prototype.convertPixelToValue=function(a){if(!a)return null;var b=0;return b=this.conversionParameters.minimum+(("left"===this._position||"right"===
        this._position?a.y:a.x)-this.conversionParameters.reference)/this.conversionParameters.pixelPerUnit};C.prototype.setViewPortRange=function(a,b){this.sessionVariables.newViewportMinimum=this.viewportMinimum=Math.min(a,b);this.sessionVariables.newViewportMaximum=this.viewportMaximum=Math.max(a,b)};C.prototype.getXValueAt=function(a){if(!a)return null;var b=null;"left"===this._position?b=(this.chart.axisX.viewportMaximum-this.chart.axisX.viewportMinimum)/this.chart.axisX.lineCoordinates.height*(this.chart.axisX.lineCoordinates.y2-
        a.y)+this.chart.axisX.viewportMinimum:"bottom"===this._position&&(b=(this.chart.axisX.viewportMaximum-this.chart.axisX.viewportMinimum)/this.chart.axisX.lineCoordinates.width*(a.x-this.chart.axisX.lineCoordinates.x1)+this.chart.axisX.viewportMinimum);return b};C.prototype.calculateValueToPixelConversionParameters=function(a){this.reversed=!1;a={pixelPerUnit:null,minimum:null,reference:null};var b=this.lineCoordinates.width,c=this.lineCoordinates.height;a.minimum=this.viewportMinimum;if("bottom"===
        this._position||"top"===this._position)a.pixelPerUnit=(this.reversed?-1:1)*b/Math.abs(this.viewportMaximum-this.viewportMinimum),a.reference=this.reversed?this.lineCoordinates.x2:this.lineCoordinates.x1;if("left"===this._position||"right"===this._position)a.pixelPerUnit=(this.reversed?1:-1)*c/Math.abs(this.viewportMaximum-this.viewportMinimum),a.reference=this.reversed?this.lineCoordinates.y1:this.lineCoordinates.y2;this.conversionParameters=a};C.prototype.calculateAxisParameters=function(){var a=
        this.chart.layoutManager.getFreeSpace(),b=!1;"bottom"===this._position||"top"===this._position?(this.maxWidth=a.width,this.maxHeight=a.height):(this.maxWidth=a.height,this.maxHeight=a.width);var a="axisX"===this.type?500>this.maxWidth?8:Math.max(6,Math.floor(this.maxWidth/62)):Math.max(Math.floor(this.maxWidth/40),2),c,d,e,f;f=0;if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum=this.minimum;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum=
        this.maximum;"axisX"===this.type?(c=null!==this.viewportMinimum?this.viewportMinimum:this.dataInfo.viewPortMin,d=null!==this.viewportMaximum?this.viewportMaximum:this.dataInfo.viewPortMax,0===d-c&&(f="undefined"===typeof this._options.interval?0.4:this._options.interval,d+=f,c-=f),Infinity!==this.dataInfo.minDiff?e=this.dataInfo.minDiff:1<d-c?e=0.5*Math.abs(d-c):(e=1,"dateTime"===this.chart.plotInfo.axisXValueType&&(b=!0))):"axisY"===this.type&&(c=null!==this.viewportMinimum?this.viewportMinimum:
        this.dataInfo.viewPortMin,d=null!==this.viewportMaximum?this.viewportMaximum:this.dataInfo.viewPortMax,isFinite(c)||isFinite(d)?isFinite(c)?isFinite(d)||(d=c):c=d:(d="undefined"===typeof this._options.interval?-Infinity:this._options.interval,c=0),0===c&&0===d?(d+=9,c=0):0===d-c?(f=Math.min(Math.abs(0.01*Math.abs(d)),5),d+=f,c-=f):c>d?(f=Math.min(Math.abs(0.01*Math.abs(d-c)),5),0<=d?c=d-f:d=c+f):(f=Math.min(Math.abs(0.01*Math.abs(d-c)),0.05),0!==d&&(d+=f),0!==c&&(c-=f)),e=Infinity!==this.dataInfo.minDiff?
        this.dataInfo.minDiff:1<d-c?0.5*Math.abs(d-c):1,this.includeZero&&(null===this.viewportMinimum||isNaN(this.viewportMinimum))&&0<c&&(c=0),this.includeZero&&(null===this.viewportMaximum||isNaN(this.viewportMaximum))&&0>d&&(d=0));f=(isNaN(this.viewportMaximum)||null===this.viewportMaximum?d:this.viewportMaximum)-(isNaN(this.viewportMinimum)||null===this.viewportMinimum?c:this.viewportMinimum);if("axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType){this.intervalType||(f/1<=a?(this.interval=
        1,this.intervalType="millisecond"):f/2<=a?(this.interval=2,this.intervalType="millisecond"):f/5<=a?(this.interval=5,this.intervalType="millisecond"):f/10<=a?(this.interval=10,this.intervalType="millisecond"):f/20<=a?(this.interval=20,this.intervalType="millisecond"):f/50<=a?(this.interval=50,this.intervalType="millisecond"):f/100<=a?(this.interval=100,this.intervalType="millisecond"):f/200<=a?(this.interval=200,this.intervalType="millisecond"):f/250<=a?(this.interval=250,this.intervalType="millisecond"):
        f/300<=a?(this.interval=300,this.intervalType="millisecond"):f/400<=a?(this.interval=400,this.intervalType="millisecond"):f/500<=a?(this.interval=500,this.intervalType="millisecond"):f/(1*D.secondDuration)<=a?(this.interval=1,this.intervalType="second"):f/(2*D.secondDuration)<=a?(this.interval=2,this.intervalType="second"):f/(5*D.secondDuration)<=a?(this.interval=5,this.intervalType="second"):f/(10*D.secondDuration)<=a?(this.interval=10,this.intervalType="second"):f/(15*D.secondDuration)<=a?(this.interval=
            15,this.intervalType="second"):f/(20*D.secondDuration)<=a?(this.interval=20,this.intervalType="second"):f/(30*D.secondDuration)<=a?(this.interval=30,this.intervalType="second"):f/(1*D.minuteDuration)<=a?(this.interval=1,this.intervalType="minute"):f/(2*D.minuteDuration)<=a?(this.interval=2,this.intervalType="minute"):f/(5*D.minuteDuration)<=a?(this.interval=5,this.intervalType="minute"):f/(10*D.minuteDuration)<=a?(this.interval=10,this.intervalType="minute"):f/(15*D.minuteDuration)<=a?(this.interval=
            15,this.intervalType="minute"):f/(20*D.minuteDuration)<=a?(this.interval=20,this.intervalType="minute"):f/(30*D.minuteDuration)<=a?(this.interval=30,this.intervalType="minute"):f/(1*D.hourDuration)<=a?(this.interval=1,this.intervalType="hour"):f/(2*D.hourDuration)<=a?(this.interval=2,this.intervalType="hour"):f/(3*D.hourDuration)<=a?(this.interval=3,this.intervalType="hour"):f/(6*D.hourDuration)<=a?(this.interval=6,this.intervalType="hour"):f/(1*D.dayDuration)<=a?(this.interval=1,this.intervalType=
            "day"):f/(2*D.dayDuration)<=a?(this.interval=2,this.intervalType="day"):f/(4*D.dayDuration)<=a?(this.interval=4,this.intervalType="day"):f/(1*D.weekDuration)<=a?(this.interval=1,this.intervalType="week"):f/(2*D.weekDuration)<=a?(this.interval=2,this.intervalType="week"):f/(3*D.weekDuration)<=a?(this.interval=3,this.intervalType="week"):f/(1*D.monthDuration)<=a?(this.interval=1,this.intervalType="month"):f/(2*D.monthDuration)<=a?(this.interval=2,this.intervalType="month"):f/(3*D.monthDuration)<=a?
            (this.interval=3,this.intervalType="month"):f/(6*D.monthDuration)<=a?(this.interval=6,this.intervalType="month"):(this.interval=f/(1*D.yearDuration)<=a?1:f/(2*D.yearDuration)<=a?2:f/(4*D.yearDuration)<=a?4:Math.floor(C.getNiceNumber(f/(a-1),!0)/D.yearDuration),this.intervalType="year"));if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum=c-e/2;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum=d+e/2;this.valueFormatString||(b?this.valueFormatString=
        "MMM DD YYYY HH:mm":"year"===this.intervalType?this.valueFormatString="YYYY":"month"===this.intervalType?this.valueFormatString="MMM YYYY":"week"===this.intervalType?this.valueFormatString="MMM DD YYYY":"day"===this.intervalType?this.valueFormatString="MMM DD YYYY":"hour"===this.intervalType?this.valueFormatString="hh:mm TT":"minute"===this.intervalType?this.valueFormatString="hh:mm TT":"second"===this.intervalType?this.valueFormatString="hh:mm:ss TT":"millisecond"===this.intervalType&&(this.valueFormatString=
        "fff'ms'"))}else{this.intervalType="number";f=C.getNiceNumber(f,!1);this.interval=this._options&&this._options.interval?this._options.interval:C.getNiceNumber(f/(a-1),!0);if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum="axisX"===this.type?c-e/2:Math.floor(c/this.interval)*this.interval;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum="axisX"===this.type?d+e/2:Math.ceil(d/this.interval)*this.interval;0===this.viewportMaximum&&0===this.viewportMinimum&&
    (0===this._options.viewportMinimum?this.viewportMaximum+=10:0===this._options.viewportMaximum&&(this.viewportMinimum-=10),this._options&&"undefined"===typeof this._options.interval&&(this.interval=C.getNiceNumber((this.viewportMaximum-this.viewportMinimum)/(a-1),!0)))}if(null===this.minimum||null===this.maximum)if("axisX"===this.type?(c=null!==this.minimum?this.minimum:this.dataInfo.min,d=null!==this.maximum?this.maximum:this.dataInfo.max,0===d-c&&(f="undefined"===typeof this._options.interval?0.4:
            this._options.interval,d+=f,c-=f),e=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:1<d-c?0.5*Math.abs(d-c):1):"axisY"===this.type&&(c=null!==this.minimum?this.minimum:this.dataInfo.min,d=null!==this.maximum?this.maximum:this.dataInfo.max,isFinite(c)||isFinite(d)?0===c&&0===d?(d+=9,c=0):0===d-c?(f=Math.min(Math.abs(0.01*Math.abs(d)),5),d+=f,c-=f):c>d?(f=Math.min(Math.abs(0.01*Math.abs(d-c)),5),0<=d?c=d-f:d=c+f):(f=Math.min(Math.abs(0.01*Math.abs(d-c)),0.05),0!==d&&(d+=f),0!==c&&(c-=f)):(d=
            "undefined"===typeof this._options.interval?-Infinity:this._options.interval,c=0),e=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:1<d-c?0.5*Math.abs(d-c):1,this.includeZero&&(null===this.minimum||isNaN(this.minimum))&&0<c&&(c=0),this.includeZero&&(null===this.maximum||isNaN(this.maximum))&&0>d&&(d=0)),"axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType){if(null===this.minimum||isNaN(this.minimum))this.minimum=c-e/2;if(null===this.maximum||isNaN(this.maximum))this.maximum=
        d+e/2}else this.intervalType="number",null===this.minimum&&(this.minimum="axisX"===this.type?c-e/2:Math.floor(c/this.interval)*this.interval,this.minimum=Math.min(this.minimum,null===this.sessionVariables.viewportMinimum||isNaN(this.sessionVariables.viewportMinimum)?Infinity:this.sessionVariables.viewportMinimum)),null===this.maximum&&(this.maximum="axisX"===this.type?d+e/2:Math.ceil(d/this.interval)*this.interval,this.maximum=Math.max(this.maximum,null===this.sessionVariables.viewportMaximum||isNaN(this.sessionVariables.viewportMaximum)?
        -Infinity:this.sessionVariables.viewportMaximum)),0===this.maximum&&0===this.minimum&&(0===this._options.minimum?this.maximum+=10:0===this._options.maximum&&(this.minimum-=10));this.viewportMinimum=Math.max(this.viewportMinimum,this.minimum);this.viewportMaximum=Math.min(this.viewportMaximum,this.maximum);this.intervalStartPosition="axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType?this.getLabelStartPoint(new Date(this.viewportMinimum),this.intervalType,this.interval):Math.floor((this.viewportMinimum+
        0.2*this.interval)/this.interval)*this.interval;if(!this.valueFormatString&&(this.valueFormatString="#,##0.##",f=Math.abs(this.viewportMaximum-this.viewportMinimum),1>f)){b=Math.floor(Math.abs(Math.log(f)/Math.LN10))+2;if(isNaN(b)||!isFinite(b))b=2;if(2<b)for(c=0;c<b-2;c++)this.valueFormatString+="#"}};C.getNiceNumber=function(a,b){var c=Math.floor(Math.log(a)/Math.LN10),d=a/Math.pow(10,c);return Number(((b?1.5>d?1:3>d?2:7>d?5:10:1>=d?1:2>=d?2:5>=d?5:10)*Math.pow(10,c)).toFixed(20))};C.prototype.getLabelStartPoint=
        function(){var a=D[this.intervalType+"Duration"]*this.interval,a=new Date(Math.floor(this.viewportMinimum/a)*a);if("millisecond"!==this.intervalType)if("second"===this.intervalType)0<a.getMilliseconds()&&(a.setSeconds(a.getSeconds()+1),a.setMilliseconds(0));else if("minute"===this.intervalType){if(0<a.getSeconds()||0<a.getMilliseconds())a.setMinutes(a.getMinutes()+1),a.setSeconds(0),a.setMilliseconds(0)}else if("hour"===this.intervalType){if(0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setHours(a.getHours()+
            1),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("day"===this.intervalType){if(0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setDate(a.getDate()+1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("week"===this.intervalType){if(0<a.getDay()||0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setDate(a.getDate()+(7-a.getDay())),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("month"===
            this.intervalType){if(1<a.getDate()||0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setMonth(a.getMonth()+1),a.setDate(1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else"year"===this.intervalType&&(0<a.getMonth()||1<a.getDate()||0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())&&(a.setFullYear(a.getFullYear()+1),a.setMonth(0),a.setDate(1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0));return a};O(ka,
        G);ka.prototype.render=function(){var a=this.parent.getPixelCoordinatesOnAxis(this.value),b=Math.abs("pixel"===this._thicknessType?this.thickness:this.parent.conversionParameters.pixelPerUnit*this.thickness);if(0<b){var c=null===this.opacity?1:this.opacity;this.ctx.strokeStyle=this.color;this.ctx.beginPath();var d=this.ctx.globalAlpha;this.ctx.globalAlpha=c;B(this.id);var e,f,g,k;this.ctx.lineWidth=b;this.ctx.setLineDash&&this.ctx.setLineDash(M(this.lineDashType,b));if("bottom"===this.parent._position||
        "top"===this.parent._position)e=f=1===this.ctx.lineWidth%2?(a.x<<0)+0.5:a.x<<0,g=this.chart.plotArea.y1,k=this.chart.plotArea.y2;else if("left"===this.parent._position||"right"===this.parent._position)g=k=1===this.ctx.lineWidth%2?(a.y<<0)+0.5:a.y<<0,e=this.chart.plotArea.x1,f=this.chart.plotArea.x2;this.ctx.moveTo(e,g);this.ctx.lineTo(f,k);this.ctx.stroke();this.ctx.globalAlpha=d}};O(Q,G);Q.prototype._initialize=function(){if(this.enabled){this.container=document.createElement("div");this.container.setAttribute("class",
        "canvasjs-chart-tooltip");this.container.style.position="absolute";this.container.style.height="auto";this.container.style.boxShadow="1px 1px 2px 2px rgba(0,0,0,0.1)";this.container.style.zIndex="1000";this.container.style.display="none";var a;a='<div style=" width: auto;height: auto;min-width: 50px;';a+="line-height: auto;";a+="margin: 0px 0px 0px 0px;";a+="padding: 5px;";a+="font-family: Calibri, Arial, Georgia, serif;";a+="font-weight: normal;";a+="font-style: "+(t?"italic;":"normal;");a+="font-size: 14px;";
        a+="color: #000000;";a+="text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";a+="text-align: left;";a+="border: 2px solid gray;";a+=t?"background: rgba(255,255,255,.9);":"background: rgb(255,255,255);";a+="text-indent: 0px;";a+="white-space: nowrap;";a+="border-radius: 5px;";a+="-moz-user-select:none;";a+="-khtml-user-select: none;";a+="-webkit-user-select: none;";a+="-ms-user-select: none;";a+="user-select: none;";t||(a+="filter: alpha(opacity = 90);",a+="filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');");
        a+='} "> Sample Tooltip</div>';this.container.innerHTML=a;this.contentDiv=this.container.firstChild;this.container.style.borderRadius=this.contentDiv.style.borderRadius;this.chart._canvasJSContainer.appendChild(this.container)}};Q.prototype.mouseMoveHandler=function(a,b){this._lastUpdated&&40>(new Date).getTime()-this._lastUpdated||(this._lastUpdated=(new Date).getTime(),this._updateToolTip(a,b))};Q.prototype._updateToolTip=function(a,b){if(!this.chart.disableToolTip){if("undefined"===typeof a||"undefined"===
        typeof b){if(isNaN(this._prevX)||isNaN(this._prevY))return;a=this._prevX;b=this._prevY}else this._prevX=a,this._prevY=b;var c=null,d=null,e=[],f=0;if(this.shared&&this.enabled&&"none"!==this.chart.plotInfo.axisPlacement){f="xySwapped"===this.chart.plotInfo.axisPlacement?(this.chart.axisX.viewportMaximum-this.chart.axisX.viewportMinimum)/this.chart.axisX.lineCoordinates.height*(this.chart.axisX.lineCoordinates.y2-b)+this.chart.axisX.viewportMinimum:(this.chart.axisX.viewportMaximum-this.chart.axisX.viewportMinimum)/
    this.chart.axisX.lineCoordinates.width*(a-this.chart.axisX.lineCoordinates.x1)+this.chart.axisX.viewportMinimum;d=[];for(c=0;c<this.chart.data.length;c++){var g=this.chart.data[c].getDataPointAtX(f,!0);g&&0<=g.index&&(g.dataSeries=this.chart.data[c],null!==g.dataPoint.y&&d.push(g))}if(0===d.length)return;d.sort(function(a,b){return a.distance-b.distance});f=d[0];for(c=0;c<d.length;c++)d[c].dataPoint.x.valueOf()===f.dataPoint.x.valueOf()&&e.push(d[c]);d=null}else{if(g=this.chart.getDataPointAtXY(a,
            b,!0))this.currentDataPointIndex=g.dataPointIndex,this.currentSeriesIndex=g.dataSeries.index;else if(t)if(g=va(a,b,this.chart._eventManager.ghostCtx),0<g&&"undefined"!==typeof this.chart._eventManager.objectMap[g]){eventObject=this.chart._eventManager.objectMap[g];if("legendItem"===eventObject.objectType)return;this.currentSeriesIndex=eventObject.dataSeriesIndex;this.currentDataPointIndex=0<=eventObject.dataPointIndex?eventObject.dataPointIndex:-1}else this.currentDataPointIndex=-1;else this.currentDataPointIndex=
        -1;if(0<=this.currentSeriesIndex){d=this.chart.data[this.currentSeriesIndex];g={};if(0<=this.currentDataPointIndex)c=d.dataPoints[this.currentDataPointIndex],g.dataSeries=d,g.dataPoint=c,g.index=this.currentDataPointIndex,g.distance=Math.abs(c.x-f);else{if(!this.enabled||"line"!==d.type&&"stepLine"!==d.type&&"spline"!==d.type&&"area"!==d.type&&"stepArea"!==d.type&&"splineArea"!==d.type&&"stackedArea"!==d.type&&"stackedArea100"!==d.type&&"rangeArea"!==d.type&&"rangeSplineArea"!==d.type&&"candlestick"!==
        d.type&&"ohlc"!==d.type)return;f=d.axisX.conversionParameters.minimum+(a-d.axisX.conversionParameters.reference)/d.axisX.conversionParameters.pixelPerUnit;g=d.getDataPointAtX(f,!0);g.dataSeries=d;this.currentDataPointIndex=g.index;c=g.dataPoint}if(null!==g.dataPoint.y&&"undefined"!==typeof g.dataPoint.y)if(g.dataSeries.axisY)if(0<g.dataPoint.y.length){for(c=f=0;c<g.dataPoint.y.length;c++)g.dataPoint.y[c]<g.dataSeries.axisY.viewportMinimum?f--:g.dataPoint.y[c]>g.dataSeries.axisY.viewportMaximum&&f++;
        f<g.dataPoint.y.length&&f>-g.dataPoint.y.length&&e.push(g)}else(0<=g.dataSeries.type.indexOf("100")||g.dataPoint.y>=g.dataSeries.axisY.viewportMinimum&&g.dataPoint.y<=g.dataSeries.axisY.viewportMaximum)&&e.push(g);else e.push(g)}}if(0<e.length&&(this.highlightObjects(e),this.enabled))if(f="",f=this.getToolTipInnerHTML({entries:e}),null!==f){this.contentDiv.innerHTML=f;this.contentDiv.innerHTML=f;f=!1;"none"===this.container.style.display&&(f=!0,this.container.style.display="block");try{this.contentDiv.style.background=
        this.backgroundColor?this.backgroundColor:t?"rgba(255,255,255,.9)":"rgb(255,255,255)",this.contentDiv.style.borderRightColor=this.contentDiv.style.borderLeftColor=this.contentDiv.style.borderColor=this.borderColor?this.borderColor:e[0].dataPoint.color?e[0].dataPoint.color:e[0].dataSeries.color?e[0].dataSeries.color:e[0].dataSeries._colorSet[e[0].index%e[0].dataSeries._colorSet.length],this.contentDiv.style.borderWidth=this.borderThickness||0===this.borderThickness?this.borderThickness+"px":"2px",
        this.contentDiv.style.borderRadius=this.cornerRadius||0===this.cornerRadius?this.cornerRadius+"px":"5px",this.container.style.borderRadius=this.contentDiv.style.borderRadius,this.contentDiv.style.fontSize=this.fontSize||0===this.fontSize?this.fontSize+"px":"14px",this.contentDiv.style.color=this.fontColor?this.fontColor:"#000000",this.contentDiv.style.fontFamily=this.fontFamily?this.fontFamily:"Calibri, Arial, Georgia, serif;",this.contentDiv.style.fontWeight=this.fontWeight?this.fontWeight:"normal",
        this.contentDiv.style.fontStyle=this.fontStyle?this.fontStyle:t?"italic":"normal"}catch(k){}"pie"===e[0].dataSeries.type||"doughnut"===e[0].dataSeries.type||"funnel"===e[0].dataSeries.type||"bar"===e[0].dataSeries.type||"rangeBar"===e[0].dataSeries.type||"stackedBar"===e[0].dataSeries.type||"stackedBar100"===e[0].dataSeries.type?toolTipLeft=a-10-this.container.clientWidth:(toolTipLeft=e[0].dataSeries.axisX.conversionParameters.reference+e[0].dataSeries.axisX.conversionParameters.pixelPerUnit*(e[0].dataPoint.x-
        e[0].dataSeries.axisX.conversionParameters.minimum)-this.container.clientWidth<<0,toolTipLeft-=10);0>toolTipLeft&&(toolTipLeft+=this.container.clientWidth+20);toolTipLeft+this.container.clientWidth>this.chart._container.clientWidth&&(toolTipLeft=Math.max(0,this.chart._container.clientWidth-this.container.clientWidth));toolTipLeft+="px";e=1!==e.length||this.shared||"line"!==e[0].dataSeries.type&&"stepLine"!==e[0].dataSeries.type&&"spline"!==e[0].dataSeries.type&&"area"!==e[0].dataSeries.type&&"stepArea"!==
    e[0].dataSeries.type&&"splineArea"!==e[0].dataSeries.type&&"stackedArea"!==e[0].dataSeries.type&&"stackedArea100"!==e[0].dataSeries.type?"bar"===e[0].dataSeries.type||"rangeBar"===e[0].dataSeries.type||"stackedBar"===e[0].dataSeries.type||"stackedBar100"===e[0].dataSeries.type?e[0].dataSeries.axisX.conversionParameters.reference+e[0].dataSeries.axisX.conversionParameters.pixelPerUnit*(e[0].dataPoint.x-e[0].dataSeries.axisX.viewportMinimum)+0.5<<0:b:e[0].dataSeries.axisY.conversionParameters.reference+
    e[0].dataSeries.axisY.conversionParameters.pixelPerUnit*(e[0].dataPoint.y-e[0].dataSeries.axisY.viewportMinimum)+0.5<<0;e=-e+10;0<e+this.container.clientHeight+5&&(e-=e+this.container.clientHeight+5-0);this.container.style.left=toolTipLeft;this.container.style.bottom=e+"px";!this.animationEnabled||f?this.disableAnimation():this.enableAnimation()}else this.hide(!1)}};Q.prototype.highlightObjects=function(a){var b=this.chart.overlaidCanvasCtx;this.chart.resetOverlayedCanvas();b.clearRect(0,0,this.chart.width,
        this.chart.height);b.save();var c=this.chart.plotArea,d=0;b.rect(c.x1,c.y1,c.x2-c.x1,c.y2-c.y1);b.clip();for(c=0;c<a.length;c++){var e=a[c];if((e=this.chart._eventManager.objectMap[e.dataSeries.dataPointIds[e.index]])&&e.objectType&&"dataPoint"===e.objectType){var d=this.chart.data[e.dataSeriesIndex],f=d.dataPoints[e.dataPointIndex],g=e.dataPointIndex;!1===f.highlightEnabled||!0!==d.highlightEnabled&&!0!==f.highlightEnabled||("line"===d.type||"stepLine"===d.type||"spline"===d.type||"scatter"===d.type||
    "area"===d.type||"stepArea"===d.type||"splineArea"===d.type||"stackedArea"===d.type||"stackedArea100"===d.type||"rangeArea"===d.type||"rangeSplineArea"===d.type?(f=d.getMarkerProperties(g,e.x1,e.y1,this.chart.overlaidCanvasCtx),f.size=Math.max(1.5*f.size<<0,10),f.borderColor=f.borderColor||"#FFFFFF",f.borderThickness=f.borderThickness||Math.ceil(0.1*f.size),K.drawMarkers([f]),"undefined"!==typeof e.y2&&(f=d.getMarkerProperties(g,e.x1,e.y2,this.chart.overlaidCanvasCtx),f.size=Math.max(1.5*f.size<<
        0,10),f.borderColor=f.borderColor||"#FFFFFF",f.borderThickness=f.borderThickness||Math.ceil(0.1*f.size),K.drawMarkers([f]))):"bubble"===d.type?(f=d.getMarkerProperties(g,e.x1,e.y1,this.chart.overlaidCanvasCtx),f.size=e.size,f.color="white",f.borderColor="white",b.globalAlpha=0.3,K.drawMarkers([f]),b.globalAlpha=1):"column"===d.type||"stackedColumn"===d.type||"stackedColumn100"===d.type||"bar"===d.type||"rangeBar"===d.type||"stackedBar"===d.type||"stackedBar100"===d.type||"rangeColumn"===d.type?I(b,
        e.x1,e.y1,e.x2,e.y2,"white",0,null,!1,!1,!1,!1,0.3):"pie"===d.type||"doughnut"===d.type?ra(b,e.center,e.radius,"white",d.type,e.startAngle,e.endAngle,0.3,e.percentInnerRadius):"candlestick"===d.type?(b.globalAlpha=1,b.strokeStyle=e.color,b.lineWidth=2*e.borderThickness,d=0===b.lineWidth%2?0:0.5,b.beginPath(),b.moveTo(e.x3-d,e.y2),b.lineTo(e.x3-d,Math.min(e.y1,e.y4)),b.stroke(),b.beginPath(),b.moveTo(e.x3-d,Math.max(e.y1,e.y4)),b.lineTo(e.x3-d,e.y3),b.stroke(),I(b,e.x1,Math.min(e.y1,e.y4),e.x2,Math.max(e.y1,
        e.y4),"transparent",2*e.borderThickness,e.color,!1,!1,!1,!1),b.globalAlpha=1):"ohlc"===d.type&&(b.globalAlpha=1,b.strokeStyle=e.color,b.lineWidth=2*e.borderThickness,d=0===b.lineWidth%2?0:0.5,b.beginPath(),b.moveTo(e.x3-d,e.y2),b.lineTo(e.x3-d,e.y3),b.stroke(),b.beginPath(),b.moveTo(e.x3,e.y1),b.lineTo(e.x1,e.y1),b.stroke(),b.beginPath(),b.moveTo(e.x3,e.y4),b.lineTo(e.x2,e.y4),b.stroke(),b.globalAlpha=1))}}b.restore();b.globalAlpha=1;b.beginPath()};Q.prototype.getToolTipInnerHTML=function(a){a=a.entries;
        for(var b=null,c=null,d=null,e=0,f="",g=!0,k=0;k<a.length;k++)if(a[k].dataSeries.toolTipContent||a[k].dataPoint.toolTipContent){g=!1;break}if(g&&(this.content&&"function"===typeof this.content||this.contentFormatter))a={chart:this.chart,toolTip:this._options,entries:a},b=this.contentFormatter?this.contentFormatter(a):this.content(a);else if(this.shared&&"none"!==this.chart.plotInfo.axisPlacement){for(var p="",k=0;k<a.length;k++)if(c=a[k].dataSeries,d=a[k].dataPoint,e=a[k].index,f="",0===k&&(g&&!this.content)&&
            (p+="undefined"!==typeof this.chart.axisX.labels[d.x]?this.chart.axisX.labels[d.x]:"{x}",p+="</br>",p=this.chart.replaceKeywordsWithValue(p,d,c,e)),null!==d.toolTipContent&&("undefined"!==typeof d.toolTipContent||null!==c._options.toolTipContent)){if("line"===c.type||"stepLine"===c.type||"spline"===c.type||"area"===c.type||"stepArea"===c.type||"splineArea"===c.type||"column"===c.type||"bar"===c.type||"scatter"===c.type||"stackedColumn"===c.type||"stackedColumn100"===c.type||"stackedBar"===c.type||
            "stackedBar100"===c.type||"stackedArea"===c.type||"stackedArea100"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span>&nbsp;&nbsp;{y}";else if("bubble"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+
        "\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";else if("pie"===c.type||"doughnut"===c.type||"funnel"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"&nbsp;&nbsp;{y}";else if("rangeColumn"===c.type||"rangeBar"===c.type||"rangeArea"===c.type||"rangeSplineArea"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+
        (this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}";else if("candlestick"===c.type||"ohlc"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}";null===b&&(b="");!0===this.reversed?
            (b=this.chart.replaceKeywordsWithValue(f,d,c,e)+b,k<a.length-1&&(b="</br>"+b)):(b+=this.chart.replaceKeywordsWithValue(f,d,c,e),k<a.length-1&&(b+="</br>"))}null!==b&&(b=p+b)}else{c=a[0].dataSeries;d=a[0].dataPoint;e=a[0].index;if(null===d.toolTipContent||"undefined"===typeof d.toolTipContent&&null===c._options.toolTipContent)return null;if("line"===c.type||"stepLine"===c.type||"spline"===c.type||"area"===c.type||"stepArea"===c.type||"splineArea"===c.type||"column"===c.type||"bar"===c.type||"scatter"===
            c.type||"stackedColumn"===c.type||"stackedColumn100"===c.type||"stackedBar"===c.type||"stackedBar100"===c.type||"stackedArea"===c.type||"stackedArea100"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+" :</span>&nbsp;&nbsp;{y}";else if("bubble"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:
            this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";else if("pie"===c.type||"doughnut"===c.type||"funnel"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:(d.name?"{name}:&nbsp;&nbsp;":d.label?"{label}:&nbsp;&nbsp;":"")+"{y}";else if("rangeColumn"===c.type||"rangeBar"===
            c.type||"rangeArea"===c.type||"rangeSplineArea"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+" :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}";else if("candlestick"===c.type||"ohlc"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+
        (this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+"</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}";null===b&&(b="");b+=this.chart.replaceKeywordsWithValue(f,d,c,e)}return b};Q.prototype.enableAnimation=function(){this.container.style.WebkitTransition||(this.container.style.WebkitTransition="left .2s ease-out, bottom .2s ease-out",this.container.style.MozTransition="left .2s ease-out, bottom .2s ease-out",
        this.container.style.MsTransition="left .2s ease-out, bottom .2s ease-out",this.container.style.transition="left .2s ease-out, bottom .2s ease-out")};Q.prototype.disableAnimation=function(){this.container.style.WebkitTransition&&(this.container.style.WebkitTransition="",this.container.style.MozTransition="",this.container.style.MsTransition="",this.container.style.transition="")};Q.prototype.hide=function(a){this.enabled&&(this.container.style.display="none",this.currentSeriesIndex=-1,this._prevY=
        this._prevX=NaN,("undefined"===typeof a||a)&&this.chart.resetOverlayedCanvas())};u.prototype.getPercentAndTotal=function(a,b){var c=null,d=null,e=null;if(0<=a.type.indexOf("stacked"))d=0,c=b.x.getTime?b.x.getTime():b.x,c in a.plotUnit.yTotals&&(d=a.plotUnit.yTotals[c],e=isNaN(b.y)?0:0===d?0:100*(b.y/d));else if("pie"===a.type||"doughnut"===a.type){for(i=d=0;i<a.dataPoints.length;i++)isNaN(a.dataPoints[i].y)||(d+=a.dataPoints[i].y);e=isNaN(b.y)?0:100*(b.y/d)}return{percent:e,total:d}};u.prototype.replaceKeywordsWithValue=
        function(a,b,c,d,e){var f=this;e="undefined"===typeof e?0:e;if((0<=c.type.indexOf("stacked")||"pie"===c.type||"doughnut"===c.type)&&(0<=a.indexOf("#percent")||0<=a.indexOf("#total"))){var g="#percent",k="#total",p=this.getPercentAndTotal(c,b),k=isNaN(p.total)?k:p.total,g=isNaN(p.percent)?g:p.percent;do{p="";if(c.percentFormatString)p=c.percentFormatString;else{var p="#,##0.",h=Math.max(Math.ceil(Math.log(1/Math.abs(g))/Math.LN10),2);if(isNaN(h)||!isFinite(h))h=2;for(var l=0;l<h;l++)p+="#"}a=a.replace("#percent",
            W(g,p,f._cultureInfo));a=a.replace("#total",W(k,c.yValueFormatString?c.yValueFormatString:"#,##0.########"))}while(0<=a.indexOf("#percent")||0<=a.indexOf("#total"))}return a.replace(/\{.*?\}|"[^"]*"|'[^']*'/g,function(a){if('"'===a[0]&&'"'===a[a.length-1]||"'"===a[0]&&"'"===a[a.length-1])return a.slice(1,a.length-1);a=Z(a.slice(1,a.length-1));a=a.replace("#index",e);var g=null;try{var h=a.match(/(.*?)\s*\[\s*(.*?)\s*\]/);h&&0<h.length&&(g=Z(h[2]),a=Z(h[1]))}catch(k){}h=null;if("color"===a)return b.color?
            b.color:c.color?c.color:c._colorSet[d%c._colorSet.length];if(b.hasOwnProperty(a))h=b;else if(c.hasOwnProperty(a))h=c;else return"";h=h[a];null!==g&&(h=h[g]);return"x"===a?f.axisX&&"dateTime"===f.plotInfo.axisXValueType?qa(h,b.xValueFormatString?b.xValueFormatString:c.xValueFormatString?c.xValueFormatString:f.axisX&&f.axisX.valueFormatString?f.axisX.valueFormatString:"DD MMM YY",f._cultureInfo):W(h,b.xValueFormatString?b.xValueFormatString:c.xValueFormatString?c.xValueFormatString:"#,##0.########",
            f._cultureInfo):"y"===a?W(h,b.yValueFormatString?b.yValueFormatString:c.yValueFormatString?c.yValueFormatString:"#,##0.########",f._cultureInfo):"z"===a?W(h,b.zValueFormatString?b.zValueFormatString:c.zValueFormatString?c.zValueFormatString:"#,##0.########",f._cultureInfo):h})};$.prototype.reset=function(){this.lastObjectId=0;this.objectMap=[];this.rectangularRegionEventSubscriptions=[];this.previousDataPointEventObject=null;this.eventObjects=[];t&&(this.ghostCtx.clearRect(0,0,this.chart.width,this.chart.height),
        this.ghostCtx.beginPath())};$.prototype.getNewObjectTrackingId=function(){return++this.lastObjectId};$.prototype.mouseEventHandler=function(a){if("mousemove"===a.type||"click"===a.type){var b=[],c=ma(a),d=null;if((d=this.chart.getObjectAtXY(c.x,c.y,!1))&&"undefined"!==typeof this.objectMap[d])if(d=this.objectMap[d],"dataPoint"===d.objectType){var e=this.chart.data[d.dataSeriesIndex],f=e.dataPoints[d.dataPointIndex],g=d.dataPointIndex;d.eventParameter={x:c.x,y:c.y,dataPoint:f,dataSeries:e._options,
        dataPointIndex:g,dataSeriesIndex:e.index,chart:this.chart._publicChartReference};d.eventContext={context:f,userContext:f,mouseover:"mouseover",mousemove:"mousemove",mouseout:"mouseout",click:"click"};b.push(d);d=this.objectMap[e.id];d.eventParameter={x:c.x,y:c.y,dataPoint:f,dataSeries:e._options,dataPointIndex:g,dataSeriesIndex:e.index,chart:this.chart._publicChartReference};d.eventContext={context:e,userContext:e._options,mouseover:"mouseover",mousemove:"mousemove",mouseout:"mouseout",click:"click"};
        b.push(this.objectMap[e.id])}else"legendItem"===d.objectType&&(e=this.chart.data[d.dataSeriesIndex],f=null!==d.dataPointIndex?e.dataPoints[d.dataPointIndex]:null,d.eventParameter={x:c.x,y:c.y,dataSeries:e._options,dataPoint:f,dataPointIndex:d.dataPointIndex,dataSeriesIndex:d.dataSeriesIndex,chart:this.chart._publicChartReference},d.eventContext={context:this.chart.legend,userContext:this.chart.legend._options,mouseover:"itemmouseover",mousemove:"itemmousemove",mouseout:"itemmouseout",click:"itemclick"},
        b.push(d));e=[];for(c=0;c<this.mouseoveredObjectMaps.length;c++){f=!0;for(d=0;d<b.length;d++)if(b[d].id===this.mouseoveredObjectMaps[c].id){f=!1;break}f?this.fireEvent(this.mouseoveredObjectMaps[c],"mouseout",a):e.push(this.mouseoveredObjectMaps[c])}this.mouseoveredObjectMaps=e;for(c=0;c<b.length;c++){e=!1;for(d=0;d<this.mouseoveredObjectMaps.length;d++)if(b[c].id===this.mouseoveredObjectMaps[d].id){e=!0;break}e||(this.fireEvent(b[c],"mouseover",a),this.mouseoveredObjectMaps.push(b[c]));"click"===
    a.type?this.fireEvent(b[c],"click",a):"mousemove"===a.type&&this.fireEvent(b[c],"mousemove",a)}}};$.prototype.fireEvent=function(a,b,c){if(a&&b){var d=a.eventParameter,e=a.eventContext,f=a.eventContext.userContext;f&&(e&&f[e[b]])&&f[e[b]].call(f,d);"mouseout"!==b?f.cursor&&f.cursor!==c.target.style.cursor&&(c.target.style.cursor=f.cursor):(c.target.style.cursor=this.chart._defaultCursor,delete a.eventParameter,delete a.eventContext);"click"===b&&("dataPoint"===a.objectType&&this.chart.pieDoughnutClickHandler)&&
    this.chart.pieDoughnutClickHandler.call(this.chart.data[a.dataSeriesIndex],d)}};O(ba,G);pa.prototype.animate=function(a,b,c,d,e){var f=this;this.chart.isAnimating=!0;e=e||A.easing.linear;c&&this.animations.push({startTime:(new Date).getTime()+(a?a:0),duration:b,animationCallback:c,onComplete:d});for(a=[];0<this.animations.length;)if(b=this.animations.shift(),c=(new Date).getTime(),d=0,b.startTime<=c&&(d=e(Math.min(c-b.startTime,b.duration),0,1,b.duration),d=Math.min(d,1),isNaN(d)||!isFinite(d))&&
        (d=1),1>d&&a.push(b),b.animationCallback(d),1<=d&&b.onComplete)b.onComplete();this.animations=a;0<this.animations.length?this.animationRequestId=this.chart.requestAnimFrame.call(window,function(){f.animate.call(f)}):this.chart.isAnimating=!1};pa.prototype.cancelAllAnimations=function(){this.animations=[];this.animationRequestId&&this.chart.cancelRequestAnimFrame.call(window,this.animationRequestId);this.animationRequestId=null;this.chart.isAnimating=!1};var A={yScaleAnimation:function(a,b){if(0!==
        a){var c=b.dest,d=b.source.canvas,e=b.animationBase;c.drawImage(d,0,0,d.width,d.height,0,e-e*a,c.canvas.width/J,a*c.canvas.height/J)}},xScaleAnimation:function(a,b){if(0!==a){var c=b.dest,d=b.source.canvas,e=b.animationBase;c.drawImage(d,0,0,d.width,d.height,e-e*a,0,a*c.canvas.width/J,c.canvas.height/J)}},xClipAnimation:function(a,b){if(0!==a){var c=b.dest,d=b.source.canvas;c.save();0<a&&c.drawImage(d,0,0,d.width*a,d.height,0,0,d.width*a/J,d.height/J);c.restore()}},fadeInAnimation:function(a,b){if(0!==
        a){var c=b.dest,d=b.source.canvas;c.save();c.globalAlpha=a;c.drawImage(d,0,0,d.width,d.height,0,0,c.canvas.width/J,c.canvas.height/J);c.restore()}},easing:{linear:function(a,b,c,d){return c*a/d+b},easeOutQuad:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},easeOutQuart:function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b},easeInQuad:function(a,b,c,d){return c*(a/=d)*a+b},easeInQuart:function(a,b,c,d){return c*(a/=d)*a*a*a+b}}},K={drawMarker:function(a,b,c,d,e,f,g,k){if(c){var p=1;c.fillStyle=f?f:"#000000";
        c.strokeStyle=g?g:"#000000";c.lineWidth=k?k:0;"circle"===d?(c.moveTo(a,b),c.beginPath(),c.arc(a,b,e/2,0,2*Math.PI,!1),f&&c.fill(),k&&(g?c.stroke():(p=c.globalAlpha,c.globalAlpha=0.15,c.strokeStyle="black",c.stroke(),c.globalAlpha=p))):"square"===d?(c.beginPath(),c.rect(a-e/2,b-e/2,e,e),f&&c.fill(),k&&(g?c.stroke():(p=c.globalAlpha,c.globalAlpha=0.15,c.strokeStyle="black",c.stroke(),c.globalAlpha=p))):"triangle"===d?(c.beginPath(),c.moveTo(a-e/2,b+e/2),c.lineTo(a+e/2,b+e/2),c.lineTo(a,b-e/2),c.closePath(),
        f&&c.fill(),k&&(g?c.stroke():(p=c.globalAlpha,c.globalAlpha=0.15,c.strokeStyle="black",c.stroke(),c.globalAlpha=p)),c.beginPath()):"cross"===d&&(c.strokeStyle=f,c.lineWidth=e/4,c.beginPath(),c.moveTo(a-e/2,b-e/2),c.lineTo(a+e/2,b+e/2),c.stroke(),c.moveTo(a+e/2,b-e/2),c.lineTo(a-e/2,b+e/2),c.stroke())}},drawMarkers:function(a){for(var b=0;b<a.length;b++){var c=a[b];K.drawMarker(c.x,c.y,c.ctx,c.type,c.size,c.color,c.borderColor,c.borderThickness)}}},za={Chart:function(a,b){var c=new u(a,b,this);this.render=
        function(){c.render(this.options)};this.options=c._options},addColorSet:function(a,b){V[a]=b},addCultureInfo:function(a,b){ca[a]=b},formatNumber:function(a,b,c){c=c||"en";if(ca[c])return W(a,b||"#,##0.##",new ba(c));throw"Unknown Culture Name";},formatDate:function(a,b,c){c=c||"en";if(ca[c])return qa(a,b||"DD MMM YYYY",new ba(c));throw"Unknown Culture Name";}};za.Chart.version="v1.8.0 Beta 4";window.CanvasJS=za})();
/*
 excanvas is used to support IE678 which do not implement HTML5 Canvas Element. You can safely remove the following excanvas code if you don't need to support older browsers.

 Copyright 2006 Google Inc. https://code.google.com/p/explorercanvas/
 Licensed under the Apache License, Version 2.0
 */
document.createElement("canvas").getContext||function(){function V(){return this.context_||(this.context_=new C(this))}function W(a,b,c){var g=M.call(arguments,2);return function(){return a.apply(b,g.concat(M.call(arguments)))}}function N(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function O(a){a.namespaces.g_vml_||a.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");a.namespaces.g_o_||a.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");
    a.styleSheets.ex_canvas_||(a=a.createStyleSheet(),a.owningElement.id="ex_canvas_",a.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}")}function X(a){var b=a.srcElement;switch(a.propertyName){case "width":b.getContext().clearRect();b.style.width=b.attributes.width.nodeValue+"px";b.firstChild.style.width=b.clientWidth+"px";break;case "height":b.getContext().clearRect(),b.style.height=b.attributes.height.nodeValue+"px",b.firstChild.style.height=b.clientHeight+
    "px"}}function Y(a){a=a.srcElement;a.firstChild&&(a.firstChild.style.width=a.clientWidth+"px",a.firstChild.style.height=a.clientHeight+"px")}function D(){return[[1,0,0],[0,1,0],[0,0,1]]}function t(a,b){for(var c=D(),g=0;3>g;g++)for(var e=0;3>e;e++){for(var f=0,d=0;3>d;d++)f+=a[g][d]*b[d][e];c[g][e]=f}return c}function P(a,b){b.fillStyle=a.fillStyle;b.lineCap=a.lineCap;b.lineJoin=a.lineJoin;b.lineWidth=a.lineWidth;b.miterLimit=a.miterLimit;b.shadowBlur=a.shadowBlur;b.shadowColor=a.shadowColor;b.shadowOffsetX=
    a.shadowOffsetX;b.shadowOffsetY=a.shadowOffsetY;b.strokeStyle=a.strokeStyle;b.globalAlpha=a.globalAlpha;b.font=a.font;b.textAlign=a.textAlign;b.textBaseline=a.textBaseline;b.arcScaleX_=a.arcScaleX_;b.arcScaleY_=a.arcScaleY_;b.lineScale_=a.lineScale_}function Q(a){var b=a.indexOf("(",3),c=a.indexOf(")",b+1),b=a.substring(b+1,c).split(",");if(4!=b.length||"a"!=a.charAt(3))b[3]=1;return b}function E(a,b,c){return Math.min(c,Math.max(b,a))}function F(a,b,c){0>c&&c++;1<c&&c--;return 1>6*c?a+6*(b-a)*c:
    1>2*c?b:2>3*c?a+6*(b-a)*(2/3-c):a}function G(a){if(a in H)return H[a];var b,c=1;a=String(a);if("#"==a.charAt(0))b=a;else if(/^rgb/.test(a)){c=Q(a);b="#";for(var g,e=0;3>e;e++)g=-1!=c[e].indexOf("%")?Math.floor(255*(parseFloat(c[e])/100)):+c[e],b+=v[E(g,0,255)];c=+c[3]}else if(/^hsl/.test(a)){e=c=Q(a);b=parseFloat(e[0])/360%360;0>b&&b++;g=E(parseFloat(e[1])/100,0,1);e=E(parseFloat(e[2])/100,0,1);if(0==g)g=e=b=e;else{var f=0.5>e?e*(1+g):e+g-e*g,d=2*e-f;g=F(d,f,b+1/3);e=F(d,f,b);b=F(d,f,b-1/3)}b="#"+
    v[Math.floor(255*g)]+v[Math.floor(255*e)]+v[Math.floor(255*b)];c=c[3]}else b=Z[a]||a;return H[a]={color:b,alpha:c}}function C(a){this.m_=D();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=1*q;this.globalAlpha=1;this.font="10px sans-serif";this.textAlign="left";this.textBaseline="alphabetic";this.canvas=a;var b="width:"+a.clientWidth+"px;height:"+a.clientHeight+"px;overflow:hidden;position:absolute",
    c=a.ownerDocument.createElement("div");c.style.cssText=b;a.appendChild(c);b=c.cloneNode(!1);b.style.backgroundColor="red";b.style.filter="alpha(opacity=0)";a.appendChild(b);this.element_=c;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}function R(a,b,c,g){a.currentPath_.push({type:"bezierCurveTo",cp1x:b.x,cp1y:b.y,cp2x:c.x,cp2y:c.y,x:g.x,y:g.y});a.currentX_=g.x;a.currentY_=g.y}function S(a,b){var c=G(a.strokeStyle),g=c.color,c=c.alpha*a.globalAlpha,e=a.lineScale_*a.lineWidth;1>e&&(c*=e);b.push("<g_vml_:stroke",
    ' opacity="',c,'"',' joinstyle="',a.lineJoin,'"',' miterlimit="',a.miterLimit,'"',' endcap="',$[a.lineCap]||"square",'"',' weight="',e,'px"',' color="',g,'" />')}function T(a,b,c,g){var e=a.fillStyle,f=a.arcScaleX_,d=a.arcScaleY_,k=g.x-c.x,n=g.y-c.y;if(e instanceof w){var h=0,l=g=0,u=0,m=1;if("gradient"==e.type_){h=e.x1_/f;c=e.y1_/d;var p=s(a,e.x0_/f,e.y0_/d),h=s(a,h,c),h=180*Math.atan2(h.x-p.x,h.y-p.y)/Math.PI;0>h&&(h+=360);1E-6>h&&(h=0)}else p=s(a,e.x0_,e.y0_),g=(p.x-c.x)/k,l=(p.y-c.y)/n,k/=f*q,
    n/=d*q,m=x.max(k,n),u=2*e.r0_/m,m=2*e.r1_/m-u;f=e.colors_;f.sort(function(a,b){return a.offset-b.offset});d=f.length;p=f[0].color;c=f[d-1].color;k=f[0].alpha*a.globalAlpha;a=f[d-1].alpha*a.globalAlpha;for(var n=[],r=0;r<d;r++){var t=f[r];n.push(t.offset*m+u+" "+t.color)}b.push('<g_vml_:fill type="',e.type_,'"',' method="none" focus="100%"',' color="',p,'"',' color2="',c,'"',' colors="',n.join(","),'"',' opacity="',a,'"',' g_o_:opacity2="',k,'"',' angle="',h,'"',' focusposition="',g,",",l,'" />')}else e instanceof
I?k&&n&&b.push("<g_vml_:fill",' position="',-c.x/k*f*f,",",-c.y/n*d*d,'"',' type="tile"',' src="',e.src_,'" />'):(e=G(a.fillStyle),b.push('<g_vml_:fill color="',e.color,'" opacity="',e.alpha*a.globalAlpha,'" />'))}function s(a,b,c){a=a.m_;return{x:q*(b*a[0][0]+c*a[1][0]+a[2][0])-r,y:q*(b*a[0][1]+c*a[1][1]+a[2][1])-r}}function z(a,b,c){isFinite(b[0][0])&&(isFinite(b[0][1])&&isFinite(b[1][0])&&isFinite(b[1][1])&&isFinite(b[2][0])&&isFinite(b[2][1]))&&(a.m_=b,c&&(a.lineScale_=aa(ba(b[0][0]*b[1][1]-b[0][1]*
    b[1][0]))))}function w(a){this.type_=a;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}function I(a,b){if(!a||1!=a.nodeType||"IMG"!=a.tagName)throw new A("TYPE_MISMATCH_ERR");if("complete"!=a.readyState)throw new A("INVALID_STATE_ERR");switch(b){case "repeat":case null:case "":this.repetition_="repeat";break;case "repeat-x":case "repeat-y":case "no-repeat":this.repetition_=b;break;default:throw new A("SYNTAX_ERR");}this.src_=a.src;this.width_=a.width;this.height_=a.height}
    function A(a){this.code=this[a];this.message=a+": DOM Exception "+this.code}var x=Math,k=x.round,J=x.sin,K=x.cos,ba=x.abs,aa=x.sqrt,q=10,r=q/2;navigator.userAgent.match(/MSIE ([\d.]+)?/);var M=Array.prototype.slice;O(document);var U={init:function(a){a=a||document;a.createElement("canvas");a.attachEvent("onreadystatechange",W(this.init_,this,a))},init_:function(a){a=a.getElementsByTagName("canvas");for(var b=0;b<a.length;b++)this.initElement(a[b])},initElement:function(a){if(!a.getContext){a.getContext=
        V;O(a.ownerDocument);a.innerHTML="";a.attachEvent("onpropertychange",X);a.attachEvent("onresize",Y);var b=a.attributes;b.width&&b.width.specified?a.style.width=b.width.nodeValue+"px":a.width=a.clientWidth;b.height&&b.height.specified?a.style.height=b.height.nodeValue+"px":a.height=a.clientHeight}return a}};U.init();for(var v=[],d=0;16>d;d++)for(var B=0;16>B;B++)v[16*d+B]=d.toString(16)+B.toString(16);var Z={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",
            bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",
            darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",
            ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",
            mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",
            peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"},
        H={},L={},$={butt:"flat",round:"round"},d=C.prototype;d.clearRect=function(){this.textMeasureEl_&&(this.textMeasureEl_.removeNode(!0),this.textMeasureEl_=null);this.element_.innerHTML=""};d.beginPath=function(){this.currentPath_=[]};d.moveTo=function(a,b){var c=s(this,a,b);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};d.lineTo=function(a,b){var c=s(this,a,b);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};d.bezierCurveTo=
        function(a,b,c,g,e,f){e=s(this,e,f);a=s(this,a,b);c=s(this,c,g);R(this,a,c,e)};d.quadraticCurveTo=function(a,b,c,g){a=s(this,a,b);c=s(this,c,g);g={x:this.currentX_+2/3*(a.x-this.currentX_),y:this.currentY_+2/3*(a.y-this.currentY_)};R(this,g,{x:g.x+(c.x-this.currentX_)/3,y:g.y+(c.y-this.currentY_)/3},c)};d.arc=function(a,b,c,g,e,f){c*=q;var d=f?"at":"wa",k=a+K(g)*c-r,n=b+J(g)*c-r;g=a+K(e)*c-r;e=b+J(e)*c-r;k!=g||f||(k+=0.125);a=s(this,a,b);k=s(this,k,n);g=s(this,g,e);this.currentPath_.push({type:d,
        x:a.x,y:a.y,radius:c,xStart:k.x,yStart:k.y,xEnd:g.x,yEnd:g.y})};d.rect=function(a,b,c,g){this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+g);this.lineTo(a,b+g);this.closePath()};d.strokeRect=function(a,b,c,g){var e=this.currentPath_;this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+g);this.lineTo(a,b+g);this.closePath();this.stroke();this.currentPath_=e};d.fillRect=function(a,b,c,g){var e=this.currentPath_;this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+
        c,b+g);this.lineTo(a,b+g);this.closePath();this.fill();this.currentPath_=e};d.createLinearGradient=function(a,b,c,g){var e=new w("gradient");e.x0_=a;e.y0_=b;e.x1_=c;e.y1_=g;return e};d.createRadialGradient=function(a,b,c,g,e,f){var d=new w("gradientradial");d.x0_=a;d.y0_=b;d.r0_=c;d.x1_=g;d.y1_=e;d.r1_=f;return d};d.drawImage=function(a,b){var c,g,e,d,r,y,n,h;e=a.runtimeStyle.width;d=a.runtimeStyle.height;a.runtimeStyle.width="auto";a.runtimeStyle.height="auto";var l=a.width,u=a.height;a.runtimeStyle.width=
        e;a.runtimeStyle.height=d;if(3==arguments.length)c=arguments[1],g=arguments[2],r=y=0,n=e=l,h=d=u;else if(5==arguments.length)c=arguments[1],g=arguments[2],e=arguments[3],d=arguments[4],r=y=0,n=l,h=u;else if(9==arguments.length)r=arguments[1],y=arguments[2],n=arguments[3],h=arguments[4],c=arguments[5],g=arguments[6],e=arguments[7],d=arguments[8];else throw Error("Invalid number of arguments");var m=s(this,c,g),p=[];p.push(" <g_vml_:group",' coordsize="',10*q,",",10*q,'"',' coordorigin="0,0"',' style="width:',
        10,"px;height:",10,"px;position:absolute;");if(1!=this.m_[0][0]||this.m_[0][1]||1!=this.m_[1][1]||this.m_[1][0]){var t=[];t.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",k(m.x/q),",","Dy=",k(m.y/q),"");var v=s(this,c+e,g),w=s(this,c,g+d);c=s(this,c+e,g+d);m.x=x.max(m.x,v.x,w.x,c.x);m.y=x.max(m.y,v.y,w.y,c.y);p.push("padding:0 ",k(m.x/q),"px ",k(m.y/q),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",t.join(""),", sizingmethod='clip');")}else p.push("top:",
        k(m.y/q),"px;left:",k(m.x/q),"px;");p.push(' ">','<g_vml_:image src="',a.src,'"',' style="width:',q*e,"px;"," height:",q*d,'px"',' cropleft="',r/l,'"',' croptop="',y/u,'"',' cropright="',(l-r-n)/l,'"',' cropbottom="',(u-y-h)/u,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",p.join(""))};d.stroke=function(a){var b=[];b.push("<g_vml_:shape",' filled="',!!a,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0,0"',' coordsize="',10*q,",",10*q,'"',
        ' stroked="',!a,'"',' path="');for(var c={x:null,y:null},d={x:null,y:null},e=0;e<this.currentPath_.length;e++){var f=this.currentPath_[e];switch(f.type){case "moveTo":b.push(" m ",k(f.x),",",k(f.y));break;case "lineTo":b.push(" l ",k(f.x),",",k(f.y));break;case "close":b.push(" x ");f=null;break;case "bezierCurveTo":b.push(" c ",k(f.cp1x),",",k(f.cp1y),",",k(f.cp2x),",",k(f.cp2y),",",k(f.x),",",k(f.y));break;case "at":case "wa":b.push(" ",f.type," ",k(f.x-this.arcScaleX_*f.radius),",",k(f.y-this.arcScaleY_*
        f.radius)," ",k(f.x+this.arcScaleX_*f.radius),",",k(f.y+this.arcScaleY_*f.radius)," ",k(f.xStart),",",k(f.yStart)," ",k(f.xEnd),",",k(f.yEnd))}if(f){if(null==c.x||f.x<c.x)c.x=f.x;if(null==d.x||f.x>d.x)d.x=f.x;if(null==c.y||f.y<c.y)c.y=f.y;if(null==d.y||f.y>d.y)d.y=f.y}}b.push(' ">');a?T(this,b,c,d):S(this,b);b.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",b.join(""))};d.fill=function(){this.stroke(!0)};d.closePath=function(){this.currentPath_.push({type:"close"})};d.save=function(){var a=
    {};P(this,a);this.aStack_.push(a);this.mStack_.push(this.m_);this.m_=t(D(),this.m_)};d.restore=function(){this.aStack_.length&&(P(this.aStack_.pop(),this),this.m_=this.mStack_.pop())};d.translate=function(a,b){z(this,t([[1,0,0],[0,1,0],[a,b,1]],this.m_),!1)};d.rotate=function(a){var b=K(a);a=J(a);z(this,t([[b,a,0],[-a,b,0],[0,0,1]],this.m_),!1)};d.scale=function(a,b){this.arcScaleX_*=a;this.arcScaleY_*=b;z(this,t([[a,0,0],[0,b,0],[0,0,1]],this.m_),!0)};d.transform=function(a,b,c,d,e,f){z(this,t([[a,
        b,0],[c,d,0],[e,f,1]],this.m_),!0)};d.setTransform=function(a,b,c,d,e,f){z(this,[[a,b,0],[c,d,0],[e,f,1]],!0)};d.drawText_=function(a,b,c,d,e){var f=this.m_;d=0;var r=1E3,t=0,n=[],h;h=this.font;if(L[h])h=L[h];else{var l=document.createElement("div").style;try{l.font=h}catch(u){}h=L[h]={style:l.fontStyle||"normal",variant:l.fontVariant||"normal",weight:l.fontWeight||"normal",size:l.fontSize||10,family:l.fontFamily||"sans-serif"}}var l=h,m=this.element_;h={};for(var p in l)h[p]=l[p];p=parseFloat(m.currentStyle.fontSize);
        m=parseFloat(l.size);"number"==typeof l.size?h.size=l.size:-1!=l.size.indexOf("px")?h.size=m:-1!=l.size.indexOf("em")?h.size=p*m:-1!=l.size.indexOf("%")?h.size=p/100*m:-1!=l.size.indexOf("pt")?h.size=m/0.75:h.size=p;h.size*=0.981;p=h.style+" "+h.variant+" "+h.weight+" "+h.size+"px "+h.family;m=this.element_.currentStyle;l=this.textAlign.toLowerCase();switch(l){case "left":case "center":case "right":break;case "end":l="ltr"==m.direction?"right":"left";break;case "start":l="rtl"==m.direction?"right":
            "left";break;default:l="left"}switch(this.textBaseline){case "hanging":case "top":t=h.size/1.75;break;case "middle":break;default:case null:case "alphabetic":case "ideographic":case "bottom":t=-h.size/2.25}switch(l){case "right":d=1E3;r=0.05;break;case "center":d=r=500}b=s(this,b+0,c+t);n.push('<g_vml_:line from="',-d,' 0" to="',r,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!e,'" stroked="',!!e,'" style="position:absolute;width:1px;height:1px;">');e?S(this,n):T(this,n,{x:-d,y:0},
            {x:r,y:h.size});e=f[0][0].toFixed(3)+","+f[1][0].toFixed(3)+","+f[0][1].toFixed(3)+","+f[1][1].toFixed(3)+",0,0";b=k(b.x/q)+","+k(b.y/q);n.push('<g_vml_:skew on="t" matrix="',e,'" ',' offset="',b,'" origin="',d,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',N(a),'" style="v-text-align:',l,";font:",N(p),'" /></g_vml_:line>');this.element_.insertAdjacentHTML("beforeEnd",n.join(""))};d.fillText=function(a,b,c,d){this.drawText_(a,b,c,d,!1)};d.strokeText=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               b,c,d){this.drawText_(a,b,c,d,!0)};d.measureText=function(a){this.textMeasureEl_||(this.element_.insertAdjacentHTML("beforeEnd",'<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>'),this.textMeasureEl_=this.element_.lastChild);var b=this.element_.ownerDocument;this.textMeasureEl_.innerHTML="";this.textMeasureEl_.style.font=this.font;this.textMeasureEl_.appendChild(b.createTextNode(a));return{width:this.textMeasureEl_.offsetWidth}};d.clip=function(){};
    d.arcTo=function(){};d.createPattern=function(a,b){return new I(a,b)};w.prototype.addColorStop=function(a,b){b=G(b);this.colors_.push({offset:a,color:b.color,alpha:b.alpha})};d=A.prototype=Error();d.INDEX_SIZE_ERR=1;d.DOMSTRING_SIZE_ERR=2;d.HIERARCHY_REQUEST_ERR=3;d.WRONG_DOCUMENT_ERR=4;d.INVALID_CHARACTER_ERR=5;d.NO_DATA_ALLOWED_ERR=6;d.NO_MODIFICATION_ALLOWED_ERR=7;d.NOT_FOUND_ERR=8;d.NOT_SUPPORTED_ERR=9;d.INUSE_ATTRIBUTE_ERR=10;d.INVALID_STATE_ERR=11;d.SYNTAX_ERR=12;d.INVALID_MODIFICATION_ERR=
        13;d.NAMESPACE_ERR=14;d.INVALID_ACCESS_ERR=15;d.VALIDATION_ERR=16;d.TYPE_MISMATCH_ERR=17;G_vmlCanvasManager=U;CanvasRenderingContext2D=C;CanvasGradient=w;CanvasPattern=I;DOMException=A}();
/*!
 * jQCloud Plugin for jQuery
 *
 * Version 1.0.4
 *
 * Copyright 2011, Luca Ongaro
 * Licensed under the MIT license.
 *
 * Date: 2013-05-09 18:54:22 +0200
 */


(function( $ ) {
    "use strict";
    $.fn.jQCloud = function(word_array, options) {
        // Reference to the container element
        var $this = this;
        // Namespace word ids to avoid collisions between multiple clouds
        var cloud_namespace = $this.attr('id') || Math.floor((Math.random()*1000000)).toString(36);

        // Default options value
        var default_options = {
            width: $this.width(),
            height: $this.height(),
            center: {
                x: ((options && options.width) ? options.width : $this.width()) / 2.0,
                y: ((options && options.height) ? options.height : $this.height()) / 2.0
            },
            delayedMode: word_array.length > 50,
            shape: false, // It defaults to elliptic shape
            encodeURI: true,
            removeOverflowing: true
        };

        options = $.extend(default_options, options || {});

        // Add the "jqcloud" class to the container for easy CSS styling, set container width/height
        $this.addClass("jqcloud").width(options.width).height(options.height);

        // Container's CSS position cannot be 'static'
        if ($this.css("position") === "static") {
            $this.css("position", "relative");
        }

        var drawWordCloud = function() {
            // Helper function to test if an element overlaps others
            var hitTest = function(elem, other_elems) {
                // Pairwise overlap detection
                var overlapping = function(a, b) {
                    if (Math.abs(2.0*a.offsetLeft + a.offsetWidth - 2.0*b.offsetLeft - b.offsetWidth) < a.offsetWidth + b.offsetWidth) {
                        if (Math.abs(2.0*a.offsetTop + a.offsetHeight - 2.0*b.offsetTop - b.offsetHeight) < a.offsetHeight + b.offsetHeight) {
                            return true;
                        }
                    }
                    return false;
                };
                var i = 0;
                // Check elements for overlap one by one, stop and return false as soon as an overlap is found
                for(i = 0; i < other_elems.length; i++) {
                    if (overlapping(elem, other_elems[i])) {
                        return true;
                    }
                }
                return false;
            };

            // Make sure every weight is a number before sorting
            for (var i = 0; i < word_array.length; i++) {
                word_array[i].weight = parseFloat(word_array[i].weight, 10);
            }

            // Sort word_array from the word with the highest weight to the one with the lowest
            word_array.sort(function(a, b) { if (a.weight < b.weight) {return 1;} else if (a.weight > b.weight) {return -1;} else {return 0;} });

            var step = (options.shape === "rectangular") ? 18.0 : 2.0,
                already_placed_words = [],
                aspect_ratio = options.width / options.height;

            // Function to draw a word, by moving it in spiral until it finds a suitable empty place. This will be iterated on each word.
            var drawOneWord = function(index, word) {
                // Define the ID attribute of the span that will wrap the word, and the associated jQuery selector string
                var word_id = cloud_namespace + "_word_" + index,
                    word_selector = "#" + word_id,
                    angle = 6.28 * Math.random(),
                    radius = 0.0,

                // Only used if option.shape == 'rectangular'
                    steps_in_direction = 0.0,
                    quarter_turns = 0.0,

                    weight = 5,
                    custom_class = "",
                    inner_html = "",
                    word_span;

                // Extend word html options with defaults
                word.html = $.extend(word.html, {id: word_id});

                // If custom class was specified, put them into a variable and remove it from html attrs, to avoid overwriting classes set by jQCloud
                if (word.html && word.html["class"]) {
                    custom_class = word.html["class"];
                    delete word.html["class"];
                }

                // Check if min(weight) > max(weight) otherwise use default
                if (word_array[0].weight > word_array[word_array.length - 1].weight) {
                    // Linearly map the original weight to a discrete scale from 1 to 10
                    weight = Math.round((word.weight - word_array[word_array.length - 1].weight) /
                            (word_array[0].weight - word_array[word_array.length - 1].weight) * 9.0) + 1;
                }
                word_span = $('<span>').attr(word.html).addClass('w' + weight + " " + custom_class);

                // Append link if word.url attribute was set
                if (word.link) {
                    // If link is a string, then use it as the link href
                    if (typeof word.link === "string") {
                        word.link = {href: word.link};
                    }

                    // Extend link html options with defaults
                    if ( options.encodeURI ) {
                        word.link = $.extend(word.link, { href: encodeURI(word.link.href).replace(/'/g, "%27") });
                    }

                    inner_html = $('<a>').attr(word.link).text(word.text);
                } else {
                    inner_html = word.text;
                }
                word_span.append(inner_html);

                // Bind handlers to words
                if (!!word.handlers) {
                    for (var prop in word.handlers) {
                        if (word.handlers.hasOwnProperty(prop) && typeof word.handlers[prop] === 'function') {
                            $(word_span).bind(prop, word.handlers[prop]);
                        }
                    }
                }

                $this.append(word_span);

                var width = word_span.width(),
                    height = word_span.height(),
                    left = options.center.x - width / 2.0,
                    top = options.center.y - height / 2.0;

                // Save a reference to the style property, for better performance
                var word_style = word_span[0].style;
                word_style.position = "absolute";
                word_style.left = left + "px";
                word_style.top = top + "px";

                while(hitTest(word_span[0], already_placed_words)) {
                    // option shape is 'rectangular' so move the word in a rectangular spiral
                    if (options.shape === "rectangular") {
                        steps_in_direction++;
                        if (steps_in_direction * step > (1 + Math.floor(quarter_turns / 2.0)) * step * ((quarter_turns % 4 % 2) === 0 ? 1 : aspect_ratio)) {
                            steps_in_direction = 0.0;
                            quarter_turns++;
                        }
                        switch(quarter_turns % 4) {
                            case 1:
                                left += step * aspect_ratio + Math.random() * 2.0;
                                break;
                            case 2:
                                top -= step + Math.random() * 2.0;
                                break;
                            case 3:
                                left -= step * aspect_ratio + Math.random() * 2.0;
                                break;
                            case 0:
                                top += step + Math.random() * 2.0;
                                break;
                        }
                    } else { // Default settings: elliptic spiral shape
                        radius += step;
                        angle += (index % 2 === 0 ? 1 : -1)*step;

                        left = options.center.x - (width / 2.0) + (radius*Math.cos(angle)) * aspect_ratio;
                        top = options.center.y + radius*Math.sin(angle) - (height / 2.0);
                    }
                    word_style.left = left + "px";
                    word_style.top = top + "px";
                }

                // Don't render word if part of it would be outside the container
                if (options.removeOverflowing && (left < 0 || top < 0 || (left + width) > options.width || (top + height) > options.height)) {
                    word_span.remove()
                    return;
                }


                already_placed_words.push(word_span[0]);

                // Invoke callback if existing
                if ($.isFunction(word.afterWordRender)) {
                    word.afterWordRender.call(word_span);
                }
            };

            var drawOneWordDelayed = function(index) {
                index = index || 0;
                if (!$this.is(':visible')) { // if not visible then do not attempt to draw
                    setTimeout(function(){drawOneWordDelayed(index);},10);
                    return;
                }
                if (index < word_array.length) {
                    drawOneWord(index, word_array[index]);
                    setTimeout(function(){drawOneWordDelayed(index + 1);}, 10);
                } else {
                    if ($.isFunction(options.afterCloudRender)) {
                        options.afterCloudRender.call($this);
                    }
                }
            };

            // Iterate drawOneWord on every word. The way the iteration is done depends on the drawing mode (delayedMode is true or false)
            if (options.delayedMode){
                drawOneWordDelayed();
            }
            else {
                $.each(word_array, drawOneWord);
                if ($.isFunction(options.afterCloudRender)) {
                    options.afterCloudRender.call($this);
                }
            }
        };

        // Delay execution so that the browser can render the page before the computatively intensive word cloud drawing
        setTimeout(function(){drawWordCloud();}, 10);
        return $this;
    };
})(jQuery);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




;
