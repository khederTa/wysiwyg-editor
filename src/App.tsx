import { EditorState } from "draft-js";
import { useState } from "react";
import WysiwygEditor from "./component/WysiwygEditor";

const App: React.FC = () => {
  const [controlledState, setControlledState] = useState(() =>
    EditorState.createEmpty()
  );

  const customTheme = {
    toolbarButton: {
      backgroundColor: "#bbb",
      color: "#000",
      border: "1px solid #bbb",
    },
    editorContainer: {
      border: "2px solid #999",
      borderRadius: "8px",
      marginBottom: "10px",
    },
    submitButton: {
      backgroundColor: "#555",
      color: "#fff",
      border: "none",
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WYSIWYG Editor Demo</h2>

      <section>
        <h3>Controlled Mode</h3>
        <WysiwygEditor
          value={controlledState}
          onChange={setControlledState}
          className="controlled-editor"
          style={{ padding: "10px" }}
          theme={customTheme}
        />
      </section>

      <section>
        <h3>Uncontrolled Mode</h3>
        <WysiwygEditor
          className="uncontrolled-editor"
          style={{
            padding: "10px",
            marginTop: "20px",
          }}
          renderToolbar={() => <>Custom Toolbar</>}
        />
      </section>
    </div>
  );
};

export default App;
