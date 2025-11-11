# argmax

The argmax function returns the row with the maximum value of a specified column within each group.

## Spec

```
argmax(column, group_by_column)
```

### Parameters

```
column - The column to find the maximum value of.
group_by_column - The column to group by.
```

### Return Value

```
The row(s) with the maximum value of the specified column within each group.
```

## Example

Find the row with the maximum value per group:

```kusto
datatable(group:string, val:int64, other:string)["A", 1, "foo", "A", 3, "bar", "B", 2, "baz"]
| summarize argmax(val, other) by group
```

| group | val | other |
| ----- | --- | ----- |
| A     | 3   | bar   |
| B     | 2   | baz   |
