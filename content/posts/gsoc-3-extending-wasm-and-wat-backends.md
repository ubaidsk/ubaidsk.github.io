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
description: 'GSoC 22: Blog 3'
series:
- GSoC 2022
tags:
- gsoc
- wasm
title: Extending WASM and WAT Backends
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all. 

---

# Extending WASM and WAT Backends

In this phase, I focused on extending the `WASM` and `WAT` Backends.
Specifically, I added support for 

- `i64` constants/literals
- `unary minus` for `i32` and `i64`
- floating points `f32` and `f64`
    - constants/literals
    - unary minus
    - basic arithmetic operations

I also refactored the `WASM` and `WAT` Backends to hopefully improve them.

A challenge I faced during this phase was during the decoding the `i64` constants in the `WASM->WAT` backend.
I was following [Wikipedia/LEB128](https://en.wikipedia.org/wiki/LEB128) for the encoding and decoding of `u32` and `i32` constants.
I followed the same for `i64` constants for encoding as well as decoding.
Even after following the same/similar algorithm as given in [Wikipedia/LEB128](https://en.wikipedia.org/wiki/LEB128),
the decoding was still not working correctly.
After much research, I found [this](https://llvm.org/doxygen/LEB128_8h_source.html) which helped me find out the bug.

The bug was in the following code:
```cpp
byte = next byte in input;
result |= (byte & 0x7f) << shift;
shift += 7;
```

We see that in the middle line in the above code, we have `(byte & 0x7f) << shift`.
Since `byte` is of `8 bits` and `0x7f` is of `32 bits`, the result will be of `32 bits` and this is fine when `shift < 32`.
Therefore, this code works for `i32` and `u32`, 
but did not work for `i64` as we might/would lose bits once the `shift` which might be `>= 32` is applied .

The following code fixes the above issue:
```cpp
byte = next byte in input;
uint64_t slice = (byte & 0x7f);
result |= slice << shift;
shift += 7;
```

This phase was mostly/approximately from `13-06-2022` to `17-06-2022`.

The MRs during this phase are as follows:
- [!1787](https://gitlab.com/lfortran/lfortran/-/merge_requests/1787)
- [!1789](https://gitlab.com/lfortran/lfortran/-/merge_requests/1789)
- [!1791](https://gitlab.com/lfortran/lfortran/-/merge_requests/1791)
- [!1792](https://gitlab.com/lfortran/lfortran/-/merge_requests/1792)
- [!1793](https://gitlab.com/lfortran/lfortran/-/merge_requests/1793)

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
