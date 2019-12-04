export interface ICodeEditorLink {
  getLink(file: string, line: number, column: number): string;
}
