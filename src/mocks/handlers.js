import { rest } from "msw"

import csvFile from "./adsData.csv"

const baseUrl = process.env.REACT_APP_BASE_URL

const adsDataResolver = async (_, res, ctx) => {
  const file = await fetch(csvFile).then((res) => res.text())

  return res(
    ctx.status(200),
    ctx.set("Content-Type", "text/csv"),
    ctx.body(file)
  )

  // uncomment below to mock error response
  // return res(
  //   ctx.status(404),
  //   ctx.json({
  //     errorMessage: `File not found`,
  //   })
  // )
}

export const handlers = [rest.get(`${baseUrl}/*csv`, adsDataResolver)]
