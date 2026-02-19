# Hetzner Cloud Cursor Plugin

A comprehensive Hetzner Cloud integration for Cursor, powered by a native TypeScript MCP server. Manage your infrastructure directly from your IDE using natural language.

<img src="assets/hetzner.svg" width="140" alt="Hetzner logo" />

## Features

This plugin provides full CRUD operations and management capabilities for the following Hetzner Cloud resources:

### 🖥️ Servers

- **Create**: Supports `name`, `type`, `image`, `location`, `ssh_keys` (names or IDs), `labels`, `user_data`, and more.
- **Manage**: `start`, `stop`, `shutdown`, `reboot`, `reset`.
- **Update**: Change server type (resize), update labels.
- **Networking**: Attach/detach from private networks.
- **Storage**: Attach/detach ISOs.

### 💾 Volumes

- **Create**: Specify size, format (xfs/ext4), and location.
- **Manage**: Attach to and detach from servers.
- **Resize**: Increase volume size.

### 🌐 Networking

- **Networks**: Create private networks with IP ranges and subnets.
- **Floating IPs**: Allocate and assign IPv4/IPv6 addresses to servers.
- **Load Balancers**: Create LBs, add/remove targets (servers/IPs), and manage services (HTTP/TCP/HTTPS).

### 🛡️ Security & Organization

- **Firewalls**: Create and manage firewall rules (files read from JSON).
- **SSH Keys**: list and manage SSH keys.
- **Placement Groups**: Manage anti-affinity groups for high availability.
- **Labels**: Full support for labeling all resources for better organization.

### 💰 Pricing & Info

- **Pricing**: Retrieve current cloud pricing for all resources via `get_pricing`.
- **Metadata**: List available locations, server types, and images.

## Project structure

This plugin lives under `plugins/hetzner-mcp/` in the [Cursor plugin template](https://github.com/cursor/plugin-template) layout:

- `.cursor-plugin/`: Plugin manifest (`plugin.json`).
- `assets/`: Hetzner logo — `hetzner.svg` (used in manifest and README; scales cleanly) and optional `hetzner.jpg` (square raster for marketplace/avatars if preferred).
- `rules/`: AI behavior rules (`hetzner.mdc`).
- `skills/`: Capabilities documentation (`SKILL.md`).
- `src/`: TypeScript MCP server source.
- `dist/`: Compiled output.
- `mcp.json`: MCP server config for local use.

## Installation

From the repo root or this directory:

1. **Install dependencies**: `npm install`
2. **Build**: `npm run build`
3. **Configure**: Set `HCLOUD_TOKEN` in your environment or in `mcp.json`:
   ```json
   {
     "mcpServers": {
       "hetzner-cloud": {
         "command": "node",
         "args": ["dist/index.js"],
         "env": { "HCLOUD_TOKEN": "your-token-here" }
       }
     }
   }
   ```

## Usage

Once installed, the plugin exposes the Hetzner Cloud API as MCP tools. You can interact with it using natural language in Cursor:

- "List my servers in Nuremberg"
- "Create a cx22 server named 'web-01' with Ubuntu 24.04 and my SSH key"
- "Create a 10GB volume and attach it to 'web-01'"
- "How much does a cpx31 server cost?"
- "Set up a Load Balancer for my web servers"

## Development

- `src/index.ts`: Main entry point.
- `src/register-tools.ts`: Definitions for all tools.
- `src/mcp-server.ts`: Custom MCP server wrapper.

## License

MIT
