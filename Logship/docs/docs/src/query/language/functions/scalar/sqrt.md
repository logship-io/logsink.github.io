# sqrt

The sqrt function is a scalar function, which returns the square root of its argument.

## Spec
```
sqrt(arg0)
```

> :warning: The type of the argument must be convertible to a float64.

### Parameters
```
arg0 - The argument to sqare root
```

### Return Value
```
The square root of the argument. A Float64
```

## Example
```kusto
.\logsh.exe query -q "range val from 1.0 to 10.0 step 1
| project sqrt(val)" -o markdown
```
|         val         |
|---------------------|
|          1          |
|  1.4142135623730951 |
|  1.7320508075688772 |
|          2          |
|   2.23606797749979  |
|  2.449489742783178  |
|  2.6457513110645907 |
|  2.8284271247461903 |
|          3          |
|  3.1622776601683795 |