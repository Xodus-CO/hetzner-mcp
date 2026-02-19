---
name: hetzner-cloud
description: Manage Hetzner Cloud resources including Servers, Load Balancers, Networks, Firewalls, Volumes, Floating IPs, Primary IPs, and more.
---

# Hetzner Cloud Skill

This skill provides a comprehensive set of tools to manage your Hetzner Cloud infrastructure. It connects directly to the Hetzner Cloud API via a custom MCP server.

## Features

- **Servers**: Create, list, delete, and manage virtual servers; power, resize, attach to networks and ISOs.
- **Load Balancers**: Full CRUD, targets, services; `list_load_balancer_types` for creation.
- **Networks**: Create private networks; add/delete subnets (e.g. 10.0.0.0/24 per zone). Networks are zone-scoped (e.g. eu-central); servers must be in the same zone.
- **Volumes**: Create, attach, detach, delete block storage.
- **Firewalls**: Create, update, delete firewalls.
- **Floating IPs**: Create, assign, unassign, delete.
- **Primary IPs**: Create, assign, unassign, delete (datacenter-scoped; server must be off to assign/unassign).
- **SSH Keys**: Full CRUD.
- **Placement Groups**: Full CRUD for anti-affinity (spread).
- **Actions**: Use `list_actions` and `get_action` to poll or wait for create/delete/power completion.
- **Metadata**: Locations, images, server types, load balancer types, datacenters, pricing.

## Tools

### Resource Management

- **Servers**: `list_servers`, `create_server`, `delete_server`, `update_server`; `attach_iso`, `detach_iso`; `attach_server_to_network`, `detach_server_from_network`; `change_server_type` (resize; server must be off); `power_on_server`, `power_off_server`, `reboot_server`, `shutdown_server`, `reset_server`
- **Load Balancers**: `list_load_balancers`, `create_load_balancer`, `delete_load_balancer`, `update_load_balancer`; `add_load_balancer_target`, `remove_load_balancer_target`; `add_load_balancer_service`, `delete_load_balancer_service`
- **Networks**: `list_networks`, `create_network`, `delete_network`, `update_network`; `add_network_subnet`, `delete_network_subnet` (subnets and servers must be in the network’s zone)
- **Volumes**: `list_volumes`, `create_volume`, `update_volume`, `delete_volume`; `attach_volume`, `detach_volume`
- **Firewalls**: `list_firewalls`, `create_firewall`, `update_firewall`, `delete_firewall`
- **Floating IPs**: `list_floating_ips`, `create_floating_ip`, `update_floating_ip`, `delete_floating_ip`; `assign_floating_ip`, `unassign_floating_ip`
- **Primary IPs**: `list_primary_ips`, `create_primary_ip`, `get_primary_ip`, `update_primary_ip`, `delete_primary_ip`; `assign_primary_ip`, `unassign_primary_ip` (server must be off)
- **SSH Keys**: `list_ssh_keys`, `create_ssh_key`, `update_ssh_key`, `delete_ssh_key`
- **Placement Groups**: `list_placement_groups`, `create_placement_group`, `delete_placement_group`, `update_placement_group`

### Information & Actions

- **Metadata**: `list_locations`, `list_images`, `list_server_types`, `list_load_balancer_types`, `list_datacenters` (e.g. ash-dc1; where servers can be created), `get_pricing`
- **Actions**: `list_actions` (optional filters: id, status), `get_action(id)` — use to poll or wait for create/delete/action completion

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
