---
title: Logship Database
---

# Logship Database

The Logship Database is the core application of a Logship deployment. It has two major functionalities:

- Database: Our in-house storage engine.
- Backend: The services backend, which provides APIs (for search, management, configuration, and more) for interfacing with the database.

A basic logship deployment includes a master node for both the backend and database functionalities. Conveniently, both can be configured and hosted within the same executable. Alternatively backend and database nodes can be hosted independently and across multiple machines.
