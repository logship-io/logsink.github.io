# min

The min function is a scalar function, which returns the minimum of it's arguments. For the opposite, see [max](./max.md).

## Spec
```
min(arg0, arg1, ...)
```

> :warning: The type of each argument must be the same. If not, this function will fail with a parse error.

### Parameters
```
arg0 - Primitive type capable of comparison.
arg1 - Primitive type (same as arg0)
...  - Same types as arg0 and arg1
```

### Return Value
```
Minimum of all arguments. Same type as arg0.
```

## Example
```kusto
range example from 1 to 5 step 1
| project min(example, 3)
```