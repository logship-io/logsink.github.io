---
title: metric time range compactor
categories: service
author_staff_member: peter
date: 2021-10-28
---

The time range compactor is in charge of aggregating metrics over shorter time range intervals.

## Details

As raw metrics come in, they are either 1 value per metric, or pre-aggregated by the agents. The time range compactor would take all metrics over a particular time range, and bucket them over 5 minute intervals. Saving space, and improving query times.

The Service is responsible for emitting 3 metrics:

Metric                                  | Value                                                                |
----------------------------------------|----------------------------------------------------------------------|
metrics.compaction.exectiontime         | The total execution time of the compaction task.                     |



The configuration for this service:

```json
{
  "metrics": {
    "time-range-compaction": {
      "Enabled": true, // Enabled by default.
      "Interval": "00:05:00", // How often the compaction task runs. (5min default)
    }
  }
}
```