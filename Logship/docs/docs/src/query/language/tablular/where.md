---
title: Where Filter
---

# where

Reduces the output of a previous tablular operator based upon a boolean expression. Applies a boolean expression to each incoming row, to filter the output set.

## Spec

```
...
| where <boolean_expression>
```

### Parameters

```
<boolean_expression> - A filter expression on the input data.
```

### Return Value

```
The same as the input schema, but reduced by the filter expression.
```

## Example

```kusto
range val from 1 to 100 step 1 | where val < 10
```

| val |
| --- |
| 1   |
| 2   |
| 3   |
| 4   |
| 5   |
| 6   |
| 7   |
| 8   |
| 9   |
