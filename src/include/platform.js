/*
 * Copyright 2020 Sergio Rando <segio.rando@yahoo.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *		http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/** @suppress {duplicate} */
var platform = /** @type {Window} */ (
	('object' == typeof window && window && window['Math'] == Math) ? window :
	('object' == typeof self && self && self['Math'] == Math) ? self :
	('object' == typeof global && global && global['Math'] == Math) ? global :
	(eval("this['Math']") == Math) ? this :
	('object' == typeof globalThis && globalThis) ? globalThis : null
);

/**
 * @suppress {duplicate}
 * @param {*} oTarget 
 * @param  {...*} va_args
 * @returns {*} target
 */
var inject = function(oTarget, va_args) {
	let args = Array.prototype.slice.call(arguments, 1);
	while (args.length) {
		let arg = args.shift();
		if (!arg) continue;
		if (typeof arg !== 'object')
			throw new TypeError(arg + ' is non-object');
		for (let i in arg)
			if (arg.hasOwnProperty(i)) {
				if ((oTarget[i] === undefined) || (typeof oTarget[i] !== 'object'))
					oTarget[i] = arg[i];
				else if (typeof arg[i] === 'object') {
					if (Array.isArray(oTarget[i]) || Array.isArray(arg[i])) {
						if (Array.isArray(oTarget[i]))
							oTarget[i] = arg[i];
					} else
						platform.inject(oTarget[i], arg[i]);
				}
			}
	}
	return oTarget;
}

platform['inject'] = inject;

/**
 * @suppress {duplicate}
 * @param {*} oSource
 * @returns {*} clone
 */
var clone = function(oSource) {
	if (typeof oSource === 'string') {
		return (' ' + oSource).slice(1);
	} else if (typeof oSource === 'number') {
		return oSource;
	}

	return platform.inject(oSource.constructor(), oSource);
}

platform['clone'] = clone;

const Int32ArrayFallback = (typeof Int32Array !== 'undefined' ? Int32Array : Array);

/**
 * @suppress {duplicate}
 * @param {...*} va_args
 * @returns {Array<number>}
 */
var FixedInt32Array = function(va_args) {
	let args = /** @type {Array} */ ( Array.prototype.slice.call(arguments, 0) );

	// FIX: Safari bug Type error
	//return /** @type {Array<number>} */ ( new (Function.prototype.bind.apply(Int32ArrayFallback, [null].concat(args))) );
	
	if (args.length === 0) {
		return /** @type {Array<number>} */ ( new Int32ArrayFallback() );
	} else if (args.length === 1) {
		return /** @type {Array<number>} */ ( new Int32ArrayFallback(args[0]) );
	}
	return /** @type {Array<number>} */ ( new Int32ArrayFallback(args) );
}

platform['FixedInt32Array'] = FixedInt32Array;

const DoubleArrayFallback = (typeof Float64Array !== 'undefined' ? Float64Array : Array);

/**
 * @suppress {duplicate}
 * @param {...*} va_args
 * @returns {Array<number>}
 */
var FixedDoubleArray = function(va_args) {
	let args = /** @type {Array} */ ( Array.prototype.slice.call(arguments, 0) );
	
	// FIX: Safari bug Type error
	//return /** @type {Array<number>} */ ( new (Function.prototype.bind.apply(DoubleArrayFallback, [null].concat(args))) );
	
	if (args.length === 0) {
		return /** @type {Array<number>} */ ( new DoubleArrayFallback() );
	} else if (args.length === 1) {
		return /** @type {Array<number>} */ ( new DoubleArrayFallback(args[0]) );
	}
	return /** @type {Array<number>} */ ( new DoubleArrayFallback(args) );
}

platform['FixedDoubleArray'] = FixedDoubleArray;
