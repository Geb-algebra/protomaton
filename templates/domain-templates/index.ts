// Expose minimal APIs and types to other domains and the application
// Each API must be self-documented with JSDoc
// never export from lifecycle.ts
// Examples:
// export { Example } from "./models";  // necessary for other domains and the application to use this domain
//
// import { ExampleSchema } from "./models";
// import { processExample } from "./services";
// import { ExampleRepository } from "./lifecycle";
//
// /**
//  * **Purpose**: [What business capability this provides to other domains]  
//  * **Inputs**: [Required parameters and types]  
//  * **Operation**: [What domain objects/services this combines]  
//  * **Outputs**: [Return values and types]  
//  * **Usage Context**: [When other domains or app layers would use this]
//  */
// export const ExampleAPI = (input: ExampleInput): ExampleOutput => {
// 	const example = ExampleSchema.parse(input);
// 	const processedExample = processExample(example);
// 	const exampleRepository = new ExampleRepository();
// 	exampleRepository.save(processedExample);
// 	return processedExample;
// };
