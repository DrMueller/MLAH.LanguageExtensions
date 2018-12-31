import { readdirSync, statSync } from 'fs';
import * as path from 'path';

export class DirectoryLookupService {
  public static getAllDirectoriesRecursive(baseDirectoryPath: string, ignoredDirectoryNames: string[]): string[] {
    const result: string[] = [];
    this.getAllSubDirectories(baseDirectoryPath, ignoredDirectoryNames, result);

    return result;
  }

  private static getAllSubDirectories(baseDirectoryPath: string, ignoredDirectoryNames: string[], directoryList: string[]): void {
    const directories: string[] = readdirSync(baseDirectoryPath).filter(file => statSync(path.join(baseDirectoryPath, file)).isDirectory());

    directories.forEach(directoryName => {
      if (ignoredDirectoryNames.indexOf(directoryName) > -1) {
        return;
      }

      if (directoryName.startsWith('.')) {
        return true;
      }

      directoryList.push(path.join(baseDirectoryPath, directoryName));
      this.getAllSubDirectories(path.join(baseDirectoryPath, directoryName), ignoredDirectoryNames, directoryList);
    });
  }
}
