---
title: Query
---

# Basic Querying

Now that you have Logship running, let's explore how to query your data. This guide continues from our [Single Node](/docs/getting-started/single-node) setup.

## Accessing the Query Interface

1. First, ensure your Logship instance is running:

```shell
docker-compose up -d
```

2. Navigate to the Logship Frontend:
   - Open your browser and go to [http://localhost:8000/](http://localhost:8000/)
   - Log in with your credentials
   - Click on `Query` in the navigation menu (or use [this direct link](http://localhost:8000/query/00000000-0000-0000-0000-000000000000) if you're following the guided setup)

## Your First Query

Let's start with a simple query to explore available tables:

```kusto
schema.tables
| limit 100
```

This query shows you all tables in your Logship database. It's a great way to discover what data you have available.

## Track Your Activity

Want to see your own activity? Try this query:

```kusto
logship.frontend.ui.public.page.view
| where timestamp > ago(1h)
| summarize count = count() by page
| project page, count
| order by count desc
```

This query shows which pages you've visited in the last hour, ordered by visit count. It's a great example of how Logship automatically tracks frontend activity!
