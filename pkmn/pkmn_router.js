const pokemon = require('pokemontcgsdk')
const router = require('express').Router();

router.get('/allpokemon', (req, res) => {
  // pokemon.card.find('base1-4')
  //   .then(pokemon => {
  //     console.log(pokemon);
  //     res.status(200).json(pokemon);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(500).json({error: 'There was a problem connecting to server.'});
  //   })
  pokemon.card.where({ setCode: 'base1' })
    .then(pokemon => {
        console.log(pokemon);
        res.status(200).json(pokemon);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: 'There was a problem connecting to server.'});
    });
});

module.exports = router;