+++
title = "Static Feature Demonstration"
date = 2021-11-16
+++

## Styling
### Headers
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

### Font decorations
Here's **some bold text**, *some italic text*, and ***some bold and italic text***.

## Components

#### Code blocks
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

#### Icons
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