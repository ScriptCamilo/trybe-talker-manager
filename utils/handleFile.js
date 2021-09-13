const fs = require('fs');

const talker = 'talker.json';

function readFile() {
  const data = fs.readFileSync(talker, 'utf-8');

  return JSON.parse(data);
}

function addTalker(bodyTalker) {
  const data = readFile();

  const newId = data.reduce((lastId, { id }) => {
    if (lastId === id) return lastId + 1;
    return id;
  }, 1);

  const newTalker = { ...bodyTalker, id: newId };
  data.push(newTalker);

  fs.writeFileSync(talker, JSON.stringify(data));

  return newId;
}

module.exports = {
  readFile,
  addTalker,
};
