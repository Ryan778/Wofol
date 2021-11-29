+++
title = "Static Feature Demonstration"
description = "Features and components that don't use any JS"
date = 2021-11-16

[extra] 
header = "../static.jpg"
+++

Static features **do not** require JavaScript. Static components are implemented using only HTML and CSS!
## Styling

### Image Headers
By adding the key `header` under `extra` in the page metadata, a header image can be specified for the post. This image will be used both on the portfolio entries list and in the page itself. 

Example: 
```md
[extra] 
header = "../static.jpg"
```

Note that this is **not required**. If you take a look at the [sample blog post](../../demo/blog-post/), you can see that it renders and looks just fine without the header photo. 

### Content Headers
Each header is exponentially smaller than the previous header. 

> <h1>Heading 1</h1>
> Some text
> <h2>Heading 2</h2>
> Some more text
> <h3>Heading 3</h3>
> Here's some text
> <h4>Heading 4</h4>
> And more text
> <h5>Heading 5</h5>
> Look at all this text!
> <h6>Heading 6</h6>

### Fonts
The default typeface chosen follows the advice of *the best font is the one you don't notice*. This, however, can be easily changed by modifying the `base.html` and `base.scss` files.
- Header font (page titles, headers): Source Sans Pro
- Monospace font (code blocks): Source Code Pro
- Body font (everything else): *OS-Defined Sans Serif Font*

### Font decorations
Here's **some bold text**, *some italic text*, and ***some bold and italic text***.

## Components

### Code blocks
JavaScript:
```javascript
function add(x, y) {
  return x + y;
}
```

Markdown:
```md
# Code block inception
Markdown *within* markdown!
```

...and many more!

### Icons
Based off of [Google's Material Icons](https://fonts.google.com/icons). 
- {{ icon(id="waving_hand") }} Hello world! 
- {{ icon(id="check") }} All done. 
- {{ icon(id="shopping_basket") }} Check out?

```md
<!-- Icon shortcode -->
- {{/* icon(id="waving_hand") */}} Hello world! 
- {{/* icon(id="check") */}} All done. 
- {{/* icon(id="shopping_basket") */}} Check out?
```

### Accordions
{% accordion(summary="Hello World!") %}
You found me, hi there!

**Markdown** also works in *accordions*. {{ icon(id="style") }}
{% end %}

```md
<!-- Use the accordion shortcode to create accordions. -->
{%/* accordion(summary="Hello World!") */%}
  You found me, hi there!

  **Markdown** also works in *accordions*. {{ icon(id="style") }}
{%/* end */%}
```