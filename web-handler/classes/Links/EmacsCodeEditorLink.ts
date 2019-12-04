import { ICodeEditorLink } from '../contracts/ICodeEditorLink';

export class EmacsCodeEditorLink implements ICodeEditorLink {
  public getLink(file: string, line: number): string {
    return `emacs://open?url=${file}&line=${line}`;
  }
}
