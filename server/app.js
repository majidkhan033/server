import http from "http";
import url from "url";
import { StringDecoder } from "string_decoder";

const port = 5000;

const server = http.createServer((req, res) => {

    //Get the URL and parse it
    const parsedURL = url.parse(req.url, true);
    console.log(parsedURL);

    const path = parsedURL.path;

    const trimmedPath = path.split('/').filter((ele) => ele != '').join('/');
    console.log(trimmedPath);

    const method = req.method;
    console.log(method);

    const queryObjects = parsedURL.query;
    console.log(queryObjects);

    const decoder = new StringDecoder('utf-8');
    let bodybuffer = '';
    req.on('data', (data) => {
        bodybuffer = decoder.write(data);
    })
    req.on('end', () => {
       bodybuffer = decoder.end();
       console.log(bodybuffer);
       res.end('Check the Server Console') 
    })
})

server.listen(port, () => {
    console.log("Server Started at Port", port);
})