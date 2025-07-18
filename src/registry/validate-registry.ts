import { z } from 'zod'

// Template schema
const registryTemplateSchema = z.object({
  name: z.string(),
  description: z.string(),
  repository: z.string(),
})

// Group schema
const registryGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  templates: z.array(registryTemplateSchema),
})

// Section schema (default/legacy)
const registrySectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  groups: z.array(registryGroupSchema),
})

// Main schema: requires 'default' and allows additional sections
const registrySchema = z
  .object({
    default: registrySectionSchema, // 'default' is required
  })
  .catchall(registrySectionSchema) // Any other key is optional and must match registrySectionSchema

// Type inference
export type Registry = z.infer<typeof registrySchema>
export type RegistrySection = z.infer<typeof registrySectionSchema>
export type RegistryGroup = z.infer<typeof registryGroupSchema>
export type RegistryTemplate = z.infer<typeof registryTemplateSchema>

export async function validateRegistry(resultJson: unknown): Promise<Registry> {
  return registrySchema.parse(resultJson)
}
