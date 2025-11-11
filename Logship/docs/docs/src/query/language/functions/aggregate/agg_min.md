# agg_min

The agg_min function returns the minimum value in a group during aggregation.

## Spec

```
agg_min(column)
```

### Parameters

```
column - The column to find the minimum value of.
```

### Return Value

```
The minimum value in the group.
```

## Example

Find the minimum value per group:

```kusto
datatable(group:string, val:int64)["A", 1, "A", 3, "B", 2]
| summarize min_val = agg_min(val) by group
```

| group | min_val |
| ----- | ------- |
| A     | 1       |
| B     | 2       |
