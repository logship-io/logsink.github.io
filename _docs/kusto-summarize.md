---
title: kusto summarize
categories: kusto
author_staff_member: peter
date: 2022-01-09
---

```kusto
table
| where PreciseTimestamp > ago(5m)
| summarize sum(Sum) by round([PreciseTimestamp], 5m), [provider]

```

## Details

The `summarize` expresion is similar to a SQL `GROUP BY`. It aggregates by the values on the right hand side of the expression.