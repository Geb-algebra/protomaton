// Define domain objects (as Zod schema) and validation rules. Every schema and rules must be self-documented with JSDoc.
// Example:
// /**
//  * [Describe what this entity represents in the business domain]
//  */
// export const ExampleIdSchema = z.string().min(1).brand("ExampleId");
// export const ExampleSchema = z.object({
// 	 id: ExampleIdSchema,
// 	 fieldName: z.string().min(1),
// });
// export type Example = z.infer<typeof ExampleSchema>;
