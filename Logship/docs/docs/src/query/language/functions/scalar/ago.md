# ago

The ago function returns the timestamp `arg0` before the current UTC time.

## Spec
```
ago(arg0)
```

### Parameters
```
arg0 - A positive timestamp.
```

### Return Value
```
A datetime value.
```

## Example
```kusto
// Project some timestamp diffs going back in time.
range val from 1 to 5 step 1
| project ago(val * 1m)
```

|        val*const_timespan       |
|---------------------------------|
|  "2023-09-10T15:26:13.6726427Z" |
|  "2023-09-10T15:25:13.6726427Z" |
|  "2023-09-10T15:24:13.6726427Z" |
|  "2023-09-10T15:23:13.6726427Z" |
|  "2023-09-10T15:22:13.6726427Z" |
