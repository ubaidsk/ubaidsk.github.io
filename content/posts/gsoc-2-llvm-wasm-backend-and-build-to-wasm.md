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
description: 'GSoC 22: Blog 2'
series:
- GSoC 2022
tags:
- gsoc
- wasm
- lfortran
- fortran
title: Enabling LLVM Based WASM Backend and Build LFortran to WASM
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all. 

---

# Enabling LLVM Based WASM Backend and Build LFortran to WASM

Once we had testing enabled for the `wasm`-`wat` backends, our next goals were
1. To Enable `LLVM` based `WASM` Backend
2. To Compile `LFortran` to `WASM`

The `LLVM` based `WASM` backend is usefull for the release mode of `LFortran`, 
as it could generate a fast binary (although compilation may be slow).
A Challenge here is to get the `C runtime library` working.

Enabling `LLVM` based `WASM` Backend was perviously tried at [!1385](https://gitlab.com/lfortran/lfortran/-/merge_requests/).
I tried exaclty the same steps as in the MR [!1768](https://gitlab.com/lfortran/lfortran/-/merge_requests/1768), but no luck.
After much trial and error of trying different tools and different commands for those tools,
I found a way to use `emscripten` to achieve our target.
Some test cases compile and run smoothly, where as, some throw a warning/error about `mismatch` in `function signatures`.
More details about this is available on the same MR [!1768](https://gitlab.com/lfortran/lfortran/-/merge_requests/1768)

This phase was mostly/approximately from `05-06-2022` to `12-06-2022`.

The MRs during this phase are as follows:
- [!1768](https://gitlab.com/lfortran/lfortran/-/merge_requests/1768)
- [!1769](https://gitlab.com/lfortran/lfortran/-/merge_requests/1769)
- [!1796](https://gitlab.com/lfortran/lfortran/-/merge_requests/1796)

I also tried to `build`/`compile` `LFortran` to `wasm` during this phase. 
It seems to work. 
I am yet to make an official `MR` regarding the same.
I will update here as soon as I make a `MR`.

**Update:** 
I made an official `MR` at [!1796 WASM: Compile/Build LFortran to WASM](https://gitlab.com/lfortran/lfortran/-/merge_requests/1796) 
(also updated in the above MRs list).

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
