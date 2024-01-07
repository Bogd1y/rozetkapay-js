import { IncomingMessage, ServerResponse } from "http";
import { RozetkaPaySDK } from "../sdk";

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

  switch (parsedUrl.pathname) {

    case '/createSubscriptionPlan':
      try {
        const result = await rozetkaPay.createSubscriptionPlan({
          name: 'supersabka',
          price: 200,
          currency: "UAH",
          platforms: ['plat1', 'plat2'],
          frequency: 30,
          frequency_type: 'string',
          start_date: new Date().toString()
        })

        if (result.success) {
          console.log(result.data)
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Created !');
        } 
        throw new Error("Could not create  " + JSON.stringify(result.data))

      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(error.toString());
      }
    break;

    case '/createSubscription':
      try {
        const result = await rozetkaPay.createSubscription({
          callback_url: "yourcallbackpath",
          customer: {
            payment_method: {
              type: "cc_token"
            }
          },
          plan_id: 'planid',
          result_url: 'https://github.com',
          start_date: 'date',
          auto_renew: true
        })

        if (result.success) {
          console.log(result.data)
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Created !');
        } 
        throw new Error("Could not create  " + JSON.stringify(result.data))

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