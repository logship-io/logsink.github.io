---
title: kusto orderby
categories: kusto
author_staff_member: peter
date: 2021-09-26
---

```kusto
table
| order by column1 ASC, column2 DESC, column3

```

## Details

The `order by` expression will sort the result set by the given columns.

* DESC orders by descending
* ASC orders by ascending

## Notes
Be aware of cardinality here. This is a very memory intensive operation, as the result set needs to be kept available as the sort runs.
