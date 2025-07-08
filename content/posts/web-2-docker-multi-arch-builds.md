---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- web
date: '2025-07-08'
tags:
- web
- docker
- builds
- architecture
title: 'Multi-Arch Builds in Docker WSL & MacOS'
draft: true
---

# Introduction

By default, Docker builds images for the architecture of the host machine. A consequence of this is that you cannot run your docker image built on a linux machine (`amd64`) on a macos (apple silicon) machine  (`arm64`) or vice-versa. However, with multi-arch builds, you can create images that can run on multiple architectures. This is useful when you want to run your application on different architectures like `amd64` and `arm64`. The way it works is that docker builds the image for each architecture and then pushes them to a registry. When you pull the image, Docker automatically pulls the correct architecture for your machine. Let's see how to do this step by step. Here, I show it for WSL (Windows Subsystem for Linux) and MacOS.

# Prerequisites

To use docker we only need to have a docker runtime installed. I use Docker Desktop for Windows (as it has WSL integration) and Colima for MacOS.

## Windows Subsystem for Linux (WSL)

(Assuming you already have WSL installed with your preferred Linux distribution)

Install Docker Desktop for Windows, which includes WSL integration. Make sure to enable WSL integration in Docker settings.

![Docker WSL Integration](https://i.imgur.com/3Z5k4bH.png)

This should also make the Docker CLI available in your WSL terminal. I believe this inherently makes the Docker Compose CLI available as well.

```bash
$ docker --version
Docker version 28.2.2, build e6534b4
```

>ℹ️ You will need to have Docker Desktop running in the background for this to work.

## MacOS

(Assuming you have homebrew installed)

Install Colima, which is a lightweight container runtime for MacOS that supports multi-arch builds.

```console
brew install colima
```

```console
brew install docker docker-compose
```

You don't need docker-compose CLI plugin for multi-arch builds, but it is useful for managing multi-container applications.
Installing it here for a comprehensive setup.

Follow the on-screen instruction to add the docker compose plugin to docker config `~/.docker/config.json`. This allows you to invoke the docker compose CLI plugin using `docker compose` command instead of `docker-compose`.

```console
"cliPluginsExtraDirs": [
    "/opt/homebrew/lib/docker/cli-plugins"
]
```

# Setting Up Multi-Arch Builds

## WSL
