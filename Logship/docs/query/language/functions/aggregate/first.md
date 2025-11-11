# first

The first function returns the first value of a column within each group during aggregation.

## Spec

```
first(column)
```

### Parameters

```
column - The column to get the first value from.
```

### Return Value

```
The first value of the column in the group.
```

## Example

Get the first value per group:

```kusto
datatable(group:string, val:int64)["A", 1, "A", 3, "B", 2]
| summarize first_val = first(val) by group
```

| group | first_val |
| ----- | --------- |
| A     | 1         |
| B     | 2         |
