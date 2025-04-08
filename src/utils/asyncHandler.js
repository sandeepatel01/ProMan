// Higher order function

import { Promise } from "mongoose"

function asyncHandler(requestHandler) {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next))
      .catch(function (eroor) {
        next(eroor)
      })
  }
}

export { asyncHandler }