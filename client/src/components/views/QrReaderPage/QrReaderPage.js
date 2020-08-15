import React from 'react';
import { Cameras, Scanner } from 'react-instascan';

function QrReaderPage() {
  const onScan = (e) => {
    console.log(e.currentTarget);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Cameras>
        {(cameras) => (
          <div>
            <h1>Scan the code!</h1>
            <Scanner camera={cameras[0]} onScan={onScan}>
              <video style={{ width: 400, height: 400 }} />
            </Scanner>
          </div>
        )}
      </Cameras>
    </div>
  );
}

export default QrReaderPage;
