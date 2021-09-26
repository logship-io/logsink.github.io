---
title: kusto where
categories: kusto
author_staff_member: peter
date: 2021-09-26
---


```kusto
table
| where intColumn > 1500
| where intColumn == 8
| where stringColumn contains "abc"
```

## Details

The `where` expresion applies filters to a query. These filters depend on the column type, and are pushed down to the query optimizer to limit the data returned.

## Notes

Ordering of operators is sequential. In the example below, the query optimizer cannot push filters any further than the take, since the `take` blocks any further filtering optimizations. This is because taking the first 100 elements of a file is different, than taking the first 100 elements with the filters applied.

```kusto
table
| take 100
| where intColumn > 1500
| where intColumn == 8
| where stringColumn contains "abc"
```