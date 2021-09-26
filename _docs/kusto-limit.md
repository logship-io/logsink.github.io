---
title: kusto limit / take
categories: kusto
author_staff_member: peter
date: 2021-09-26
---


```kusto
table
| take 1000

```

The `take` command limits the number of results returned in a query. It can be used anywhere within the query pipeline.