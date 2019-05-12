// written in ES5 in order to support all browsers
// calling extractEventHandlers() will return a map of supported  event handlers in the browser

function _isEventHandler(prop) {
    if (0 !== prop.indexOf('on')) {
        return false;
    }

    return true;
}

function _getEventHandlers(obj, hasOwnProperty = true) {
    var result = [];

    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop) && hasOwnProperty) {
            continue;
        }

        if (_isEventHandler(prop)) {
            result.push(prop);
        }
    }

    return result;
}


function getEventHandlers(filter = '*', hasOwnProperty = true,  noEmptyArrays = false, debug = false) {
    var result = {};

    var arr = Object.getOwnPropertyNames(window);

    if ('*' === filter) {
        filter = ''; // would always exist in any string possible
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

            resultArray = _getEventHandlers(proto, hasOwnProperty);

        } catch (err) {
            if (debug) {
                console.error(`failed to get  event handlers of %o`, element);
            }
        }

        if (resultArray.length === 0 && noEmptyArrays) {
            continue;
        }

        result[element] = resultArray;
    }

    if (-1 !== 'window'.indexOf(filter)) {
        const resultArray = _getEventHandlers(window, hasOwnProperty);

        if (resultArray.length === 0 && noEmptyArrays) {
            return result;
        }

        result['window'] = resultArray;
    }

    return result;
}

module.exports = getEventHandlers;
