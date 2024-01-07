import { IncomingMessage, ServerResponse } from "http";
import { RozetkaPaySDK } from "../sdk";
import { AddCustomerToWalletPayload } from "../types";

const http = require('http');
const url = require('url');

const PORT = 5000;


const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = url.parse(req.url, true);

  // basic auth 
  const rozetkaPay = new RozetkaPaySDK(
    'a6a29002-dc68-4918-bc5d-51a6094b14a8',
    'XChz3J8qrr'
  )

  const externalID = "someUUID"

  const addCustomerToWalletPayload: AddCustomerToWalletPayload = {
    result_url: 'https://github.com',
    payment_method: {
      type: "cc_token",
    }
  }

  switch (parsedUrl.pathname) {

    // create addCustomerToWallet endpoint
    case '/addCustomerToWallet':
      try {
        const result = await rozetkaPay.addCustomerToWallet(externalID, addCustomerToWalletPayload)   
        if (result.success) {
          console.log(result.data)
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Added successfully!');
        } 
        throw new Error("Could not add " + JSON.stringify(result.data))
      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(error.toString());
      }
    break;
    
    // create getCustomerInfo endpoint
    case '/getCustomerInfo':
      try {
        const result = await rozetkaPay.getCustomerInfo(externalID)   
        if (result.success) {
          console.log(result.data)
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Recieved info!');
        } 
        throw new Error("Could not Recieved info  " + JSON.stringify(result.data))
      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(error.toString());
      }
    break;

    // create delCustomerInfo endpoint
    case '/delCustomerInfo':
      try {
        const result = await rozetkaPay.deleteCustomerPaymentFromWallet(externalID, {option_id: 'string', type: "cc_token"})   
        if (result.success) {
          console.log(result.data)
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Deleted !');
        } 
        throw new Error("Could not delete  " + JSON.stringify(result.data))
      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(error.toString());
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