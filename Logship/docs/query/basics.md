---
sidebar_position: 1
---

The basics of querying the logship backend database.

## Kusto
You can use the Kusto Query language to query the logship server. This assume's you've already got a logship deployment, if not refer to [getting-started](../getting-started/single_node_deployment.md).

### Example query
Hop on over to the query page on your deployment [(or on the public site)](https://try.logship.io/query). 

A simple query listing all of the accessible tables in your database. This uses the special schema namespace, which stores all sorts of interesting information about the database.
```kusto
schema.tables
| project TableName, DatabaseName
| limit 100
```