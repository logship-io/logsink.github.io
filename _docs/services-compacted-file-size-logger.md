---
title: compacted file size logger
categories: service
author_staff_member: peter
date: 2021-09-26
---

The compacted file size logger service emits metrics on the total size, count, and number of rows of files within the entire system.

The Service is responsible for emitting 3 metrics:
Metric | Value
--------------
streaming.compactedfiles.totalSize | The total size of all compacted files by account / schema.
--------------
streaming.compactedfiles.totalRecords | The total records count of all compacted files by account / schema.
--------------
streaming.compactedfiles.count | The number of all compacted files by account / schema.

The configuration for this service:

```json
{
  "logs": {
    "compacted-file-stats": {
      "Enabled": true,
      "Interval": "00:01:00",
    }
  }
}
```