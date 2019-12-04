import { ICodeEditorLink } from './ICodeEditorLink';

export type CodeEditors = 'vscode' | 'atom' | 'sublime' | 'macvim' | 'emacs' | 'textmate';

export interface ICodeEditorLinkFactory {
  make(editor: CodeEditors): (new () => ICodeEditorLink) | undefined;
}
