---
title: kusto project
categories: kusto
author_staff_member: peter
date: 2021-09-26
---

```kusto
table
| project column1, column2, column3
| project column1

```

## Details

The `project` expresion selects the columns or fields returned by a query. It can be used anywhere within the query pipeline.