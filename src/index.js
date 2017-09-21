'use strict';

const default_dir = 'assets';
var domain_bindings = {};
var locales = [];

// Taken from https://github.com/gflohr/libintl-perl/blob/v1/lib/Locale/Util.pm
//
// Map lone language codes to a "default" country.
const LANG2COUNTRY = {
    aa: 'ET', // Afar => Ethiopia
    ab: 'AB', // Abkhazian => Georgia
    // ae: '??', // Avestan => ??, Iran?
    af: 'za',  // Afrikaans => South Africa
    am: 'ET', // Amharic => Ethiopia
    ar: 'EG', // Arabic => Egypt
    as: 'IN', // Assamese => India
    ay: 'BO', // Aymara => Bolivia
    az: 'AZ', // Azerbaijani => Azerbaijan
    ba: 'RU', // Bashkir => Russia
    be: 'BY', // Belarusian => Belarus
    bg: 'BG', // Bulgarian => Bulgaria
    bh: 'IN', // Bihari => India
    bi: 'VU', // Bislama => Vanuatu
    bn: 'BD', // Bengali => Bangladesh
    bo: 'CN', // Tibetan => China
    br: 'FR', // Breton => France
    bs: 'BA', // Bosnian => Bosnia and Herzegovina
    ca: 'ES', // Catalan => Spain
    ce: 'RU', // Chechen => Russia
    // ch: '??', // Chamorro => Guam (or mp?)
    co: 'FR', // Corsican => France
    cs: 'CZ', // Czech => Czech Republic
    cu: 'BG', // Church Slavic => Bulgaria
    cv: 'RU', // Chuvash => Russia
    cy: 'GB', // Welsh => United Kingdom
    da: 'DK', // Danish => Denmark
    de: 'DE', // German => Germany
    dz: 'BT', // Dzongkha => Bhutan
    el: 'GR', // Greek => Greece
    en: 'US', // English => United States
    es: 'ES', // Actually Mexico and the US have more Spanish speakers
                // than Spain.  But it can be assumed that they either add
                // the country to their browser settings or will not care
                // to much.
    et: 'EE', // Estonian => Estonia
    fa: 'IR', // Iran, Islamic Republic of
    fi: 'FI', // Finnish => Finland
    fj: 'FJ', // Fijian => Fiji
    fo: 'FO', // Faeroese => Faroe Islands
    fr: 'FR', // French => France
    fy: 'FY', // Frisian => Netherlands
    ga: 'IE', // Irish => Ireland
    gd: 'GB', // Gaelic (Scots) => United Kingdom
    gl: 'ES', // Gallegan => Spain
    gn: 'PY', // Guarani => Paraguay
    gu: 'IN', // Gujarati => IN
    gv: 'GB', // Manx => United Kingdom
    ha: 'NE', // Hausa => Niger (ng?)
    he: 'IL', // Hebrew => Israel
    hi: 'IN', // Hindi => India
    ho: 'PG', // Hiri Motu => Papua New Guinea
    hr: 'HR', // Croatian
    hu: 'HU', // Hungarian => Hungary
    hy: 'AM', // Armenian => Armenia
    hz: 'NA', // Herero => Namibia
    // ia: '??', // Interlingua (aka "latino sine flexione") => ??
    id: 'ID', // Indonesian => Indonesia
    // ie: '??', // Interlingue => ???
    ik: 'US', // Inupiaq => United States
    is: 'IS', // Icelandic => Iceland
    it: 'IT', // Italian => Italy
    iu: 'CA', // Inuktitut => Canada
    iw: 'IL', // Hebrew => Israel
    ja: 'JP', // Japanese => Japan
    jw: 'ID', // Javanese => Indonesia
    ka: 'GE', // Georgian => Georgia
    ki: 'KE', // Kikuyu => Kenya
    kj: 'AO', // Kuanyama => Angola (na?)
    kk: 'KZ', // Kazakh => Kazakhstan
    kl: 'GL', // Kalaallisut => Greenland
    km: 'KH', // Khmer => Cambodia
    kn: 'IN', // Kannada => India
    ko: 'KR', // Korean => Korea, Republic of (more speakers than North Korea)
    ks: 'IN', // Kashmiri => India
    ku: 'TR', // Kurdish => Turkey
    kv: 'RU', // Komi => Russia
    kw: 'GB', // Cornish => United Kingdom
    ky: 'KG', // Kirghyz => Kyrgyzstan
    la: 'VA', // Latin => Holy See (Vatican City State)
    lb: 'LU', // Letzeburgesch => Luxembourg
    ln: 'CG', // Lingala => Republic of the Congo (cd?)
    lo: 'LA', // Lao => Lao People's Democratic Republic
    lt: 'LT', // Lithuanian => Lithuania
    lv: 'LV', // Latvian => Latvia
    mg: 'MG', // Malagasy => Madagascar
    mh: 'MH', // Marshall => Marshall Islands
    mi: 'NZ', // Maori => New Zealand
    mk: 'MK', // Macedonian => Macedonia, the Former Yugoslav Republic of
    ml: 'IN', // Malayalam => India
    mn: 'MN', // Mongolian => Mongolia
    mr: 'IN', // Marathi => India
    ms: 'MY', // Malay => Malaysia (FIXME: not really sure ...)
    mt: 'MT', // Maltese => Malta
    my: 'MM', // Burmese => Myanmar
    na: 'NR', // Nauru => Nauru
    nb: 'NO', // Norwegian Bokmål => Norway
    nd: 'ZA', // Ndebele, North => South Africa
    ne: 'NP', // Nepali => Nepal
    ng: 'NA', // Ndonga => Namibia
    nl: 'NL', // Dutch => Netherlands
    nn: 'NO', // Norwegian Nynorsk => Norway
    no: 'NO', // Norwegian => Norway
    nr: 'ZA', // Ndebele, South => South Africa
    nv: 'US', // Navajo => United States
    ny: 'MW', // Chichewa; Nyanja => Malawi
    oc: 'FR', // Occitan (post 1500) => France
    om: 'ET', // Oromo => Ethiopia
    or: 'IN', // Oriya => India
    os: 'RU', // Ossetian; Ossetic => Russia (FIXME: Or Georgia?)
    pa: 'IN', // Panjabi => India
    pi: 'IN', // Pali => India (FIXME: Or Thailand, Sri Lanka, Myanmar,
                // Cambodia)
    pl: 'PL', // Polish => Poland
    ps: 'PK', // Pushto => Pakistan
    pt: 'PT', // Portuguese => Portugal (following our rules this should
                // actually be Brazil but that would be to unrealistic,
                // people from Brazil set their locale to pt_BR).
    qu: 'PE', // Quechua => Peru
    rm: 'CH', // Rhaeto-Romance => Switzerland
    rn: 'RW', // Rundi => Rwanda
    ro: 'RO', // Romanian => Romania
    ru: 'RU', // Russian => Russia
    rw: 'RW', // Kinyarwanda => Rwanda
    sa: 'IN', // Sanskrit => India
    sc: 'IT', // Sardinian => Italy
    sd: 'IN', // Sindhi => India
    se: 'SE', // Sami => Sweden (Totally unsure here.  The Sami languages
	            // are also spoken in Norway, Finland and Russia, but the
                // largest part of the area seems to be in Sweden.
    sg: '??', // Sango => Central African Republic
    si: 'LK', // Sinhalese => Sri Lanka
    sk: 'SK', // Slovakian => Slovakia
    sl: 'SI', // Slovenian => Slovenia
    sm: 'WS', // Samoan => Samoa
    sh: 'ZW', // Shona => Zimbabwe (FIXME: Rather Mozambique?)
    so: 'SO', // Somali => Somalia
    sq: 'AL', // Albanian => Albania
    sr: 'YU', // Serbian => Yugoslavia
    ss: '??', // Swati => Swaziland (za?)
    st: 'LS', // Sotho => Lesotho
    su: 'IN', // Sundanese => Indonesia
    sv: 'SE', // Swedish => Sweden
    sw: 'TZ', // Suaheli => Tanzania, United Republic of
    ta: 'LK', // Tamil => Sri Lanka
    te: 'IN', // Telugu => India
    tg: 'TJ', // Tajik => Tajikistan
    th: 'TH', // Thai => Thailand
    ti: 'ER', // Tigrinya => Eritrea
    tk: 'TM', // Turkmen => Turkmenistan
    tl: 'PH', // Tagalog => Philippines
    tn: 'BW', // Tswana => Botswana
    to: 'TO', // Tonga => Tonga
    tr: 'TR', // Turkish => Turkish
    tt: 'RU', // Tatar => Russia
    tw: 'GH', // Twi => Ghana
    ug: 'CN', // Uighur => China
    uk: 'UA', // Ukrainian => Ukraine
    ur: 'PK', // Urdu => Pakistan
    uz: 'UZ', // Uzbek => Uzbekistan
    vi: 'VN', // Vietnamese => Vietnam
    // vo: '??', // Volapuk => Nowhere
    wo: 'SN', // Wolof => Senegal
    xh: 'ZA', // Xhosa => South Africa
    yi: 'IL', // Yiddish => Israel (FIXME: Rather United States?)
    yo: 'NG', // Yoruba => Nigeria
    za: 'CN', // Zhuang => China
    zh: 'CN', // Chinese => China
    zu: 'ZA', // Zulu => South Africa
};

function empty(what) {
    if (what === undefined || what === '') return true;

    return false;
}

function LocaleTextdomain(domain) {
    if (empty(domain))
        domain = 'messages';

    this._textdomain = domain;
}

LocaleTextdomain.prototype.setlocale = function(locale) {
    if (locale === '') {
        delete this._catalog;

        /* The "native" environment.  Server-side we emulate the
         * mechanism from glibc, in the browser we read the language
         * preferences instead.
         */
        if (typeof window !== 'undefined'
            && typeof navigator !== 'undefined'
            && navigator.languages instanceof Array) {
            throw(new Error("Not yet implemented"));
        } else if (typeof process !== 'undefined'
                   && process.env !== undefined) {
            locales = setLocaleFromNativeEnvironment();
        }
    } else if (locale !== undefined) {
        delete this._catalog;

        locales = [locale];
    }

    if (locales[0] !== undefined) return locales[0];

    return 'C';
};

LocaleTextdomain.prototype.textdomain = function (domain) {
    if (!empty(domain)) {
        delete this._catalog;
        this._textdomain = domain;
    }

    return this._textdomain;
};

LocaleTextdomain.prototype.bindtextdomain = function(domain, dir) {
    if (empty(domain))
        throw(new Error('undefined or empty textdomain in call to bindtextdomain()'));

    if (!empty(dir)) {
        delete this._catalog;
        domain_bindings[domain] = dir;
    }

    if (domain_bindings.hasOwnProperty(domain))
        return domain_bindings[domain];

    return default_dir;
};

LocaleTextdomain.prototype.loadtextdomain = function(exactMatch, category, callback) {
    callback = maybeCallback(callback || category || exactMatch);

    if (typeof exactMatch === 'undefined' || exactMatch === callback
        || category === callback)
        category = 'LC_MESSAGES';

    if (typeof exactMatch === 'undefined' || exactMatch === callback)
        exactMatch = false;

    delete this._catalog;
    for (var i = 0; i < locales.length; ++i) {
        loadDomainForLanguage.call(this, locales[i], exactMatch, category,
            function(catalog) {
                if (catalog !== undefined) {
                    this._catalog = catalog;
                    callback(catalog);
                }
            }
        );
    }
};

LocaleTextdomain.prototype._ = function(msgid) {
    return this._np(undefined, msgid, undefined, undefined, undefined);
};

LocaleTextdomain.prototype._n = function(msgid, msgid_plural, count) {
    if (count === 1)
        return msgid;

    return msgid_plural;
};

LocaleTextdomain.prototype._np = function(msgctxt, msgid, msgid_plural, n) {
    if (msgid === undefined)
        return;

    var plural = typeof msgid_plural !== 'undefined';

    return msgid;
};

/* Private methods and helper functions.  */
function maybeCallback(cb) {
    return typeof cb === 'function' ? cb : rethrow();
}

function loadDomain(category) {
}

function loadDomainForLanguage(locale, exactMatch, category, callback) {
    var ids = exactMatch ? [locale] : explodeLocale(locale);

    var bound_dir = this.bindtextdomain(this._textdomain);
    for (var i = 0; i < ids.length; ++i) {
        var dir = bound_dir + '/' + ids[i] + '/LC_MESSAGES/'
            + this._textdomain + '.mo';
    }
}

/* Transform a locale identifier into a list of ids to check.  For example,
 * "de_DE@koelsch.UTF-8" would be expanded into "de_DE@koelsch.UTF-8",
 * "de_DE@koelsch", "de_DE", and "de".
 */
function explodeLocale(locale) {
    var ids = [locale],
        id = locale;
    id = locale.replace(/\..*/, '');
    if (id !== locale) {
        ids.push(id);
    }

    locale = id;
    id = locale.replace(/@.*/, '');
    if (id !== locale) {
        ids.push(id);
    }

    locale = id;
    id = locale.replace(/[-_].*/, '');
    if (id !== locale) {
        ids.push(id);
    }

    return ids;
}

/*
 * Set the "locale" according to the native environment.  This will work
 * on Linux and to a certain extent on *BSD systems and Mac OS X.  For other
 * systems it has to be heavily reworked.
 */
function setLocaleFromNativeEnvironment() {
    var language = process.env.LANGUAGE;

    var tries = [];

    if (language !== undefined) {
        var tokens = language.split(':');
        for (var i = 0; i < tokens.length; ++i) {
            // Strip off a possible character set.
            var token = tokens[i].replace(/\..*/, '');
            if (LANG2COUNTRY[token] !== undefined) {
                token = token + '_' + LANG2COUNTRY[token];
            }

            if (token !== '') tries.push(token);

            var ll_CC = token.replace(/@.*/, '');
            if (ll_CC !== token)
                tries.push(ll_CC);
            var ll = ll_CC.replace(/_.*/);
            if (ll !== ll_CC) tries.push(ll);
        }
    } else if (process.env.LANG !== undefined) {
        var lang = process.env.LANG;
        lang = lang.replace(/\..*/);
        tries.push[lang];
    } else {
        var variables = ['LC_ALL', 'LC_MESSAGES', 'LANG'];
        for (var i = 0; i < variables.length; ++i) {
            var value = process.env[variables[i]];
            if (value !== undefined) {
                value = value.replace(/\..*/, '');
                tries.push(value);

                var ll_CC = value.replace(/@.*/, '');
                if (ll_CC !== value)
                    tries.push(ll_CC);
                var ll = ll_CC.replace(/_.*/);
                if (ll !== ll_CC) tries.push(ll);
                break;
            }
        }
    }

    return tries;
}

module.exports = function (domain) {
    return new LocaleTextdomain(domain);
};
