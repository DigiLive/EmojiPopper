# EmojiPopper Plugin
EmojiPopper is a jQuery plugin selecting and inserting a native emoji character into HTML input elements or textarea's.
The plugin utilizes the popover component of Bootstrap 4.

## Requirements
- jQuery v3.3.1
- Bootstrap v4.3.1
- Popper.js v1.14.7
- [Web Storage API](https://developer.mozilla.org/nl/docs/Web/API/Web_Storage_API)

Please take a look at the [Getting Started guide](https://getbootstrap.com/docs/4.3/getting-started/introduction/) of 
Bootstrap on how to make use of the required libraries and files above.

## Getting Started
Link to the required and custom css files in the head section of your page.
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
      crossorigin="anonymous"
>
<link rel="stylesheet" type="text/css" href="https://yourDomain/css/emojiPopper.min.css">
```

Add the required javascript files to the body section of your page. Preferably just before the closing tag.

1. Jquery Library
2. Popper Library
3. Bootstrap Library
4. EmojiPopper Library
5. [Web Storage API](https://developer.mozilla.org/nl/docs/Web/API/Web_Storage_API)

**Mind the order of the included scripts**:

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous">
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" 
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" 
        crossorigin="anonymous">
</script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" 
        crossorigin="anonymous">
</script>
<script src="https://yourDomain/js/emojiPopper.min.js"></script>
```

> If the jQuery, Popper or Bootstrap library isn't loaded, an error is shown in the console and the popper will **not** 
> be initialized.

## Emoji Data
The emoji rendered in the popper depend on a source which returns emoji data in a JSON format.
The JSON response should be an array of elements, each containing at least the following data:

1. groupName;   `string` Name of the group the current emoji belongs to.
2. hexCodes;    `string` The hexadecimal character values of the current emoji.
3. formatted;   `string` The formatted hexadecimal character values of the current emoji (can be used directly within HTML).
4. description; `string` The description of the current emoji.

### Local Storage
The plugin stores the emoji data into the local storage of the web client by using the 
[Web Storage API](https://developer.mozilla.org/nl/docs/Web/API/Web_Storage_API).

If the data is found in the local storage, this data will be used. Otherwise it's requested from the source as defined
as option `url`.

> If the Web Storage API isn't available an error is shown in the console and the popper will **not** be initialized!

> All instances of the plugin will share the **same** storage location.

### Example JSON Response
```json
[
    {
        "groupName":"Smileys & Emotion",
        "hexCodes":"1F600",
        "formatted":"&#x1F600;",
        "description":"grinning face"
    },
    {
        "groupName":"Smileys & Emotion",
        "hexCodes":"1F603",
        "formatted":"&#x1F603;",
        "description":"grinning face with big eyes"
    }
]
```

The included demo makes use of a php script for providing the emoji data. The php script parses a data file from 
[The Unicode Consortium](http://unicode.org/Public/emoji/12.0/) and extracts the emoji data from that file.
The extracted data is returned as a JSON formatted array to the client.

---
**Note:**<br/>
Down below you'll find a modified copy of Bootstrap's documentation about the popover component which is utilized by 
this plugin. The original documentation is found [here](https://getbootstrap.com/docs/4.3/components/popovers/).

Modifications reflect the behaviour of the popover as defined by the EmojiPopper Plugin.
Demo's from the orignal documentation are removed since githubs markdown renderer doesn't support it.

---
## Overview
Things to know when using the popover plugin:

- Popovers rely on the 3rd party library [Popper.js](https://popper.js.org/) for positioning. You must include [popper.min.js](https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js) before bootstrap.js or use `bootstrap.bundle.min.js` / `bootstrap.bundle.js` which contains Popper.js in order for popovers to work!
- Popovers require the [tooltip plugin](https://getbootstrap.com/docs/4.3/components/tooltips/) as a dependency.
- Popovers are opt-in for performance reasons, so **you must initialize them yourself**.
- Zero-length `title` and `content` values will never show a popover.
- Specify `container: 'body'` to avoid rendering problems in more complex components (like our input groups, button groups, etc).
- Triggering popovers on hidden elements will not work.
- Popovers for `.disabled` or `disabled` elements must be triggered on a wrapper element.
- When triggered from anchors that wrap across multiple lines, popovers will be centered between the anchors' overall width. Use `.text-nowrap` on your `<a>`s to avoid this behavior.
- Popovers must be hidden before their corresponding elements have been removed from the DOM.
- Popovers can be triggered thanks to an element inside a shadow DOM.

> The animation effect of this component is dependent on the `prefers-reduced-motion` media query. See the [reduced motion section of our accessibility documentation](https://getbootstrap.com/docs/4.3/getting-started/accessibility/#reduced-motion).

Keep reading to see how popovers work with some examples.

## Example: Enable popovers everywhere
One way to initialize all popovers on a page would be to select them by their `data-toggle` attribute:

```javascript
var emojiPopper = $('[data-toggle="emojiPopper"]').emojiPopper({
    url: '../php/EmojiController.php'
});
```

## Example: Using the `container` option
When you have some styles on a parent element that interfere with a popover, you'll want to specify a custom `container` so that the popover's HTML appears within that element instead.

```javascript
var emojiPopper = $('[data-toggle="emojiPopper"]').emojiPopper({
    url:        '../php/EmojiController.php'
    container:  'body'
});
```

## Example
```html
<button type="button" class="btn btn-lg btn-danger" data-toggle="popover">
    Click to toggle popover
</button>
```

### Four directions
Four options are available: top, right, bottom, and left aligned.

```html
<button type="button" class="btn btn-secondary"
        data-container="body" data-toggle="emojiPopper" data-placement="top"
>
    Popover on top
</button>

<button type="button" class="btn btn-secondary"
        data-container="body" data-toggle="emojiPopper" data-placement="right"
>
    Popover on right
</button>

<button type="button" class="btn btn-secondary"
        data-container="body" data-toggle="emojiPopper" data-placement="bottom"
>
    Popover on bottom
</button>

<button type="button" class="btn btn-secondary" 
        data-container="body" data-toggle="emojiPopper" data-placement="left" 
>
    Popover on left
</button>
```

### Dismiss on next click
By default the plugin will dismiss all popovers on next click, except for the popover that opens when clicking a
toggle element.

Another way is to use the `focus` trigger to dismiss popovers on the user's next click of a different element than the 
toggle element.

#### Specific markup required for dismiss-on-next-click
> For proper cross-browser and cross-platform behavior, you must use the `<a>` tag, _not_ the `<button>` tag, and you 
> also must > include a [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) 
> attribute.

```html
<a tabindex="0" class="btn btn-lg btn-danger" role="button" data-toggle="emojiPopper" data-trigger="focus" 
   title="Dismissible popover"
>
    Dismissible popover
</a>
```

```javascript
var emojiPopper = $('[data-toggle="emojiPopper"]').emojiPopper({
    url:      '../php/EmojiController.php',
    trigger:  'focus'
});
```

### Disabled elements
Elements with the `disabled` attribute aren't interactive, meaning users cannot hover or click them to trigger a popover
 (or tooltip). As a workaround, you'll want to trigger the popover from a wrapper `<div>` or `<span>` and override the 
 `pointer-events` on the disabled element.

For disabled popover triggers, you may also prefer `data-trigger="hover"` so that the popover appears as immediate 
visual feedback to your users as they may not expect to _click_ on a disabled element.

```html
<span class="d-inline-block" data-toggle="emojiPopper">
    <button class="btn btn-primary" style="pointer-events: none;" type="button" disabled>Disabled button</button>
</span>
```

## Usage
> **Making popovers work for keyboard and assistive technology users**
> 
> To allow keyboard users to activate your popovers, you should only add them to HTML elements that are traditionally keyboard-focusable and interactive (such as links or form controls). Although arbitrary HTML elements (such as `<span>`s) can be made focusable by adding the `tabindex="0"` attribute, this will add potentially annoying and confusing tab stops on non-interactive elements for keyboard users, and most assistive technologies currently do not announce the popover's content in this situation. Additionally, do not rely solely on `hover` as the trigger for your popovers, as this will make them impossible to trigger for keyboard users.
> ~~While you can insert rich, structured HTML in popovers with the `html` option, we strongly recommend that you avoid adding an excessive amount of content. The way popovers currently work is that, once displayed, their content is tied to the trigger element with the `aria-describedby` attribute. As a result, the entirety of the popover's content will be announced to assistive technology users as one long, uninterrupted stream.~~
> The binding of attribute `aria-describedby` is removed by the emojiPopper plugin when the show instance method is called. Instead a `aria-label` attribute is added to describe the popover, using the popover's title.
> 
> Additionally, while it is possible to also include interactive controls (such as form elements or links) in your popover (by adding these elements to the `whiteList` or allowed attributes and tags), be aware that currently the popover does not manage keyboard focus order. When a keyboard user opens a popover, focus remains on the triggering element, and as the popover usually does not immediately follow the trigger in the document's structure, there is no guarantee that moving forward/pressing <kbd>TAB</kbd> will move a keyboard user into the popover itself. In short, simply adding interactive controls to a popover is likely to make these controls unreachable/unusable for keyboard users and users of assistive technologies, or at the very least make for an illogical overall focus order. In these cases, consider using a modal dialog instead.

### Options
Options of the popover itself can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-animation=""`.

> Note that for security reasons the `sanitize`, `sanitizeFn` and `whiteList` options cannot be supplied using data 
> attributes.

Options added by the emojiPopper plugin must be passed to the plugin's constructor:

```javascript
var emojiPopper = $('[data-toggle="emojiPopper"]').emojiPopper({
    url:            '../php/EmojiController.php',
    storageType:    'sessionStorage',
    autoClose:      false,
    dismiss:        false
});
```

|Name|Type|Default|Description|
| --- | --- | --- | --- |
| url | string | - | Actually not an option, but **mandatory**. Here you provide a link to a source which delivers emoji data in a JSON format. |
| animation | boolean | true | Apply a CSS fade transition to the popover |
| container | string / element / false | false | Appends the popover to a specific element. Example: `container: 'body'`. This option is particularly useful in that it allows you to position the popover in the flow of the document near the triggering element - which will prevent the popover from floating away from the triggering element during a window resize. |
| content | string / element / function | EmojoPopper Content | ~~Default content value if `data-content` attribute isn't present. <br>If a function is given, it will be called with its `this` reference set to the element that the popover is attached to~~<br>Fixed value. The content is defined by the EmojiPopper Plugin and currently can't be overwritten. |
| delay | number / object | 0 | Delay showing and hiding the popover (ms) - does not apply to manual trigger type<br>If a number is supplied, delay is applied to both hide/show<br>Object structure is: `delay: { "show": 500, "hide": 100 }` |
| html | boolean | ~~false~~ true | ~~Insert HTML into the popover. If false, `innerText` property will be used to insert content into the DOM. Use text if you're worried about XSS attacks.~~<br>The EmojiPopper plugin's content contains HTML. The value of this option is fixed to true. |
| placement | string / function | 'right' | How to position the popover - auto / top / bottom / left / right.<br>When `auto` is specified, it will dynamically reorient the popover.<br>When a function is used to determine the placement, it is called with the popover DOM node as its first argument and the triggering element DOM node as its second. The `this` context is set to the popover instance.|
| selector | string / false | false | If a selector is provided, popover objects will be delegated to the specified targets. In practice, this is used to enable dynamic HTML content to have popovers added. See <a href="https://github.com/twbs/bootstrap/issues/4215">this</a> and <a href="https://codepen.io/Johann-S/pen/djJYPb">an informative example</a>.|
| template | string | `'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'` | Base HTML to use when creating the popover.<br>The popover's `title` will be injected into the `.popover-header`.<br>The popover's `content` will be injected into the `.popover-body`.<br>`.popover-arrow` will become the popover's arrow.<br>The outermost wrapper element should have the `.popover` class. |
| title | string / element / function | ~~''~~ 'Pick an emoji...' | Default title value if <code>title</code> attribute isn't present.<br>If a function is given, it will be called with its `this` reference set to the element that the popover is attached to.|
| trigger | string | 'click' | How popover is triggered - click / hover / focus / manual. You may pass multiple triggers; separate them with a space. `manual` cannot be combined with any other trigger. |
| offset | number / string | 0 | Offset of the popover relative to its target. For more information refer to Popper.js's <a href="https://popper.js.org/popper-documentation.html#modifiers..offset.offset">offset docs</a>.|
| fallbackPlacement | string / array | 'flip' | Allow to specify which position Popper will use on fallback. For more information refer to Popper.js's <a href="https://popper.js.org/popper-documentation.html#modifiers..flip.behavior">behavior docs</a>|
| boundary | string / element | 'scrollParent' | Overflow constraint boundary of the popover. Accepts the values of `'viewport'`, `'window'`, `'scrollParent'`, or an HTMLElement reference (JavaScript only). For more information refer to Popper.js's <a href="https://popper.js.org/popper-documentation.html#modifiers..preventOverflow.boundariesElement">preventOverflow docs</a>. |
| sanitize | boolean | ~~true~~ false | ~~Enable or disable the sanitization. If activated <code>'template'</code>, <code>'content'</code> and <code>'title'</code> options will be sanitized.~~<br>The EmojiPopper Plugin's content contains elements and attributes which are removed by popper when sanitization is enabled. Therefor this value is currently fixed to `false`.|
| whiteList | object | <a href="https://getbootstrap.com/docs/4.3/getting-started/javascript/#sanitizer">Default value</a> | Object which contains allowed attributes and tags |
| sanitizeFn | null / function | null | Here you can supply your own sanitize function. This can be useful if you prefer to use a dedicated library to perform sanitization. |
| autoClose | boolean | true | Defines whether the popover is closed when selecting an emoji.<br>**This option can't be set with a data-attribute and must be passed to to constructor of the emojiPopper plugin** |
| dismiss | boolean | true | Defines whether open popovers are closed at next click outside these open popovers.<br>**This option can't be set with a data-attribute and must be passed to to constructor of the emojiPopper plugin** |
| storageType | 'localStorage' / 'sessionStorage' | 'sessionStorage' | The emoji rendered in the popper, depends on data retrieved from a server. This data is stored locally by using the Web Storage API. `'localStorage'` stores the data across browser sessions while using `'sessionStorage'`, the data gets cleared when the page session ends — that is, when the page is closed.<br> **This option can't be set with a data-attribute and must be passed to to constructor of the emojiPopper plugin** |

> #### Data attributes for individual popovers
>
> Options for individual popovers can alternatively be specified through the use of data attributes, as explained above.

### Methods

> #### Asynchronous methods and transitions
> All API methods are asynchronous and start a transition. They return to the caller as soon as the transition is started but before it ends. In addition, a method call on a transitioning component will be ignored.

> [See our JavaScript documentation for more information](https://getbootstrap.com/docs/4.3/getting-started/javascript/).

```javascript
var myPopover = $('#popEmoji');
```

#### show
Reveals an element's popover. **Returns to the caller before the popover has actually been shown** (i.e. before the `shown.bs.popover` event occurs). This is considered a "manual" triggering of the popover. Popovers whose both title and content are zero-length are never displayed.

```javascript
myPopover.popover('show');
```

#### hide
Hides an element's popover. **Returns to the caller before the popover has actually been hidden** (i.e. before the `hidden.bs.popover` event occurs). This is considered a "manual" triggering of the popover.

```javascript
myPopover.popover('hide');
```

#### toggle
Toggles an element's popover. **Returns to the caller before the popover has actually been shown or hidden** (i.e. before the `shown.bs.popover` or `hidden.bs.popover` event occurs). This is considered a "manual" triggering of the popover.

```javascript
myPopover.popover('toggle');
```

#### dispose
Hides and destroys an element's popover. Popovers that use delegation (which are created using [the `selector` option](#options)) cannot be individually destroyed on descendant trigger elements.

```javascript
myPopover.popover('dispose');
```

#### enable
Gives an element's popover the ability to be shown. **Popovers are enabled by default.**

```javascript
myPopover.popover('enable');
```

#### disable
Removes the ability for an element's popover to be shown. The popover will only be able to be shown if it is re-enabled.

```javascript
myPopover.popover('disable');
```

#### toggleEnabled
Toggles the ability for an element's popover to be shown or hidden.

```javascript
myPopover.popover('toggleEnabled');
```

#### update
Updates the position of an element's popover.

```javascript
myPopover.popover('update');
```

~~#### _getInstance
*Static* method which allows you to get the popover instance associated with a DOM element~~

```javascript
var exampleTriggerEl = document.getElementById('example');
var popover = bootstrap.Popover._getInstance(exampleTriggerEl); // Returns a Bootstrap popover instance
```

### Events
| Event Type | Description |
|---|---|
| show.bs.popover | This event fires immediately when the <code>show</code> instance method is called. |
| shown.bs.popover | This event is fired when the popover has been made visible to the user (will wait for CSS transitions to complete). |
| hide.bs.popover | This event is fired immediately when the <code>hide</code> instance method has been called. |
| hidden.bs.popover | This event is fired when the popover has finished being hidden from the user (will wait for CSS transitions to complete). |
| inserted.bs.popover | This event is fired after the <code>show.bs.popover</code> event when the popover template has been added to the DOM. |

```javascript
$('#myEmojiPopper').on('show.bs.popover', function () {
    //Do something...
})
```
