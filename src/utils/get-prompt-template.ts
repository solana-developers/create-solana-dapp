import { log, select, SelectOptions } from '@clack/prompts'
import { Framework, frameworks } from '../templates/frameworks'
import { getTemplatesForFramework, Template } from '../templates/templates'
import { GetArgsResult } from './get-args-result'

export function getPromptTemplate({ options }: { options: GetArgsResult }) {
  return async () => {
    if (options.template) {
      log.success(`Template: ${options.template.description}`)
      return options.template
    }

    const framework: Framework = await selectFramework(frameworks)

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
