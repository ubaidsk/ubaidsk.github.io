---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-06-24'
description: 'GSoC 22: Blog 4'
series:
- GSoC 2022
tags:
- gsoc
title: Adding Print support and Deploying on Live Site
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all. 

---

# Adding Print support and Deploying on Live Site

In this week, I-  
- added support for printing in the generated wasm binary
- added support for stop and error stop
- built the LCompilers Frontend for `LFortran` (compiled to `wasm`) and deployed it to `GitHub Pages` with the compiled `lfortran wasm binary`.

I also worked on my **Compiling LFortran to wasm** task of Week/Blog 2. The same blog has been updated and can be found [here](/blogs/gsoc_2_llvm_wasm_backend_and_build_to_wasm).

During this weeks endeavour, I faced challenges at two places:

1. After upgrading my `node` version (as stated [here](https://gitlab.com/lfortran/lfortran/-/merge_requests/1789#note_991964306)), my `emscripten` stopped working.
I needed `emscripten` to compile `LFortran` to `wasm`. Things started working when I successfully uninstalled my upgraded `node` and reinstalled `emscripten`.
And I was able to build `LFortran` to `wasm` using `emscripten`.

2. Even though `emscripten` was fixed and `LFortran` was successfully compiling to `wasm`, it did not have `C++ exceptions` support.
As per [!1549](https://gitlab.com/lfortran/lfortran/-/merge_requests/1549), we need to add the flag `-fexceptions` to enable exception support.
Even after including the `-fexceptions` flags, exceptions were still not being supported.
Without `exceptions` support the `LCompilers Frontend` was not showing the hints/feedback if there were errors in the source code.
I tried different combination of `emscripten` flags and finally found that 
    - the flag `-s STANDALONE_WASM` was somehow not-allowing/disabling `exceptions` support
    - apart from including `-fexceptions` as `emscripten` flags, `-fexceptions` is also needed to be included as `CXX_DEBUG_FLAGS` in the `build_to_wasm.sh` script


This phase was mostly/approximately from `18-06-2022` to `24-06-2022`.

The MRs during this phase are as follows:
- [!1794 WASM: Add print support](https://gitlab.com/lfortran/lfortran/-/merge_requests/1794)
- [!1795 WASM: parse empty source code](https://gitlab.com/lfortran/lfortran/-/merge_requests/1795)
- [!1797 WASM: Add support for stop and error stop](https://gitlab.com/lfortran/lfortran/-/merge_requests/1797)

Also,

GitHub Repo for Frontend: [https://github.com/Shaikh-Ubaid/lcompilers_frontend](https://github.com/Shaikh-Ubaid/lcompilers_frontend)

Live Site: [https://shaikh-ubaid.github.io/lcompilers_frontend/](https://shaikh-ubaid.github.io/lcompilers_frontend/)

Upcoming Tasks for next week:
- Building a NodeJS testing infrastructure [#712](https://gitlab.com/lfortran/lfortran/-/issues/712)
- Adding support for `if-else` statements in the `WASM Backend` [#700](https://gitlab.com/lfortran/lfortran/-/issues/700)

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
