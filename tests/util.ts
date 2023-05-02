// import axios from 'axios';
import { execSync } from "child_process";
import { assert } from "chai";
import path from "path";
import {
  githubApiUrlMap,
  uiFrameworksList,
  programFrameworksList,
} from "../src/helpers/constants";

// async function scrapeGithubRepository(framework: string, type: string): Promise<string[]> {
//     let url: string = "";
//     if (type === "program") {
//         url = programFrameworkUrl(framework);
//     } else {
//         url = uiFrameworkUrl(framework);
//     }
//     return await scrapeFiles(url);
// }

// async function scrapeFiles(url: string): Promise<string[]> {
//     console.log((await axios.get(url)).data);
//     return [];
// }
async function scrapeFiles(url: string): Promise<string[]> {
  return [];
}

export async function verifyFiles(
  dappPath: string,
  framework: string,
): Promise<boolean> {
  let dir: string;
  if (uiFrameworksList.some(x => x === framework)) {
    dir = path.join(dappPath, "app");
  } else {
    dir = path.join(dappPath, "program");
  }
  const githubApiUrl = githubApiUrlMap.get(framework);
  assert(githubApiUrl);
  let repositoryFiles = await scrapeFiles(githubApiUrl);
  for (var file in repositoryFiles) {
    assert(execSync(`find ${dir} -name ${file}`));
  }
  return true;
}

// scrapeGithubRepository("vue", "UI");
