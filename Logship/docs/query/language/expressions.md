### Expressions and Variables

You can define expressions to break queries into smaller, more manageable peieces.

Take this one for example, here we define variables, and use them in our datatable expression.

```kusto
let name = "abc";
let value = 1;

datatable (name: string, value: int64) [
    name, value
]
```

Output:

| name | value |
| ---- | ----- |
| abc  | 1     |

You can do the same thing to table valued expressions, which will enable you to assemble complex queries.

```kusto
let name = "abc";
let value = 1;

let table1 = datatable (name: string, value: int64)
[
    name, value,
    name + "1", value * 2,
    name + "2", value * 3,
    name + "3", value * 4
]

table1
| union(table1)
```

Output:

| name   | value |
| ------ | ----- |
| "abc"  | 1     |
| "abc1" | 2     |
| "abc2" | 3     |
| "abc3" | 4     |
| "abc"  | 1     |
| "abc1" | 2     |
| "abc2" | 3     |
| "abc3" | 4     |
