# Hetzner MCP

A **Cursor Plugin** for the [Cursor Plugin marketplace](https://cursor.com/marketplace). Manage Hetzner Cloud resources directly from Cursor using natural language and AI-powered workflows.

[Get Hetzner Cloud](https://hetzner.cloud/?ref=IAYKetqPnlq9) — new signups get €20 credit.

<img src="plugins/hetzner-mcp/assets/hetzner.svg" width="140" alt="Hetzner logo" />

## Features

- **Servers**: Create, delete, power on/off, reboot, resize; attach to networks and ISOs
- **Load Balancers**: Full CRUD, add/remove targets and services; `list_load_balancer_types` for creation
- **Networks**: Create/delete networks; add/delete subnets (e.g. 10.0.0.0/16 per zone for private networking)
- **Volumes**: Create, attach, detach, delete block storage
- **Firewalls**: Create, update, delete firewalls
- **Floating IPs**: Create, assign, unassign, delete
- **Primary IPs**: Create, assign, unassign, delete (datacenter-scoped static IPs; server must be off to assign/unassign)
- **SSH Keys**: Full CRUD
- **Placement Groups**: Full CRUD for anti-affinity groups
- **Metadata & actions**: Locations, images, server types, load balancer types, datacenters; `list_actions` / `get_action` to poll create/delete results

All operations work through natural language in Cursor's AI agent.

## Installation

Install the plugin from the [Cursor Plugin marketplace](https://cursor.com/marketplace), then set your Hetzner API token: in Cursor **Settings → Features → Model Context Protocol**, find the `hetzner-cloud` server and set `HCLOUD_TOKEN` in its environment.

## Usage

Ask Cursor's agent to manage your Hetzner infrastructure:

**Simple**

- "List my servers in Nuremberg"
- "Create a cx22 server with Ubuntu 24.04"
- "Attach a 10GB volume to web-01"
- "Set up a load balancer for my web servers"
- "Show current pricing for cpx31 servers"

**Complex**

- "Create a private network 10.0.0.0/16 in eu-central, add a subnet, then create two servers in that zone (e.g. fsn1 and nbg1) and attach them"
- "Create a firewall for SSH and HTTP, attach to my web servers, then create a load balancer and add those servers as targets"
- "List running actions and get status of action 12345"
- "Create a Primary IP in ash-dc1, power off web-01, assign the IP, power back on"
- "Tear down: detach/delete volumes, delete LB and firewall, unassign/delete floating IPs, delete servers web-01 and web-02"

## Configuration

Set `HCLOUD_TOKEN` in your environment or configure in `plugins/hetzner-mcp/mcp.json`:

```json
{
  "mcpServers": {
    "hetzner-cloud": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "HCLOUD_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Development

- **Source**: `plugins/hetzner-mcp/src/`
- **Build**: `npm run build`
- **Validate**: `npm run validate`

See `plugins/hetzner-mcp/README.md` for detailed documentation.

## License

MIT
