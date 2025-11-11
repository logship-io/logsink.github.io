# rand

The rand function returns a random double value between 0 (inclusive) and 1 (exclusive).

## Spec

```
rand()
```

### Parameters

```
None.
```

### Return Value

```
A random double value in the range [0, 1).
```

## Example

Generate random values for each row:

```kusto
range x from 1 to 5 step 1
| extend r = rand()
```

| x   | r        |
| --- | -------- |
| 1   | 0.123456 |
| 2   | 0.987654 |
| 3   | 0.543210 |
| 4   | 0.678901 |
| 5   | 0.234567 |

(Actual values will vary each run.)
