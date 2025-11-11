# now

The now function returns the current UTC datetime.

## Spec

```
now()
```

### Parameters

```
None.
```

### Return Value

```
A datetime value representing the current UTC time.
```

## Example

```kusto
range x from 1 to 3 step 1
| extend current_time = now()
```

| x   | current_time                 |
| --- | ---------------------------- |
| 1   | 2025-08-05T15:00:00.0000000Z |
| 2   | 2025-08-05T15:00:00.0000000Z |
| 3   | 2025-08-05T15:00:00.0000000Z |

The value will be the same for all rows in a single query execution.
