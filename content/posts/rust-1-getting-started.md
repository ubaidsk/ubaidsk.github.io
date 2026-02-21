---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- rust
date: '2025-10-19'
description: Rust examples for getting started...
tags:
- wasm
title: "Getting Started With Rust: Common Algos"
---

It is been sometime since I wrote my last blog. Finally getting to write one now! This one is about the Rust programming language.

Recently, I have started learning rust. I wanted to document down some examples of common algos in C++ and how they would be written in Rust. Let's dive.


# Plan

I am hoping to document examples for the following common programs that we write in C++. My goal is not to use help from LLM agents to write this code. But, I would be using web search to reference rust documentation or other sites/blogs.

1. Hello world
2. Add two numbers
3. Simple binary operation calculator
4. Todo List app
5. Find element in array, sort array
6. Implement merge sort
7. kmp pattern matching
8. InOrder tree traversal
9. DFS and BFS on graphs
10. Text editor

Let's dive in!

# Implementation

## Hello world

### C++

```c++
#include<iostream>


int main() {
    std::cout << "Hello world!\n";
    return 0;
}

```

```shell
ubaid@Mohammeds-MacBook-Pro blog % g++ main.cpp -o tmp && ./tmp
Hello world!
```

### Rust

```rust
fn main() {
    println!("Hello world");
}
```

```shell
ubaid@Mohammeds-MacBook-Pro src % rustc main.rs -o tmp && ./tmp
Hello world
```

## Add two numbers

### C++

```c++
#include<iostream>


int add(int a, int b) {
    return a + b;
}


int main() {
    int a = 5, b = 10;
    std::cout << "Sum of " << a << " and " << b << " is " << add(a, b) << "\n";
    return 0;
}
```

```shell
ubaid@Mohammeds-MacBook-Pro blog % g++ main.cpp -o tmp && ./tmp
Sum of 5 and 10 is 15
```

### Rust

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}


fn main() {
    let (a, b) = (5, 10);
    println!("Sum of {} and {} is {}", a, b, add(a, b));
}
```

```shell
ubaid@Mohammeds-MacBook-Pro src % rustc main.rs -o tmp && ./tmp
Sum of 5 and 10 is 15
```

## Simple binary operation calculator

### C++

```c++
#include<iostream>


int add(int a, int b) {
    return a + b;
}


int main() {
    float a, b;
    char opt;

    std::cout << "Enter first operand: ";
    std::cin >> a;
    std::cout << "Enter second operand: ";
    std::cin >> b;
    std::cout << "Enter the operation (+, -, /, *): ";
    std::cin >> opt;

    float ans;
    switch (opt) {
        case '+': ans = a + b; break;
        case '-': ans = a - b; break;
        case '*': ans = a * b; break;
        case '/': ans = a / b; break;
    }

    std::cout << "Ans: " << ans << "\n";
    return 0;
}
```

```shell
ubaid@Mohammeds-MacBook-Pro blog % g++ main.cpp -o tmp && ./tmp
Enter first operand: 2
Enter second operand: 7
Enter the operation (+, -, /, *): -
Ans: -5
ubaid@Mohammeds-MacBook-Pro blog % g++ main.cpp -o tmp && ./tmp
Enter first operand: 3.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): -
Ans: 2.7
ubaid@Mohammeds-MacBook-Pro blog % g++ main.cpp -o tmp && ./tmp
Enter first operand: 23.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): *
Ans: 11.6
ubaid@Mohammeds-MacBook-Pro blog % g++ main.cpp -o tmp && ./tmp
Enter first operand: 1.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): +
Ans: 1.7
ubaid@Mohammeds-MacBook-Pro blog % g++ main.cpp -o tmp && ./tmp
Enter first operand: 1.0
Enter second operand: 2.0
Enter the operation (+, -, /, *): /
Ans: 0.5
ubaid@Mohammeds-MacBook-Pro blog % g++ main.cpp -o tmp && ./tmp
Enter first operand: 1.0
Enter second operand: 0.0
Enter the operation (+, -, /, *): /
Ans: inf
```

### Rust

```rust
use std::io;
use std::io::Write;

fn get_num(prompt: &str) -> f32 {
    print!("{}", prompt);
    io::stdout().flush().ok().expect("Could not flush stdout");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Not a valid string");
    input.trim().parse().expect("Not a valid number")
}

fn get_char(prompt: &str) -> char {
    print!("{}", prompt);
    io::stdout().flush().ok().expect("Could not flush stdout");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Not a valid string");
    input.trim().chars().nth(0).unwrap()
}

fn main() {
    let a = get_num(&"Enter first operand: ");
    let b = get_num(&"Enter second operand: ");
    let opt = get_char(&"Enter the operation (+, -, /, *): ");

    let ans: f32;

    match opt {
        '+' => ans = a + b,
        '-' => ans = a - b,
        '*' => ans = a * b,
        '/' => ans = a / b,
        _ => panic!("Incorrect operation. We only support +, -, /, *"),
    }

    println!("Ans: {}", ans);
}
```

```shell
ubaid@Mohammeds-MacBook-Pro src % rustc main.rs -o tmp && ./tmp
Enter first operand: 2
Enter second operand: 7
Enter the operation (+, -, /, *): -
Ans: -5
ubaid@Mohammeds-MacBook-Pro src % rustc main.rs -o tmp && ./tmp
Enter first operand: 3.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): -
Ans: 2.7
ubaid@Mohammeds-MacBook-Pro src % rustc main.rs -o tmp && ./tmp
Enter first operand: 23.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): *
Ans: 11.6
ubaid@Mohammeds-MacBook-Pro src % rustc main.rs -o tmp && ./tmp
Enter first operand: 1.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): +
Ans: 1.7
ubaid@Mohammeds-MacBook-Pro src % rustc main.rs -o tmp && ./tmp
Enter first operand: 1.0
Enter second operand: 2.0
Enter the operation (+, -, /, *): /
Ans: 0.5
ubaid@Mohammeds-MacBook-Pro src % rustc main.rs -o tmp && ./tmp
Enter first operand: 1.0
Enter second operand: 0.0
Enter the operation (+, -, /, *): /
Ans: inf
```

## Todo List App

### C++

```c++

```

```shell

```

### Rust

```rust

```

```shell

```
