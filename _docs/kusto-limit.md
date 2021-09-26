---
title: kusto limit / take
categories: kusto
author_staff_member: peter
date: 2021-09-26
---

The `take` expresion limits the number of results returned in a query. It can be used anywhere within the query pipeline.

## Details

```kusto
table
| take 1000

```