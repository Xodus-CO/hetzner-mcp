# Hetzner MCP

Manage Hetzner Cloud resources directly from Cursor using natural language and AI-powered workflows.

<img src="plugins/hetzner-mcp/assets/hetzner.svg" width="140" alt="Hetzner logo" />

## Features

- **Servers**: Create, manage, resize, and control virtual servers
- **Load Balancers**: Configure load balancers, targets, and services
- **Networks**: Manage private networks and floating IPs
- **Volumes**: Create and attach block storage
- **Firewalls**: Configure network security rules
- **SSH Keys**: Manage SSH keys for server access
- **Real-time info**: Query locations, server types, images, and pricing

All operations work through natural language in Cursor's AI agent.

## Installation

### From source

1. Clone this repository
2. Build the plugin:
   ```bash
   cd plugins/hetzner-mcp
   npm install && npm run build
   ```
3. Set your Hetzner API token:
   ```bash
   export HCLOUD_TOKEN=your_token_here
   ```
4. The MCP server will be available when this repo is your workspace root

## Usage

Ask Cursor's agent to manage your Hetzner infrastructure:

- "List my servers in Nuremberg"
- "Create a cx22 server with Ubuntu 24.04"
- "Attach a 10GB volume to web-01"
- "Set up a load balancer for my web servers"
- "Show current pricing for cpx31 servers"

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
