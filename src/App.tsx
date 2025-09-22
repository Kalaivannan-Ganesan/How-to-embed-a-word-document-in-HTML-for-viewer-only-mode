import React, { useEffect, useRef } from 'react';
import './App.css';
import { DocumentEditorComponent, Ribbon } from '@syncfusion/ej2-react-documenteditor';
DocumentEditorComponent.Inject(Ribbon);

function App() {
  const containerRef = useRef<DocumentEditorComponent | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const form = new FormData();
    form.append('DocumentName', 'Getting Started.docx');
    const url = container.serviceUrl + 'LoadDocument';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        container.open(xhr.responseText);
      }
    };
    xhr.send(form);
  }, []);

  return (
    <>
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        </div>
        <img src="/AdventureCycle.jpg" alt="Adventure Works Cycles Logo" className="logo">
        </img>
      </header>

      <main>
        <h2>Welcome to Our Site!</h2>
        <div className="editor-box">
          <DocumentEditorComponent
              id="container"
              ref={containerRef}
              height={'60vh'}
              serviceUrl="http://localhost:62869/api/documenteditor/"
              isReadOnly={true}
          />
        </div>
      </main>

      <footer>
        © {new Date().getFullYear()} Adventure Works Cycles. All rights reserved.
      </footer>
    </>
  );
}

export default App;