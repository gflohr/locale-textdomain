'use strict';

// A pretty useless wrapper around navigator.languages.  It exists, so that
// the test code can mock changing the browser language.  We can also later
// try to make the language detection more portable.
function BrowserLanguage() {
}

BrowserLanguage.prototype.get = function() {
    return navigator.languages.slice();
};

module.exports = function() { return new BrowserLanguage; };
