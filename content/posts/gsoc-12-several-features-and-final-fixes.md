---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-08-23'
description: 'GSoC 22: Blog 12'
series:
- GSoC 2022
tags:
- gsoc
title: Supporting Several Features and Final Fixes
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all.

---

# Supporting Several Features and Final Fixes

Hi all, this was the final week of `GSoC`.
It was full of fun and learning. 
In this week, I worked on several features, which range from
automating the upload of wasm builds at `CI`
to implementing support for the `runtime` library.

We added the following features to the `wasm` backend during this week:
- Support for `runtime` library at [https://dev.lfortran.org/](https://dev.lfortran.org/)
- Support for defining functions in any order
- Support for basic string variables
- Support for importing functions from `JS` using `bind(C)` and interface approach
- Uploading the built `lfortran.js`, `lfortran.wasm` and `lfortran.data` to [https://github.com/lfortran/wasm_builds](https://github.com/lfortran/wasm_builds)
- Several minor (yet important) features/fixes

This phase was mostly/approximately from `13-08-2022` to `23-08-2022`.

The MRs during this phase are as follows:

At `lfortran`:
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

At `lcompilers_frontend`:
- [Download files from wasm builds #30](https://github.com/lfortran/lcompilers_frontend/pull/30)
- [CI: trigger on post request #35](https://github.com/lfortran/lcompilers_frontend/pull/35)
- [Support cpu_time #36](Support cpu_time #36)
- [Support runtime library #37](https://github.com/lfortran/lcompilers_frontend/pull/37)
- [Increment lfortran latest_commit #39](https://github.com/lfortran/lcompilers_frontend/pull/39)

---

That's all for this blog. Thank you for your time.
