import { useRef } from 'react';
import './App.css';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';

function App() {
  const documentEditorRef = useRef<DocumentEditorComponent>(null);
  const onCreated = () => {
    const uploadDocument = new FormData();
    uploadDocument.append('DocumentName', 'Getting Started.docx');
    const loadDocumentUrl = documentEditorRef.current?.serviceUrl + 'LoadDocument';

    const httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', loadDocumentUrl!, true);

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && (httpRequest.status === 200 || httpRequest.status === 304)) {
        documentEditorRef.current?.open(httpRequest.responseText);
      }
    };

    httpRequest.send(uploadDocument);
  };
  return (
    <DocumentEditorComponent
      id="container"
      ref={documentEditorRef}
      height={'660px'}
      serviceUrl="http://localhost:62869/api/documenteditor/"
      isReadOnly={true}
      created={onCreated}
    />
  );
}
export default App;