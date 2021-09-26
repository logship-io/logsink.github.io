---
title: kusto distinct
categories: kusto
author_staff_member: peter
date: 2021-09-26
---

```kusto
table
| distinct column1, column2, column3

```

The `distinct` will aggregate all of the distinct values of the given columns. 

## Notes
Be aware of cardinality here. This is a very memory intensive operation, as the result set needs to be kept available as the aggregations runs. Make sure you use rounding operators (like 'bin') on high-cardinality values, like timestamps. 