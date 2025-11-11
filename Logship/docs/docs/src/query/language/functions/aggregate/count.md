# count

The count function is an aggregate function, which counts the number of rows passing through it. 

Count must be using in an aggregate type of expression.

## Spec
```
count()
```

### Parameters
```
None
```

### Return Value
```
count - Int64 value
```

## Example
```kusto
// Count via summarize
range val from 1 to 5 step 1
| summarize count()
```

| count |
|-------|
|   5   |

You can use the count expression via different types of aggregations. This will count per bucket.
```kusto
range val from 1 to 5 step 1
| summarize count() by val
```

| val | count |
|-----|-------|
|  1  |   1   |
|  2  |   1   |
|  3  |   1   |
|  4  |   1   |
|  5  |   1   |