import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

// URL of the static PDF file
const STATIC_PDF_URL = 'https://cgfm.com/wp-content/uploads/Resume-test-pdf.pdf'; // Replace with your PDF file path

const PdfViewer = () => {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onLoadError = (error: any) => {
    console.error('Error loading PDF: ', error);
  };

  return (

      <div className="">
        <div className="flex flex-col items-center gap-8">
          {/* PDF Viewer */}
          <div className="w-full h-[1350px] border-2 border-gray-300 rounded-lg overflow-auto relative">
            <Document
              file={STATIC_PDF_URL}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onLoadError}
            >
              <Page
                pageNumber={pageNumber}
                width={window.innerWidth - 400} // Adjust width as needed
              />
            </Document>
          </div>
        </div>
      </div>

  );
};

export default PdfViewer;
