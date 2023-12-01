---
sidebar_label: Config
label: Setup | Config
---

# Frontend Configuration

This article will detail configuration of the Logship frontend. 

The frontend provides a simple visual interface for data analytics and logship database management.

You can find an example configuration here or in [the logship deployments repository on Github](https://github.com/logship-io/logship-deployments).

- [Frontend Configuration](#frontend-configuration)
  - [Example](#example)
  - [Logging](#logging)
  - [AllowedHosts](#allowedhosts)
  - [Kestrel](#kestrel)
    - [Endpoints](#endpoints)
      - [Http](#http)
  - [ClientSettings](#clientsettings)

## Example

```json
{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    },
    "AllowedHosts": "localhost;",
    "Kestrel": {
        "Endpoints": {
            "Http": {
                "Url": "http://+:8000"
            }
        }
    },
    "ClientSettings": {
        "BackendUrl": "http://localhost:5000",
        "GrafanaUrl": "http:/localhost:3000",
        "DefaultUser": "default",
        "DefaultPassword": "default",
        "MetricsInflowRootSchema": "logship.frontend.ui.",
        "MetricsInflowAccount": "00000000-0000-0000-0000-000000000000",
        "OAuthRedirectPath": "https://localhost:8000/login"
    }
}
```

---
## Logging

See [.NET Logging Configuration](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging?tabs=command-line#configure-logging-without-code) for more information.

## AllowedHosts

| Property               | Required | Description                               |
|------------------------|----------|-------------------------------------------|
| Value                  | Yes      | Defines the list of allowed hosts.        |

## Kestrel

### Endpoints

#### Http

| Property | Required | Description                               |
|----------|----------|-------------------------------------------|
| Url      | Yes      | Specifies the URL for the Http endpoint.  |

## ClientSettings

| Property                 | Required | Description                               |
|--------------------------|----------|-------------------------------------------|
| BackendUrl               | Yes      | Specifies the backend URL.                |
| GrafanaUrl               | No       | Specifies the Grafana URL.                |
| DefaultUser              | No       | Specifies the default (demo) username.    |
| DefaultPassword          | No       | Specifies the default (demo) password.    |
| MetricsInflowRootSchema  | Yes      | Specifies the root schema for metrics inflow. |
| MetricsInflowAccount     | Yes      | Specifies the metrics inflow account.     |
| OAuthRedirectPath        | No      | Specifies the OAuth redirect path.        |
