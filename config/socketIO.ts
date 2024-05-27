import { Server } from 'socket.io'
import { createServer } from 'http'

import {
  TClientToServerEvents,
  TInterServerEvents,
  TServerToClientEvents,
  TSocketData,
} from '../types'

const httpServer = createServer()

const io = new Server<
  TClientToServerEvents,
  TServerToClientEvents,
  TInterServerEvents,
  TSocketData
>(httpServer)

export { io, httpServer }
