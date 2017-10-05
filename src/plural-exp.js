'use strict';

/* Parse STR and return a function that receives a variable n and
 * manipulates the variables nplurals and plural.
 */
function pluralExpression(str) {
    var tokens = str.replace(/[ \t\r\013\014]/g, '')
                    .replace(/;$/, '')
                    // Do NOT allow square brackets here.  JSFuck!
                    .split(/[<>!=]=|&&|\|\||[-!\*\/%+<>=?:;]/);

    for (var i = 0; i < tokens.length; ++i) {
        var token = tokens[i].replace(/^\(+/, '').replace(/\)+$/, '');
        if (token !== 'nplurals'
            && token !== 'plural'
            && token !== 'n'
            // Does not catch invalid octal numbers but the compiler
            // takes care of that.
            && null === token.match(/^[0-9]+$/)) {
            return germanicPlural;
        }
    }

    try {
        var code = 'var nplurals=1, plural=0;'
                   + str
                   + '; return [0 + nplurals, 0 + plural]';
        return new Function('n', code);
    }
    catch(e) {
        return function() { return germanicPlural; };
    }
}

function germanicPlural(n) {
    return [2, n == 1 ? 0 : 1];
}

module.exports = pluralExpression;
