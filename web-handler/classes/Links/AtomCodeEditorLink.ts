import { ICodeEditorLink } from '../contracts/ICodeEditorLink';

export class AtomCodeEditorLink implements ICodeEditorLink {
  public getLink(file: string, line: number): string {
    return `atom://core/open/file?filename=${file}&line=${line}`;
  }
}
