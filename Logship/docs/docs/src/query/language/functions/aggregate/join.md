# join

The join function concatenates string values from a group, separated by a specified delimiter.

## Spec

```
join(column, delimiter)
```

### Parameters

```
column - The string column to join.
delimiter - The string to use as a separator between values.
```

### Return Value

```
A single string with all values joined by the delimiter.
```

## Example

Join strings per group:

```kusto
datatable(group:string, val:string)["A", "foo", "A", "bar", "B", "baz"]
| summarize joined = join(val, ",") by group
```

| group | joined  |
| ----- | ------- |
| A     | foo,bar |
| B     | baz     |
