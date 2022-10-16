import React, { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { html } from "@codemirror/lang-html";

function DeafaultEditor({ setHtmlCode }) {
  const onChange = useCallback((value, viewUpdate) => {
    // console.log("Devalue:", value);
    setHtmlCode(value);
    localStorage.setItem("htmlCode", value);
  }, []);
  return (
    <div>
      <div>
        <CodeMirror
          value={
            typeof window !== "undefined" &&
            localStorage.getItem("htmlCode") !== null
              ? localStorage.getItem("htmlCode")
              : ""
          }
          height="90vh"
          width="auto"
          theme={dracula}
          extensions={[html({ jsx: true })]}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default DeafaultEditor;
