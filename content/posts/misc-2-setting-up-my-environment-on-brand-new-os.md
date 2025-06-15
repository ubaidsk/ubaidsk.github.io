---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- misc
date: '2025-06-15'
tags:
- os
- setup
title: Setting Up My Environment On Brand New OS
draft: true
---

I am writing this blog to note down my processes to run and tools to install when I have a brand new Operating System (OS) installed. I primarily use WSL (version 2) and MacOS as my development environments. Hence, you will find this blog tailored for these two OSes.

# Installing the tools and compilers

## Basic Tools

### WSL

```bash
sudo apt update
sudo apt install build-essential binutils curl git
```

### MacOS

```bash
# install xcode tools, homebrew, etc.
```

## micromamba: godfather of package management

Installing micromamba opens gateway for easily installing many other packages. I like to create a micromamba environment for almost all of my projects.

```bash

```

## WASM related

I often tinker around with wasm. Hence, I need `emscripten`, `wasmtime`, `wasi-sdk`.

```bash

```

## Compilers: C/C++, Python, Node/JS, Rust

Finally the most important tools. I use C, C++, Python, Node/JS and soon Rust. Hopefully Go will join this list soon.
For node, I use `nvm` (node version manager) to install and manage my node versions.

### WSL

```bash
sudo apt install clang
sudo apt python3 python3-pip python3-venv
# install nvm and then install node 18
# install rust
```

### MacOS

```bash

```

# Installing software applications

I use the following applications. I primarily use these because these are available for both Windows and MacOS.

## General

- Browser: Brave, Brave Beta, Chrome
- Video/Audio Player: VLC

## Coding related

- Code Editor: VSCode
  - Extensions: GitGraph, GitLens
- API testing: Bruno

## Communications

- WhatsApp
- Zulip
- Discord
- Slack

## Windows Specific

- WSL Manager
