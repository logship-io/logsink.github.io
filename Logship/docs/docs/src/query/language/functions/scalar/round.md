# round

The round function rounds a numeric value to the nearest integer or specified number of decimal places.

## Spec

```
round(arg0, [decimals])
```

### Parameters

```
arg0 - The numeric value to round.
decimals (optional) - The number of decimal places to round to. Defaults to 0.
```

### Return Value

```
The rounded value.
```

## Example

Round to nearest integer:

```kusto
datatable(val:real)[1.7, 2.3, -1.8]
| extend rounded = round(val)
```

| val  | rounded |
| ---- | ------- |
| 1.7  | 2       |
| 2.3  | 2       |
| -1.8 | -2      |

Round to 1 decimal place:

```kusto
datatable(val:real)[1.75, 2.34]
| extend rounded = round(val, 1)
```

| val  | rounded |
| ---- | ------- |
| 1.75 | 1.8     |
| 2.34 | 2.3     |
