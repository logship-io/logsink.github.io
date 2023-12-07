---
label: Setup | Query
sidebar_label: Query
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Basic Querying

This example will use the same template deployment as described in [Getting Started - Single Node](/docs/getting-started/single-node).

Restart your instance:
<Tabs groupId="daemon" defaultValue="docker">
  <TabItem value="docker" label="Docker" default>

```shell 
docker-compose up -d
```
  </TabItem>
</Tabs>

## Web

Login to the Logship Frontend at [http://localhost:8000/](http://localhost:8000/). Using the navigation menu, head to the `Query` page (if you've been following the guided setup, you can also [take this link](http://localhost:8000/query/00000000-0000-0000-0000-000000000000)).

Select a table on the left side to generate a preview query for it, or execute the following for a list of all tables:

```kusto
schema.tables
| limit 100
```

As you explore, try repeating some queries. You may notice updated results... Test it out, run the following query to see where you've been!

```kusto
logship.frontend.ui.public.page.view
| where timestamp > ago(1h)
| summarize count = count() by page
| project page, count
| order by count desc
```