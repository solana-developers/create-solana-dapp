#!/usr/bin/env bash
#
# csd.sh - Wrapper around create-solana-dapp to make it easier to use during development
#
# These examples assume you have a symlink this script to a location in your PATH, like ~/.local/bin/csd or ~/bin/csd
# $ ln -s $HOME/path/to/create-solana-dapp/csd.sh ~/.local/bin/csd
# or
# $ ln -s $HOME/path/to/create-solana-dapp/csd.sh ~/bin/csd

# Create an app using the default prompts and a random unique name:
# $ csd
#
# Create an app using a template and a random unique name:
# $ csd gh:solana-developers/solana-templates/templates/template-node-express
#
# Create an app using a template and a specific name:
# $ csd gh:solana-developers/solana-templates/templates/template-node-express my-api
#
# Create an app using create-solana-dapp@next
# $ TAG=next csd
#
# Create an app using a local create-solana-dapp command. Run `pnpm build:watch` in the create-solana-dapp directory to watch for changes.
# $ CMD="node $HOME/path/to/create-solana-dapp/dist/bin/index.cjs --pnpm" csd
#
# TODO:
# - add support for PARAMS env var to pass additional parameters to create-solana-dapp, like --pnpm or --skip-install

# Set defaults for bash
set -o errexit
set -o nounset
set -o pipefail

# Check if TAG is already set in the environment, otherwise use default "latest"
if [[ -z "${TAG+x}" ]]; then
  TAG="latest"
fi

# Check if the CMD is already set in the environment, otherwise use default "create-solana-dapp"
if [[ -z "${CMD+x}" ]]; then
  CMD=("pnpm" "create" "solana-dapp@${TAG}")
else
  read -ra CMD <<< "${CMD}"
fi

# Get first argument or show error if none provided
if [[ $# -eq 0 ]]; then
  # Create app without any arguments
  "${CMD[@]}" "app$(date +%s)"
else
  # Store argument in URL variable
  TEMPLATE="$1"

  # Verify if this looks like a TEMPLATE url by checking if it starts with https?:// or gh:
  if [[ ! "${TEMPLATE}" =~ ^(https?://|gh:) ]]; then
    echo "Not a valid TEMPLATE. Template must start with https?:// or gh:"
    exit 1
  fi

  ## Check if we have any second argument
  if [[ $# -eq 2 ]]; then
    # Store second argument in NAME variable
    NAME="$2"
  else
    # Set default NAME
    NAME="app$(date +%s)"
  fi

  # Create app with the provided TEMPLATE and NAME
  echo "${CMD[@]}" --template "${TEMPLATE}" "${NAME}"
  "${CMD[@]}" --template "${TEMPLATE}" "${NAME}"
fi
