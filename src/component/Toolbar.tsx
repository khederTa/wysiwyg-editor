import { useMemo } from "react";
import { ToolbarProps } from "../types/editorProps";

const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggle,
  renderToolbar,
  theme,
}) => {
  const styles = useMemo(() => ["BOLD", "ITALIC", "UNDERLINE"], []);

  return (
    <div className="toolbar">
      {styles.map((style) => (
        <button
          key={style}
          className={`toolbar-button ${
            editorState.getCurrentInlineStyle().has(style) ? "active" : ""
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            onToggle(style);
          }}
          aria-label={`Toggle ${style.toLowerCase()}`}
          style={theme}
        >
          {style[0]}
        </button>
      ))}
      {renderToolbar && renderToolbar()}
    </div>
  );
};
export default Toolbar;
