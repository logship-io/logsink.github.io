---
title: Grafana Datasource Plugin
---

# Grafana Data Source Plugin

The plugin releases page [on GitHub](https://github.com/logship-io/grafana-logship-datasource/releases) contains assets for install into Grafana.

The plugin is unsigned and requires development mode to be enabled in Grafana.

> :warning: Additional Data Source configuration within Grafana is necessary for basic functionality.

```dockerfile
ARG logship_grafana_datasource_version=0.0.24 # Update this as needed
FROM grafana/grafana-oss:latest
ENV GF_DEFAULT_APP_MODE "development"
ENV GF_INSTALL_PLUGINS "https://github.com/logsink/grafana-logship-datasource/releases/download/v$logship_grafana_datasource_version/logship-datasource-$logship_grafana_datasource_version.zip;logship-grafana-datasource"
```
