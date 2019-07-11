# EmojiPopper Plugin
EmojiPopper is a jQuery plugin selecting and inserting a native emoji character into HTML input elements or textarea's.
The plugin utilizes the popover component of Bootstrap 4.

## Requirements
- jQuery v3.3.1
- Bootstrap v4.3.1
- Popper.js v1.14.7

Please take a look at the [Getting Started guide](https://getbootstrap.com/docs/4.3/getting-started/introduction/) of Bootstrap on how to make use of the required libraries and files.

Down below you'll find a modified copy of Bootstrap's documentation about the popover component which is utilized by this plugin. The original documentation is found [here](https://getbootstrap.com/docs/4.3/components/popovers/).

The things modified reflect the behaviour of the popover as defined by the EmojiPopper Plugin.
Demo's are removed since github doesn't support it.

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
**Mind the order of the included scripts**:
1. Jquery Library
2. Popper Library
3. Bootstrap Library
4. EmojiPopper Library

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
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
```

## Example: Using the `container` option

When you have some styles on a parent element that interfere with a popover, you'll want to specify a custom `container` so that the popover's HTML appears within that element instead.

```javascript
var popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
  container: 'body'
})
```

## Example

```html
<button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
```

### Four directions

Four options are available: top, right, bottom, and left aligned.

```html
<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on top
</button>

<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on right
</button>

<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus
sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on bottom
</button>

<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on left
</button>
```

### Dismiss on next click

Use the `focus` trigger to dismiss popovers on the user's next click of a different element than the toggle element.

> #### Specific markup required for dismiss-on-next-click
> 
> For proper cross-browser and cross-platform behavior, you must use the `<a>` tag, _not_ the `<button>` tag, and you also must > include a [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) attribute.


```html
<a tabindex="0" class="btn btn-lg btn-danger" role="button" data-toggle="popover" data-trigger="focus" title="Dismissible popover" data-content="And here's some amazing content. It's very engaging. Right?">Dismissible popover</a>
```

```javascript
var popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
  trigger: 'focus'
})
```

### Disabled elements

Elements with the `disabled` attribute aren't interactive, meaning users cannot hover or click them to trigger a popover (or tooltip). As a workaround, you'll want to trigger the popover from a wrapper `<div>` or `<span>` and override the `pointer-events` on the disabled element.

For disabled popover triggers, you may also prefer `data-trigger="hover"` so that the popover appears as immediate visual feedback to your users as they may not expect to _click_ on a disabled element.

```html
<span class="d-inline-block" data-toggle="popover" data-content="Disabled popover">
  <button class="btn btn-primary" style="pointer-events: none;" type="button" disabled>Disabled button</button>
</span>
```

## Usage

Enable popovers via JavaScript:

```javascript
var exampleEl = document.getElementById('example')
var popover = new bootstrap.Popover(exampleEl, options)
```

> ### Making popovers work for keyboard and assistive technology users
> 
> To allow keyboard users to activate your popovers, you should only add them to HTML elements that are traditionally keyboard-focusable and interactive (such as links or form controls). Although arbitrary HTML elements (such as `<span>`s) can be made focusable by adding the `tabindex="0"` attribute, this will add potentially annoying and confusing tab stops on non-interactive elements for keyboard users, and most assistive technologies currently do not announce the popover's content in this situation. Additionally, do not rely solely on `hover` as the trigger for your popovers, as this will make them impossible to trigger for keyboard users.
> 
> While you can insert rich, structured HTML in popovers with the `html` option, we strongly recommend that you avoid adding an excessive amount of content. The way popovers currently work is that, once displayed, their content is tied to the trigger element with the `aria-describedby` attribute. As a result, the entirety of the popover's content will be announced to assistive technology users as one long, uninterrupted stream.
> 
> Additionally, while it is possible to also include interactive controls (such as form elements or links) in your popover (by adding these elements to the `whiteList` or allowed attributes and tags), be aware that currently the popover does not manage keyboard focus order. When a keyboard user opens a popover, focus remains on the triggering element, and as the popover usually does not immediately follow the trigger in the document's structure, there is no guarantee that moving forward/pressing <kbd>TAB</kbd> will move a keyboard user into the popover itself. In short, simply adding interactive controls to a popover is likely to make these controls unreachable/unusable for keyboard users and users of assistive technologies, or at the very least make for an illogical overall focus order. In these cases, consider using a modal dialog instead.

### Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-animation=""`.

> Note that for security reasons the `sanitize`, `sanitizeFn` and `whiteList` options cannot be supplied using data attributes.

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 100px;">Type</th>
      <th style="width: 50px;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>animation</td>
      <td>boolean</td>
      <td>true</td>
      <td>Apply a CSS fade transition to the popover</td>
    </tr>
    <tr>
      <td>container</td>
      <td>string | element | false</td>
      <td>false</td>
      <td>
        <p>Appends the popover to a specific element. Example: <code>container: 'body'</code>. This option is particularly useful in that it allows you to position the popover in the flow of the document near the triggering element - which will prevent the popover from floating away from the triggering element during a window resize.</p>
      </td>
    </tr>
    <tr>
      <td>content</td>
      <td>string | element | function</td>
      <td>EmojoPopper Content</td>
      <td>
        <p>~~Default content value if <code>data-content</code> attribute isn't present.~~</p>
        <p>~~If a function is given, it will be called with its <code>this</code> reference set to the element that the popover is attached to.~~</p>
        <p>Fixed value. The content is defined by the EmojiPopper Plugin and currently can't be overwritten.</p>
      </td>
    </tr>
    <tr>
      <td>delay</td>
      <td>number | object</td>
      <td>0</td>
      <td>
        <p>Delay showing and hiding the popover (ms) - does not apply to manual trigger type</p>
        <p>If a number is supplied, delay is applied to both hide/show</p>
        <p>Object structure is: <code>delay: { "show": 500, "hide": 100 }</code></p>
      </td>
    </tr>
    <tr>
      <td>html</td>
      <td>boolean</td>
      <td>~~false~~ true</td>
      <td>
        <p>~~Insert HTML into the popover. If false, <code>innerText</code> property will be used to insert content into the DOM. Use text if you're worried about XSS attacks.~~</p>
        <p>The EmojiPopper plugin's content contains HTML. The value of this option is fixed top true.</p>
      </td>
    </tr>
    <tr>
      <td>placement</td>
      <td>string | function</td>
      <td>'right'</td>
      <td>
        <p>How to position the popover - auto | top | bottom | left | right.<br>When <code>auto</code> is specified, it will dynamically reorient the popover.</p>
        <p>When a function is used to determine the placement, it is called with the popover DOM node as its first argument and the triggering element DOM node as its second. The <code>this</code> context is set to the popover instance.</p>
      </td>
    </tr>
    <tr>
      <td>selector</td>
      <td>string | false</td>
      <td>false</td>
      <td>If a selector is provided, popover objects will be delegated to the specified targets. In practice, this is used to enable dynamic HTML content to have popovers added. See <a href="https://github.com/twbs/bootstrap/issues/4215">this</a> and <a href="https://codepen.io/Johann-S/pen/djJYPb">an informative example</a>.</td>
    </tr>
    <tr>
      <td>template</td>
      <td>string</td>
      <td><code>'&lt;div class="popover" role="tooltip"&gt;&lt;div class="popover-arrow"&gt;&lt;/div&gt;&lt;h3 class="popover-header"&gt;&lt;/h3&gt;&lt;div class="popover-body"&gt;&lt;/div&gt;&lt;/div&gt;'</code></td>
      <td>
        <p>Base HTML to use when creating the popover.</p>
        <p>The popover's <code>title</code> will be injected into the <code>.popover-header</code>.</p>
        <p>The popover's <code>content</code> will be injected into the <code>.popover-body</code>.</p>
        <p><code>.popover-arrow</code> will become the popover's arrow.</p>
        <p>The outermost wrapper element should have the <code>.popover</code> class.</p>
      </td>
    </tr>
    <tr>
      <td>title</td>
      <td>string | element | function</td>
      <td>Pick an emoji...</td>
      <td>
        <p>Default title value if <code>title</code> attribute isn't present.</p>
        <p>If a function is given, it will be called with its <code>this</code> reference set to the element that the popover is attached to.</p>
      </td>
    </tr>
    <tr>
      <td>trigger</td>
      <td>string</td>
      <td>'click'</td>
      <td>How popover is triggered - click | hover | focus | manual. You may pass multiple triggers; separate them with a space. <code>manual</code> cannot be combined with any other trigger.</td>
    </tr>
    <tr>
      <td>offset</td>
      <td>number | string</td>
      <td>0</td>
      <td>Offset of the popover relative to its target. For more information refer to Popper.js's <a href="https://popper.js.org/popper-documentation.html#modifiers..offset.offset">offset docs</a>.</td>
    </tr>
    <tr>
      <td>fallbackPlacement</td>
      <td>string | array</td>
      <td>'flip'</td>
      <td>Allow to specify which position Popper will use on fallback. For more information refer to
      Popper.js's <a href="https://popper.js.org/popper-documentation.html#modifiers..flip.behavior">behavior docs</a></td>
    </tr>
    <tr>
      <td>boundary</td>
      <td>string | element</td>
      <td>'scrollParent'</td>
      <td>Overflow constraint boundary of the popover. Accepts the values of <code>'viewport'</code>, <code>'window'</code>, <code>'scrollParent'</code>, or an HTMLElement reference (JavaScript only). For more information refer to Popper.js's <a href="https://popper.js.org/popper-documentation.html#modifiers..preventOverflow.boundariesElement">preventOverflow docs</a>.</td>
    </tr>
    <tr>
      <td>sanitize</td>
      <td>boolean</td>
      <td>~~true~~ false</td>
      <td>
        <p>~~Enable or disable the sanitization. If activated <code>'template'</code>, <code>'content'</code> and <code>'title'</code> options will be sanitized.~~</p>
        <p>The EmojiPopper Plugin's content contains elements and attributes which are removed by popper when sanitization is enabled. Therefor this value is currently fixed to `false`</p>
      </td>
    </tr>
    <tr>
      <td>whiteList</td>
      <td>object</td>
      <td><a href="https://getbootstrap.com/docs/4.3/getting-started/javascript/#sanitizer">Default value</a></td>
      <td>Object which contains allowed attributes and tags</td>
    </tr>
    <tr>
      <td>sanitizeFn</td>
      <td>null | function</td>
      <td>null</td>
      <td>Here you can supply your own sanitize function. This can be useful if you prefer to use a dedicated library to perform sanitization.</td>
    </tr>
    <tr>
      <td>autoClose</td>
      <td>boolean</td>
      <td>true</td>
      <td>Defines wether the popper is closed ar stays open when selecting emoji.</td>
    </tr>
    <tr>
      <td>storageType</td>
      <td>string</td>
      <td>localStorage | sessionStorage</td>
      <td>The emoji's rendered in the popper, depends on data retrieved from a server. This data is stored locally by using the Web Storage API. `localStorage` stores the data across browser sessions while using `sessionStorage`, the data gets cleared when the page session ends — that is, when the page is closed.</td>
    </tr>
  </tbody>
</table>

> #### Data attributes for individual popovers
>
> Options for individual popovers can alternatively be specified through the use of data attributes, as explained above.

### Methods

> #### Asynchronous methods and transitions
>
> All API methods are asynchronous and start a transition. They return to the caller as soon as the transition is started but before it ends. In addition, a method call on a transitioning component will be ignored.
> 
> [See our JavaScript documentation for more information](https://getbootstrap.com/docs/4.3/getting-started/javascript/).


#### show

Reveals an element's popover. **Returns to the caller before the popover has actually been shown** (i.e. before the `shown.bs.popover` event occurs). This is considered a "manual" triggering of the popover. Popovers whose both title and content are zero-length are never displayed.

```javascript
myPopover.show()
```

#### hide

Hides an element's popover. **Returns to the caller before the popover has actually been hidden** (i.e. before the `hidden.bs.popover` event occurs). This is considered a "manual" triggering of the popover.

```javascript
myPopover.hide()
```

#### toggle

Toggles an element's popover. **Returns to the caller before the popover has actually been shown or hidden** (i.e. before the `shown.bs.popover` or `hidden.bs.popover` event occurs). This is considered a "manual" triggering of the popover.

```javascript
myPopover.toggle()
```

#### dispose

Hides and destroys an element's popover. Popovers that use delegation (which are created using [the `selector` option](#options)) cannot be individually destroyed on descendant trigger elements.

```javascript
myPopover.dispose()
```

#### enable

Gives an element's popover the ability to be shown. **Popovers are enabled by default.**

```javascript
myPopover.enable()
```

#### disable

Removes the ability for an element's popover to be shown. The popover will only be able to be shown if it is re-enabled.

```javascript
myPopover.disable()
```

#### toggleEnabled

Toggles the ability for an element's popover to be shown or hidden.

```javascript
myPopover.toggleEnabled()
```

#### update

Updates the position of an element's popover.

```javascript
myPopover.update()
```

#### _getInstance

*Static* method which allows you to get the popover instance associated with a DOM element

```javascript
var exampleTriggerEl = document.getElementById('example')
var popover = bootstrap.Popover._getInstance(exampleTriggerEl) // Returns a Bootstrap popover instance
```

### Events

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 150px;">Event Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>show.bs.popover</td>
      <td>This event fires immediately when the <code>show</code> instance method is called.</td>
    </tr>
    <tr>
      <td>shown.bs.popover</td>
      <td>This event is fired when the popover has been made visible to the user (will wait for CSS transitions to complete).</td>
    </tr>
    <tr>
      <td>hide.bs.popover</td>
      <td>This event is fired immediately when the <code>hide</code> instance method has been called.</td>
    </tr>
    <tr>
      <td>hidden.bs.popover</td>
      <td>This event is fired when the popover has finished being hidden from the user (will wait for CSS transitions to complete).</td>
    </tr>
    <tr>
      <td>inserted.bs.popover</td>
      <td>This event is fired after the <code>show.bs.popover</code> event when the popover template has been added to the DOM.</td>
    </tr>
  </tbody>
</table>

```javascript
var myPopoverTrigger = document.getElementById('myPopover')
myPopoverTrigger.addEventListener('hidden.bs.popover', function () {
  // do something...
})
```
