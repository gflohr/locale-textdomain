'use strict';

function LocaleTextdomain(d) {
    var domain;

    this.domain = d !== undefined ? d : 'messages';
};

LocaleTextdomain.prototype.textdomain = function (d) {
    if (d !== undefined) this.domain = d;

    return this.domain;
};

module.exports = {
    use: function (domain) {
        return new LocaleTextdomain(domain);
    }
};
