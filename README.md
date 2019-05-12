# event-handlers

EventHandlers mapped out [completely](https://weizman.github.io/event-handlers-website/) - cross browsers

Using this powerful little tool will map out for you all Event Handlers in any browser you'd wish to execute it on.

## installation

`npm install event-handlers --save`

## usage

```javascript
const getEventHandlersMap = require('event-handlers');

const eventHandlersMap = getEventHandlersMap();
```

## output

a map of all event handlers in the browser in the following format:

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
const getEventHandlersMap = require('event-handlers');

const webSocketEventHandlersMap = getEventHandlersMap('WebSocket');

(webSocketEventHandlersMap == {
  "WebSocket": [
    "onopen",
    "onerror",
    "onclose",
    "onmessage"
  ] // results in true
});
```

here's an example of how to register with your own listener to every  event handler that exists on `window`!

```javascript

const windowEventHandlersMap = getEventHandlersMap('window')['window'];

for (let i = 0; i < windowEventHandlersMap.length; i++) {
  const eventHandler = windowEventHandlersMap[i];
  window[eventHandler] = (event) => { console.log(event) });
}
```

## options

1. `filter` (first optional argument)

allows you to pass a string that must exist within the object in order for it to make it to the final result map:

```javascript
const getEventHandlersMap = require('event-handlers');

const eventHandlersMap = getEventHandlersMap('*'); // will return a non-filtered map
const eventHandlersMap = getEventHandlersMap('HTML'); // will return a map that only contains objects that contain the string 'HTML' (such as 'HTMLBodyElement')
const eventHandlersMap = getEventHandlersMap('Doc'); // will return a map that only contains objects that contain the string 'Doc' (such as 'Document')
```

default value: `'*'`

2. `hasOwnProperty` (second optional argument)

allows you to pass a boolean that indicates whether iterated object must has iterated property as its own property or not:

```javascript
const getEventHandlersMap = require('event-handlers');

const eventHandlersMap = getEventHandlersMap('*', true); // will return a map with objects and  event handlers properties that are the object's own properties
const eventHandlersMap = getEventHandlersMap('*', false); // will return a map with objects and  event handlers properties - whether the properties are the object's own properties or not
```

default value: `true`

3. `noEmptyArrays` (third optional argument)

allows you to pass a boolean that indicates whether final result object should contain objects that have zero  event handlers or not:

```javascript
const getEventHandlersMap = require('event-handlers');

const eventHandlersMap = getEventHandlersMap('*', true, true); // will return a map with objects and  event handlers properties only if the object even has any  event handlers
const eventHandlersMap = getEventHandlersMap('*', true, false); // will return a map with objects and  event handlers properties whether the object has any  event handlers or not
```

default value: `false`

4. `debug` (fourth optional argument)

allows you to pass a boolean that indicates whether to run module in debug mode or not. debug mode just logs errors in case any are thrown:

```javascript
const getEventHandlersMap = require('event-handlers');

const eventHandlersMap = getEventHandlersMap('*', true, true, true); // will run in debug mode
const eventHandlersMap = getEventHandlersMap('*', true, false, false); // will not run in debug mode
```

default value: `false`

## contribution

in addition to this project there is a [website](https://weizman.github.io/event-handlers-website/) that
should show the event handlers map of every (os + browser) combination that ever existed.
in reality however, it shows most of the existing combinations, but not all of them.
the maps were extracted using every existing combination in [browserstack](https://browserstack.com), but even
in browserstack many automatic combinations have failed.
also, the extraction script is not automatic and does not run every
time there's a new browser/os.
contributing to the [JSON](https://github.com/weizman/event-handlers-website/blob/master/data.json) could help a lot with maintaining the map and keeping it as updated and as accurate as possible.
highly appreciated!
