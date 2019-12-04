import { ICodeEditorLink } from '../contracts/ICodeEditorLink';

export class TextmateEditorLink implements ICodeEditorLink {
  public getLink(file: string, line: number): string {
    return `txmt://open?url=${file}&line=${line}`;
  }
}
