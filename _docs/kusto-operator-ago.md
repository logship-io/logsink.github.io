---
title: kusto ago operator
categories: kusto operator
author_staff_member: peter
date: 2021-09-26
---

The `ago` operator returns a datetime of 'time range' in the past.

```
ago(<time range>)

ago(3600) // No unit means seconds. This will specify now - 3600 seconds
ago(1h)   // Current time - 1 hour
```

```kusto
table
| where PreciseTimestamp > ago(4h)
```