const { errorCodes } = require('../util/constants.ts');

module.exports.errorRouteController = (req, res) => {
  res.status(errorCodes.HTTP_NOT_FOUND).send({
    message: 'Запрошен неверный маршрут',
  });
};
