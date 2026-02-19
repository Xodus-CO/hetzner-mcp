# Hetzner Cloud Cursor Plugin

A comprehensive Hetzner Cloud integration for Cursor, powered by a native TypeScript MCP server. Manage your infrastructure directly from your IDE using natural language.

[Get Hetzner Cloud](https://hetzner.cloud/?ref=IAYKetqPnlq9) — new signups get €20 credit; I get €10 once you’ve spent €10.

<img src="assets/hetzner.svg" width="140" alt="Hetzner logo" />

## Features

This plugin provides full CRUD operations and management capabilities for the following Hetzner Cloud resources:

### 🖥️ Servers

- **List/Create/Delete**: `list_servers`, `create_server`, `delete_server`.
- **Power**: `power_on_server`, `power_off_server`, `reboot_server`, `shutdown_server`, `reset_server`.
- **Update**: `update_server`, `change_server_type` (resize; server must be off).
- **Networking**: `attach_server_to_network`, `detach_server_from_network`.
- **Storage**: `attach_iso`, `detach_iso`.

### ⚖️ Load Balancers

- **CRUD**: `list_load_balancers`, `create_load_balancer`, `update_load_balancer`, `delete_load_balancer`.
- **Targets & services**: `add_load_balancer_target`, `remove_load_balancer_target`, `add_load_balancer_service`, `delete_load_balancer_service`.
- **Types**: `list_load_balancer_types` (for choosing `load_balancer_type` when creating).

### 🌐 Networks

- **CRUD**: `list_networks`, `create_network`, `update_network`, `delete_network`.
- **Subnets**: `add_network_subnet`, `delete_network_subnet` (e.g. private ranges like 10.0.0.0/16 per zone).

### 💾 Volumes

- **CRUD**: `list_volumes`, `create_volume`, `update_volume`, `delete_volume`.
- **Attach/detach**: `attach_volume`, `detach_volume`.

### 🛡️ Firewalls

- **CRUD**: `list_firewalls`, `create_firewall`, `update_firewall`, `delete_firewall`.

### 🔗 Floating IPs

- **CRUD**: `list_floating_ips`, `create_floating_ip`, `update_floating_ip`, `delete_floating_ip`.
- **Assign/unassign**: `assign_floating_ip`, `unassign_floating_ip`.

### 🔗 Primary IPs

- **CRUD**: `list_primary_ips`, `create_primary_ip`, `get_primary_ip`, `update_primary_ip`, `delete_primary_ip`.
- **Assign/unassign**: `assign_primary_ip`, `unassign_primary_ip` (server must be off). Datacenter-scoped static IPs.

### 🔑 SSH Keys

- **CRUD**: `list_ssh_keys`, `create_ssh_key`, `update_ssh_key`, `delete_ssh_key`.

### 📍 Placement Groups

- **CRUD**: `list_placement_groups`, `create_placement_group`, `update_placement_group`, `delete_placement_group`.

### 💰 Pricing & Metadata

- **Pricing**: `get_pricing`.
- **Metadata**: `list_locations`, `list_images`, `list_server_types`, `list_load_balancer_types`, `list_datacenters` (e.g. ash-dc1; where servers can be created).
- **Actions**: `list_actions`, `get_action` — poll or wait for create/delete/action results.

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

**Simple**

- "List my servers in Nuremberg"
- "Create a cx22 server named 'web-01' with Ubuntu 24.04 and my SSH key"
- "Create a 10GB volume and attach it to 'web-01'"
- "How much does a cpx31 server cost?"
- "Set up a Load Balancer for my web servers"

**Complex**

- "Create a private network 10.0.0.0/16 in eu-central, add a subnet (e.g. 10.0.1.0/24) in that zone, then create two cx22 servers in eu-central (e.g. fsn1 and nbg1) and attach them to that network"
- "Create a firewall that allows SSH and HTTP, attach it to my web-\* servers, then create a load balancer in fsn1 with a TCP service on 443 and add those servers as targets"
- "List all my actions and show me which ones are still running, then get the status of action 12345"
- "Create a Primary IP in datacenter ash-dc1, power off server web-01, assign the Primary IP to it, then power it back on"
- "Tear down everything: detach and delete all volumes, delete the load balancer and firewall, unassign and delete floating IPs, then delete servers web-01 and web-02"

## Development

- `src/index.ts`: Main entry point.
- `src/register-tools.ts`: Definitions for all tools.
- `src/mcp-server.ts`: Custom MCP server wrapper.

## License

MIT
