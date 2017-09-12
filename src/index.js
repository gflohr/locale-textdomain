'use strict';

function LocaleTextdomain(d) {
    var domain;

    domain = d !== undefined ? d : 'messages';

    this.textdomain = function (d) {
        if (d !== undefined) domain = d;

        return domain;
    };
};

LocaleTextdomain.prototype.gettext = function (msgid) {
    return msgid;
};

module.exports = {
    use: function (domain) {
        return new LocaleTextdomain(domain);
    }
};
