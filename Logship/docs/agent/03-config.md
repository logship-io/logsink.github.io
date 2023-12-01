---
sidebar_label: Config
label: Setup | Config
---

# Agent Configuration

This article will detail configuration of the Logship agent. 

The agent can collect data from sources such as Windows performance counters, ETW providers, and journalctl logs, among others. The configuration is done through a JSON file called "appsettings.json", which is watched for updates. 

You can find an example configuration here or in [the agent source on Github](https://github.com/logship-io/logship-agent/blob/master/src/ConsoleHost/appsettings.json).

- [Agent Configuration](#agent-configuration)
  - [Example](#example)
  - [Output](#output)
    - [endpoint](#endpoint)
    - [subscription](#subscription)
    - [interval](#interval)
    - [maximumBufferSize](#maximumbuffersize)
  - [Logging](#logging)
  - [Inputs](#inputs)
    - [type](#type)
    - [\[...\] Extended Data](#-extended-data)
  - [Available inputs](#available-inputs)
    - [HealthService Input](#healthservice-input)
    - [Windows.PerformanceCounters Input](#windowsperformancecounters-input)
    - [Windows.Etw Input](#windowsetw-input)
    - [JournalCtl Input](#journalctl-input)
    - [HealthChecks Input](#healthchecks-input)
    - [UDP Input](#udp-input)
    - [Filesystem Input](#filesystem-input)
    - [System Input](#system-input)
    - [Network Input](#network-input)
    - [Processes Input](#processes-input)
    - [Proc Input (Linux)](#proc-input-linux)

## Example
```json
{
    "Output": {
      "endpoint": "http://host.docker.internal:5000",
      "subscription": "00000000-0000-0000-0000-000000000000",
      "interval": "00:00:02",
      "maximumBufferSize": 20000,
      "maximumFlushSize": 1000
    },
    "Logging": {
      "LogLevel": {
        "Default": "Debug"
      }
    },
    "Inputs": [
      {
        "type": "HealthService",
        "interval": "00:00:05.000"
      },
      {
        "type": "udp",
        "port": 49999
      },
      {
        "type": "healthcheck",
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
    ]
  }
```
## Output
------

### endpoint

-   **Description**: The HTTP endpoint to which data will be shipped. You may also use `"console"` to summarize collected data in the console, rather than uploading.
-   **Type**: string
-   **Required**: Yes

### subscription

-   **Description**: The subscription ID under which to upload collected data.
-   **Type**: guid
-   **Required**: Yes

### interval

-   **Description**: The interval at which data will be pushed to the endpoint.
-   **Type**: string
-   **Required**: No

### maximumBufferSize

-   **Description**: The maximum size of the agent buffer in number of events. Events will be dropped if reached.
-   **Type**: int
-   **Required**: No

```json
{
    "endpoint": "console",
    "interval": "00:00:02",
    "maximumBufferSize": 15000
}
```

## Logging

See [.NET Logging Configuration](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging?tabs=command-line#configure-logging-without-code) for more information.

## Inputs
------
The input configuration section of the Logship agent JSON file is an array that specifies the various sources from which log and performance data is collected. Each input type is represented as an object within the array and must include a required `"type"` field that specifies the type of input to collect. Additional fields that are specific to the input type can be included in the object to fine-tune its behavior.

### type

-   **Description**: The input type.
-   **Type**: string
-   **Required**: Yes

### [...] Extended Data
-   **Object properties can differ between input types**

```json
[ {
    "type": "HealthService"
},{
    "type": "Windows.PerformanceCounters",
    "interval": "00:00:05",
    "counters": [
        "\\Process(*)\\*logship*"
    ]
}, ...other inputs...]
```

In this example,  the "Windows.PerformanceCounters" input type includes an "interval" field that determines how frequently the counters are monitored, as well as a "counters" field that specifies which performance counters to collect. 

## Available inputs

### HealthService Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "HealthService". |
| interval | Yes | The frequency at which to collect data from the health service. |


```json
{
  "type": "HealthService",
  "interval": "00:00:05.000"
}
```

This input type collects data from a health service and includes an "interval" field that determines how frequently the data is collected.

### Windows.PerformanceCounters Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "Windows.PerformanceCounters". |
| interval | Yes | The frequency at which to collect performance counter data. |
| counters | Yes | An array of strings specifying the performance counters to collect. |
```json
{
  "type": "Windows.PerformanceCounters",
  "interval": "00:00:05",
  "counters": [
    "\\Process(*)\\*logship*"
  ]
}
```

This input type collects data from Windows performance counters and includes an "interval" field that determines how frequently the counters are monitored. The "counters" field is an array that specifies which performance counters to collect.

### Windows.Etw Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "Windows.Etw". |
| cleanupOldSessions | No | A boolean indicating whether to clean up old ETW sessions before starting a new one. |
| reuseExistingSession | No | A boolean indicating whether to reuse an existing ETW session with the same configuration. |
| providers | Yes | An array of objects specifying the ETW providers to collect data from. Each object must include a "ProviderGuid" field with the GUID of the provider to collect data from. |
```json
{
  "type": "Windows.Etw",
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
```

This input type collects data from Windows ETW providers and includes fields such as "cleanupOldSessions" and "reuseExistingSession" that determine how the ETW session is managed. The "providers" field is an array that specifies which ETW providers to collect data from.

### JournalCtl Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "JournalCtl". |
| flags | No | An integer specifying which journalctl flags to use when collecting logs. |
| columns | No | An array of strings specifying which columns to include in the output. |
```json
{
  "type": "JournalCtl",
  "flags": 0,
  "columns": ["USERID"]
}
```

This input type collects data from journalctl logs and includes a "flags" field that specifies which journalctl flags to use when collecting logs, and a "columns" field that specifies which columns to include in the output.


### HealthChecks Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "healthcheck". |
| targets | Yes | An array of endpoint targets to run health checks for. |
| targets[].endpoint | Yes | The endpoint URI |
| targets[].interval | No | The interval for the health check. |
| targets[].includeResponseHeaders | No | Collect response headers. |
| targets[].includeResponseBody | No | Collect response body. |

```json
{
    "type": "healthcheck",
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
```

This input type periodically executes HTTP GET requests to configured endpoints.

### UDP Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "udp". |
| port | No | UDP Port to listen on. |

```json
{
  "type": "udp",
  "port": 49999
}
```

This input type listens to a UDP port for the following JSON format. Any valid incoming packets are forwarded to the configured schema in the logship database. UDP Packets should be sent with the following format, serialized as JSON:
```json
{
  "timestamp": "datetime", // The timestamp of the event. (Optional, default = utcnow)
  "schema": "string", // The output table name
  "data": "object" // Your data object, which is serialized and forwarded.
}
```

### Filesystem Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "filesystem". |
| interval | No | The collection interval. |

```json
{
  "type": "filesystem",
  "interval": "00:00:05"
}
```

This input type collects filesystem information at the specified interval.

### System Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "system". |
| interval | No | The collection interval. |

```json
{
  "type": "system",
  "interval": "01:00:00"
}
```

This input type collects system information at the specified interval.

### Network Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "filesystem". |
| interval | No | The collection interval. |

```json
{
  "type": "network",
  "interval": "00:00:05"
}
```

This input type collects network information at the specified interval.

### Processes Input

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "filesystem". |
| interval | No | The collection interval. |

```json
{
  "type": "processes",
  "interval": "00:00:05"
}
```

This input type collects cross-platform process information at the specified interval.


### Proc Input (Linux)

| Field | Required | Description |
| --- | --- | --- |
| type | Yes | The input type. Must be "filesystem". |
| interval | No | The collection interval. |

```json
{
  "type": "proc",
  "interval": "00:00:05"
}
```

This input type collects process information by reading `/proc` at the specified interval. This input only works on linux platforms, and requires access to `/proc` to be useful.


