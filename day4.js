'use strict';

function aoc2017d3p1(input) {
    var phrases = input.split(/\n/);

    return phrases.reduce(function reducer (sum, phrase, index, array) {
        var map = {};
        var words = phrase.split(/\s+/);
        var isInvalid = words.some(function (word, index) {
            if (map.hasOwnProperty(word)) {
                // bail out of the loop
                return true;
            }
            map[word] = index;
            return false;
        });
        return isInvalid ? sum : sum + 1;
    }, 0);
}

function aoc2017d3p2(input) {
    var phrases = input.split(/\n/);

    return phrases.reduce(function reducer (sum, phrase, index, array) {
        var map = {};
        var words = phrase.split(/\s+/);
        var isInvalid = words.some(function (word, index) {
            var key = [...word].sort();
            if (map.hasOwnProperty(key)) {
                // bail out of the loop
                return true;
            }
            map[key] = index;
            return false;
        });
        return isInvalid ? sum : sum + 1;
    }, 0);
}
