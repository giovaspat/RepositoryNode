function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

const player= ["Joe","Sabrina","Carolina"]

luckyDraw(player[0])
  .then(result => {
    console.log(result);
    return luckyDraw(player[1]); 
  })
  .then(result => {
    console.log(result);
    return luckyDraw(player[2]); 
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error.message);
  });