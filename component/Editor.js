import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";

function Editor({ onChange, value, language, type }) {
  return (
    <div>
      <CodeMirror
        value={
          typeof window !== "undefined" && localStorage.getItem(type) !== null
            ? localStorage.getItem(type)
            : value
        }
        height="90vh"
        width="auto"
        theme={dracula}
        extensions={[language]}
        onChange={onChange}
      />
    </div>
  );
}

export default Editor;
