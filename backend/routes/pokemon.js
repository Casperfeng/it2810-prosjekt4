const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

// Get upto 25 pokemon
// Query parameters;
// * skip: skip a given amount of pokemon
// * name: only get pokemon with name containing name
// * sort: sort by given field in either ascending or descending order
// * types: get pokemon with given type
// * idList: only get pokemon with id in idList
router.get('/', async (req, res) => {
  try {
    // Set query params
    const skipAmount = req.query.skip ? parseInt(req.query.skip) : 0;
    const name = req.query.name ? req.query.name.toLocaleLowerCase() : '';
    const idList =
      JSON.parse(req.query.idList).length > 0
        ? JSON.parse(req.query.idList)
        : [...Array(152).keys()];
    const types =
      JSON.parse(req.query.types).length > 0
        ? JSON.parse(req.query.types)
        : [
            'fire',
            'grass',
            'flying',
            'water',
            'bug',
            'ground',
            'rock',
            'normal',
            'poison',
            'dragon',
            'ice',
            'fighting',
            'electric',
            'psychic',
            'fairy',
            'ghost',
            'steel'
          ];

    // Set sort query params
    const sort = {};
    for (const key of Object.keys(req.query)) {
      if (key === 'sort') {
        const value = req.query[key];
        const isDESC = value.endsWith('DESC');
        if (value.startsWith('name')) {
          sort.name = isDESC ? -1 : 1;
        } else if (value.startsWith('id')) {
          sort.id = isDESC ? -1 : 1;
        } else if (value.startsWith('views')) {
          sort.views = isDESC ? -1 : 1;
        }
      }
    }

    // Create filter depending on types, ids in idList and name
    const filter = {};
    filter.$and = [
      { types: { $in: types } },
      { id: { $in: idList } },
      {
        name: {
          $regex: name,
          $options: 'i'
        }
      }
    ];

    // Query
    const pokemon = await Pokemon.find(filter)
      .sort(sort)
      .skip(skipAmount)
      .limit(25);
    res.json(pokemon);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
