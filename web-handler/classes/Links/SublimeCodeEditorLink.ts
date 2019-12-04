import { ICodeEditorLink } from '../contracts/ICodeEditorLink';

export class SublimeCodeEditorLink implements ICodeEditorLink {
  public getLink(file: string, line: number): string {
    return `subl://open?url=${file}&line=${line}`;
  }
}
