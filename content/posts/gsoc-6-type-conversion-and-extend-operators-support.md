---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-07-08'
description: 'GSoC 22: Blog 6'
series:
- GSoC 2022
tags:
- gsoc
title: Type Conversions and Supporting More Operators
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all. 

---

# Type Conversions and Supporting More Operators

This week, I worked on
- adding type conversion support to the `LFortran` `WASM` Backend
- supporting relational operators for integer (`i32` and `i64`), real (`f32` and `f64`), logical types
- supporting logical operators

With the help of `type-casting` and `logical` as well as `relational` operators, this week, we extended support to the previous weeks `if-else` implementation.
Next week, we will try to add support for `loop` in the `wasm` Backend. We will also, hopefully, add/enable `wasm` testing on `CI` in the coming week.


This phase was mostly/approximately from `02-07-2022` to `08-07-2022`.

The MRs during this phase are as follows:
- [!1822 WASM: Add Cast Support](https://gitlab.com/lfortran/lfortran/-/merge_requests/1822)
- [!1823 WASM: Support Relational Operators](https://gitlab.com/lfortran/lfortran/-/merge_requests/1823)
- [!1824 WASM: Support Logical Operators](https://gitlab.com/lfortran/lfortran/-/merge_requests/1824)

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
