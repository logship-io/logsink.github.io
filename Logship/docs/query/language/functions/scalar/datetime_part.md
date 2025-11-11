# datetime_part

Extracts a specified part from a datetime value.

## Syntax

```
datetime_part(part, datetime)
```

- `part`: The part of the datetime to extract. Supported values include: `"Year"`, `"Quarter"`, `"Month"`, `"DayOfYear"`, `"Day"`, `"Hour"`, `"Minute"`, `"Second"`, `"Millisecond"`, `"Microsecond"`, `"Nanosecond"`, `"Week"`, `"DayOfWeek"`
- `datetime`: The datetime value to extract the part from.

## Returns

The value of the specified part as an integer or string, depending on the part.

## Examples

Extract the year from a datetime:

```kusto
datatable(dt: datetime)
[
    datetime(2024-06-01)
]
| extend year = datetime_part("Year", dt)
```

Extract the day of week (0=Sunday, 6=Saturday):

```kusto
datatable(dt: datetime)
[
    datetime(2024-06-01)
]
| extend day_of_week = datetime_part("DayOfWeek", dt)
```
