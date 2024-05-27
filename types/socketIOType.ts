export type TServerToClientEvents = {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

export type TClientToServerEvents = {
  hello: () => void
}

export type TInterServerEvents = {
  ping: () => void
}

export type TSocketData = {
  name: string
  age: number
}
