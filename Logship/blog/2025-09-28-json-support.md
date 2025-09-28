---
slug: json-support
title: JSON Support Now Available in Logship!
authors:
  name: peter
tags: [logship, json, kusto, queries]
---

# JSON Support Lands in Logship

Hey Logship crew! We're thrilled to announce that native JSON support is now live on the platform. This is a game-changer for anyone dealing with JSON-formatted logs, metrics, or data streams. Whether you're parsing application logs, API responses, or custom telemetry, you can now effortlessly convert string columns to JSON and drill down into nested structures right in your Kusto queries.

No more clunky string manipulations or external tools—just pure, query-time JSON magic. Let's dive in and see how it works, why it's awesome, and some real-world examples to get you started.

## Why JSON Support Matters

In the world of observability, JSON is everywhere. From structured logs in your apps to metadata in metrics, JSON lets you pack complex data into readable formats. But querying that data? Historically, it meant treating everything as strings and using regex or manual parsing. Not anymore!

With Logship's new JSON support:
- **Seamless Conversion**: Turn any string column into a JSON object with the `json()` function.
- **Nested Access**: Drill into objects and arrays like `json_column.field1.field2.value`.
- **Performance**: It's all handled server-side, so your queries stay fast and efficient.

This feature unlocks deeper insights from your data without leaving the query editor. Perfect for troubleshooting, alerting, or building dashboards.

## Getting Started with JSON Queries

The core of it is the `json()` function. Pass it a string, and boom—you've got a JSON object you can query like any other column.

Here's a basic example:

```kusto
datatable (string_column: string, json_column: json) [
    '{ "field1": 3 }', json('{ "field1": 3 }')
]
| project left = json(string_column).field1, right = json_column.field1
```

| left | right |
| ---- | ----- |
|  3   |   3   |

See? The `json()` function converts the string to JSON, and you access fields with dot notation. No sweat.

## Handling Nested Structures

JSON gets really powerful with nesting. Imagine parsing a log entry with multiple layers of metadata. Logship handles it all.

```kusto
datatable (json_column: json) [
    json('{ "field1": {
            "field2": {
                "field3": {
                    "field4": {
                        "value": 3
                    }
                }
            }
        }
    }')
]
| project val = json_column.field1.field2.field3.field4.value
```

| val |
| --- |
|  3  |

You can chain as deep as your data goes. Arrays? We've got you covered too—use indexing like `json_column.items[0].name`.

## Real-World Use Case: Parsing API Logs

Let's say you're logging API requests as JSON strings. With JSON support, you can extract status codes, user IDs, and response times in one query.

```kusto
// Assuming your logs are in a table called 'api.logs' with a 'message' column containing JSON
api.logs
| where timestamp > ago(1h)
| project parsed = json(message)
| where parsed.statusCode >= 400
| summarize error_count = count() by userId = parsed.user.id, bin(timestamp, 5m)
| render timechart
```

This turns raw logs into actionable insights—filter errors, group by user, and visualize trends. No pre-processing required!

## Tips and Tricks

- **Error Handling**: If the string isn't valid JSON, `json()` will return null. Use `where` to filter out bad data first.
- **Performance**: JSON parsing happens per row, so it's best for targeted queries. For massive datasets, consider summarizing early.
- **Compatibility**: This works in the UI ad CLI. Stay tuned for more integrations.
- **Limitations**: All output values are currently handled as strings. So Json typing is not maintained.

## Try It Out

Head over to [try.logship.io](https://try.logship.io) and experiment with JSON in your queries. Upload some sample data or use our demo tables to play around.

Got feedback or ideas? Drop us a line at [contact@logship.io](mailto:contact@logship.io). We're all ears!

:heart: The Logship Team