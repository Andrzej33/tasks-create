const express = require("express");

const { isValidId} = require("../../middlewares");

const router = express.Router();

const ctrl = require("../../controllers/tasks");

router.get("/", ctrl.getAll);


router.post("/", ctrl.add);

router.delete("/:taskId", isValidId, ctrl.removeById);

router.patch("/:taskId", isValidId, ctrl.update);



module.exports = router;


// const express = require("express");

// const { isValidId } = require("../../middlewares");

// const router = express.Router();

// const ctrl = require("../../controllers/contacts");

// router.get("/", ctrl.getAll);

// router.get("/:contactId",, isValidId, ctrl.getById);

// router.post("/",, ctrl.add);

// router.delete("/:contactId",, isValidId, ctrl.removeById);

// router.put("/:contactId", isValidId, ctrl.update);

// router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

// module.exports = router;