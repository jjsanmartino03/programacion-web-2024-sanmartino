import React, {CSSProperties, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter, SyntaxHighlighterProps} from 'react-syntax-highlighter';

import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import MarkdownRenderer from "@/components/markdwon/renderer";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({value, onChange}) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <button type="button" onClick={() => setIsPreview(false)} className={!isPreview ? 'font-bold' : ''}>
          Edit
        </button>
        <button type="button" onClick={() => setIsPreview(true)} className={isPreview ? 'font-bold' : ''}>
          Preview
        </button>
      </div>
      {isPreview ? (
        <div className={'p-2 border rounded max-h-80 overflow-auto'}>
        <MarkdownRenderer content={value} />
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          className="w-full p-2 border rounded"
        />
      )}
    </div>
  );
};

export default MarkdownEditor;