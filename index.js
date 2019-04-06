// written in ES5 in order to support all browsers
// calling extractGlobalEventHandlers() will return a map of supported global event handlers in the browser

function _isGlobalEventHandler(prop) {
    if (0 !== prop.indexOf('on')) {
        return false;
    }

    return true;
}

function _getGlobalEventHandlers(obj, hasOwnProperty = true) {
    var result = [];

    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop) && hasOwnProperty) {
            continue;
        }

        if (_isGlobalEventHandler(prop)) {
            result.push(prop);
        }
    }

    return result;
}


function getGlobalEventHandlers(filter = '', hasOwnProperty = true,  noEmptyArrays = false, debug = false) {
    var result = {};

    var arr = Object.getOwnPropertyNames(window);

    // support '*' as part of the API
    if ('*' === filter) {
        filter = '';
    }

    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];

        if (-1 === element.indexOf(filter)) {
            continue;
        }

        let resultArray = [];

        try {
            var obj = window[element];

            if (!obj || !obj['prototype']) {
                continue;
            }

            proto = obj['prototype'];

            resultArray = _getGlobalEventHandlers(proto, hasOwnProperty);

        } catch (err) {
            if (debug) {
                console.error(`failed to get global event handlers of %o`, element);
            }
        }

        if (resultArray.length === 0 && noEmptyArrays) {
            continue;
        }

        result[element] = resultArray;
    }

    if (-1 !== 'window'.indexOf(filter)) {
        const resultArray = _getGlobalEventHandlers(window, hasOwnProperty);

        if (resultArray.length === 0 && noEmptyArrays) {
            return result;
        }

        result['window'] = resultArray;
    }

    return result;
}

module.exports = getGlobalEventHandlers;
