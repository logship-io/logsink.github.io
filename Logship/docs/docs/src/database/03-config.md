---
title: Database Configuration
---

# Database Configuration

This article will detail configuration of the Logship database.

The database is the backbone of any logship deployment. Configuration is specified between the `database` and `backend` sections, each providing configurable services with a wide range of capabilities.

You can find an example configuration here or in [the logship deployments repository on Github](https://github.com/logship-io/logship-deployments).

- [Database Configuration](#database-configuration)
  - [Example](#example)
  - [Logging](#logging)
    - [LogLevel](#loglevel)
  - [agent](#agent)
  - [database](#database)
    - [endpoints](#endpoints)
      - [worker](#worker)
      - [master](#master)
    - [services](#services)
      - [keyvalue](#keyvalue)
      - [transactionManager](#transactionmanager)
      - [transactionLog](#transactionlog)
        - [disk](#disk)
        - [memory](#memory)
      - [gateway](#gateway)
      - [partitionManager](#partitionmanager)
  - [backend](#backend)
    - [endpoints](#endpoints-1)
      - [worker](#worker-1)
      - [master](#master-1)
    - [database](#database-1)
      - [worker](#worker-2)
      - [master](#master-2)
    - [services](#services-1)
      - [configService](#configservice)
      - [inflowService](#inflowservice)
      - [collectorService](#collectorservice)
      - [searchExecutorService](#searchexecutorservice)
      - [searchQueryService](#searchqueryservice)
      - [accountsService](#accountsservice)
        - [jwt](#jwt)
        - [oauth](#oauth)
      - [messengerService](#messengerservice)
      - [dashboardService](#dashboardservice)
      - [evaluatorManagerService](#evaluatormanagerservice)
      - [evaluatorRunnerService](#evaluatorrunnerservice)
      - [setupService](#setupservice)
      - [master](#master-3)

## Example

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "agent": {
    "udpMetricsEndpoint": "host.docker.internal:49999"
  },
  "database": {
    "enable": true,
    "master": {
      "enable": true
    },
    "endpoints": {
      "worker": ["net.tcp://0.0.0.0:6000"],
      "master": ["net.tcp://127.0.0.1:6000"]
    },
    "services": {
      "keyvalue": {
        "enable": true,
        "dataPath": "/logship/kvs"
      },
      "transactionManager": {
        "enable": true
      },
      "transactionLog": {
        "enable": true,
        "disk": {
          "enable": true,
          "path": "/logship/tlog"
        },
        "memory": {
          "enable": false
        }
      },
      "gateway": {
        "enable": true
      },
      "partitionManager": {
        "enable": true
      }
    }
  },
  "backend": {
    "enable": true,
    "endpoints": {
      "worker": ["net.tcp://0.0.0.0:6002"],
      "master": ["net.tcp://127.0.0.1:6002"]
    },
    "database": {
      "worker": ["net.tcp://127.0.0.1:6000"],
      "master": ["net.tcp://127.0.0.1:6000"]
    },
    "services": {
      "configService": {
        "enable": true
      },
      "inflowService": {
        "enable": true
      },
      "collectorService": {
        "enable": true,
        "tempPath": "/logship/tmp/"
      },
      "searchExecutorService": {
        "enable": true,
        "dataPath": "/logship/searchdata/",
        "minimumFreeSpaceBytes": 5368709120,
        "minimumFreeSpacePercentage": 15.0
      },
      "searchQueryService": {
        "enable": true
      },
      "accountsService": {
        "enable": true,
        "jwt": {
          "enable": true,
          "issuer": "logship-example",
          "audience": "logship-example",
          "signingKey": "this is a secret signing key for locally-signed JWT tokens"
        },
        "oauth": {
          "enable": false
        }
      },
      "messengerService": {
        "enable": true
      },
      "dashboardService": {
        "enable": true
      },
      "evaluatorManagerService": {
        "enable": true
      },
      "evaluatorRunnerService": {
        "enable": true
      },
      "setupService": {
        "enable": true,
        "defaultAccountId": "00000000-0000-0000-0000-000000000000",
        "defaultUserId": "00000000-0000-0000-0000-000000000000",
        "provision": true,
        "username": "admin",
        "password": "default",
        "firstname": "Admin",
        "lastname": "Logship",
        "email": "admin@example.com"
      }
    },
    "master": {
      "enable": true
    }
  }
}
```

---

> Config validation can be ignored for services with `enable: false`.

## Logging

See [.NET Logging Configuration](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging?tabs=command-line#configure-logging-without-code) for more information.

### LogLevel

| Property                   | Type   | Required | Description                                             |
| -------------------------- | ------ | -------- | ------------------------------------------------------- |
| Default                    | String | Yes      | Specifies the default log level.                        |
| Microsoft.Hosting.Lifetime | String | Yes      | Specifies the log level for Microsoft.Hosting.Lifetime. |

## agent

| Property           | Type   | Required | Description                         |
| ------------------ | ------ | -------- | ----------------------------------- |
| udpMetricsEndpoint | String | Yes      | Specifies the UDP metrics endpoint. |

## database

| Property  | Type    | Required | Description                              |
| --------- | ------- | -------- | ---------------------------------------- |
| enable    | Boolean | No       | Enables or disables the database.        |
| master    | Boolean | Yes      | Enables or disables the master database. |
| endpoints | Object  | Yes      | Defines endpoints for worker and master. |
| services  | Object  | Yes      | Defines various database services.       |

### endpoints

#### worker

| Value | Type     | Required | Description                     |
| ----- | -------- | -------- | ------------------------------- |
|       | String[] | Yes      | Specifies the worker endpoints. |

#### master

| Value | Type     | Required | Description                     |
| ----- | -------- | -------- | ------------------------------- |
|       | String[] | Yes      | Specifies the master endpoints. |

### services

#### keyvalue

| Property | Type    | Required | Description                                   |
| -------- | ------- | -------- | --------------------------------------------- |
| enable   | Boolean | No       | Enables or disables the keyvalue service.     |
| dataPath | String  | Yes      | Specifies the data path for keyvalue service. |

#### transactionManager

| Property | Type    | Required | Description                                          |
| -------- | ------- | -------- | ---------------------------------------------------- |
| enable   | Boolean | No       | Enables or disables the transaction manager service. |

#### transactionLog

| Property | Type    | Required | Description                                              |
| -------- | ------- | -------- | -------------------------------------------------------- |
| enable   | Boolean | No       | Enables or disables the transaction log service.         |
| disk     | Object  | Yes      | Defines disk settings for the transaction log service.   |
| memory   | Object  | Yes      | Defines memory settings for the transaction log service. |

##### disk

| Property | Type    | Required | Description                                                 |
| -------- | ------- | -------- | ----------------------------------------------------------- |
| enable   | Boolean | No       | Enables or disables disk storage for the transaction log.   |
| path     | String  | Yes      | Specifies the path for disk storage of the transaction log. |

##### memory

| Property | Type    | Required | Description                                                 |
| -------- | ------- | -------- | ----------------------------------------------------------- |
| enable   | Boolean | No       | Enables or disables memory storage for the transaction log. |

#### gateway

| Property | Type    | Required | Description                              |
| -------- | ------- | -------- | ---------------------------------------- |
| enable   | Boolean | No       | Enables or disables the gateway service. |

#### partitionManager

| Property | Type    | Required | Description                                        |
| -------- | ------- | -------- | -------------------------------------------------- |
| enable   | Boolean | No       | Enables or disables the partition manager service. |

## backend

| Property  | Type    | Required | Description                                      |
| --------- | ------- | -------- | ------------------------------------------------ |
| enable    | Boolean | No       | Enables or disables the backend service.         |
| endpoints | Object  | Yes      | Defines endpoints for worker and master.         |
| database  | Object  | Yes      | Defines database settings for worker and master. |
| services  | Object  | Yes      | Defines various backend services.                |
| master    | Boolean | Yes      | Enables or disables the master backend service.  |

### endpoints

#### worker

| Value | Type     | Required | Description                     |
| ----- | -------- | -------- | ------------------------------- |
|       | String[] | Yes      | Specifies the worker endpoints. |

#### master

| Value | Type     | Required | Description                     |
| ----- | -------- | -------- | ------------------------------- |
|       | String[] | Yes      | Specifies the master endpoints. |

### database

#### worker

| Value | Type     | Required | Description                             |
| ----- | -------- | -------- | --------------------------------------- |
|       | String[] | Yes      | Specifies the worker database endpoint. |

#### master

| Value | Type     | Required | Description                             |
| ----- | -------- | -------- | --------------------------------------- |
|       | String[] | Yes      | Specifies the master database endpoint. |

### services

#### configService

| Property | Type    | Required | Description                             |
| -------- | ------- | -------- | --------------------------------------- |
| enable   | Boolean | No       | Enables or disables the config service. |

#### inflowService

| Property | Type    | Required | Description                             |
| -------- | ------- | -------- | --------------------------------------- |
| enable   | Boolean | No       | Enables or disables the inflow service. |

#### collectorService

| Property | Type    | Required | Description                                             |
| -------- | ------- | -------- | ------------------------------------------------------- |
| enable   | Boolean | No       | Enables or disables the collector service.              |
| tempPath | String  | Yes      | Specifies the temporary path for the collector service. |

#### searchExecutorService

| Property                   | Type    | Required | Description                                                                  |
| -------------------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| enable                     | Boolean | No       | Enables or disables the search executor service.                             |
| dataPath                   | String  | Yes      | Specifies the data path for the search executor service.                     |
| minimumFreeSpaceBytes      | Number  | Yes      | Specifies the minimum free space in bytes for the search executor service.   |
| minimumFreeSpacePercentage | Number  | Yes      | Specifies the minimum free space percentage for the search executor service. |

#### searchQueryService

| Property | Type    | Required | Description                                   |
| -------- | ------- | -------- | --------------------------------------------- |
| enable   | Boolean | No       | Enables or disables the search query service. |

#### accountsService

| Property | Type    | Required | Description                                      |
| -------- | ------- | -------- | ------------------------------------------------ |
| enable   | Boolean | No       | Enables or disables the accounts service.        |
| jwt      | Object  | Yes      | Defines JWT settings for the accounts service.   |
| oauth    | Object  | Yes      | Defines OAuth settings for the accounts service. |

##### jwt

| Property   | Type    | Required | Description                                       |
| ---------- | ------- | -------- | ------------------------------------------------- |
| enable     | Boolean | No       | Enables or disables JWT for the accounts service. |
| issuer     | String  | Yes      | Specifies the issuer for JWT tokens.              |
| audience   | String  | Yes      | Specifies the audience for JWT tokens.            |
| signingKey | String  | Yes      | Specifies the signing key for JWT tokens.         |

##### oauth

| Property                | Type     | Required | Description                                                       |
| ----------------------- | -------- | -------- | ----------------------------------------------------------------- |
| enable                  | Boolean  | No       | Enables or disables OAuth for the accounts service.               |
| clientId                | String   | Yes      | The OAuth Client Id                                               |
| scope                   | String   | Yes      | OAuth Logship Scope                                               |
| metadataAddress         | String   | Yes      | OAuth Metadata Address                                            |
| authority               | String   | Yes      | OAuth Authority                                                   |
| tokenEndpoint           | String   | Yes      | OAuth Token Endpoint                                              |
| authorizeEndpoint       | String   | Yes      | OAuth Authorizer Endpoint                                         |
| deviceEndpoint          | String   | Yes      | OAuth Device Endpoint                                             |
| validIssuers            | String[] | Yes      | OAuth Token Issuers                                               |
| validAudiences          | String[] | Yes      | OAuth Token Audiences (typically your Client Id)                  |
| createDefaultUser       | Boolean  | Yes      | Create a user for new OAuth logins?                               |
| defaultUserAccount | String   | Yes      | If creating a default user, the account ID for the new user  |
| userIdClaimType         | String   | No       | If creating a default user, the token claim for a User ID         |
| firstNameClaimType      | String   | No       | If creating a default user, the token claim for a User First Name |
| lastNameClaimType       | String   | No       | If creating a default user, the token claim for a User Last Name  |
| emailClaimType          | String   | No       | If creating a default user, the token claim for a User Email      |

#### messengerService

| Property | Type    | Required | Description                                |
| -------- | ------- | -------- | ------------------------------------------ |
| enable   | Boolean | No       | Enables or disables the messenger service. |

#### dashboardService

| Property | Type    | Required | Description                                |
| -------- | ------- | -------- | ------------------------------------------ |
| enable   | Boolean | No       | Enables or disables the dashboard service. |

#### evaluatorManagerService

| Property | Type    | Required | Description                                        |
| -------- | ------- | -------- | -------------------------------------------------- |
| enable   | Boolean | No       | Enables or disables the evaluator manager service. |

#### evaluatorRunnerService

| Property | Type    | Required | Description                                       |
| -------- | ------- | -------- | ------------------------------------------------- |
| enable   | Boolean | No       | Enables or disables the evaluator runner service. |

#### setupService

| Property              | Type    | Required | Description                                                             |
| --------------------- | ------- | -------- | ----------------------------------------------------------------------- |
| enable                | Boolean | Yes      | Enables or disables the setup service.                                  |
| defaultAccountId | String  | Yes      | Specifies the default account ID for the setup service.            |
| provision             | Boolean | Yes      | Specifies whether to provision a first user to skip visual first setup. |
| username              | String  | Yes      | Specifies the username for the first user.                              |
| password              | String  | Yes      | Specifies the password for the first user.                              |
| firstname             | String  | Yes      | Specifies the first name for the first user.                            |
| lastname              | String  | Yes      | Specifies the last name for the first user.                             |
| email                 | String  | Yes      | Specifies the email for the first user.                                 |

#### master

| Property | Type    | Required | Description                                     |
| -------- | ------- | -------- | ----------------------------------------------- |
| enable   | Boolean | Yes      | Enables or disables the master backend service. |
