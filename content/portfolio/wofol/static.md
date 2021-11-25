+++
title = "Static Feature Demonstration"
date = 2021-11-16
+++

Static features **do not** require JavaScript. Static components are implemented using only HTML and CSS!
## Styling
### Headers
Each header is exponentially smaller than the previous header. 

> # Heading 1
> Some text
> ## Heading 2
> Some more text
> ### Heading 3
> Here's some text
> #### Heading 4
> And more text
> ##### Heading 5
> Look at all this text!
> ###### Heading 6

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