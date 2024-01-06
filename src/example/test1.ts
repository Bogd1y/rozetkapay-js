const http = require('http');
const url = require('url');

import { IncomingMessage, ServerResponse } from 'http';
import { RozetkaPaySDK } from '../sdk'
import { CreatePaymentPayload } from '../types';

const instanceOfSDK = new RozetkaPaySDK(
  'a6a29002-dc68-4918-bc5d-51a6094b14a8',
  'XChz3J8qrr'
)

const PORT = 5000;
const ngrokURl = 'https://4156-88-135-193-249.ngrok-free.app'


const createPaymentPayloadDDDDD: CreatePaymentPayload = {
  amount: 2000,
  currency: "UAH",
  external_id: Math.random().toString(),
  mode: 'hosted',
  callback_url: ngrokURl + '/acceptCallback',
  confirm: false,
  description: "Test payment"
}

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = url.parse(req.url, true);

  console.log('requesting:', req.url, req.method);

  const exrernalID = Math.random().toString()

  switch (parsedUrl.pathname) {
    case '/createPayment':
      instanceOfSDK.createPayment(createPaymentPayloadDDDDD).then(responseData => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });      
        res.end(`SDK Response Data: ${JSON.stringify(responseData)}`);
      }).catch(error => {
        console.error('clientError', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error\n' + error);
      });
      break;
  
    case '/acceptCallback':
      console.log("THIS IS CALLBACK");
      let requestBody = '';
  
      req.on('data', (chunk) => {
        requestBody += chunk.toString();
      });
  
      req.on('end', () => {
        const contentType = req.headers['content-type'];
  
        if (contentType && contentType.includes('application/json') && requestBody) {
          console.log('json callback');
          console.log(requestBody);
          console.log(requestBody.toString());
        } else {
          console.log('text callback');
          console.log(requestBody);
        }
  
        res.writeHead(200);
        res.end();
      });
      break;
  
    case '/resendCallback':
      instanceOfSDK.resendCallback({
        external_id: exrernalID,
      }).then(data => {
        console.log(data);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("RESEND RESP " + JSON.stringify(data));
      }).catch(error => {
        console.error('clientError', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error\n' + error);
      });
      break;
  
    case '/getInfo':
      try {
        const data = await instanceOfSDK.getPaymentInfo(exrernalID);
        console.log("data", data);
        res.writeHead(200);
        res.end('INFO\n' + JSON.stringify(data));
      } catch (error) {
        console.error('clientError', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error\n' + error);
      }
      break;
  
    case '/createTwoStepPayment':
      try {
        const data = await instanceOfSDK.createPayment(createPaymentPayloadDDDDD);
        if (data.success) {
          throw new Error("Failed" + data.raw.status)
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });      
        res.end(`SDK Response Data: ${JSON.stringify(data)}`);
      } catch (error) {
        console.error(error);
        res.writeHead(200, { 'Content-Type': 'text/plain' });      
        res.end(`SDK Response Data: ERROR ${error}`);
      }
      break;
  
    case '/confirmTwoStepPayment':
      const data = await instanceOfSDK.confirmPayment({ external_id: exrernalID });
      console.log('res', data);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Confirm\n');
      break;
  
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found\n');
      break;
  }
  

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});