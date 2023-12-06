/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Generate an Anchor template
 */
export interface AnchorTemplateSchema {
  name: string;
  /**
   * Name of the project
   */
  projectName: string;
  directory: string;
  /**
   * The template to use
   */
  template: "base" | "counter" | "hello-world";
  /**
   * Skip updating index.ts
   */
  skipUpdateIndexTs?: boolean;
}
