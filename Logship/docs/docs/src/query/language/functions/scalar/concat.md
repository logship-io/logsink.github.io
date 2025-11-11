# concat

The concat function joins two or more strings together into a single string.

## Spec

```
concat(arg0, arg1, ...)
```

### Parameters

```
arg0, arg1, ... - The strings to concatenate.
```

### Return Value

```
A single string containing all input strings joined together.
```

## Example

```kusto
datatable(a:string, b:string)[
    "Hello", "World"
]
| extend combined = concat(a, " ", b)
```

| a     | b     | combined    |
| ----- | ----- | ----------- |
| Hello | World | Hello World |

Concatenate multiple columns:

```kusto
datatable(x:string, y:string, z:string)[
    "A", "B", "C"
]
| extend result = concat(x, y, z)
```

| x   | y   | z   | result |
| --- | --- | --- | ------ |
| A   | B   | C   | ABC    |
