# todouble

The todouble function converts its argument to a double-precision floating point number.

## Spec

```
todouble(arg0)
```

### Parameters

```
arg0 - The value to convert to double.
```

### Return Value

```
A double-precision floating point number.
```

## Example

Convert integer to double:

```kusto
datatable(val:int64)[1, 42]
| extend as_double = todouble(val)
```

| val | as_double |
| --- | --------- |
| 1   | 1.0       |
| 42  | 42.0      |

Convert string to double:

```kusto
datatable(s:string)["3.14", "2.718"]
| extend num = todouble(s)
```

| s     | num   |
| ----- | ----- |
| 3.14  | 3.14  |
| 2.718 | 2.718 |
