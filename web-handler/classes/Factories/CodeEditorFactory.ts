import { ICodeEditorLinkFactory, CodeEditors } from '../contracts/ICodeEditorLinkFactory';
import { ICodeEditorLink } from '../contracts/ICodeEditorLink';
import { VSCodeEditorLink } from '../Links/VSCodeEditorLink';
import { AtomCodeEditorLink } from '../Links/AtomCodeEditorLink';
import { EmacsCodeEditorLink } from '../Links/EmacsCodeEditorLink';
import { SublimeCodeEditorLink } from '../Links/SublimeCodeEditorLink';
import { TextmateEditorLink } from '../Links/TextmateCodeEditorLink';

export class CodeEditorFactory implements ICodeEditorLinkFactory {
  public make(editor: CodeEditors): (new () => ICodeEditorLink) | undefined {
    switch (editor) {
      case 'vscode':
        return VSCodeEditorLink;
      case 'atom':
        return AtomCodeEditorLink;
      case 'emacs':
        return EmacsCodeEditorLink;
      case 'sublime':
        return SublimeCodeEditorLink;
      case 'textmate':
        return TextmateEditorLink;
      default:
        return undefined;
    }
  }
}
