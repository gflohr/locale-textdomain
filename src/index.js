'use strict';

const default_dir = 'assets';
var domain_bindings = {};

function empty(what) {
    if (what === undefined || what === '') return true;

    return false;
}

function LocaleTextdomain(domain) {
    if (empty(domain))
        domain = 'messages';

    this._textdomain = domain;
    this._locale = 'C';
}

LocaleTextdomain.prototype.setLocale = function(locale) {
    if (!empty(locale)) this._locale = locale; 

    return this._locale; 
};

LocaleTextdomain.prototype.textdomain = function (domain) {
    if (!empty(domain)) this._textdomain = domain;

    return this._textdomain;
};

LocaleTextdomain.prototype.bindtextdomain = function(domain, dir) {
    if (empty(domain))
        throw(new Error('undefined or empty textdomain in call to bindtextdomain()'));

    if (!empty(dir)) {
        domain_bindings[domain] = dir;
    }

    if (domain_bindings.hasOwnProperty(domain))
        return domain_bindings[domain];

    return default_dir;
};

LocaleTextdomain.prototype._ = function(msgid) {
    return msgid;
};

LocaleTextdomain.prototype._n = function(msgid, msgid_plural, count) {
    if (count === 1)
        return msgid;

    return msgid_plural;
};

module.exports = function (domain) {
    return new LocaleTextdomain(domain);
};
