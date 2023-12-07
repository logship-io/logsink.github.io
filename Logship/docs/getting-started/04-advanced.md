---
label: Setup | Advanced
sidebar_label: Advanced Snippets
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Advanced Snippets

You've got a basic logship deployment! Lets try out some more advanced configuration and functionality.

## Provision First User

An ephemeral logship instance can be tedious, requiring first-time setup with each start. Let's automate that process away, and provision our first user! Add the following to `setupService` in your logship-database config.

```diff
{
    "backend":{
        "services": {
            [...],
            "setupService": {
                "enable": true,
+                "defaultSubscriptionId": "00000000-0000-0000-0000-000000000000", // optional
+                "defaultSubscriptionName": "default" // optional
+                "defaultUserId": "00000000-0000-0000-0000-000000000000" // optional
+                "provision": true, 
+                "username": "Admin",
+                "password": "default",
+                "firstname": "Admin",
+                "lastname": "Logship",
+                "email": "email@example.com",
            }
        }
    }    
```

On startup, you'll immediately be able to login with your configured credentials.

## Persistent Storage

By default, you can configure persistent storage by mounting to `/logship/` on your host. You have control over [configuration](/docs/database/config) of storage paths so you can choose what storage is persisted and where.

```diff
    logship-database:
        [...]
+        volumes:
+           - ./logship:/logship:rw
```


## Post Custom Data

With your logship instance running, post a metric to your backend server:

<Tabs groupId="language" defaultValue="js">
  <TabItem value="js" label="Javascript">

```js
const backend = "http://localhost:5000";
const sub = "00000000-0000-0000-0000-000000000000";
await fetch(`${backend}/inflow/${sub}`, {
  method: 'POST',
  body: JSON.stringify([{
    schema: 'hello.world',
    timestamp: new Date(),
      data: {
        text: "Hello, World!",
        userAgent: navigator.userAgent,
        value: 1
    }
  }])
});
```
  </TabItem>
  <TabItem value="ps1" label="PowerShell">

```powershell
$backend = "http://localhost:5000"
$sub = "00000000-0000-0000-0000-000000000000"
$body = @{
    schema = 'hello.world'
    timestamp = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
    data = @{
        text = "Hello, World!"
        userAgent = $env:COMPUTERNAME
        value = 1
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "$backend/inflow/$sub" -Method Post -Body "[$body]" -ContentType 'application/json'
```
  </TabItem>
  <TabItem value="shell" label="Shell">

```shell
backend="http://localhost:5000"
sub="00000000-0000-0000-0000-000000000000"

timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.%NZ")
userAgent=$(hostname)
value=1

json_data='[{
    "schema": "hello.world",
    "timestamp": "'$timestamp'",
    "data": {
        "text": "Hello, World!",
        "userAgent": "'$(hostname)'",
        "value": 1
    }
}]'

curl -X POST "$backend/inflow/$sub" -d "$json_data" -H "Content-Type: application/json"
```
  </TabItem>
</Tabs>

Test it out on the Query Page! Your new metric can be queried.

```kusto
hello.world
| where timestamp > ago(1h)
| project timestamp, text, value, userAgent
| limit 100
```