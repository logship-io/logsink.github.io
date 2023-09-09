# Min

The min function is a scalar function, which returns the minimum of it's arguments. For the opposite, see [max](./max.md).

## Spec
```
min(arg0, arg1, ...)
```

> :warning: The type of each argument must be the same. If not, this function will fail with a parse error.

## Example
```kusto
range example from 1 to 5 step 1
| project min(example, 3)
```

| min_example_const_int     |
| - |
| 1 |
| 2 |
| 3 |
| 3 |
| 3 |