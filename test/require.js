'use strict';

function require(path) {
    var paths = {
        'chai': chai,
        '../lib/locale-textdomain': Tester.LocaleTextdomain,
        '../src/binary-reader': Tester.binaryReader,
        '../src/plural-exp': Tester.pluralExp,
        '../src/browser-language': Tester.BrowserLanguage
    };

    if (!paths.hasOwnProperty(path))
        throw new Error('unsupported requirement ' + path);

    return paths[path];
}

var browserTest = true;

var navigatorLanguages = [];
Object.defineProperty(navigator, 'languages', {
    get: function() {
        return navigatorLanguages;
    }
});
