---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-08-25'
description: 'GSoC 22: Report'
series:
- GSoC 2022
tags:
- gsoc
- wasm
- lfortran
- fortran
title: 'LFortran: IMPLEMENTING A CUSTOM WASM BACKEND'
---

# LFortran: IMPLEMENTING A CUSTOM WASM BACKEND
## GSoC'22 Report

<!--more-->

---

- **Organization:** Fortran-Lang
- **Mentors:** Ondrej Certik, Gagandeep Singh, Rohit Goswami
- **Contributor:** Ubaid Shaikh

---

This report summarizes the work done as part of my `GSoC 2022` project titled `LFortran: IMPLEMENTING A CUSTOM WASM BACKEND` at `LFortran`/`Fortran-Lang`.

## Project Outline:

The objective in this project is to implement a `WebAssembly` (`WASM`) Backend for the `LFortran` Compiler.
The goal is also to compile `LFortran` to `WASM` and deploy on a static webpage. Thus, this project aims
to add to `fortran` the capability of executing on the `World Wide Web`, the only truly universal platform.

## What was done:

Our project was mostly completed in four phases as follows:

- **Pre-GSoC Phase:** During this phase we iterated over the design of the `wasm` backend and implemented it.
The weekly blogs during this phase are as follows:
    - [Pre-GSoC Blog 1: Contributing to Integration Tests](https://www.ubaidshaikh.me/blogs/gsoc_0~1_contributing_to_integration_tests)

    - [Pre-GSoC Blog 2: The Designing of the ASR->WASM Backend](https://www.ubaidshaikh.me/blogs/gsoc_0~2_asr_to_wasm_backend)

- **GSoC Phase-1:** During this phase we designed the `wat` backend and added initial support for compiling `lfortran` to `wasm`. We also deployed the built `lfortran` `wasm` binary to a live site. The weekly blogs during this phase are as follows:
    - [GSoC Blog 1: The Designing of the WASM->WAT Backend](https://www.ubaidshaikh.me/blogs/gsoc_1_wasm_to_wat_backend)

    - [GSoC Blog 2: Enabling LLVM Based WASM Backend and Build LFortran to WASM](https://www.ubaidshaikh.me/blogs/gsoc_2_llvm_wasm_backend_and_build_to_wasm)

    - [GSoC Blog 3: Extending WASM and WAT Backends](https://www.ubaidshaikh.me/blogs/gsoc_3_extending_wasm_and_wat_backends)

    - [GSoC Blog 4: Adding Print support and Deploying on Live Site](https://www.ubaidshaikh.me/blogs/gsoc_4_print_and_lcompilers_frontend)

- **GSoC Phase-2:** Now that we had the `wasm` backend, the `wat` backend and compilation of `lfortran` to `wasm`.
The next part of the project was to extend the `wasm` and `wat` backends to support more features of `fortran`/`ASR`. This extension of both the backends was accomplished in this phase. The weekly blogs during this phase are as follows:
    - [GSoC Blog 5: NodeJS Testing Infrastructure and Supporting Basic If-Else](https://www.ubaidshaikh.me/blogs/gsoc_5_nodejs_testing_and_basic_if_else)

    - [GSoC Blog 6: Type Conversions and Supporting More Operators](https://www.ubaidshaikh.me/blogs/gsoc_6_type_conversion_and_extend_operators_support)

    - [GSoC Blog 7: Supporting Loops and Other Improvements](https://www.ubaidshaikh.me/blogs/gsoc_7_loops_and_various_improvements)

    - [GSoC Blog 8: Supporting Subroutines and Improving/Refactoring WASM Backend](https://www.ubaidshaikh.me/blogs/gsoc_8_subroutines_and_refactoring)

    - [GSoC Blog 9: Initial Support for Arrays](https://www.ubaidshaikh.me/blogs/gsoc_9_supporting_arrays)

    - [GSoC Blog 10: Supporting Multi-Dimensional Arrays and WASM Testing at CI](https://www.ubaidshaikh.me/blogs/gsoc_10_multi_dim_arrays_and_wasm_testing_at_ci)

    - [GSoC Blog 11: Various Fixes and Improvements in the WASM Backend](https://www.ubaidshaikh.me/blogs/gsoc_11_various_fixes_and_improvements)

- **GSoC Ending Phase:** This comprises the final week(s) of GSoC where we focused on `CI` (Continuous Integration) support for wasm building, its storage and some final features and fixes. The blog during this phase is as follows:
    - [GSoC Blog 12: Supporting Several Features and Final Fixes](https://www.ubaidshaikh.me/blogs/gsoc_12_several_features_and_final_fixes)

### Merge/Pull Requests

The `merge`/`pull` requests submitted during the period of `GSoC` from (approx)`23-05-2022` to `23-08-2022` are as follows:

At `Gitlab/lfortran`:

- [Wasm backend #1713](https://gitlab.com/lfortran/lfortran/-/merge_requests/1713)

- [Add wasm_to_wat backend #1757](https://gitlab.com/lfortran/lfortran/-/merge_requests/1757)

- [Enable LLVM based wasm backend #1769](https://gitlab.com/lfortran/lfortran/-/merge_requests/1769)

- [Refactor wasm backend #1787](https://gitlab.com/lfortran/lfortran/-/merge_requests/1787)

- [WASM: Support i64 Constants #1789](https://gitlab.com/lfortran/lfortran/-/merge_requests/1789)

- [WASM: Support Unary Minus for i32 and i64 #1791](https://gitlab.com/lfortran/lfortran/-/merge_requests/1791)

- [WASM: Add support for f32 and f64 #1792](https://gitlab.com/lfortran/lfortran/-/merge_requests/1792)

- [WASM: Code Refactor and Minor Improvements #1793](https://gitlab.com/lfortran/lfortran/-/merge_requests/1793)

- [WASM: Add print support #1794](https://gitlab.com/lfortran/lfortran/-/merge_requests/1794)

- [WASM: parse empty source code #1795](https://gitlab.com/lfortran/lfortran/-/merge_requests/1795)

- [WASM: Compile/Build LFortran to WASM #1796](https://gitlab.com/lfortran/lfortran/-/merge_requests/1796)

- [WASM: Add support for stop and error stop #1797](https://gitlab.com/lfortran/lfortran/-/merge_requests/1797)

- [WASM: NodeJS Testing Infrastructure #1808](https://gitlab.com/lfortran/lfortran/-/merge_requests/1808)

- [WASM: Add support for basic If-Else #1809](https://gitlab.com/lfortran/lfortran/-/merge_requests/1809)

- [WASM: Minor Improvements #1810](https://gitlab.com/lfortran/lfortran/-/merge_requests/1810)

- [WASM: Suggested Minor Refactor #1811](https://gitlab.com/lfortran/lfortran/-/merge_requests/1811)

- [WASM: Add Cast Support #1822](https://gitlab.com/lfortran/lfortran/-/merge_requests/1822)

- [WASM: Support Relational Operators #1823](https://gitlab.com/lfortran/lfortran/-/merge_requests/1823)

- [WASM: Support Logical Operators #1824](https://gitlab.com/lfortran/lfortran/-/merge_requests/1824)

- [WASM: Add support for Loop #1830](https://gitlab.com/lfortran/lfortran/-/merge_requests/1830)

- [WASM: Various Improvements #1834](https://gitlab.com/lfortran/lfortran/-/merge_requests/1834)

At `GitHub/lfortran`:

- [WASM: Improvements and Refactoring #13](https://github.com/lfortran/lfortran/pull/13)

- [WASM: Add support for Subroutines #21](https://github.com/lfortran/lfortran/pull/21)

- [Refactor: WASM: Extract common return #27](https://github.com/lfortran/lfortran/pull/27)

- [WASM: Initial support for Arrays #49](https://github.com/lfortran/lfortran/pull/49)

- [WAT: Arrays Fix #55](https://github.com/lfortran/lfortran/pull/55)

- [WASM: Support Real and Logical types with Arrays #66](https://github.com/lfortran/lfortran/pull/66)

- [WASM: Supporting Multi-Dimensional Arrays #70](https://github.com/lfortran/lfortran/pull/70)

- [CI: Support integration tests testing for WASM #71](https://github.com/lfortran/lfortran/pull/71)

- [Pass: Passing Array descriptor by value #77](https://github.com/lfortran/lfortran/pull/77)

- [WASM: Supporting array passing with explicit shapes #99](https://github.com/lfortran/lfortran/pull/99)

- [WASM: Supporting specifying max no of memory pages #103](https://github.com/lfortran/lfortran/pull/103)

- [WASM: Using pass_array_by_data #109()](https://github.com/lfortran/lfortran/pull/109)

- [WASM: Fix false integration tests passing #114](https://github.com/lfortran/lfortran/pull/114)

- [WASM: Implement set_exit_code #123()](https://github.com/lfortran/lfortran/pull/123)

- [Support kind for different param types #124](https://github.com/lfortran/lfortran/pull/124)

- [WASM: Declaring a fixed enough memory #126](https://github.com/lfortran/lfortran/pull/126)

- [WASM: Use compile-time function value #127](https://github.com/lfortran/lfortran/pull/127)

- [WASM: Support bind C for array passing to JavaScript #153](https://github.com/lfortran/lfortran/pull/153)

- [CI: Building LFortran to WASM #157](https://github.com/lfortran/lfortran/pull/157)

- [WASM: Support WAT for bind(c) functions #588](https://github.com/lfortran/lfortran/pull/588)

- [CI: Fix CI and upload to wasm_builds #619](https://github.com/lfortran/lfortran/pull/619)

- [CI: Fix upload to wasm_builds #622](https://github.com/lfortran/lfortran/pull/622)

- [WAT: verify preamble #631](https://github.com/lfortran/lfortran/pull/631)

- [CI: Fix: Overwrite the latest_commit file #632](https://github.com/lfortran/lfortran/pull/632)

- [WAT: wasm_to_wat error handling #634](https://github.com/lfortran/lfortran/pull/634)

- [WASM: Support defining functions in any order #635](https://github.com/lfortran/lfortran/pull/635)

- [WASM: Enable supporting integration_tests #636](https://github.com/lfortran/lfortran/pull/636)

- [WASM, WAT: Improve code formatting #637](https://github.com/lfortran/lfortran/pull/637)

- [WASM: Support basic string variables #640](https://github.com/lfortran/lfortran/pull/640)

- [WASM: Add support for cpu_time #641](https://github.com/lfortran/lfortran/pull/641)

- [WASM: Remove function with no body warning #642](https://github.com/lfortran/lfortran/pull/642)

- [WASM: Support runtime library #643](https://github.com/lfortran/lfortran/pull/643)

- [WASM: Fix import functions bug #657](https://github.com/lfortran/lfortran/pull/657)

At `GitHub/lcompilers_frontend`:

- [CI: Add CI for auto deploying site #1](https://github.com/lfortran/lcompilers_frontend/pull/1)

- [Minor improvements #18](https://github.com/lfortran/lcompilers_frontend/pull/18)

- [Rename master branch to main #19](https://github.com/lfortran/lcompilers_frontend/pull/19)

- [Download files from wasm builds #30](https://github.com/lfortran/lcompilers_frontend/pull/30)

- [CI: trigger on post request #35](https://github.com/lfortran/lcompilers_frontend/pull/35)

- [Support cpu_time #36](https://github.com/lfortran/lcompilers_frontend/pull/36)

- [Support runtime library #37](https://github.com/lfortran/lcompilers_frontend/pull/37)

- [Increment lfortran latest_commit #39](https://github.com/lfortran/lcompilers_frontend/pull/39)

- [Update latest_commit #40](https://github.com/lfortran/lcompilers_frontend/pull/40)

## Outcome:

The outcomes of the project are the following:

- A `WASM` Backend for `LFortran`

- A `WAT` Backend for `LFortran`

- `LFortran` (along with its `runtime library`) compiles to `WASM` using `emscripten`

- `CI` (Continuous Integration) support for building to `wasm` and storing built `lfortran` `wasm`
at [lfortran/wasm_builds](https://github.com/lfortran/wasm_builds/)

- A frontend for the static webpage (at [dev.lfortran.org](https://dev.lfortran.org/)) where we deploy our `lfortran` `wasm` binary and can see it live in action

- `CI` (Continuous Integration) support for building the frontend site

### Live Demo:

![Mandelbrot Demo](/images/GSoCReport1.gif)

![Tabs Demo](/images/GSoCReport2.gif)

## Future Work:
There are tremendous possiblities of extending this work. Some of the future work includes the following:

- **Extending the current `wasm` and `wat` backends:** Adding support for dynamic memory allocation and thus `array` allocations during runtime. Supporting `structs` and derived types in the `wasm` and `wat` backends.

- **More Robutness:** Finding and fixing bugs in the current `wasm` and `wat` backends. Some of the issues are noted at [WASM: Future Prospects #597](https://github.com/lfortran/lfortran/issues/597) and fixing them would (hopefully) make our `wasm` architecture more robust.

- **Supporting WASI:** One of the directions could be to add support of `WASI` (`WebAssembly System Interface`) to the `LFortran` `WASM` Backend.

- **Data Visualization:** We could also try to explore data visualization using `fortran`.

## My Learnings

It has been an incredible journey, full of fun and learning for me.

Following is a list of my learnings (including but not limited to):

- **GIT:** I got to learn/improve `version control` (`git`) skills.
I learnt `rebasing`, `resetting` (hard, soft) and `cherry-picking` commits.
Previously, I used to be afraid of `merge` conflicts and now, I enjoy resolving them.

- **WASM:** This project provided me with the wonderful opportunity to understand how binaries are created and processed.
I got to learn about the `wasm` structure and its textual format (`wat`).

- **NextJS:** I got to learn about `NextJS`. We used `NextJS` while building the `lcompilers_frontend`.

- **CI:** I also got the opportunity to work towards the `CI` (Continuous Integration) part during the course of the project.

- **CMake:** I also got the opportunity to get my hands onto `CMake` during the course of the project.

- **Fortran:** I got to learn about `fortran`. I learned about `intrinsic` functions, `runtime library`, etc.

- **Compilers:** I got the opportunity to learn how a `compiler` works, specifically the `backend`/`codegen` part.

- **Conda:** This was the first time for me using `conda` and I realized how powerful `conda` environments could be.

and the list goes on.

Indeed, I think this project has made me a better programmer, problem solver, analyzer and communicator.

I am thankful to Ondrej Sir and team for accepting me in this project.
Thank you so much for this wonderful journey and amazing experience throughout.
