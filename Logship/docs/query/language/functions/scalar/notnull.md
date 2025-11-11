# notnull

The notnull function returns the value of its argument if it is not null, otherwise returns the specified default value.

## Spec

```
notnull(arg0, default_value)
```

### Parameters

```
arg0 - The value to check for null.
default_value - The value to return if arg0 is null.
```

### Return Value

```
arg0 if it is not null, otherwise default_value.
```

## Example

Return a default value if null:

```kusto
datatable(val:int64)[1, null, 3]
| extend result = notnull(val, 99)
```

| val  | result |
| ---- | ------ |
| 1    | 1      |
| null | 99     |
| 3    | 3      |
