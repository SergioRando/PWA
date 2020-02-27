/*
 * Copyright 2020 Sergei Sovik <sergeisovik@yahoo.com>
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

'use strict';

// Inject Script
function script(sPath, sType) {
	var domScript = /** @type {HTMLScriptElement} */ (document.createElement('script'));
	domScript.type = sType;
	domScript.async = true;
	domScript.src = sPath; // + '?_' + (getTickCount() | 0);
	document.head.appendChild(domScript);
}

function onDocumentReady() {
	// Detect And Launch Supported Script Version
	if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
		try {
			eval("let a = null;");
	
			if (typeof Object.values !== "undefined" && Object.values.toString().indexOf("[native code]") !== -1) {
				script("./main.2017.js", "module");
			} else {
				script("./main.2015.js", "module");
			}
		} catch (e) {
			script("./main.js", "text/javascript");
		}
	}
}

if (document.readyState === "interactive" || document.readyState === "complete") {
	onDocumentReady();
} else {
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", onDocumentReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('onload', onDocumentReady);
	}
}
