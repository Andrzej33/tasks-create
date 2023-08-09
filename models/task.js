const { Schema, model } = require("mongoose");
const Joi = require("joi");

const taskSchema = Schema({
  title: {
    type: String,
    max: 250,
    required: [true, "Add task, plese"],
    },
  start: {
    type: String,
    // validate: {
    //   isAsync: true,
    //   validator: function(v, cb) {
    //     setTimeout(function() {
    //       var timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
    //       var msg = v + ' is not a valid time format!';

    //       cb(timeRegex.test(v), msg);
    //     }, 5);
    //   },

    //   message: 'Default error message'
    // },
    required: [true, "Start time is required"],
  },
  end: {
    type: String,
    required: [true, "End time is required"],
  },
//   favorite: {
//     type: String,
//     default: false,
//   },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: [true, "Priority is required"],
  },
  date: {
    type: Date,
    min: '1987-09-28',
    max: '2045-05-23',
    default: false,
    required: [true, "Date is required"],
  },
  category: {
    type: String,
    enum: ["to-do", "in-progress", "done"],
    required: [true, "Category is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required:true,
  },
},{
  versionKey: false,
});

taskSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const postCheckingSchema = Joi.object({
  title: Joi.string()
    .max(250)
    // .alphanum()
    .required()
    .error(new Error("missing required name field")),
  start: Joi.string()
    .email()
    .required()
    .error(new Error("missing required email field")),
  end: Joi.string()
    .required()
    .error(new Error("missing required phone field")),
  favorite: Joi.String()
    .required()
    .error(new Error("missing required favorite field")),
});

const putCheckingSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string().email(),
  end: Joi.string(),
  favorite: Joi.String(),
}).min(1);

const patchCheckingSchema = Joi.object({
  favorite: Joi.String().required(),
});

const Task = model("task", taskSchema);
const taskSchemas = { postCheckingSchema, putCheckingSchema, patchCheckingSchema };

module.exports = { Task, taskSchemas };


// regex = ^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$

// { name: { $in: [ /^acme/i, /^ack/ ] } }
