# sum

The sum function is an aggregate function, which sums each value passing through it.

Count must be using in an aggregate type of expression.

## Spec
```
sum(arg0)
```

### Parameters
```
arg0 - The value to sum. Addition must be supported by the type.
```

> :warning: The type must be math capable. E.G. you can't sum DateTimes or Strings

### Return Value
```
sum - A sum, of the same type as arg0.
```

## Example
```kusto
// Sum via summarize
range val from 1 to 5 step 1
| summarize sum(val)
```

| val |
|-----|
|  15 |