# datetime_utc_to_local

The datetime_utc_to_local function converts a UTC datetime value to local time based on a specified timezone offset.

## Spec

```
datetime_utc_to_local(datetime, offset)
```

### Parameters

```
datetime - The UTC datetime value to convert.
offset - The timezone offset in hours (can be negative or positive).
```

### Return Value

```
A datetime value adjusted to the specified local time.
```

## Example

Convert UTC to local time with +2 hour offset:

```kusto
datatable(dt:datetime)[datetime(2025-08-05T12:00:00Z)]
| extend local_dt = datetime_utc_to_local(dt, "EST")
```

| dt                   | local_dt                |
| -------------------- | ----------------------- |
| 2025-08-05T12:00:00Z | 2025-08-05T07:00:00.00Z |
