import * as fs from 'fs/promises'
import git, { GetRemoteInfoResult } from 'isomorphic-git'
import http from 'isomorphic-git/http/node'

export async function gitGetRemoteInfo({ url }: { url: string }) {
  return git.getRemoteInfo({
    url,
    http,
  })
}

export async function ensureGitRepo(url: string): Promise<GetRemoteInfoResult> {
  try {
    return await gitGetRemoteInfo({ url })
  } catch (e) {
    throw new Error(`Could not find git repo at ${url}`)
  }
}

export function gitClone({ branch, directory, url }: { branch: string; directory: string; url: string }) {
  return git.clone({
    depth: 1,
    dir: directory,
    fs,
    http,
    ref: branch,
    singleBranch: true,
    url,
  })
}
