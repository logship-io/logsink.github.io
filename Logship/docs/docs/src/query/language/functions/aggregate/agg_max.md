# agg_max

The agg_max function returns the maximum value in a group during aggregation.

## Spec

```
agg_max(column)
```

### Parameters

```
column - The column to find the maximum value of.
```

### Return Value

```
The maximum value in the group.
```

## Example

Find the maximum value per group:

```kusto
datatable(group:string, val:int64)["A", 1, "A", 3, "B", 2]
| summarize max_val = agg_max(val) by group
```

| group | max_val |
| ----- | ------- |
| A     | 3       |
| B     | 2       |
