# prev

The prev function returns the value of a column from the previous row in the current context.

## Spec

```
prev(column, [ offset ], [ default_value ] )
```

> :warning: The type of the third argument must be the same as the first argument. If not, this function will fail with a parse error.

### Parameters

```
column - The column to retrieve the previous value from.
offset - The look backawards offset. Must be a positive integer greater than 0. Defaults to 1.
default_value - The default value if there is no previous. Defaults to null. Must be the same type as column
```

### Return Value

```
The value of the column from the previous row, or null if there is no previous row.
```

## Example

Get the previous value of a column:

```kusto
datatable(val:int64)[1, 2, 3, 4]
| extend prev_val = prev(val)
```

| val | prev_val |
| --- | -------- |
| 1   | null     |
| 2   | 1        |
| 3   | 2        |
| 4   | 3        |

This is useful for calculating differences between consecutive rows:

```kusto
datatable(val:int64)[10, 15, 20]
| extend diff = val - prev(val)
```

| val | diff |
| --- | ---- |
| 10  | null |
| 15  | 5    |
| 20  | 5    |

Simple example using the default arguments

```kusto
range col from 1 to 10 step 1
| project col, prev = prev(col)
```

| col | prev |
| --- | ---- |
| 1   | 0    |
| 2   | 1    |
| 3   | 2    |
| 4   | 3    |
| 5   | 4    |
| 6   | 5    |
| 7   | 6    |
| 8   | 7    |
| 9   | 8    |
| 10  | 9    |

Example using a custom offset.

```kusto
range col from 1 to 10 step 1
| project col, prev = prev(col, 5)
```

| col | prev |
| --- | ---- |
| 1   | 0    |
| 2   | 0    |
| 3   | 0    |
| 4   | 0    |
| 5   | 0    |
| 6   | 1    |
| 7   | 2    |
| 8   | 3    |
| 9   | 4    |
| 10  | 5    |

Example using both a custom offset and a default value.

```kusto
range col from 1 to 10 step 1
| project col, prev = prev(col, 5, -100)
```

| col | prev |
| --- | ---- |
| 1   | -100 |
| 2   | -100 |
| 3   | -100 |
| 4   | -100 |
| 5   | -100 |
| 6   | 1    |
| 7   | 2    |
| 8   | 3    |
| 9   | 4    |
| 10  | 5    |
