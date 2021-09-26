---
title: 
categories: logship
author_staff_member: peter
date: 2021-09-26
---

The basics of creating a chart using logship charts!

## Overview
Logship charting uses Kusto queries over the backend metris or logs data to produce charts.

![Logship Charts screenshot](/images/screenshots/2021-09-26/logship_charts.png)

Charts are built using queries like this one: 
```kusto
[proc.stat.cpu] 
| where PreciseTimestamp > {startTime}
| where PreciseTimestamp < {endTime}
| where processname contains 'logship'
| project PreciseTimestamp, machinename, processname, average
```

The charts will graph the first available "number" value in your query result ('average' in the example above). And MUST contain the "PreciseTimestamp" field. Each unique set of tags will graph an individual series, or line on your chart.

### Paramaterization
Parameters allow you to link queries to controllable fields on the UI. The `{startTime}` and `{endTime}` values will always be available, and are tied to the time controls on the metrics page.