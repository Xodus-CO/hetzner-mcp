import { McpServer as SdkMcpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { z } from "zod";

type ToolHandler<T extends z.ZodRawShape> = (
    args: z.infer<z.ZodObject<T>>
) => Promise<{
    content: Array<{ type: "text"; text: string } | { type: "image"; data: string; mimeType: string }>;
    isError?: boolean;
}>;

/**
 * Thin wrapper around the SDK McpServer that exposes .tool(name, description, parameters, handler)
 * and delegates to registerTool for compatibility with existing register-tools.ts.
 */
export class McpServer {
    private sdk: SdkMcpServer;

    constructor(info: { name: string; version: string }) {
        this.sdk = new SdkMcpServer(info, { capabilities: { tools: {} } });
    }

    tool<T extends z.ZodRawShape>(
        name: string,
        description: string,
        parameters: T,
        handler: ToolHandler<T>
    ): void {
        this.sdk.registerTool(
            name,
            { description, inputSchema: z.object(parameters) },
            async (args) => handler(args as z.infer<z.ZodObject<T>>)
        );
    }

    async connect(transport: Transport): Promise<void> {
        return this.sdk.connect(transport);
    }
}
