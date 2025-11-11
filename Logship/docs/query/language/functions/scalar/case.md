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
