import React, { ReactElement, useRef } from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './code-editor.css';
import MonacoEditor, { monaco, EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { editor } from 'monaco-editor';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

(window as any).hello = 'hi';

function CodeEditor({ initialValue, onChange }: CodeEditorProps): ReactElement {
  // this gets called whenever the editor is shown on the screen
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter();
  };
  const onFormatClick = () => {
    // get current value
    const unformatted = editorRef.current.getModel().getValue();

    // format the value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: true,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    // remove the new line at the end
    // set the formatted value back in the editor

    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        options={{
          wordWrap: 'on',
          showUnused: false,
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        height="100%"
        language="javascript"
        theme="dark"
      />
    </div>
  );
}

export default CodeEditor;
