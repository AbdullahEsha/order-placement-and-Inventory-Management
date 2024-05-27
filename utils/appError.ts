// cature all errors in the app and send them to the client
// create a class that extends the Error class with a constructor that takes a message and statusCode
// use proper types and generics if needed for typescript

export class AppError extends Error {
  statusCode: number // Add the statusCode property
  status: string // Add the status property
  isOperational: boolean // Add the isOperational property
  errmsg: any // Add the errmsg property
  code: number // Add the code property
  errors: any // Add the errors property
  stack: any // Add the stack property
  path: string | undefined // Add the path property
  value: string | number | undefined // Add the value property

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true
    this.errmsg = message
    this.code = statusCode
  }
}
