import { ICodeEditorLink } from '../contracts/ICodeEditorLink';

export class MacVimCodeEditorLink implements ICodeEditorLink {
  public getLink(file: string, line: number): string {
    return `mvim://open?url=${file}&line=${line}`;
  }
}
