# type conversion functions

The following functions convert values between types:

- `int`, `int64`: Converts to integer.
- `float`, `double`: Converts to double.
- `string`: Converts to string.
- `bool`: Converts to boolean.

## Spec

```
int(arg0)
int64(arg0)
float(arg0)
double(arg0)
string(arg0)
bool(arg0)
```

### Parameters

```
arg0 - The value to convert.
```

### Return Value

```
The converted value in the target type.
```

## Example

Convert string to int:

```kusto
datatable(s:string)["123", "456"]
| extend num = int(s)
```

| s   | num |
| --- | --- |
| 123 | 123 |
| 456 | 456 |

Convert int to string:

```kusto
datatable(val:int64)[1, 2]
| extend str_val = string(val)
```

| val | str_val |
| --- | ------- |
| 1   | "1"     |
| 2   | "2"     |
