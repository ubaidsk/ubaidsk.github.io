---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-07-15'
description: 'GSoC 22: Blog 7'
series:
- GSoC 2022
tags:
- gsoc
title: Supporting Loops and Other Improvements
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all.

---

# Supporting Loops and Other Improvements

In this week, I added support for
- `loops`, `cycle` and `exit`.
- basic support for `abs()`, `mod()`
- other minor improvements

There was a minor challenge faced this week in supporting of the `abs/mod`.
The `abs` and `mod` functions are one of the first `runtime` functions to be supported by the `wasm` backend.
For supporting `mod/abs`, we need to use the `mod/abs` function from the `pure` `runtime` library.

When using the `mod/abs` function, it seems that the `ASR` includes every function from the parent module of `mod/abs`.
Since, the `ASR` seemed to include all the functions in the parent module of `mod/abs`, all of those were being
needed to be defined by the `WebAssembly` Backend during the `ASR->WASM` conversion.
I noticed that the `llvm` and `cpp` backends were defining only those functions from the parent of `mod/abs`,
which were actually being needed/used by `mod/abs`.
I wished to achieve/have a similar effect in the `WASM` Backend, that is, during the `ASR->WASM` conversion,
the `WebAssembly` Backend should only define the function `mod/abs` and any other necessary helper functions
being used by `mod/abs`. After playing with the code for some time (with no success), I later realized that,
there might be an `ASR->ASR` pass which removes the unused functions.
On inspecting the `cpp` backend, I found a pass named `pass_unused_functions()` which seemed to remove the
unused/extra functions being included in the `ASR`.
Using the `pass_unused_functions()`, the minor challenge was solved.


This phase was mostly/approximately from `09-07-2022` to `15-07-2022`.

The MRs during this phase are as follows:
- [!1830 WASM: Add support for Loop](https://gitlab.com/lfortran/lfortran/-/merge_requests/1830)
- [!1834 WASM: Various Improvements](https://gitlab.com/lfortran/lfortran/-/merge_requests/1834)

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
