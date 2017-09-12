'use strict';

const default_dir = 'assets';
var domain_bindings = {};

function LocaleTextdomain(d) {
    var domain;

    this.domain = d !== undefined && d !== '' ? d : 'messages';
};

LocaleTextdomain.prototype.textdomain = function (d) {
    if (d !== undefined && d.length !== 0) this.domain = d;

    return this.domain;
};

LocaleTextdomain.prototype.bindtextdomain = function(domain, dir) {
    if (domain === undefined || domain === '')
        throw(new Error('undefined or empty textdomain in call to bindtextdomain()'));

    if (dir !== undefined && dir.length !== 0) {
        domain_bindings[domain] = dir;
    }

    if (domain_bindings.hasOwnProperty(domain))
        return domain_bindings[domain];

    return default_dir;
};

LocaleTextdomain.prototype._ = function(msgid) {
    return msgid;
};

module.exports = {
    use: function (domain) {
        return new LocaleTextdomain(domain);
    }
};
