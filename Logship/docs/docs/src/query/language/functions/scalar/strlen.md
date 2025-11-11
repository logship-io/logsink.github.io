# strlen

Returns the number of characters in a string.

## Syntax

```
strlen(string)
```

- `string`: The input string to measure.

## Returns

An integer representing the number of characters in the string.

## Examples

Get the length of a string:

```kusto
datatable(s:string) ["Hello, world!"]
| extend length = strlen(s)
```

Expected output:

| s             | length |
| ------------- | ------ |
| Hello, world! | 13     |

Get the length of a column value:

```kusto
datatable(s:string) ["abc", "abcdef", ""]
| extend len = strlen(s)
```

Expected output:

| s      | len |
| ------ | --- |
| abc    | 3   |
| abcdef | 6   |
|        | 0   |
