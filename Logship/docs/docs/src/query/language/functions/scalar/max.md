# max

The max function is a scalar function, which returns the maximum of it's arguments. For the opposite, see [min](./min.md).

## Spec
```
max(arg0, arg1, ...)
```

### Parameters
```
arg0 - Primitive type capable of comparison.
arg1 - Primitive type (same as arg0)
...  - Same types as arg0 and arg1
```

### Return Value
```
Maximum of all arguments. Same type as arg0.
```

> :warning: The type of each argument must be the same. If not, this function will fail with a parse error.

## Example
```kusto
range example from 1 to 5 step 1
| project max(example, 3)
```

| max_example_const_int     |
| - |
| 3 |
| 3 |
| 3 |
| 4 |
| 5 |