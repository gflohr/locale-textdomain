'use strict';

function require(path) {
    var paths = {
        'chai': chai,
        '../lib/locale-textdomain': Tester.LocaleTextdomain,
        '../src/binary-reader': Tester.binaryReader,
        '../src/plural-exp': Tester.pluralExp
    };

    if (!paths.hasOwnProperty(path))
        throw new Error('unsupported requirement ' + path);

    return paths[path];
}
