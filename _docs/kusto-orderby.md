---
title: kusto orderby
categories: kusto
author_staff_member: peter
date: 2021-09-26
---

```kusto
table
| orderby column1, column2, column3

```

## Details

The `orderby` expression will sort the result set by the given columns.

## Notes
Be aware of cardinality here. This is a very memory intensive operation, as the result set needs to be kept available as the sort runs.