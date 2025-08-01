import { isCancel, log, select, SelectOptions } from '@clack/prompts'
import { GetArgsResult } from './get-args-result'
import { MenuItem } from '@beeman/repokit'
import { Template } from './template'

export function getPromptTemplate({ items, options }: { items: MenuItem[]; options: GetArgsResult }) {
  return async () => {
    if (options.template) {
      log.success(`Template: ${options.template.description}`)
      return options.template
    }

    const group: MenuItem = await selectGroup(items)
    if (isCancel(group)) {
      throw 'No group selected'
    }

    return selectTemplate(group.templates)
  }
}

function getGroupSelectOptions(values: MenuItem[]): SelectOptions<
  {
    value: MenuItem
    label: string
    hint?: string | undefined
  }[],
  MenuItem
> {
  return {
    message: 'Select a group',
    options: values.map((value) => ({
      label: value.name,
      value,
      hint: value.description ?? '',
    })),
  }
}

function selectGroup(values: MenuItem[]): Promise<MenuItem> {
  return select(getGroupSelectOptions(values)) as Promise<MenuItem>
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
