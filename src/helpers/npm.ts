import validateNpmPackageName from "validate-npm-package-name";

export function validatePkgName(name: string): {
  problems?: string[];
  valid: boolean;
} {
  const nameValidation = validateNpmPackageName(name);
  if (nameValidation.validForNewPackages) {
    return { valid: true };
  }

  return {
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ],
    valid: false,
  };
}
