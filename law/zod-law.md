# Zod Law

This guide strictly defines how to and not to implement schemas with Zod.

## branded types

```ts
// definition
export const NodeSchema = z.object({
	name: z.string().max(100).min(1).brand("NodeName"),
	signal: z.union([z.number(), z.array(z.number())]).default([0]),
});

export type Node = z.infer<typeof NodeSchema>;
// type Node = {
//     name: string & z.core.$brand<"NodeName">;
//     signal: number | number[];
// }

// use for expressing relation
export const LinkSchema = z
	.object({
		startNode: NodeSchema.shape.name,
		endNode: NodeSchema.shape.name,
		jamDensity: z.number().positive().optional(),
		signalGroup: z.union([z.number(), z.array(z.number())]).default(0),
	})
	.refine((data) => data.startNode !== data.endNode, {
        message: "startNode and endNode must be different",
		path: ["endNode"],
	});

export type Link = z.infer<typeof LinkSchema>;
// type Link = {
//     startNode: string & z.core.$brand<"NodeName">;
//     endNode: string & z.core.$brand<"NodeName">;
//     signalGroup: number | number[];
//     jamDensity?: number | undefined;
// }
```