---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-07-29'
description: 'GSoC 22: Blog 9'
series:
- GSoC 2022
tags:
- gsoc
title: Initial Support for Arrays
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all.

---

# Initial Support for Arrays

This week, I worked towards supporting `Arrays` in the `WebAssembly` Backend.
The `WebAssembly` Backend now supports `1D` `Integer`, `Real` and `Logical` `Arrays`.

One of the challenges this week was the unexpected the call stack being observed.
For example, for the following statment:
``` python
x = [ 5, 7, 6, 8 ]
```

The `visitor` functions that are expected to be called are `visit_Assignment()` followed by `visit_Var()` and `visit_ArrayConstant()`.
In practice, the `visitor` function call stack that was being experienced was `visit_Assignment()` followed by `visit_ArrayItem()` and `visit_IntegerConstant()`.
This experienced call stack was completely `out-of-sync` with the expected call stack.
After some debugging attempts with no success, I reached out to mentors about the issue.

Fortunately, one of the mentors ([@Gangandeep](https://github.com/czgdp1807)) understood the anomaly straightaway and shared that
there is a `pass_replace_implied_do_loops()` which was transforming the statment

``` python
x = [ 5, 7, 6, 8 ]
```

into a `DoLoop` as follows:

``` python
do i = 1, 4
    x[i] = value_from_the_constant_list
end do
```

and that is why, the calls to `visit_ArrayItem()` and `visit_IntegerConstant()`.
Thank you so much [@Gangandeep](https://github.com/czgdp1807) for helping me.
I think without you this issue would have taken a lot more time.

This phase was mostly/approximately from `23-07-2022` to `29-07-2022`.

The MRs during this phase are as follows:
- [WASM: Initial support for Arrays #49](https://github.com/lfortran/lfortran/pull/49)
- [WAT: Arrays Fix #55](https://github.com/lfortran/lfortran/pull/55)
- [WASM: Support Real and Logical types with Arrays #66](https://github.com/lfortran/lfortran/pull/66)

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
