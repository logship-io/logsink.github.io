---
sidebar_label: Config
label: Setup | Config
---

Contents:
- [Agent Configuration](#agent-configuration)
  - [Example](#example)
  - [Output](#output)
  - [Logging](#logging)
  - [Sources](#sources)
    - [DiskInformation](#diskinformation)
    - [HealthChecks](#healthchecks)
    - [JournalCtl](#journalctl)
      - [JournalCtl Filters](#journalctl-filters)
    - [NetworkInformation](#networkinformation)
    - [Proc](#proc)
    - [Proc.OpenFiles](#procopenfiles)
    - [ProcessInformation](#processinformation)
    - [SystemInformation](#systeminformation)
    - [UDPListener](#udplistener)
    - [Windows.Etw](#windowsetw)
    - [Windows.PerformanceCounters](#windowsperformancecounters)
---

# Agent Configuration

The logship collector agent can collect data from multiple input sources such as journalctl logs, Windows performance counters, and Windows ETW. Configuration is loaded through a JSON file called `appsettings.json`.

You can find an example configuration here or in [the agent source on Github](https://github.com/logship-io/logship-agent/blob/master/src/ConsoleHost/appsettings.json).

## Example
```json
{
  "Output": {
    "endpoint": "http://localhost:5000",
    "subscription": "00000000-0000-0000-0000-000000000000",
    "interval": "00:00:02",
    "maximumBufferSize": 40000,
    "maximumFlushSize": 15000,
    "health": {
      "interval": "00:00:05"
    }
  },
  "Logging": { },
  "Sources": {
    "DiskInformation": {
      "enabled": true,
      "interval": "00:00:05"
    },
    "HealthChecks": {
      "enabled": true,
      "targets": [
        {
          "endpoint": "https://logship.io",
          "interval": "00:05:00"
        },
        {
          "endpoint": "https://backend.logship.io",
          "interval": "00:01:00",
          "includeResponseHeaders": true,
          "includeResponseBody": true
        },
        {
          "endpoint": "https://grafana.logship.io",
          "interval": "00:05:00"
        },
        {
          "endpoint": "https://try.logship.io",
          "interval": "00:05:00"
        }
      ]
    },
    "JournalCtl": {
      "enabled": true,
      "flags": 0,
      "includeFields": [ "USERID" ],
      "filters": [
        {
          "matchAny": [
            {
              "hasField": "CONTAINER_NAME"
            },
            {
              "fieldEquals": {
                "field": "SYSLOG_IDENTIFIER",
                "value": "systemd-resolved"
              }
            }
          ]
        },
        {
          "matchAll": [
            {
              "fieldEquals": {
                "field": "SYSLOG_IDENTIFIER",
                "value": "kernel"
              }
            }
          ]
        }
      ]
    },
    "NetworkInformation": {
      "enabled": true,
      "interval": "00:00:15"
    },
    "Proc": {
      "enabled": true,
      "interval": "00:00:05"
    },
    "Proc.OpenFiles": {
      "enabled": true,
      "interval": "00:05:00"
    },
    "ProcessInformation": {
      "enabled": true,
      "interval": "00:00:30"
    },
    "SystemInformation": {
      "enabled": true,
      "interval": "01:00:00"
    },
    "UDPListener": {
      "enabled": true,
      "port": 49999
    },
    "Windows.ETW": {
      "enabled": true,
      "cleanupOldSessions": true,
      "reuseExistingSession": true,
      "providers": [
        {
          "ProviderGuid": "7f006a22-73fb-4c17-b1eb-0a3070f9f187"
        },
        {
          "ProviderGuid": "E6F378E8-21CE-49A9-8D98-1BAAF053AB51"
        },
        {
          "ProviderGuid": "EA289C62-8C36-4904-9726-15ECD282AED5"
        }
      ]
    },
    "Windows.PerformanceCounters": {
      "enabled": true,
      "interval": "00:00:05",
      "counters": [
        "\\Process(*)\\*logship*"
      ]
    }
  }
}
```
## Output

Configuration for uploading data to the logship database.

| Field | Required | Description |
| --- | --- | --- |
| endpoint | Yes | The HTTP endpoint to which data will be shipped. You may also use `"console"` to summarize collected data in the console, rather than uploading. |
| subscription | Yes | The subscription ID under which to upload collected data. |
| interval | No | The interval at which data will be pushed to the endpoint. |
| maximumBufferSize | No | The maximum size of the agent buffer in number of events. Events will be dropped if reached. |
| maximumFlushSize | No | The maximum flush size of the agent's internal event buffer. |
| health | No | Configuration for agent health reporting. |
| health.interval | No | The interval at which to report agent health. |

```json
{
    "endpoint": "console",
    "interval": "00:00:02",
    "maximumBufferSize": 15000,
    "maximumFlushSize": 15000,
    "health": {
      "interval": "00:00:05"
    }
}
```

## Logging

See [.NET Logging Configuration](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging?tabs=command-line#configure-logging-without-code) for more information.

## Sources
------
The sources configuration is an object that specifies the various sources from which data is collected. Each input type is represented as a unique key within the object. Additional fields that are specific to each source type can be included to fine-tune collection behavior.

All sources have an `enabled` property, defaulted to true if the configuration key exists. This can be used to disable a configured source without removing the configuration section. To disable a source, either remove its configuration section or explicitly set `enabled` to false.

### DiskInformation

This source collects filesystem and disk information at the specified interval.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| interval | No | The collection interval. |

```json
{
  "Sources": {
    "DiskInformation": {
      "enabled": true,
      "interval": "00:00:05"
    }
  }
}
```

### HealthChecks

This source periodically executes HTTP requests to target configured endpoints.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| targets | Yes | An array of endpoint targets to run health checks for. |
| targets[].endpoint | Yes | The endpoint URI |
| targets[].interval | No | The interval for the health check. |
| targets[].includeResponseHeaders | No | Collect response headers. |
| targets[].includeResponseBody | No | Collect response body. |

```json
{
  "Sources": {
    "HealthChecks": {
      "enabled": true,
      "targets": [
        {
          "endpoint": "http://host.docker.internal:5000/",
          "interval": "00:05:00",
          "includeResponseHeaders": true,
          "includeResponseBody":  true
        },
        {
          "endpoint": "http://host.docker.internal:8000/",
          "interval": "00:05:00"
        }
      ]
    }
  }
}
```

### JournalCtl

This source collects journalctl logs.

By default, the following fields are included:
- MESSAGE
- PRIORITY
- SOURCE_REALTIME_TIMESTAMP
- SYSLOG_FACILITY
- SYSLOG_IDENTIFIER
- SYSLOG_PID
- SYSLOG_TIMESTAMP
- SYSTEMD_UNIT

Use the filters property to narrow collected logs; unfiltered journalctl is like a firehose that can produce significant amounts of data.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| flags | No | An integer specifying which journalctl flags to use when collecting logs. This field relates to `flags` in [sd_journal_open](https://www.man7.org/linux/man-pages/man3/sd_journal_open.3.html). |
| includeFields | No | An array of strings specifying which extra columns to include in the output. |
| filters | No | An array of specified journalctl filters, use this to narrow down collected logs. |
| filters[].matchAny | No | An array of filters, if any are matched the log is included. |
| filters[].matchAll | No | An array of filters, if all are matched the log is included. |
```json
{
  "Sources": {
    "JournalCtl": {
      "enabled": true,
      "flags": 0,
      "includeFields": ["USERID"],
      "filters": [
        {
          "matchAny": [
            {
              "hasField": "CONTAINER_NAME"
            },
            {
              "fieldEquals": {
                "field": "SYSLOG_IDENTIFIER",
                "value": "kernel"
              }
            }
          ]
        },
        {
          "matchAll": [...]
        }
      ]
    }
  }
}
```

#### JournalCtl Filters

Fields allow for configurable matching against journald logs. Use filters in the `matchAny` and `matchAll` properties of the JournalCtl source configuration. All provided fields of a filter must match.

| Field | Required | Description |
| --- | --- | --- |
| hasField | No | Check whether a field exists on a log by name (case-insensitive). |
| fieldEquals | No | Match a field value against a string. |
| fieldEquals.field | No | The field name (case-insensitive). |
| fieldEquals.value | No | The value to match (case-insensitive). |

```json
{
  "hasField": "CONTAINER_NAME",
  "fieldEquals": {
    "field": "SYSLOG_IDENTIFIER",
    "value": "kernel"
  }
}
```

### NetworkInformation

This source collects local network information at the specified interval.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| interval | No | The collection interval. |

```json
{
  "Sources": {
    "NetworkInformation": {
      "enabled": true,
      "interval": "00:00:15"
    }
  }
}
```

### Proc

This source collects process information by reading `/proc` at the specified interval. This source only works on linux platforms, and requires access to `/proc` to be useful.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| interval | No | The collection interval. |

```json
{
  "Sources": {
    "Proc": {
      "enabled": true,
      "interval": "00:00:05"
    }
  }
}
```

### Proc.OpenFiles

This source collects information about which processes are using files by reading `/proc` at the specified interval. This source only works on linux platforms, and requires access to `/proc` to be useful.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| interval | No | The collection interval. |

```json
{
  "Sources": {
    "Proc.OpenFiles": {
      "enabled": true,
      "interval": "00:00:05"
    }
  }
}
```

### ProcessInformation

This source collects cross-platform process information at the specified interval.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| interval | No | The collection interval. |

```json
{
  "Sources": {
    "ProcessInformation": {
      "enabled": true,
      "interval": "00:00:05"
    }
  }
}
```

### SystemInformation

This source collects system information at the specified interval. This information does not typically change, we recommend setting a long interval between updates.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| interval | No | The collection interval. |

```json
{
  "Sources": {
    "SystemInformation": {
      "enabled": true,
      "interval": "12:00:00"
    }
  }
}
```

### UDPListener

This source listens to a UDP port for the following JSON format. Any valid incoming packets are forwarded to the configured schema in the logship database. UDP Packets should be sent with the following format, serialized as JSON:
```json
{
  "timestamp": "datetime", // The timestamp of the event. (Optional, default = utcnow)
  "schema": "string", // The output table name
  "data": "object" // Your data object, which is serialized and forwarded.
}
```

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| port | No | UDP Port to listen on. |

```json
{
  "Sources": {
    "SystemInformation": {
      "enabled": true,
      "port": 49999,
    }
  }
}
```

This source collects data from Windows ETW providers. This source only works on Windows platforms.

### Windows.Etw

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| cleanupOldSessions | No | A boolean indicating whether to clean up old ETW sessions before starting a new one. |
| reuseExistingSession | No | A boolean indicating whether to reuse an existing ETW session with the same configuration. |
| providers | Yes | An array of objects specifying the ETW providers to collect data from. Each object must include a "ProviderGuid" field with the GUID of the provider to collect data from. |
```json
{
  "Sources": {
    "Windows.Etw": {
      "enabled": true,
      "cleanupOldSessions": true,
      "reuseExistingSession": false,
      "providers": [
        {
          "ProviderGuid": "AE4BD3BE-F36F-45B6-8D21-BDD6FB832853"
        },
        {
          "ProviderGuid": "4d1b58e1-1220-542a-815b-41707a19672d"
        },
        {
          "ProviderGuid": "7f006a22-73fb-4c17-b1eb-0a3070f9f187"
        },
        {
          "ProviderGuid": "E6F378E8-21CE-49A9-8D98-1BAAF053AB51"
        },
        {
          "ProviderGuid": "EA289C62-8C36-4904-9726-15ECD282AED5"
        }
      ]
    }
  }
}
```

### Windows.PerformanceCounters

This source collects data from Windows performance counters. This source only works on Windows platforms.

| Field | Required | Description |
| --- | --- | --- |
| enabled | No | Whether this source is enabled. |
| interval | No | The frequency at which to collect performance counter data. |
| counters | Yes | An array of strings specifying the performance counters to collect. |
```json
{
  "Sources": {
    "Windows.PerformanceCounters": {
      "interval": "00:00:05",
      "counters": [
        "\\Process(*)\\*logship*"
      ]
    }
  }
}
```
