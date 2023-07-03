---
slug: logship-ai-now-on-k3s
title: Hosting and Deployment Updates
authors:
  name: adam
tags: [logship, kubernetes, k3s, bare-metal]
---

TLDR; All publicly-available logship services are now hosted on bare-metal k3s.

# Hosted on k3s

One of Logship's foundational strengths is that it can be hosted wherever you need it. To prove that to ourselves, we've migrated the hosting architecture of our public services onto Kubernetes, specifically [k3s](https://k3s.io/). Our initial hosting configuration has been quite the spaghettified mess. When bootstrapping a startup, you don't have the time nor the money to create cool continuous-integration platforms or use expensive pre-built ones from major cloud service providers. We've spent some time over the past month migrating our architecture onto k3s. 

### Out With The Old

Our old deployment stack was... not great. We've been using a single DigitalOcean droplet and GitHub Pages to host all of our resources. We won't cover GitHub Pages in this blog post, but if you want to learn about them [DuckDuckGo](https://duckduckgo.com/?q=GitHub+Pages) is your friend.

All of our public services run on a single DigitalOcean droplet, but before the migration:
- Some of our services were run directly on the droplet's host OS.
- Some of our services were run in Docker containers through a Composefile.

For the OS-hosted services, deployments were automated through Azure. This worked quite well, but depended on manually maintained deploy/undeploy scripts. Operational tasks like rollbacks and version management were a pain, and organizing inter-service communication was becoming a mess.

For the containerized services, everything was listed in an ever-growing Composefile. This is a great way to bootstrap since it's very simple to get things running but over time a Composefile can become quite tedious to maintain. In our case, any deployment required an ssh into the droplet, navigating to our services directory, and running `docker-compose pull && docker-compose up -d`.

Overall this "temporary" setup worked quite well for a couple of years, but it was time to move on to bigger things.

### In With The New

Moving forward, we wanted our new deployment structure to be similar (or at least adjacent) to industry standards. In our case we wanted to have a basic deployment on Kubernetes so that service deployment, scaling, and replication could all be simplified. Our top contenders for Kubernetes environments were [RKE2](https://docs.rke2.io/) and [k3s](https://k3s.io/). Both have their merits, but ultimately due to our limitations (our production services all run on one tiny DigitalOcean droplet, and we don't want to pay for another) we went with k3s to minimize resource utilization.

Currently, our DigitalOcean hosting costs are $48/month for a droplet with 4vCPU, 8GB Memory, and 160GB SSD storage. In an effort to not give more of our hard-earned money to cloud service providers, we opted to continue using this droplet to host k3s on bare-metal. This saves us a minimum of $12/month on load balancing and pays out a wealth of knowledge on managing Kubernetes. I understand now why companies pay so much to offload Kubernetes management to third parties, but hey, $12 (a month) is $12 (a month).

Our new deployment structure involves a series of Helm charts:
- A chart to deploy the Logship Agent in k3s.
- A shared chart to deploy Logship services in k3s (e.g. Backend, Database, Frontend, Grafana, Public Site).
- A chart with dependencies on the above two charts which manages our bare metal requirements (e.g. nginx-ingress-controller, SSL cert-manager configuration, sandbox sample data uploaders).

Using this last chart, we can continuously deploy application changes with Helm simply by running

```sh
helm upgrade logship [CHART_LOCATION] --install
```
on any machine that has the proper kubeconfig. Nice.


Thanks for reading!

Transition generally comes with pain. If you see any issues or dead links, please let us know at [support@logship.ai](mailto:support@logship.ai).

---

> “We will not go quietly into the night. We will not vanish without a fight. We’re going to live on. We’re going to survive. Today we celebrate our Independence Day!”
> 
>  — President Thomas J. Whitmore

🇺🇸 Happy (late) Independence Day! We hope you rewatched the 1996 documentary.
