# union

Unions two table sets, with matching columns. The datasets must have the same columns.

## Spec
```
...
<table_expression>
| union (
    <table_expression>
)
```


### Parameters
```
<table_expression> - An expression with a tabular output.
```

### Return Value
```
The same schema as both input table expressions, but with all rows from both table expressions.
```

## Example
```kusto
range col from 1 to 5 step 1 | union ( range col from 1 to 5 step 1 )
```

| col |
|-----|
|  1  |
|  2  |
|  3  |
|  4  |
|  1  |
|  2  |
|  3  |
|  4  |