---
title: Single Node Deployment
---

# Single Node Deployment

This example will use a template docker-compose file from our logship-deployments repository to quickly deploy Logship services.

## Setup

### Scripts Only

<Tabs groupId="daemon" defaultValue="docker">
  <TabItem value="docker" label="Docker" default>

```shell
git clone https://github.com/logship-io/logship-deployments.git
cd logship-deployments/src/docker-compose/single-node
docker-compose pull
docker-compose up -d
# Open http://localhost:8000/setup in your browser
```

  </TabItem>
</Tabs>

### Guided

1. Use git to clone a copy of the logship-deployments repository, available [here](https://github.com/logship-io/logship-deployments).

```shell
git clone https://github.com/logship-io/logship-deployments.git
```

2. Enter the freshly cloned repository in your terminal, and navigate to `src/docker-compose/single-node` to find the [docker-compose](https://github.com/logship-io/logship-deployments/blob/main/src/docker-compose/single-node/docker-compose.yml) for a single-node deployment.

First, if you didn't already:

```shell
cd logship-deployments
```

then:

```shell
cd src/docker-compose/single-node
```

3. Make sure you have all of the latest containers available.

```
docker-compose pull
```

4. Create the environment!

```
docker-compose up -d
```

## Try it out

1. Open up the local logship frontend at [http://localhost:8000/setup](http://localhost:8000/setup).
2. Follow the setup instructions to create a login for your new database.
3. Try it out! Explore the query and alerts page. Check out how the page views chart on the homepage changes as you explore over time.
4. Clean up with `docker-compose down`
