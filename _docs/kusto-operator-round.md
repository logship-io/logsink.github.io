---
title: kusto bin operator
categories: kusto operator
author_staff_member: peter
date: 2021-09-26
---

The `round` operator floors values by a given interval.

## Details

```
round(value, rounding increment)
```

## Examples

Given a timestamp, will floor each value to the nearest 5 minutes.
```kusto
table
| project round(PreciseTimeStamp, 5m)
```