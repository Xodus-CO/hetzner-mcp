---
name: hetzner-cloud
description: Manage Hetzner Cloud resources including Servers, Load Balancers, Networks, Firewalls, and Volumes.
---

# Hetzner Cloud Skill

This skill provides a comprehensive set of tools to manage your Hetzner Cloud infrastructure. It connects directly to the Hetzner Cloud API via a custom MCP server.

## Features

- **Servers**: Create, list, delete, and manage virtual servers.
- **Load Balancers**: Manage load balancers for distributing traffic.
- **Networks**: Create private networks and manage subnets.
- **Volumes**: Manage block storage volumes.
- **Firewalls**: Configure network firewalls.
- **Placement Groups**: Control server distribution (spread).
- **Floating IPs**: Manage static IP addresses.
- **SSH Keys**: Manage SSH keys for server access.
- **Actions**: Power management, reboots, and resizing.
- **Images/Locations/Types**: Query available resources.

## Tools

### Resource Management

- `list_servers`, `create_server`, `delete_server`, `update_server`
- `attach_iso`, `detach_iso`
- `attach_server_to_network`, `detach_server_from_network`
- `change_server_type`: Resize server (requires power off).
- `power_on_server`, `power_off_server`, `reboot_server`, `shutdown_server`, `reset_server`
- `list_load_balancers`, `create_load_balancer`, `delete_load_balancer`, `update_load_balancer`
- `add_load_balancer_target`, `remove_load_balancer_target`
- `add_load_balancer_service`, `delete_load_balancer_service`
- `list_networks`, `create_network`, `delete_network`, `update_network`
- `list_volumes`, `create_volume`, `update_volume`
- `attach_volume`, `detach_volume`
- `list_firewalls`, `create_firewall`, `update_firewall`
- `list_placement_groups`, `create_placement_group`, `delete_placement_group`, `update_placement_group`
- `list_floating_ips`, `create_floating_ip`, `update_floating_ip`
- `assign_floating_ip`, `unassign_floating_ip`
- `list_ssh_keys`, `create_ssh_key`, `update_ssh_key`

### Information

- `list_locations`: Get available datacenters (e.g., nbg1, hel1, ash).
- `list_images`: Get available OS images (e.g., ubuntu-24.04).
- `list_server_types`: Get available server types (e.g., cx11, cpx11).
- `get_pricing`: Get current cloud pricing for all resources.

## Usage Examples

### Creating a Web Server

1. Create a server:
   `create_server(name="web-01", server_type="cpx11", image="ubuntu-24.04", location="nbg1", ssh_keys=["my-key", 12345])`

### Setting up a Load Balancer

1. Create a network:
   `create_network(name="vpc-main", ip_range="10.0.0.0/16")`
2. Create web servers (attached to network).
3. Create a load balancer:
   `create_load_balancer(name="lb-main", load_balancer_type="lb11", location="nbg1", algorithm={type: "round_robin"})`

## Configuration

Requires `HCLOUD_TOKEN` environment variable to be set in `mcp.json`.
