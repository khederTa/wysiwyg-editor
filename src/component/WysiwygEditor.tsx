import {
  Editor,
  EditorState,
  RichUtils,
  KeyBindingUtil,
  getDefaultKeyBinding,
} from "draft-js";
import { useCallback, useState } from "react";
import "../styles/WysiwygEditor.css";
import Toolbar from "./Toolbar";
import { WysiwygEditorProps } from "../types/editorProps";

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  className,
  style,
  renderToolbar,
  theme,
}) => {
  const [internalState, setInternalState] = useState(() =>
    EditorState.createEmpty()
  );

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const editorState = value || internalState;

  const handleEditorChange = useCallback(
    (state: EditorState) => {
      if (onChange) {
        onChange(state); 
      } else {
        setInternalState(state);
      }
    },
    [onChange]
  );

  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        handleEditorChange(newState);
        return "handled";
      }

      return "not-handled";
    },
    [handleEditorChange]
  );

  const keyBindingFn = useCallback((e: React.KeyboardEvent) => {
    if (KeyBindingUtil.hasCommandModifier(e)) {
      switch (e.key.toLowerCase()) {
        case "b":
          return "bold";
        case "i":
          return "italic";
        case "u":
          return "underline";
        default:
          return getDefaultKeyBinding(e);
      }
    }
    return getDefaultKeyBinding(e);
  }, []);

  const handleToggleStyle = useCallback(
    (style: string) => {
      const newState = RichUtils.toggleInlineStyle(editorState, style);
      handleEditorChange(newState);
    },
    [editorState, handleEditorChange]
  );

  const saveContent = useCallback(async () => {
    const content = editorState.getCurrentContent().getPlainText(); 
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to save content");
      }

      const result = await response.json();
      setIsError(false);
      setMessage(result.msg || "Content saved successfully"); 
    } catch (error) {
      console.error("Error saving content:", error);
      setIsError(true);
      setMessage("Failed to save content"); 
    }
  }, [editorState]);

  return (
    <div className={`wysiwyg-editor ${className || ""}`} style={style}>
      <Toolbar
        editorState={editorState}
        onToggle={handleToggleStyle}
        renderToolbar={renderToolbar}
        theme={theme?.toolbarButton} 
      />

      <div
        className="editor-container"
        style={theme?.editorContainer} 
      >
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
        />
      </div>

      <div>
        <button
          className="submit-btn"
          onClick={saveContent}
          style={theme?.submitButton} 
        >
          Save Fake Post
        </button>
      </div>

      {message && (
        <div className={`${isError ? "error" : "success"}`}>{message}</div>
      )}
    </div>
  );
};

export default WysiwygEditor;
