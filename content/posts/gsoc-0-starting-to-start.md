---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- gsoc
date: '2022-06-06'
description: My GSoC 2022 Journey started this way ...
series:
- GSoC 2022
tags:
- gsoc
title: 'GSoC 22: Starting to Start'
---

# Hey there 🤗, Welcome to my GSoC Journey

<!--more-->

This is a series of blogs that I am writing to share my amazing **GSoC 22** (Google Summer of Code 2022) Journey with you all. 

I was inspired towards **GSoC** by our Legendary Seniors - [Vishnu Narayan K.I.](https://github.com/vn-ki)  and [Priyanshu Varshney](https://medium.com/@priyanshuvarshney) - both ex-GSoCers. 
I read this [great blog](https://medium.com/modern-fortran/first-year-of-fortran-lang-d8796bfa0067?source=user_profile---------2----------------------------) by [Milan Curcic](https://github.com/milancurcic). It touched my ❤️ and motivated me to contribute towards **LFortran**. I applied to **GSoC** this year (2022) and fortunately, I am accepted as a contributor in **GSoC** 2022 for the project titled **LFortran: IMPLEMENTING A CUSTOM WASM BACKEND** under the **Fortran-Lang** umbrella. I am thankful to [Ondřej Čertík](https://ondrejcertik.com/) for believing in me and for giving me this wonderful opportunity.

# Starting to Start

It all started with the following:

![gsoc_start_mail](/images/gsoc_start_mail.png)
![gsoc_start_mail_response](/images/gsoc_start_mail_response.png)

Thanks to Ondřej, after installing `llvm 11.0`, all the tests ran successfully and the code-setup was successful. 

## Misellaneous Setup

From past few years, I used to use **HTTPS** for *git push* and *pull*. It seems, since recently, **HTTPS** has been deprecated and we need to use **SSH** to be able to push and pull changes. For setting up **SSH**, we need to generate public-private key pair, out of which the public-key is to be uploaded to GitHub/GitLab and private key is kept at (by default)`~/.ssh`. Hopefully, this setup was also completed successfully.

## First Learning

Initially, I added a test case related to `minval` and `maxval` array intrinsic functions. Now, comes the hard part for me. I was a bit inexperienced with using `git`. I guess I mostly knew two `git` commands - `git pull` and `git push`. I did knew how to fork and and how to commit and push changes (I got to learn this by participating in [Hacktoberfest](https://hacktoberfest.digitalocean.com/) 2019), but did not know how to pull changes from the original repository.

From [here](https://stackoverflow.com/a/9257901/11474769), I learnt that we can:
- first fork the repo (the forked remote repo is called origin)
- clone the forked repo using `git clone <clone-link-to-forked-repo>`
- checkout a new branch to make changes to using `git checkout -b my_new_branch`
- make updates, add, commit files and push to the forked repo (that is the origin repo) using `git push origin my_new_branch`
- go to the root directory of the original repo and select button/option **create merge reques**  

Now, to be able to pull changes from the (original repo)
- we first add the original repo as upstream repo using `git remote add upstream <clone-link-to-original-repo>`
- checkout to master (if not in master) using `git checkout master`
- pull the changes from upstream using `git pull --rebase upstream master`

Hola! We now are able to pull and push changes from and to the original repository.

**PS:** It seems the above approach it not right. 
The right approach probably is to have the original repository as the origin and the forked repository named as upstream or (better) as our git username.

So, the commands would in this case be

```bash
git pull --rebase origin master // to fetch latest changes
git push shaikhubaid769 feature_branch // to push changes
```

---

That's all for this blog. Thank you for your time. We continue this series in the next blog.
