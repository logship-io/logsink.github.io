---
title: Parse
---

# parse

Used to parse a string, and extend the current result set with the additional columns

## Spec

```
...
<table_expression>
| parse kind=regex <input_column> with (<regex> <output_column>)+ <regex>?
```

### Parameters

```
<table_expression> - An expression with a tabular output.
<input_column> - A column in the <table_expression> which resolves to a string.
<regex> - A regular expression.
<output_column> - An output column
```

### Return Value

```
Extends the new output columns onto the input table expression.
```

### Notes

This tabular operator is useful to parse strings into the standard tabular output. The columns are assigned the values in between matches by the regular expressions.

## Example

```kusto
range col from 1 to 2 step 1
| project column='Name=Logship Color=Ship'
| parse kind=regex column with 'Name=' Name ' Color=' Color
```

| column                    | Name      | Color  |
| ------------------------- | --------- | ------ |
| "Name=Logship Color=Ship" | "Logship" | "Ship" |

```kusto
range yolo from 1 to 2 step 1
| project test='Accepted publickey for root from 11.45.110.22 port 64075 ssh2: RSA SHA256:n0YHMwDlpvxX0V8TVvwra0QYTNbd13hT3jAKyBTWn+M'
| parse kind=regex test with 'Accepted publickey for ' user ' from ' address ' port'
```

| test                                                                                                                    | user   | address        |
| ----------------------------------------------------------------------------------------------------------------------- | ------ | -------------- |
| "Accepted publickey for root from 11.45.110.22 port 64075 ssh2: RSA SHA256:n0YHMwDlpvxX0V8TVvwra0QYTNbd13hT3jAKyBTWn+M" | "root" | "11.45.110.22" |
