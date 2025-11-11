---
title: Table
---

# table

A standard table selection operator. By default selects every column, and every row in a table.

## Spec

```
<table_name>
```

> :warning: Performs a full table scan by default.

### Parameters

```
<table_name> - The table to select
```

### Return Value

```
A table, with all rows/columns selected.
```

## Example

```kusto
schema.tables
```

| TableName                                                | DatabaseName |
| -------------------------------------------------------- | ------------ |
| "GTFS.VehiclePositions"                                  | ""           |
| "Linux.JournalD"                                         | ""           |
| "Linux.Proc.Stat"                                        | ""           |
| "Logship.Agent.Uptime"                                   | ""           |
| "OpenSky.ADSB"                                           | ""           |
| "System.Environment"                                     | ""           |
| "System.Memory"                                          | ""           |
| "System.Network.IP"                                      | ""           |
| "System.Network.Interfaces"                              | ""           |
| "System.Network.Tcp"                                     | ""           |
| "System.Network.Udp"                                     | ""           |
| "System.Process"                                         | ""           |
| "System.Process.Cpu"                                     | ""           |
| "System.Process.Files"                                   | ""           |
| "System.Process.Memory"                                  | ""           |
| "System.Process.Ports"                                   | ""           |
| "System.Process.Threads"                                 | ""           |
| "System.Storage"                                         | ""           |
| "logship.data.keyvalue2.master.getclusterstate.timer_ms" | ""           |
| "logship.data.keyvalue2.transaction.length_ms"           | ""           |
| "logship.frontend.ui.public.demo.login"                  | ""           |
| "logship.frontend.ui.public.login.error"                 | ""           |
| "logship.frontend.ui.public.login.success"               | ""           |
| "logship.frontend.ui.public.page.view"                   | ""           |
| "logship.frontend.ui.public.register.error"              | ""           |
| "logship.frontend.ui.public.register.success"            | ""           |
| "logship.public.page.visit"                              | ""           |
| "logship.service.executor.local.schemas.files"           | ""           |
| "logship.service.executor.local.schemas.newest_ms"       | ""           |
| "logship.service.executor.local.schemas.oldest_ms"       | ""           |
| "logship.service.executor.local.schemas.size_bytes"      | ""           |
| "logship.service.http-server-request-duration"           | ""           |
| "logship.service.http-server-unhandled-requests"         | ""           |
| "logship.service.kestrel-connection-duration"            | ""           |
| "logship.service.metrics.inflow.count"                   | ""           |
| "logship.service.metrics.inflow.schema"                  | ""           |
| "logship.service.routing-match-failure"                  | ""           |
| "logship.service.routing-match-success"                  | ""           |
| "schema.users"                                           | ""           |
| "schema.users.permissions"                               | ""           |
| "schema.tables.schema"                                   | ""           |
| "schema.tables"                                          | ""           |
| "metadata.cluster.services"                              | ""           |

The table selection is most commonly used with further tablular operators.

```kusto
schema.tables
| where TableName startswith 'schema'
```

| TableName                  | DatabaseName |
| -------------------------- | ------------ |
| "schema.users"             | ""           |
| "schema.users.permissions" | ""           |
| "schema.tables.schema"     | ""           |
| "schema.tables"            | ""           |
