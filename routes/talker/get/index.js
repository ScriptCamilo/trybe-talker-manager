const router = require('express').Router();
const { readFile } = require('../../../utils/handleFile');
const { isIdValid, isTokenValid } = require('../../../utils/validations');
const { HTTP_OK_STATUS } = require('../../../utils/serverStatus');

router.get('/', (_req, res, next) => {
  try {
    const data = readFile();

    if (!data) return res.status(HTTP_OK_STATUS).json([]);

    res.status(HTTP_OK_STATUS).json(data);
  } catch (err) {   
    next(err);
  }
});

router.get('/search', isTokenValid, (req, res, next) => {
  try {
    const { query: { q } } = req;
    const data = readFile();
    const search = data.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));

    if (!q) {
      return res.status(HTTP_OK_STATUS).json(data);
    }

    if (!search.length) {
      return res.status(HTTP_OK_STATUS).json([]);
    }

    res.status(HTTP_OK_STATUS).json(search);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isIdValid, (req, res, next) => {
  try {
    const { talker } = req;
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
