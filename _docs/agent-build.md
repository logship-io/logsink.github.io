---
title: Agent Development
categories: agent
author_staff_member: adam
date: 2022-01-03
---

# Install Rust

You'll need to [install rust](https://www.rust-lang.org/tools/install).
## Windows
Windows builds also depend on an install of [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/).
## Linux
Install rust:
```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain stable
```

Install build dependencies:
```sh
sudo apt-get upgrade &&
	sudo apt-get update && 
	sudo apt-get install -y build-essential pkg-config
```

Install everything:
```sh
sudo apt-get upgrade &&
	sudo apt-get update && 
	sudo apt-get install -y build-essential pkg-config &&
	(curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain stable)
```

# Build Agent
Clone the agent repository at ~~[redacted]()~~.
From the repository root execute:
```sh
cargo build
```

# Run Agent
From the repository root execute:
```sh
cargo run ./path/to/configuration.json
```