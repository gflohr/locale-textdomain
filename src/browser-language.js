'use strict';

// A pretty useless wrapper around navigator.languages.  It exists, so that
// the test code can mock changing the browser language.  We can also later
// try to make the language detection more portable.
function BrowserLanguage() {
}

BrowserLanguage.prototype._get = function () {
    console.log('real _get() called');
    if (navigator.languages) {
        this._languages = navigator.languages.slice();
    } else if (navigator.language) {
        this._languages = [navigator.language];
    } else {
        this._languages = [];
    }
};

BrowserLanguage.prototype.get = function () {
    this._get();
    return this._languages;
};

module.exports = function() { return new BrowserLanguage; };
