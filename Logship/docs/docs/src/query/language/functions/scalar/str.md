# str

The str function converts its argument to a string representation.

## Spec

```
str(arg0)
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

```kusto
datatable(val:int64)[1, 42, 100]
| extend as_string = str(val)
```

| val | as_string |
| --- | --------- |
| 1   | "1"       |
| 42  | "42"      |
| 100 | "100"     |

Convert a datetime to string:

```kusto
datatable(dt:datetime)[datetime(2025-08-05)]
| extend dt_str = str(dt)
```

| dt                   | dt_str                 |
| -------------------- | ---------------------- |
| 2025-08-05T00:00:00Z | "2025-08-05T00:00:00Z" |
