# case

The `case` command evaluates a list of conditions and returns corresponding values for the first condition that is true, similar to a SQL `CASE` or a switch statement.

## Syntax

```
case(condition1, result1, condition2, result2, ..., conditionN, resultN[, defaultResult])
```

- `condition1`, `condition2`, ..., `conditionN`: Expressions that evaluate to boolean values.
- `result1`, `result2`, ..., `resultN`: The values to return if the corresponding condition is true.
- `defaultResult`: The value to return if none of the conditions are true.

## Returns

The value of the first `resultN` where `conditionN` is true, or `defaultResult` if none match.

## Examples

### Example 1: Basic usage

This query creates a new column `AgeGroup` based on the `age` column. It assigns 'Minor' for ages less than 18, 'Adult' for ages between 18 and 64, and 'Senior' for all other ages.

```kusto
datatable(age:int64) [
    10,
    25,
    70
]
| extend AgeGroup = case(
    age < 18, "Minor",
    age >= 18 and age < 65, "Adult",
    "Senior"
)
```

<iframe src="/micro-query/00000000-0000-0000-0000-000000000000?query=ZGF0YXRhYmxlKGFnZTppbnQ2NCkgWw0KICAgIDEwLA0KICAgIDI1LA0KICAgIDcwDQpdDQp8IGV4dGVuZCBBZ2VHcm91cCA9IGNhc2UoDQogICAgYWdlIDwgMTgsICdNaW5vcicsDQogICAgYWdlID49IDE4IGFuZCBhZ2UgPCA2NSwgJ0FkdWx0JywNCidTZW5pb3InKQ==&token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMGNhZmUiLCJ1bmlxdWVfaWQiOiJlNDJiMDkzMy1hYWZjLTRmZjItYjNmYi04ZGY1ZjgyMTZiYWEiLCJzY29wZTpxdWVyeSI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMDpfOlRJTUVPVVRfU0VDOjUiLCJuYmYiOjE3NjA0NDc2NjMsImV4cCI6MTc2MDUzNDA2MywiaWF0IjoxNzYwNDQ3NjYzLCJpc3MiOiJsb2dzaGlwIiwiYXVkIjoibG9nc2hpcCJ9.u4ogEuxytBUC7AMnMD3BwRnUFyDB7z2qKxKYKSKHvDiwXCrgT9uo74Wbp0fZYpEZXVm-3cQtOL5UrhLQzUhDUg" style="width:100%; max-width:100%; overflow:hidden; border:none;"></iframe>

**Output**

| age | AgeGroup |
| --- | -------- |
| 10  | Minor    |
| 25  | Adult    |
| 70  | Senior   |

### Example 2: Multiple conditions

This query assigns a letter grade in a new `Grade` column based on the `score`. 'F' is the default result for any score below 60.

```kusto
datatable(score:int64) [
    95,
    85,
    75,
    65,
    55
]
| extend Grade = case(
    score >= 90, "A",
    score >= 80, "B",
    score >= 70, "C",
    score >= 60, "D",
    "F"
)
```

**Output**

| score | Grade |
| ----- | ----- |
| 95    | A     |
| 85    | B     |
| 75    | C     |
| 65    | D     |
| 55    | F     |
