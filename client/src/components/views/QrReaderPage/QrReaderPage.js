import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

function QrReaderPage() {
  const [Data, setData] = useState('');

  const handleScan = (data) => {
    if (data) {
      setData(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '500px' }}
      />

      <p>{Data}</p>
    </div>
  );
}

export default QrReaderPage;
