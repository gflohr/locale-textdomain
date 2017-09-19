'use strict';

var JDataView = require('jdataview');

function readMO(raw) {
    try {
        return doReadMO(raw);
    }
    catch(e) {
        return null;
    }
}

function doReadMO(raw) {
    var blob = new JDataView(raw, 0, raw.length, false);
    var magic = blob.getUint32();

    if (magic === 0xde120495)
        blob = new JDataView(raw, 0, raw.length, true);
    else if (magic !== 0x950412de)
        return null; // Data corrupted.

    blob.skip(4);
    var revision = blob.getUint32();
    if (revision !== 0) return null;  // Unsupported.
    var num_strings = blob.getUint32();
    var msgid_offset = blob.getUint32();
    var msgstr_offset = blob.getUint32();
 
    blob.seek(msgid_offset);
    var orig_tab = [];
    for (var i = 0; i < num_strings; ++i) {
        var l = blob.getUint32();
        var offset = blob.getUint32();
        orig_tab.push([l, offset]);
    }

    blob.seek(msgstr_offset);
    var trans_tab = [];
    for (var i = 0; i < num_strings; ++i) {
        var l = blob.getUint32();
        var offset = blob.getUint32();
        trans_tab.push([l, offset]);
    }

    var messages = {};
    var encoding = 'utf-8';
    for (var i = 0; i < num_strings; ++i) {
        var orig = orig_tab[i];
        var l = orig[0];
        var offset = orig[1];

        blob.seek(offset);
        var msgid = blob.getString(l).replace(/\u0000.*/, '');

        var trans = trans_tab[i];
        l = trans[0];
        offset = trans[1];

        blob.seek(offset);
        var msgstrs = blob.getString(l).split("\u0000");

        messages[msgid] = msgstrs;
    }

    return messages;
}

module.exports = readMO;
