---
title: Datatable
---

# datatable

The `datatable` operator is used to create an inline table with specified columns and values. It is useful for testing or creating small datasets directly within a query.

## Syntax

```
datatable ( <column-name> : <column-type> [, ...] ) [ <column-value>, ... ]
```

### Parameters

- `<column-name>`: The name of a column in the table.
- `<column-type>`: The data type of the column (e.g., `string`, `int64`, `datetime`).
- `<column-value>`: The values for each column, matching the column types in order.

### Return Value

A table with the specified columns and rows.

### Notes

- The `datatable` operator is useful for creating small, static datasets for testing or demonstration purposes.
- The number of values in each row must match the number of columns defined in the `datatable`.

## Example

### Example 1: Creating a simple table

```kusto
datatable (Name: string, Age: int64)
[
    "Alice", 30,
    "Bob", 25
]
```

| Name  | Age |
| ----- | --- |
| Alice | 30  |
| Bob   | 25  |

### Example 2: Using `datatable` with multiple data types

```kusto
datatable (ID: int64, Timestamp: datetime, Status: string)
[
    1, datetime(2023-01-01), "Active",
    2, datetime(2023-01-02), "Inactive"
]
```

| ID  | Timestamp           | Status   |
| --- | ------------------- | -------- |
| 1   | 2023-01-01 00:00:00 | Active   |
| 2   | 2023-01-02 00:00:00 | Inactive |

### Example 3: Combining `datatable` with other operators

```kusto
datatable (Product: string, Price: float64)
[
    "Laptop", 999.99,
    "Mouse", 19.99
]
| where Price > float(50)
```

| Product | Price  |
| ------- | ------ |
| Laptop  | 999.99 |

This query creates a table and filters rows where the `Price` is greater than 50.
