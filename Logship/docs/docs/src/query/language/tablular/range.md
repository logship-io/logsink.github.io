---
title: Range
---

# range

The range tabular operator outputs a table of values given a start, end, and step. You can think of it like a simple for loop.

## Spec

```
range <column_name> from <start> to <end> step <interval>
```

> :warning: Start and end must be the same type. Interval must be mathematically compatible with start and end.

### Parameters

```
column_name - The output column name
start - The start value
end - The end value
interval - The interval
```

### Return Value

```
A table with a single column, named column_name.
```

## Example

```kusto
range example from 1 to 5 step 1
```

| example |
| ------- |
| 1       |
| 2       |
| 3       |
| 4       |
| 5       |
