---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-07-01'
description: 'GSoC 22: Blog 5'
series:
- GSoC 2022
tags:
- gsoc
title: NodeJS Testing Infrastructure and Supporting Basic If-Else
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all. 

---

# NodeJS Testing Infrastructure and Supporting Basic If-Else

This week's work mostly comprises of the following in the `LFortran` `WASM` Backend:  
- basic support for `integration_tests` using `nodejs`
- basic support for `if-else` statements
- minor improvements

In this week, a fun/interesting part was to figure out the basic implementation for `wasm` `if-else` statements.
As per the [WebAssembly docs](https://webassembly.github.io/spec/core/binary/instructions.html#control-instructions), 
it seemed that the `wasm` `if-else` instruction requires a `type/signature`.
This `type/signature` consists of the `parameter` types (the types that would be present on the `stack` just before the execution of the `if-else`)
and the `result` types (the types that would be present on the `stack` just after the execution of the `if-else`).
This `type/signature` is not readily available in our `ASR`, 
and we had two ideas for obtaining this `type/signature` of the `wasm` `if-else` instruction:
1. Writing a `visitor` function that would return us the `parameter` and `result` types necessary for the `wasm` `if-else` instruction.
2. Using a `stack` variable in the `ASR->WASM` Backend that keeps track of the types currently present in the function's `stack`. 
So, just before and after the `if-else` we can quickly look up the `stack` variable and get the `parameter` and `result` types respectively.

During the basic implementation of `if-else`, I realized the we might not need the `parameter` and `result` types as, in most of the cases,
`if-else` do not consume any value and do not return any value. Thus, an emtpy/epsilon type should also work.
So, currently, I implemented the basic version of `if-else` statements without their `type/signature`.
Hopefully, it works. We will update the implementation, if in case there is any issue in the future.


This phase was mostly/approximately from `25-06-2022` to `01-07-2022`.

The MRs during this phase are as follows:
- [!1808 WASM: NodeJS Testing Infrastructure](https://gitlab.com/lfortran/lfortran/-/merge_requests/1808)
- [!1809 WASM: WASM: Add support for basic If-Else](https://gitlab.com/lfortran/lfortran/-/merge_requests/1809)
- [!1810 WASM: Minor Improvements](https://gitlab.com/lfortran/lfortran/-/merge_requests/1810)
- [!1811 WASM: Suggested Minor Refactor](https://gitlab.com/lfortran/lfortran/-/merge_requests/1811)

Upcoming Tasks:
- NodeJS testing for `CI`: [#712](https://gitlab.com/lfortran/lfortran/-/issues/712), and this [comment](https://gitlab.com/lfortran/lfortran/-/merge_requests/1808#note_1012029577)
- Improve support for `if-else` statements

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
