import { ParseOptions } from "query-string"

const queryStringOptions: ParseOptions = {
  arrayFormat: "separator",
  arrayFormatSeparator: ",",
}

export const config = {
  enableResponseMocking: true,
  queryStringOptions,
}
