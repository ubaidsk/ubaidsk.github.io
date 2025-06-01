---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-08-05'
description: 'GSoC 22: Blog 10'
series:
- GSoC 2022
tags:
- gsoc
- wasm
title: Supporting Multi-Dimensional Arrays and WASM Testing at CI
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all.

---

# Supporting Multi-Dimensional Arrays and WASM Testing at CI

During this week, I worked on adding support for `Mult-Dimensional Arrays` in the `WebAssembly` Backend.
I also worked on supporting `integration tests` `testing` for `WASM` at the `CI`.

One of the challeges in this week was to figure out passing of the `dimensional` information of `arrays`
during `function`/`subroutine` calls.
It seems, one of the possible ways to do so is to use/implement `array descriptor` support in the `WebAssembly` Backend.
I tried supporting the `array descriptor` idea in [WASM: Initial Support for Array Descriptor #98](https://github.com/lfortran/lfortran/pull/98),
but could not figure out a good/acceptable implementation for it.

Currently, as suggested by [Ondřej](https://github.com/certik), we are trying to pass `array dimensions` explicitly as `function parameters`.
There is an `ASR->ASR` pass under implementation at [Add ASR pass for supporting passing array arguments by data pointer #87](),
which would hopefully/possibly transform the following
``` python
subroutine f(a, b)
integer :: a(:,:)
real :: b(:,:,:)
end subroutine
```
into
``` python
subroutine f(na1, na2, a, nb1, nb2, nb3, b)
integer, intent(in) :: na1, na2, nb1, nb2, nb3
integer :: a(na1, na2)
real :: b(nb1, nb2, nb3)
end subroutine
```
and also update the respective `function`/`subroutine` calls as follows:
``` python
call f(x, y)
```
to
``` python
call f(size(x,1), size(x, 2), x, size(y, 1), size(y, 2), size(y, 3), y)
```

This suggested approach (which looks good and beautiful) can enable the `wasm` backend
to support passing arrays (along with their dimensional information) to `functions`/`subroutines`.
I submitted a `PR` at [WASM: Supporting array passing with explicit shapes #99](https://github.com/lfortran/lfortran/pull/99)
which supports this approach in the `wasm` backend.

This phase was mostly/approximately from `30-07-2022` to `05-08-2022`.

The MRs during this phase are as follows:
- [WASM: Supporting Multi-Dimensional Arrays #70](https://github.com/lfortran/lfortran/pull/70)
- [CI: Support integration tests testing for WASM #71](https://github.com/lfortran/lfortran/pull/71)
- [WASM: Initial Support for Array Descriptor #98](https://github.com/lfortran/lfortran/pull/98)
- [WASM: Supporting array passing with explicit shapes #99](https://github.com/lfortran/lfortran/pull/99)

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
