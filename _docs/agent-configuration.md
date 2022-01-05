---
title: Agent Configuration
categories: agent
author_staff_member: adam
date: 2022-01-03
---

The logship agent is configured via json document, it won't start without a config.
Provide a filepath as the agent's first argument to specify a configuration:
```sh
agent-rust.exe ./path/to/config.json
```

Example config.json:
```json
{
    "appSettings": {
        "address": "http://your.domain.com:1234/",
    },
    "udp_metrics": {
        "endpoint": "127.0.0.1:9000"
    }
}
```

# App Settings
The agent application settings, defined within the `appSettings` section.

#### Configuration Options

Name                | Type   | Default Value | Description                                                   |
--------------------|--------|---------------|---------------------------------------------------------------|
address             | string | None          | The ingestion endpoint for your logship host.                 |
maxRequestSizeBytes | u64    | 1000000       | The maximum request size (in bytes) for metric/trace uploads. |

Maximum `appSettings` configuration:
```json
"appSettings": {
    "address": "http://your.domain.com:1234/",
    "maxRequestSizeBytes": 1000000
}
```

# journalctl
Read journalctl trace messages, defined within the `journald` section.

#### Configuration Options

Name  | Type     | Default Value | Description                                      |
------|----------|---------------|--------------------------------------------------|
units | string[] | None          |The units (`-u`) passed to `journalctl --follow`. |

Maximum `journald` configuration:
```json
"journald": {
    "units": [
        "agent-rust.service",
        "agent-cpp.service",
        "logship-backend.service",
        "logship-frontend.service"
    ]
}
```

# UDP Metrics
Read UDP metrics from a port, defined within the `udp_metrics` section.

#### Configuration Options

Name     | Type   | Default Value    | Description                       |
---------|--------|------------------|-----------------------------------|
endpoint | string | "127.0.0.1:9009" | The UDP metric listener endpoint. |

Maximum `udp_metrics` configuration:
```json
"udp_metrics": {
    "endpoint": "127.0.0.1:9009"
}
```

# Windows PDH Metrics
Read metrics from Windows PDH, defined within the `win32_metrics` section.

#### Configuration Options

Name      | Type     | Default Value | Description               |
----------|----------|---------------|---------------------------|
providers | string[] | None          | The PDH metric providers. |

Maximum `win32_metrics` configuration:
```json
"win32_metrics": {
        "providers": [
            "\\Processor Information(_Total)\\% Processor Time",
            "\\Process(agent-rust)\\Working Set",
            "\\Process(agent-rust)\\Thread Count",
            "\\Process(backend.service)\\Working Set",
            "\\Process(backend.service)\\Thread Count",
            "\\Process(Frontend.Service)\\Working Set",
            "\\Process(Frontend.Service)\\Thread Count",
            "\\Process(_Total)\\Working Set",
            "\\LogicalDisk(*)\\Free Megabytes"
        ]
    },
```

# Windows ETW Trace
Read trace messages through Windows ETW, defined within the `win32_etwtrace` section.

#### Configuration Options

Name                  | Type     | Default Value                            | Description                                            |
----------------------|----------|------------------------------------------|--------------------------------------------------------|
file_output_directory | string   | "C:\\temp\\agent\\"                      | The directory to (temporarily) store unread ETL files. |
log_file_pattern      | string   | "logship_agent_rust_%d.etl"              | The filename format for stored ETL files.              |
providers             | string[] | ["4d1b58e1-1220-542a-815b-41707a19672d"] | The ETW providers to read trace logs from.             |

Maximum `appSettings` configuration:
```json
"appSettings": {
    "address": "http://your.domain.com:1234/",
    "maxRequestSizeBytes": 5000000
}
```

# System Information
Read system information, defined within the `sys_info` section.

Maximum `sys_info` configuration:
```json
"sys_info": { }
```