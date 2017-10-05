'use strict';

function BrowserLanguage() {
    this._languages = [];
}

BrowserLanguage.prototype.get = function() {
    return this._languages;
};

BrowserLanguage.prototype.set = function(languages) {
    return this._languages = languages.slice();
};

module.exports = function() { return new BrowserLanguage; };
