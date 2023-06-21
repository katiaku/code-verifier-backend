/**
 * Basic JSON response for controllers
 */
export type BasicResponse = {
    message: string,
    date: string
}

/**
 * Error JSON response for controllers
 */
export type ErrorResponse = {
    error: string,
    message: string
}
