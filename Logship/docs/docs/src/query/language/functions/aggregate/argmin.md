# arg_min

The argmin function returns the row with the minimum value of a specified column within each group.

## Spec

```
arg_min(column, group_by_column)
```

### Parameters

```
column - The column to find the minimum value of.
group_by_column - The column to group by.
```

### Return Value

```
The row(s) with the minimum value of the specified column within each group.
```

## Example

Find the row with the minimum value per group:

```kusto
datatable(group:string, val:int64, other:string)["A", 1, "foo", "A", 3, "bar", "B", 2, "baz"]
| summarize arg_min(val, other) by group
```

| group | val | other |
| ----- | --- | ----- |
| A     | 1   | foo   |
| B     | 2   | baz   |
