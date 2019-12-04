import { ICodeEditorLink } from '../contracts/ICodeEditorLink';

export class VSCodeEditorLink implements ICodeEditorLink {
  public getLink(file: string, line: number, column: number): string {
    return `vscode://file/${file}:${line}:${column}`;
  }
}
