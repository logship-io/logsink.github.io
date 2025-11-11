# tostring

The tostring function converts its argument to a string representation.

## Spec

```
tostring(arg0)
```

### Parameters

```
arg0 - The value to convert to a string.
```

### Return Value

```
A string representation of the input value.
```

## Example

Convert integer to string:

```kusto
datatable(val:int64)[1, 42]
| extend as_str = tostring(val)
```

| val | as_str |
| --- | ------ |
| 1   | "1"    |
| 42  | "42"   |

Convert datetime to string:

```kusto
datatable(dt:datetime)[datetime(2025-08-05)]
| extend dt_str = tostring(dt)
```

| dt                   | dt_str                 |
| -------------------- | ---------------------- |
| 2025-08-05T00:00:00Z | "2025-08-05T00:00:00Z" |
