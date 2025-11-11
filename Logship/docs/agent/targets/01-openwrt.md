---
title: Agent installation on openwrt
---

# Installing Logship Agent on OpenWRT

## Prerequisites

- Ensure your OpenWRT device has internet access.
- Install dependencies

```sh
opkg update
opkg install unzip
```

## Download the Agent

Download the latest release from GitHub:

```sh
mkdir logship-agent
cd logship-agent

wget https://github.com/logship-io/logship-agent/releases/download/v0.9.12/LogshipAgent-linux-musl-arm64.zip -O logship-agent.zip

unzip logship-agent.zip
chmod +x Logship.Agent.ConsoleHost

mkdir -p /etc/logship-agent
mv Logship.Agent.ConsoleHost /etc/logship-agent/Logship.Agent.ConsoleHost

echo "==============================================="
echo " IMPORTANT! Update your account id"
echo "==============================================="

echo "Replacing logship endpoint"
sed -i 's/http:\/\/localhost:5000/REPLACE_ME/g' appsettings.json

echo "Replacing account id"
sed -i 's/00000000-0000-0000-0000-000000000000/REPLACE_ME/g' appsettings.json


mv appsettings.json /etc/logship-agent/appsettings.json

echo "Cleaning up"
cd ..
rm -rf logship-agent
```

## Create a Service

Create an init script at `/etc/init.d/logship-agent`:

```sh
cat <<'EOF' > /etc/init.d/logship-agent
#!/bin/sh /etc/rc.common
START=99
STOP=01
USE_PROCD=1

start_service() {
    logger -t myservice "Starting logship agent..."
    procd_open_instance
    procd_set_param command /bin/sh -c "cd /etc/logship-agent && /etc/logship-agent/Logship.Agent.ConsoleHost"

    procd_set_param file /etc/logship-agent/appsettings.json

    procd_set_param stdout 1 # forward stdout of the command to logd
    procd_set_param stderr 1 # same for stderr

    procd_close_instance
}

stop_service() {
    logger -t myservice "Stopping logship agent..."
    killall Logship.Agent.ConsoleHost
}
EOF
chmod +x /etc/init.d/logship-agent
```

## Enable and Start the Service

```sh
/etc/init.d/logship-agent enable
/etc/init.d/logship-agent start
```

The Logship agent should now run as a service on your OpenWRT device.

Just a note, the default configuration is likely not what you're looking for.
