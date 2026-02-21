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
title: 'Getting Started With Rust: Common Algos (Part 1)'
---

It has been some time since I wrote my last blog post. I am glad to be writing again. This post is about the Rust programming language.

Recently, I started learning Rust. I wanted to document examples of common algorithms in C++ and show how they can be written in Rust.


# Plan

In this post (Part 1), I focus on the first five common programs we typically implement in C++. My goal is to write the code myself without using LLM-generated implementations. I may still use web search to refer to Rust documentation and other learning resources.

1. Hello World
2. Add two numbers
3. Simple binary operation calculator
4. Todo List App
5. Implement merge sort

Part 2 will cover the remaining five topics.

Let us begin.

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
% g++ main.cpp -o tmp && ./tmp
Hello world!
```

### Rust

```rust
fn main() {
    println!("Hello world");
}
```

```shell
% rustc main.rs -o tmp && ./tmp
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
% g++ main.cpp -o tmp && ./tmp
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
% rustc main.rs -o tmp && ./tmp
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
% g++ main.cpp -o tmp && ./tmp
Enter first operand: 2
Enter second operand: 7
Enter the operation (+, -, /, *): -
Ans: -5
% g++ main.cpp -o tmp && ./tmp
Enter first operand: 3.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): -
Ans: 2.7
% g++ main.cpp -o tmp && ./tmp
Enter first operand: 23.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): *
Ans: 11.6
% g++ main.cpp -o tmp && ./tmp
Enter first operand: 1.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): +
Ans: 1.7
% g++ main.cpp -o tmp && ./tmp
Enter first operand: 1.0
Enter second operand: 2.0
Enter the operation (+, -, /, *): /
Ans: 0.5
% g++ main.cpp -o tmp && ./tmp
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
% rustc main.rs -o tmp && ./tmp
Enter first operand: 2
Enter second operand: 7
Enter the operation (+, -, /, *): -
Ans: -5
% rustc main.rs -o tmp && ./tmp
Enter first operand: 3.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): -
Ans: 2.7
% rustc main.rs -o tmp && ./tmp
Enter first operand: 23.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): *
Ans: 11.6
% rustc main.rs -o tmp && ./tmp
Enter first operand: 1.2
Enter second operand: 0.5
Enter the operation (+, -, /, *): +
Ans: 1.7
% rustc main.rs -o tmp && ./tmp
Enter first operand: 1.0
Enter second operand: 2.0
Enter the operation (+, -, /, *): /
Ans: 0.5
% rustc main.rs -o tmp && ./tmp
Enter first operand: 1.0
Enter second operand: 0.0
Enter the operation (+, -, /, *): /
Ans: inf
```

## Todo List App

### C++

```c++
#include<iostream>
#include<vector>
#include<string>
#include <sstream>


void list(std::vector<std::string> &todos) {
    std::cout << "\n\n\n";
    if (todos.size() == 0) {
        std::cout << "No todos to display\n\n";
        return;
    }
    std:: cout << "All TODOS:\n";
    for (size_t i = 0; i < todos.size(); i++) {
        std::cout << i + 1 << " " << todos[i] << "\n";
    }
    std::cout << "\n";
}


void add(std::vector<std::string> &todos) {
    std::cout << "Enter todo: ";
    std::string todo;
    std::cin.ignore();
    std::getline(std::cin, todo);
    todos.push_back(todo);
    std::cout << "Added: " << todo << "\n";
}


void delete_(std::vector<std::string> &todos) {
    std::cout << "Which todo to delete?:\n";
    list(todos);
    std::cout << "Choice: ";
    int choice;
    std::cin >> choice;
    choice--;
    if (choice < 0 || choice >= todos.size()) {
        std::cerr << "No item " << choice + 1 << " exists\n";
        return;
    }
    todos.erase(todos.begin() + choice);
    std::cout << "Deleted todo: " << choice + 1 << "\n";
}


int main() {
    std::vector<std::string> todo_options = {
        "list todos",
        "add todo",
        "delete todo",
        "exit"
    };

    std::vector<std::string> todos;

    while(true) {
        std::cout << "TODO App\n";
        std::cout << "Options:\n";
        for (size_t i = 0; i < todo_options.size(); i++) {
            std::cout << i + 1 << ": " << todo_options[i] << "\n";
        }

        std::cout << "Enter choice: ";
        int choice;
        std::cin >> choice;

        switch(choice) {
            case 1: list(todos); break;
            case 2: add(todos); break;
            case 3: delete_(todos); break;
            case 4: std::exit(0);
            default: std::cout << "Wrong choice! Try again.\n";
        }
        std::cout << "Choice: " << choice << std::endl;
    }
}
```

```shell
% g++ -std=c++11 main.cpp -o tmp && ./tmp
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



No todos to display

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 2
Enter todo: hello hi by !?
Added: hello hi by !?
Choice: 2
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



All TODOS:
1 hello hi by !?

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 2
Enter todo: yo yo
Added: yo yo
Choice: 2
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 2
Enter todo: more!"ltodos1234
Added: more!"ltodos1234
Choice: 2
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



All TODOS:
1 hello hi by !?
2 yo yo
3 more!"ltodos1234

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 3
Which todo to delete?:



All TODOS:
1 hello hi by !?
2 yo yo
3 more!"ltodos1234

Choice: 2
Deleted todo: 2
Choice: 3
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



All TODOS:
1 hello hi by !?
2 more!"ltodos1234

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 3
Which todo to delete?:



All TODOS:
1 hello hi by !?
2 more!"ltodos1234

Choice: 1
Deleted todo: 1
Choice: 3
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



All TODOS:
1 more!"ltodos1234

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 3
Which todo to delete?:



All TODOS:
1 more!"ltodos1234

Choice: 0
No item 0 exists
Choice: 3
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 3
Which todo to delete?:



All TODOS:
1 more!"ltodos1234

Choice: 1
Deleted todo: 1
Choice: 3
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



No todos to display

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 4
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

#[allow(unused)]
fn get_char(prompt: &str) -> char {
    print!("{}", prompt);
    io::stdout().flush().ok().expect("Could not flush stdout");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Not a valid string");
    input.trim().chars().nth(0).unwrap()
}


fn get_line(prompt: &str) -> String {
    print!("{}", prompt);
    io::stdout().flush().ok().expect("Could not flush stdout");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Not a valid string");
    input.trim().to_string()
}


fn list(todos: &Vec<String>) -> () {
    print!("\n\n\n");
    if todos.len() == 0 {
        println!("No todos to display\n");
        return;
    }
    println!("All TODOS:");
    let mut i: usize = 0;
    loop {
        println!("{} {}", i + 1, todos[i]);
        i += 1;
        if i >= todos.len() {
            break;
        }
    }
    println!("");
}


fn add(todos: &mut Vec<String>) -> () {
    let todo = get_line("Enter todo: ");
    todos.push(todo);
    println!("Added: {}", todos.last().unwrap());
}


fn delete_(todos: &mut Vec<String>) -> () {
    println!("Which todo to delete?:");
    list(todos);
    let mut choice = get_num("Enter Choice: ") as usize;
    choice -= 1;
    if choice >= todos.len() {
        eprintln!("No item {} exists", choice + 1);
        return;
    }
    todos.remove(choice);
    println!("Deleted todo: {}", choice + 1);
}


fn main() {
    let todo_options: Vec<&str> = vec![
        "list todos",
        "add todo",
        "delete todo",
        "exit"
    ];

    let mut todos: Vec<String> = vec![];

    loop {
        println!("TODO App");
        println!("Options:");
        let mut i: usize = 0;
        loop {
            println!("{}: {}", i + 1, todo_options[i]);
            i += 1;
            if i >= todo_options.len() {
                break;
            }
        }

        let choice = get_num("Enter choice: ") as i32;

        match choice {
            1 => list(&todos),
            2 => add(&mut todos),
            3 => delete_(&mut todos),
            4 => std::process::exit(0),
            _ => println!("Wrong choice! Try again."),
        }

        println!("Choice: {}", choice);
    }

}
```

```shell
% rustc main.rs -o tmp && ./tmp
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



No todos to display

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 2
Enter todo: Hello hi
Added: Hello hi
Choice: 2
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



All TODOS:
1 Hello hi

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 2
Enter todo: yo you!""
Added: yo you!""
Choice: 2
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



All TODOS:
1 Hello hi
2 yo you!""

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 2
Enter todo: dsajlfkjsk14324.
Added: dsajlfkjsk14324.
Choice: 2
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



All TODOS:
1 Hello hi
2 yo you!""
3 dsajlfkjsk14324.

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 3
Which todo to delete?:



All TODOS:
1 Hello hi
2 yo you!""
3 dsajlfkjsk14324.

Enter Choice: 2
Deleted todo: 2
Choice: 3
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



All TODOS:
1 Hello hi
2 dsajlfkjsk14324.

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 3
Which todo to delete?:



All TODOS:
1 Hello hi
2 dsajlfkjsk14324.

Enter Choice: 1
Deleted todo: 1
Choice: 3
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 3
Which todo to delete?:



All TODOS:
1 dsajlfkjsk14324.

Enter Choice: 1
Deleted todo: 1
Choice: 3
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 1



No todos to display

Choice: 1
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 3
Which todo to delete?:



No todos to display

Enter Choice: 1
No item 1 exists
Choice: 3
TODO App
Options:
1: list todos
2: add todo
3: delete todo
4: exit
Enter choice: 4
```


## Merge sort

### C++

```c++
#include<iostream>
#include<vector>


void merge(std::vector<int> &arr, int l, int mid, int r) {
    std::vector<int> arrL(arr.begin() + l, arr.begin() + mid + 1);
    std::vector<int> arrR(arr.begin() + mid + 1, arr.begin() + r + 1);

    int i = 0, j = 0, k = l;
    while (k <= r) {
        if (i < arrL.size() && j < arrR.size()) {
            arr[k++] = (arrL[i] <= arrR[j]) ? arrL[i++] : arrR[j++];
        } else {
            arr[k++] = (i < arrL.size()) ? arrL[i++] : arrR[j++];
        }
    }
}


void mergeSort(std::vector<int> &arr, int l, int r) {
    if (l >= r) {
        return;
    }
    int mid = (l + r) / 2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
}


int main() {
    std::vector<int> arr = {4, 2, 5, 3, 1, 8, -4, 2, -1, 0};

    mergeSort(arr, 0, arr.size() - 1);
    for (auto i: arr) {
        std::cout << i << " ";
    }
    std::cout << "\n";
}
```

```shell
% g++ -std=c++11 main.cpp -o tmp && ./tmp
-4 -1 0 1 2 2 3 4 5 8
```

### Rust

```rust
fn merge(arr: &mut Vec<i32>, l: usize, mid: usize, r: usize) {
    let arr_l:Vec<i32> = arr[l..mid+1].to_vec();
    let arr_r:Vec<i32> = arr[mid+1..r+1].to_vec();

    let (mut i, mut j, mut k): (usize, usize, usize) = (0, 0, l);
    while k <= r {
        if i < arr_l.len() && j < arr_r.len() {
            arr[k] = if arr_l[i] <= arr_r[j] { i += 1; arr_l[i - 1] } else { j += 1; arr_r[j - 1] };
            k += 1;
        } else {
            arr[k] = if i < arr_l.len() { i += 1; arr_l[i - 1] } else { j += 1; arr_r[j - 1] };
            k += 1;
        }
    }
}


fn merge_sort(arr: &mut Vec<i32>, l: usize, r: usize) {
    if l >= r || r >= arr.len() {
        return;
    }
    let mid: usize = (l + r) / 2;
    merge_sort(arr, l, mid);
    merge_sort(arr, mid + 1, r);
    merge(arr, l, mid, r);
}


fn main() {
    let mut arr:Vec<i32> = vec![4, 2, 5, 3, 1, 8, -4, 2, -1, 0];
    let n = arr.len();
    merge_sort(&mut arr, 0, n - 1);

    for i in arr.iter() {
        print!("{} ", i);
    }
    println!("");
}
```

```shell
% rustc main.rs -o tmp && RUST_BACKTRACE=1 ./tmp
-4 -1 0 1 2 2 3 4 5 8
```

## Wrap Up

That concludes Part 1, which covers:

1. Hello World
2. Add two numbers
3. Simple binary operation calculator
4. Todo List App
5. Merge sort

I will continue with the remaining five items in Part 2.
