// written in ES5 in order to support all browsers
// calling extractEvents() will return a map of supported  events in the browser

function _isEvent(prop) {
    if (0 !== prop.indexOf('on')) {
        return false;
    }

    return true;
}

function _getEvents(obj, hasOwnProperty = true) {
    var result = [];

    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop) && hasOwnProperty) {
            continue;
        }

        if (_isEvent(prop)) {
            result.push(prop);
        }
    }

    return result;
}


function getEvents(filter = '*', hasOwnProperty = true,  noEmptyArrays = false, debug = false) {
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

            resultArray = _getEvents(proto, hasOwnProperty);

        } catch (err) {
            if (debug) {
                console.error(`failed to get events of %o`, element);
            }
        }

        if (resultArray.length === 0 && noEmptyArrays) {
            continue;
        }

        result[element] = resultArray;
    }

    if (-1 !== 'window'.indexOf(filter)) {
        const resultArray = _getEvents(window, hasOwnProperty);

        if (resultArray.length === 0 && noEmptyArrays) {
            return result;
        }

        result['window'] = resultArray;
    }

    return result;
}

module.exports = getEvents;
