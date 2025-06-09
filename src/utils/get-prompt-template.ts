import { isCancel, log, select, SelectOptions } from '@clack/prompts'
import { Framework, frameworks } from '../templates/frameworks'
import { getTemplatesForFramework, Template } from '../templates/templates'

export function getPromptTemplate({ template }: { template?: Template }) {
  return async () => {
    if (template) {
      log.success(`Template: ${template.description}`)
      return template
    }

    const framework: Framework = await selectFramework(frameworks)
    if (isCancel(framework)) {
      throw 'No framework selected'
    }

    return selectTemplate(getTemplatesForFramework(framework))
  }
}

function getFrameworkSelectOptions(
  values: Framework[],
): SelectOptions<{ value: Framework; label: string; hint?: string | undefined }[], Framework> {
  return {
    message: 'Select a framework',
    options: values.map((value) => ({
      label: value.name,
      value,
      hint: value.description ?? '',
    })),
  }
}

function selectFramework(values: Framework[]): Promise<Framework> {
  return select(getFrameworkSelectOptions(values)) as Promise<Framework>
}

function getTemplateSelectOptions(
  values: Template[],
): SelectOptions<{ value: Template; label: string; hint?: string | undefined }[], Template> {
  return {
    message: 'Select a template',
    options: values.map((value) => ({
      label: value.name,
      value,
      hint: value.description ?? '',
    })),
  }
}

function selectTemplate(values: Template[]): Promise<Template> {
  return select(getTemplateSelectOptions(values)) as Promise<Template>
}
