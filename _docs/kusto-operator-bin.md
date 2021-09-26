---
title: kusto ago operator
categories: kusto operator
author_staff_member: peter
date: 2021-09-26
---

The `bin` operator floors values by a given interval.

```
bin(value, rounding increment)
```

## Examples

Given a timestamp, will floor each value to the nearest 5 minutes.
```kusto
table
| project bin(PreciseTimeStamp, 5m)
```