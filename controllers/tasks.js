const { Task, taskSchemas } = require("../models");

const { RequestError } = require("../helpers");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Task.find({ owner }, null, { skip, limit });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// const getById = async (req, res, next) => {
//   try {
//     const { taskId } = req.params;
//     const result = await Task.findById(taskId);
//     if (!result) {
//       throw RequestError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

const add = async (req, res, next) => {
  try {
    const { error } = taskSchemas.postCheckingSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message);
    }
    const { _id: owner } = req.user;

    const result = await Task.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const result = await Task.findByIdAndRemove(taskId);

    if (!result) {
      throw RequestError(400, "Not found");
    }
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error } = taskSchemas.putCheckingSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }

    const { taskId } = req.params;
    const result = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// const updateStatusTask = async (req, res, next) => {
//   try {
//     const { error } = schemas.patchCheckingSchema.validate(req.body);
//     if (error) {
//       throw RequestError(400, "missing field favorite");
//     }

//     const { taskId } = req.params;
//     const result = await Task.findByIdAndUpdate(taskId, req.body, {
//       new: true,
//     });
//     if (!result) {
//       throw RequestError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getAll,
//   getById,
  add,
  removeById,
  update,
//   updateStatusTask,
};
