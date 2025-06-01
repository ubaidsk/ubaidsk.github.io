---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- misc
date: '2022-05-01'
description: Let us write a script which writes wasm ...
tags:
- wasm
title: Wasm Binary Internals Demystified
---

# WASM Binary Experimentation

<!--more-->

In this notebook, let us write a `python` script which writes `wasm`
binary. (Yup, you read it right, writing a script that writes another
script, 😎)

For example, let us aim to write the following `WAT` in `wasm` binary
using our `python` script.

    (module
      (func (export "get_const_val") (result i32)
        i32.const -10)
      (func (export "add_two_nums") (param i32 i32) (result i32)
        local.get 0
        local.get 1
        i32.add)
      (func (export "call_functions") (result i32)
        call 0
        call 0
        call 1)
    )

-   The function `get_const_val` returns a constant value of `-10`.
-   The function `add_two_nums` adds the given numbers and returns the
    result of addition.
-   The function `call_functions` calls `get_const_val` twice and then
    calls `add_two_nums`. Please note here that we used the indexes of
    the `get_const_val` and `add_two_nums` when calling them.

In python, the implementation of these functions would be as follows:

``` python
def get_const_val():
  return -10

def add_two_nums(a, b): # in the WAT format, we did not give names, instead we used indexes to refer to the parameters
  return a + b

def call_functions():
  return add_two_nums(get_const_val(), get_const_val())
```

Our `python` script starts from the following sections.

**Let\'s dive in!!!**

## Importing required modules

`wasm` expects integers to be in `leb128` (Little Endian Base 128)
format. So, we use the following library/module to encode the `integers`
(`signed` as well as `unsigned`). Also, from my experience, `index` of
variables/functions are being considered to be `integers` and therefore
need to be encoded.

``` python
!pip install leb128
import leb128
```

    Requirement already satisfied: leb128 in /usr/local/lib/python3.7/dist-packages (1.0.4)

To test the generated `test.wasm` we need to import the `wasm` exported
functions in `JavaScript`/`node.js`. Since, it seems that `Google Colab`
supports only `client` side `JavaScript` and does not support `node.js`,
here, we can currently (temporarily) use `pywasm` (which provides the
`WebAssembly` runtime for `python`) to test the exported function.

``` python
!pip install pywasm
import pywasm
```

    Requirement already satisfied: pywasm in /usr/local/lib/python3.7/dist-packages (1.0.7)
    Requirement already satisfied: numpy in /usr/local/lib/python3.7/dist-packages (from pywasm) (1.21.6)

## Generating the `test.wasm` binary

A `wasm` binary starts with `module` and `version`

here:

-   `module` = \"\\0asm\"
-   `version` = 1

``` python
module = bytearray([0x00, 0x61, 0x73, 0x6d])
version = bytearray([0x01, 0x00, 0x00, 0x00])
```

`wasm` binary consists of the following sections. These sections come
after the `mdoule` and `version`.

  Id   Section
  ---- --------------------
  0    custom section
  1    type section
  2    import section
  3    function section
  4    table section
  5    memory section
  6    global section
  7    export section
  8    start section
  9    element section
  10   code section
  11   data section
  12   data count section

Each section consists of

-   a one-byte section id,
-   the size of the contents, in bytes,
-   the actual contents, whose structure is depended on the section id.

These sections can either be omitted or can be present atmost once.
Also, these sections need to be present in the specific order.

Let us define the sections we need in the following cells.

### Type Section

From my understanding, this section is used to declare `function type`
that is `function signature` (I assume this to be similar to
`function declaration` or `function prototyping` in `C`/`C++`)

Let\'s define the functions types for our three functions
(`get_const_val`, `add_two_nums`, `call_functions`) one by one

``` python
param_types_get_const_val = bytearray([]) # its parameter list is empty
param_types_get_const_val = leb128.u.encode(len(param_types_get_const_val)) + param_types_get_const_val # prepend length (in encoded form) of the list to itself

return_types_get_const_val = bytearray([0x7f]) # its return list is just integer
return_types_get_const_val = leb128.u.encode(len(return_types_get_const_val)) + return_types_get_const_val # prepend length (in encoded form) of the list to itself

func_type_get_const_val = bytearray([0x60]) + param_types_get_const_val + return_types_get_const_val
```

``` python
param_types_add_two_nums = bytearray([0x7f, 0x7f]) # its parameter list is two integers
param_types_add_two_nums = leb128.u.encode(len(param_types_add_two_nums)) + param_types_add_two_nums # prepend length (in encoded form) of the list to itself

return_types_add_two_nums = bytearray([0x7f]) # its return list is just integer
return_types_add_two_nums = leb128.u.encode(len(return_types_add_two_nums)) + return_types_add_two_nums # prepend length (in encoded form) of the list to itself

func_type_add_two_nums = bytearray([0x60]) + param_types_add_two_nums + return_types_add_two_nums
```

``` python
param_types_call_functions = bytearray([]) # its parameter list is empty
param_types_call_functions = leb128.u.encode(len(param_types_call_functions)) + param_types_call_functions # prepend length (in encoded form) of the list to itself

return_types_call_functions = bytearray([0x7f]) # its return list is just integer
return_types_call_functions = leb128.u.encode(len(return_types_call_functions)) + return_types_call_functions # prepend length (in encoded form) of the list to itself

func_type_call_functions = bytearray([0x60]) + param_types_call_functions + return_types_call_functions
```

Let us now define our `type` section

``` python
func_types = [func_type_get_const_val, func_type_add_two_nums, func_type_call_functions] # take care to add these functions in proper order, as we will use indexes to refer them

type_section_id = leb128.u.encode(1) # id of type section is 1

type_section_content = leb128.u.encode(
    len(func_types))  # first add length (in encoded form) and then
for func_type in func_types: # add the contents of func_types
    type_section_content.extend(func_type)
```

``` python
type_section = type_section_id + leb128.u.encode(len(type_section_content)) + type_section_content
```

### Function Section

So, from the section name, it seems we will be defining our `functions`
in this section. From my understanding, we need to break our function
definition into parts, the function prototype and the function body.
(Yup, I know we already declared our function prototypes in the `type`
section)

Here, instead of redeclaring our `function types` (or
`function prototypes` as I understand them), we will reference the
already defined `function type`. That is we will just specify an index
to the `function type` that we wish to have for our `function`.

The next question that comes here is that

-   ok, I referenced the `function type` (lets say) at index `0`, where
    do I write its `function body`?

`ans:` As per the [WebAssembly
Docs](https://webassembly.github.io/spec/core/binary/modules.html#binary-codesec),
it happens that, `function bodies` (`local variables` + `statements` are
to be mentioned in the `code section`).

So, let\'s go ahead and reference the three declared `function types`

``` python
type_ids = bytearray([0, 1, 2])

func_section_id = leb128.u.encode(3)  # id of function section is 3
func_section_content = leb128.u.encode(
    len(type_ids)) # first add length (in encoded form) and then
func_section_content += type_ids # add the contents of type_ids
```

``` python
func_section = func_section_id + leb128.u.encode(len(func_section_content)) + func_section_content
```

### Code Section

We define our `function bodies` (`local variables` + `statements`) for
our three functions (`get_const_val`, `add_two_nums`, `call_functions`)
in this section.

``` python
local_vars_get_const_val = bytearray([]) # it does not contain any local variables
local_vars_get_const_val = leb128.u.encode(len(local_vars_get_const_val)) + local_vars_get_const_val

instructions_get_const_val_1 = bytearray([0x41]) + leb128.i.encode(-10) # it contains just one instruction

expr_get_const_val = instructions_get_const_val_1 + bytearray([0x0b]) # expression contains all instructions and it ends with byte 0x0b

func_get_const_val = local_vars_get_const_val + expr_get_const_val

code_get_const_val = leb128.u.encode(len(func_get_const_val)) + func_get_const_val
```

``` python
local_vars_add_two_nums = bytearray([]) # it does not contain any local variables
local_vars_add_two_nums = leb128.u.encode(len(local_vars_add_two_nums)) + local_vars_add_two_nums

instructions_add_two_nums_1 = bytearray([0x20]) + leb128.u.encode(0) # get parameter 0
instructions_add_two_nums_2 = bytearray([0x20]) + leb128.u.encode(1) # get parameter 1
instructions_add_two_nums_3 = bytearray([0x6a]) # add the two operands on the stack

expr_add_two_nums = instructions_add_two_nums_1 + instructions_add_two_nums_2 + instructions_add_two_nums_3 + bytearray([0x0b]) # expression contains all instructions and it ends with byte 0x0b

func_add_two_nums = local_vars_add_two_nums + expr_add_two_nums

code_add_two_nums = leb128.u.encode(len(func_add_two_nums)) + func_add_two_nums
```

``` python
local_vars_call_functions = bytearray([]) # it does not contain any local variables
local_vars_call_functions = leb128.u.encode(len(local_vars_call_functions)) + local_vars_call_functions

instructions_call_functions_1 = bytearray([0x10]) + leb128.u.encode(0) # call function get_const_val
instructions_call_functions_2 = bytearray([0x10]) + leb128.u.encode(0) # call function get_const_val
instructions_call_functions_3 = bytearray([0x10]) + leb128.u.encode(1) # call function call_functions and pass the two values on the stack, that is (-10, -10)

expr_call_functions = instructions_call_functions_1 + instructions_call_functions_2 + instructions_call_functions_3 + bytearray([0x0b]) # expression contains all instructions and it ends with byte 0x0b

func_call_functions = local_vars_call_functions + expr_call_functions

code_call_functions = leb128.u.encode(len(func_call_functions)) + func_call_functions
```

``` python
codes = [code_get_const_val, code_add_two_nums, code_call_functions]

code_section_id = leb128.u.encode(10) # id of code section is 10
code_section_content = leb128.u.encode(len(codes)) # first add length (in encoded form) and then
for code in codes: # add the contents of codes
    code_section_content.extend(code)
```

``` python
code_section = code_section_id + leb128.u.encode(len(code_section_content)) + code_section_content
```

Please, note here that, the number of `types referenced` and the number
of `function bodies` defined must match.

### Export Section

Now, we need to export our three functions (`get_const_val`,
`add_two_nums`, `call_functions`), so that we can use them in
`JavaScript`

``` python
name_get_const_val = "get_const_val".encode(encoding="utf-8")
name_get_const_val = leb128.u.encode(len(name_get_const_val)) + bytearray(name_get_const_val) # add length (in encoded form) followed by the encoded name string

export_desc_get_const_val = bytearray([0x00]) + leb128.u.encode(0)  # encoding function index

export_get_const_val = name_get_const_val + export_desc_get_const_val
```

``` python
name_add_two_nums = "add_two_nums".encode(encoding="utf-8")
name_add_two_nums = leb128.u.encode(len(name_add_two_nums)) + bytearray(name_add_two_nums) # add length (in encoded form) followed by the encoded name string

export_desc_add_two_nums = bytearray([0x00]) + leb128.u.encode(1)  # encoding function index

export_add_two_nums = name_add_two_nums + export_desc_add_two_nums
```

``` python
name_call_functions = "call_functions".encode(encoding="utf-8")
name_call_functions = leb128.u.encode(len(name_call_functions)) + bytearray(name_call_functions) # add length (in encoded form) followed by the encoded name string

export_desc_call_functions = bytearray([0x00]) + leb128.u.encode(2)  # encoding function index

export_call_functions = name_call_functions + export_desc_call_functions
```

``` python
exports = [export_get_const_val, export_add_two_nums, export_call_functions]

export_section_id = leb128.u.encode(7) # id of export section is 10
export_section_content = leb128.u.encode(
    len(exports)) # first add length (in encoded form) and then
for export in exports: # add the contents of exports
    export_section_content.extend(export)
```

``` python
export_section = export_section_id + leb128.u.encode(len(export_section_content)) + export_section_content
```

## Creating the final `test.wasm`

We combine all the above sections in the increasing order of section
Ids. Incorrect order leads to inconsitent wasm module.

``` python
all_code = module + version + type_section + func_section + export_section + code_section
```

Now, we write our `all_code` to `binary file`

``` python
with open("test.wasm", "wb") as wasm_file:
    wasm_file.write(bytes(all_code))
```

# Testing Time!

Let use first test our functions defined in `python`

``` python
print(get_const_val())
print(add_two_nums(5, 4))
print(call_functions())
```

    -10
    9
    -20

Now, to test our `wasm` functions, we need to import them in
`JavaScript` and the call them (the code for the same in given in
`Appendix` at the end). Since, it seems that Google Colab supports only
client side JavaScript and does not support node.js, here, we can
currently (temporarily) use pywasm (which provides the WebAssembly
runtime for python) to test the exported function.

``` python
runtime = pywasm.load('./test.wasm')
```

``` python
print(runtime.exec('get_const_val', []))
print(runtime.exec('add_two_nums', [5, 4]))
print(runtime.exec('call_functions', []))
```

    -10
    9
    -20

## Appendix

``` javascript
const fs = require('fs');

const wasmBuffer = fs.readFileSync('./test.wasm');

WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
    // Exported function live under instance.exports
    const get_const_val = wasmModule.instance.exports.get_const_val;
    const add_two_nums = wasmModule.instance.exports.add_two_nums;
    const call_functions = wasmModule.instance.exports.call_functions;
    
    console.log(get_const_val());
    console.log(add_two_nums(5, 4));
    console.log(call_functions())
});
```
