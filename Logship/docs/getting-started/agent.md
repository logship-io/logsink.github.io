---
sidebar_position: 2
title: Agent
---

# Agent

This article will guide you through an initial setup with the logship agent. 

Make sure you have docker installed.
```
docker pull ghcr.io/logsink/logship-agent:latest
docker run -d --network=host ghcr.io/logsink/logship-agent:latest
```

Boom, and there you have it, metrics should start flowing to [https://try.logship.ai](https://try.logship.ai)