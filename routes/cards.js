const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', addLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
