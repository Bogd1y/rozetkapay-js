import { IncomingMessage, ServerResponse } from "http";
import { RozetkaPaySDK } from "../sdk";
import { CreatePaymentPayload } from "../types";

const http = require('http');
const url = require('url');

const PORT = 5000;

const ngrokURl = 'https://4156-88-135-193-249.ngrok-free.app' // paste your url here


const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = url.parse(req.url, true);

  // basic auth 
  const rozetkaPay = new RozetkaPaySDK(
    'a6a29002-dc68-4918-bc5d-51a6094b14a8',
    'XChz3J8qrr'
  )

  const createPaymentPayload: CreatePaymentPayload = {
    amount: 2000,
    currency: "UAH",
    external_id: "UNIQUEID", // we need it later when resendCallback or getPaymentInfo
    mode: 'hosted',
    callback_url: ngrokURl + '/acceptCallback', // we need it so rozetkaAPI could access our callback 
    description: "Test payment"
  }

  switch (parsedUrl.pathname) {

    // create payment endpoint
    case '/createPayment':
    try {

      const result = await rozetkaPay.createPayment(createPaymentPayload);

      if (result.success) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });      
        res.end(`SDK Response Data: ${JSON.stringify(result.data.action.value)}`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Unexpected error occured`);
      }

    } catch (error) {
      console.error(error);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`SDK Response Data: ERROR ${error}`);
    }
    break;

    // callback endpoint
    case '/callback':

      console.log("Callback received!", req);

      res.writeHead(200);
      res.end();

    break;

    // resend callback endpoint
    case '/resendCallback':

      rozetkaPay.resendCallback({external_id: createPaymentPayload.external_id})

      res.writeHead(200);
      res.end();

    break;

    // getPaymentInfo endpoint
    case '/getPaymentInfo':
    try {

      const result = await rozetkaPay.getPaymentInfo(createPaymentPayload.external_id);

      if (result.success) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });      
        res.end(`SDK Response Data: ${JSON.stringify(result.data)}`);
      } else {
        throw new Error(`Error occured: `+ result.data)
      }
    } catch (error) {
      console.error(error);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`SDK Response Data: ERROR ${error}`);
    }
    break;

    default:
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');
    break;
  }

})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});