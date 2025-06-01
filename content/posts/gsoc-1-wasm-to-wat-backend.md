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
description: 'GSoC 22: Blog 1'
series:
- GSoC 2022
tags:
- gsoc
- wasm
title: The Designing of the WASM->WAT Backend
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all. 

---

# The Designing of the WASM->WAT Backend

Traditionally, whenever there is a new feature added to `LFortran`, there is also a test case added.
This ensures proper working of the feature.
At the same, it also helps find/debug code breakings due to future contributions.

Given that we added a `ASR->WASM` backend in [!1713](https://gitlab.com/lfortran/lfortran/-/merge_requests/1713), we now needed to add a test case.
The `ASR->WASM` backend generates a `wasm` file, which is a binary file.
Using this binary file as a test reference was not a good idea, 
because if there were any changes in the binary file, it would not be obvious if we didn't break anything. So, the best way forward was to
implement a `WASM->WAT` backend. More details about this discussion are here [#689](https://gitlab.com/lfortran/lfortran/-/issues/689).

This phase was mostly/approximately from `22-05-2022` to `03-06-2022`.

The MRs during this phase are as follows:
- [!1748](https://gitlab.com/lfortran/lfortran/-/merge_requests/1748)
- [#4](https://github.com/certik/test_wasm/pull/4)
- [#5](https://github.com/certik/test_wasm/pull/5)
- [!1757](https://gitlab.com/lfortran/lfortran/-/merge_requests/1757) 

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
