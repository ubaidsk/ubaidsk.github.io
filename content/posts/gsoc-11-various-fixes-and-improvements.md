---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-08-12'
description: 'GSoC 22: Blog 11'
series:
- GSoC 2022
tags:
- gsoc
- wasm
title: Various Fixes and Improvements in the WASM Backend
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all.

---

# Various Fixes and Improvements in the WASM Backend

This week has been amazing.
I worked on several small/minor fixes and improvements.
The improvements range from fixes in testing-infrastructure to supporting new features in the `wasm` backend.
The details are in the respective `PRs` below.

One of the unique findings this week was that our `wasm` testing infrastructure had a bug that
it would mark a test case as passing if it has a `wasm compile-time` failure.
Ideally, `compile-time` failure is also a `failure` that should/must be tracked/considered.
It happens that the `JavaScript` glue code that `lfortran` emits when `wasm` backend is used
had a `logical` error due to which on executing the generated `wasm`, `nodejs` exits without any error.
This anomaly was found in ([WASM: Using pass_array_by_data() #109](https://github.com/lfortran/lfortran/pull/109)) and
was hopefully fixed in ([WASM: Fix false integration tests passing #114](https://github.com/lfortran/lfortran/pull/114)).

Indeed, this was a very `fun` week.


This phase was mostly/approximately from `06-08-2022` to `12-08-2022`.

The MRs during this phase are as follows:
- [WASM: Supporting specifying max no of memory pages #103](https://github.com/lfortran/lfortran/pull/103)
- [WASM: Using pass_array_by_data() #109](https://github.com/lfortran/lfortran/pull/109)
- [WASM: Fix false integration tests passing #114](https://github.com/lfortran/lfortran/pull/114)
- [WASM: Initial implementation of x**2 #118](https://github.com/lfortran/lfortran/pull/118)
- [WASM: Implement set_exit_code() #123](https://github.com/lfortran/lfortran/pull/123)
- [WASM: Declaring a fixed enough memory #126](https://github.com/lfortran/lfortran/pull/126)
- [WASM: Use compile-time function value #127](https://github.com/lfortran/lfortran/pull/127)

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
