// src/QuickNotes.js
import { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useDispatch } from "react-redux";

export function QuickNotes() {
  const dispatch = useDispatch();
  const [markdown, setMarkdown] = useState("");
  return (
    <section className="shadow border rounded-xl p-5 order-last justify-center font-semibold bg-white xl:col-start-3 xl:order-2 xl:row-span-2">
      <button>
        <span>Save</span>
      </button>
      <div className="preview-container">
        <MarkdownEditor
          value={markdown}
          height="200px"
          onChange={(value, viewUpdate) => setMarkdown(value)}
        />
      </div>
    </section>
  );
}
