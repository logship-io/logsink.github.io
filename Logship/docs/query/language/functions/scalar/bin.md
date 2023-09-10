# bin

The bin function buckets the first argument into buckets the size of the second argument.

## Spec
```
bin(arg0, arg1)
```

### Parameters
```
arg0 - Input parameter to bucketize.
arg1 - Bucket size parameter. Must be mathematically compatible with arg0.
```

### Return Value
```
The bucketed result. arg0 after it has been bucketed.
```

## Example
```kusto
range val from 1 to 5 step 1
| project val, bin(val, 2)
```

| val | bin_val_const_int |
|-----|-------------------|
|  1  |         0         |
|  2  |         2         |
|  3  |         2         |
|  4  |         4         |
|  5  |         4         |

The bin function is very useful for bucketing during aggregations.
```kusto
range val from 1 to 5 step 1
| summarize count() by bin(val, 2)
```

| bin_val_const_int | count |
|-------------------|-------|
|         0         |   1   |
|         2         |   2   |
|         4         |   2   |
