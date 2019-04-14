# Simpe Api Message
Api for sending and displaying messages built with [Express](https://expressjs.com/).

## Installation
Clone this repository and install dependencies
```bash
# clone this repository
git clone https://github.com/achwin/simple-api-message.git
# Install dependencies
npm install
```
## Run
```bash
node app.js
```
Then application will running in localhost:9999

## API Endpoint

### Sending a message

`POST /v1/messages`

   #### Request with json 
```json
{
    "text": "Hello world"
}
```
#### Response
```json
{
  "status": "success",
  "data": "Hello world"
}
```
### Collect message that has been sent out

`GET /v1/messages`

#### Response
```json
{
  "status": "success",
  "data": []
}
```
### Collect message that has been sent out

`Websocket ws://v1/messages`
#### Response in console
`['Hello world,Halo dunia, ...']`
