const OPERATORS:Array = [
  "$in", "$nin", "$exists",
  "$gte", "$gt", "$lte",
  "$lt", "$eq", "$ne",
  "$mod", "$all", "$and",
  "$or", "$nor", "$not",
  "$size", "$type", "$regex",
  "$where", "$elemMatch", "$options"
];

function getKeys(filter) {
  return Object.keys(filter).reduce((keys, key) => {
    if (!Array.isArray(filter)) keys.push(key);
    if (typeof filter[key] === 'object') return [...keys, ...getKeys(filter[key])];
    return keys;
  }, []);
}

function getOperatorsAndAttributes(filter) {
  const keys = getKeys(filter);

  return keys.reduce((keys, key) => {
    return {
      operators: key.startsWith('$')? [...keys.operators, key]: [...keys.operators],
      attributes: !key.startsWith('$')? [...keys.attributes, key]: [...keys.attributes]
    };
  }, {
    operators: [],
    attributes: []
  });
}

export default function validSift(filter, ...validAttributes) {
  if (filter == null) return true;
  if (filter === true) return true;
  if (filter === false) return true;
  if (['string', 'number'].includes(typeof filter)) return true;
  if (filter instanceof RegExp) return true;

  let {
    operators, attributes
  } = getOperatorsAndAttributes(filter);

  if (operators.every(op => OPERATORS.includes(op)) &&
    attributes.every(attr => validAttributes.indexOf(attr) >=0 )) return true;

  return false;
};

