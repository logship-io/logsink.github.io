# toint

The toint function converts its argument to an integer value.

## Spec

```
toint(arg0)
```

### Parameters

```
arg0 - The value to convert to integer.
```

### Return Value

```
An integer value.
```

## Example

Convert string to integer:

```kusto
datatable(s:string)["123", "456"]
| extend num = toint(s)
```

| s   | num |
| --- | --- |
| 123 | 123 |
| 456 | 456 |

Convert double to integer:

```kusto
datatable(val:real)[3.14, 2.99]
| extend as_int = toint(val)
```

| val  | as_int |
| ---- | ------ |
| 3.14 | 3      |
| 2.99 | 2      |
