import http from 'http'
import WebSocket from 'ws'
import { setupWSConnection } from 'y-websocket/bin/utils.js'

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('y-websocket')
})

const wss = new WebSocket.Server({ server })

wss.on('connection', (conn, req) => setupWSConnection(conn, req))

server.listen(1234, () => console.log('y-websocket server running on :1234'))
