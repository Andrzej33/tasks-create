const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    next(RequestError(400, `${taskId} is not valid id`));
  }
  next();
};

module.exports = isValidId;

// const { isValidObjectId } = require("mongoose");

// const { RequestError } = require("../helpers");

// const isValidId = (req, res, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     next(RequestError(400, `${contactId} is not valid id`));
//   }
//   next();
// };

// module.exports = isValidId;
