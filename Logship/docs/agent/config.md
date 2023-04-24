---
sidebar_position: 2
title: Configuration
---

This article will guide you through configuring the Logship agent. 

The agent can collect data from sources such as Windows performance counters, ETW providers, and journalctl logs, among others. The configuration is done through a JSON file called "appsettings.json", which is watched for updates. 

You can find an example configuration in [the agent source on Github](https://github.com/logsink/logship-agent/blob/master/src/ConsoleHost/appsettings.json).

## Output
------

### endpoint

-   **Description**: The HTTP endpoint to which data will be shipped. You may also use `"console"` to summarize collected data in the console, rather than uploading.
-   **Type**: string
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

| Type | Description | Notes |
| --- | --- | --- |
| HealthService | Collects data from a health service. | |
| Windows.PerformanceCounters | Collects data from Windows performance counters. | Windows |
| Windows.Etw | Collects data from Windows ETW providers. | Windows |
| JournalCtl | Collects data from journalctl logs. | Linux |

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



