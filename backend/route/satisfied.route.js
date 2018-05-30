const express = require('express');

const satisfiedRouter = express.Router();
const satisfiedController = require('../controller/satisfied.controller');


/* function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({
      error: 'Be kell jelentkezned.',
    });
  }
} */

satisfiedRouter.route('/')
  .get(satisfiedController.list);

satisfiedRouter.route('/')
  .post(satisfiedController.create);

satisfiedRouter.route('/:id')
  .get(satisfiedController.find)
  .put(satisfiedController.update);

satisfiedRouter.route('/:prodid/:commid')
  .delete(satisfiedController.remove);

module.exports = satisfiedRouter;