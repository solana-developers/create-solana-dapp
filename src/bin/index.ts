#!/usr/bin/env node
import { log } from '@clack/prompts'
import { main } from '../index'

main(process.argv)
  // Pretty log the error, then throw it
  .catch((error) => {
    log.error(error)
    throw error
  })
