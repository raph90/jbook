import React, { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  errorMessage: string;
}
const html = `
  <html>
  <head>
  <style>html {background-color: white;}</style> 
  </head>
  <body> 
    <div id="root"></div>
    <script>
    const handleError = (err) => {
          document.querySelector("#root").innerHTML = '<div style="color: red;"><h4>Runtime Error: </h4>' + err + '</div>' 
          console.error(err);
    }
    window.addEventListener('error', (event) => {
      event.preventDefault();
      handleError(event.error) 
    })

      window.addEventListener('message', (event) => {
        try {
        eval(event.data);
        } catch(err) {
          handleError(err);
        }

      }, false);
    </script>
  </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, errorMessage }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    // give the page time to update
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "white" }}
        ref={iframe}
        title="code-entry"
        srcDoc={html}
        sandbox="allow-scripts"
        src="/test.html"
      />
      {errorMessage && <div className="preview-error">{errorMessage}</div>}
    </div>
  );
};
export default Preview;
