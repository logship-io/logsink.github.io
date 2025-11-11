# floor

The floor function rounds a numeric value down to the nearest integer.

## Spec

```
floor(arg0)
```

### Parameters

```
arg0 - The numeric value to round down.
```

### Return Value

```
The largest integer less than or equal to the input value.
```

## Example

```kusto
datatable(val:real)[1.7, 2.3, -1.8]
| extend floored = floor(val)
```

| val  | floored |
| ---- | ------- |
| 1.7  | 1       |
| 2.3  | 2       |
| -1.8 | -2      |
