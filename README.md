# global-event-handlers

GlobalEventHandlers mapped out completely - cross browsers

Using this powerful little tool will map out for you all Global Event Handlers in any browser you'd wish to execute it on.

## installation

`npm install global-event-handlers-map --save`

## usage

```javascript
const getGlobalEventsHandlersMap = require('global-event-handlers-map');

const gehsMap = getGlobalEventsHandlersMap();
```

## output

a map of all global event listeners in the browser in the following format:

```javascript
{
    'OBJECT': [
        'onEVENT1',
        'onEVENT2',
        'onEVENT3'
    ]
}
```

# example

```javascript
const getGlobalEventsHandlersMap = require('global-event-handlers-map');

const gehsMap = getGlobalEventsHandlersMap('WebSocket');

(gehsMap == {
  "WebSocket": [
    "onopen",
    "onerror",
    "onclose",
    "onmessage"
  ]
});
```

## options

1. `filter` (first optional argument)

allows you to pass a string that must exist within the object in order for it to make the final result map:

```javascript
const getGlobalEventsHandlersMap = require('global-event-handlers-map');

const gehsMap = getGlobalEventsHandlersMap('*'); // will return a non-filtered map
const gehsMap = getGlobalEventsHandlersMap('HTML'); // will return a map that only contains objects that contain the string 'HTML' (such as 'HTMLBodyElement')
const gehsMap = getGlobalEventsHandlersMap('Doc'); // will return a map that only contains objects that contain the string 'Doc' (such as 'Document')
```

default value: `'*'`

2. `hasOwnProperty` (second optional argument)

allows you to pass a boolean that indicates whether iterated object must has iterated property as its own property or not:

```javascript
const getGlobalEventsHandlersMap = require('global-event-handlers-map');

const gehsMap = getGlobalEventsHandlersMap('*', true); // will return a map with objects and global event handlers properties that are the object's own properties
const gehsMap = getGlobalEventsHandlersMap('*', false); // will return a map with objects and global event handlers properties - whether the properties are the object's own properties or not
```

default value: `true`

3. `noEmptyArrays` (third optional argument)

allows you to pass a boolean that indicates whether final result object should contain objects that have zero global event handlers or not:

```javascript
const getGlobalEventsHandlersMap = require('global-event-handlers-map');

const gehsMap = getGlobalEventsHandlersMap('*', true, true); // will return a map with objects and global event handlers properties only if the object even has any global event handlers
const gehsMap = getGlobalEventsHandlersMap('*', true, false); // will return a map with objects and global event handlers properties whether the object has any global event handlers or not
```

default value: `false`

4. `debug` (fourth optional argument)

allows you to pass a boolean that indicates whether to run module in debug mode or not. debug mode just logs errors in case any are thrown:

```javascript
const getGlobalEventsHandlersMap = require('global-event-handlers-map');

const gehsMap = getGlobalEventsHandlersMap('*', true, true, true); // will run in debug mode
const gehsMap = getGlobalEventsHandlersMap('*', true, false, false); // will not run in debug mode
```

default value: `false`
