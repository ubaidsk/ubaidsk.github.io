---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-06-17'
description: 'Pre-GSoC 22: Blog 2'
series:
- GSoC 2022
tags:
- gsoc
- wasm
title: The Designing of the ASR->WASM Backend
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all. 

---

# The Designing of the ASR->WASM Backend

After working towards `integration tests` for sometime, I tried to work towards the `wasm` backend [#583](https://gitlab.com/lfortran/lfortran/-/issues/583).
Initially, we were hoping to use [wasmblr](https://github.com/bwasti/wasmblr) to build our `wasm` backend. 
But it turns out that [wasmblr](https://github.com/bwasti/wasmblr) did not support generating function bodies programmatically (more details [here](https://gitlab.com/lfortran/lfortran/-/issues/583#note_914651295)).
Also, [wasmblr](https://github.com/bwasti/wasmblr) does not have support for generating `wat` (WebAssembly Text) Format (more details [here](https://github.com/bwasti/wasmblr/issues/3)).
Both of which were critical to us.

So, initially, I built a prototype of the  `wasm` backend using [binaryen](https://github.com/WebAssembly/binaryen).
[Binaryen](https://github.com/WebAssembly/binaryen) had its own short-comings. 
We needed the `wasm` backend to be small in size, simple to maintain and efficient in performance.
[Binaryen](https://github.com/WebAssembly/binaryen) did not meet the first two of these requirements.
Therefore, finally, we implemented a custom `wasm` backend for `LFortran`.

This phase was mostly/approximately from `12-04-2022` to `02-05-2022`.

The MRs in this phase are as follows:
- [!1704](https://gitlab.com/lfortran/lfortran/-/merge_requests/1704)
- [!1705](https://gitlab.com/lfortran/lfortran/-/merge_requests/1705)
- [#1](https://github.com/certik/test_wasm/pull/1)
- [!1713](https://gitlab.com/lfortran/lfortran/-/merge_requests/1713)

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
