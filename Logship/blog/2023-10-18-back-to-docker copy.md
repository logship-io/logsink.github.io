---
slug: logship-ai-now-back-on-podman
title: Hosting and Deployment Updates 2
authors:
  name: peter
tags: [logship, kubernetes, podman, bare-metal]
---

TLDR; All publicly-available logship services are now hosted in podman containers.

# We've made a terrible mistake
Managing a k3s deployment for the single node which hosts our public frontend was nothing but a nightmare. We went ahead an rolled it all back to podman + podman-compose. Having to work through helm was purely unnecessary overhead. We've rolled to a much simpled deployment system with a few containers and a simple nginx reverse proxy.

## Life is all better over here

> "We do things not because they are easy, but because they are hard"
>
>  — President John F. Kennedy