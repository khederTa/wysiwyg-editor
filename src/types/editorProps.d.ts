import { EditorState } from "draft-js";

export interface ToolbarProps {
  editorState: EditorState;
  onToggle: (style: string) => void;
  renderToolbar?: () => React.ReactNode;
  theme?: React.CSSProperties;
}

export interface WysiwygEditorProps {
  value?: EditorState;
  onChange?: (state: EditorState) => void;
  className?: string;
  style?: React.CSSProperties;
  renderToolbar?: () => React.ReactNode;
  theme?: {
    toolbarButton?: React.CSSProperties;
    editorContainer?: React.CSSProperties;
    submitButton?: React.CSSProperties;
  };
}
