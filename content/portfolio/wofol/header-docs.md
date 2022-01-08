+++
title = "Header Customization"
description = "Links, icons, and more!"
date = 2021-01-07


[extra]
header = "../header-docs.jpg"
status = 1

[[extra.timeline]]
date = 2022-01-07
description = "Created This Page"
[[extra.timeline]]
date = 2022-01-01
description = "New Years!"
[[extra.timeline]]
date = 2021-11-11
description = "Wofol Project Started"

[[extra.link]]
href = "https://github.com/Ryan778/Wofol"
text = "Wofol Source"
icon = "code"
+++

## Timeline
Use `[[extra.timeline]]` if you'd like to give more details on the history of a particular page. You can list multiple dates along with a short description next to each date. 

```toml
[[extra.timeline]]
date = 2022-01-07
description = "Created This Page"

[[extra.timeline]]
date = 2022-01-01
description = "New Years!"

[[extra.timeline]]
date = 2021-11-11
description = "Wofol Project Started"
```

## Links
Use `[[extra.link]]` to specify external links, like the "Wofol Source" link on the top right of this page. 

```toml
[[extra.link]]
href = "https://github.com/Ryan778/Wofol"
text = "Wofol Source"
icon = "code"
```