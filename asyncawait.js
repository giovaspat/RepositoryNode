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

async function getResults() {
  const player= ["Tina","Jorge","Julien"]

  try {
    const resultTina = await luckyDraw(player[0]);
    console.log(resultTina);

    const resultJorge = await luckyDraw(player[1]);
    console.log(resultJorge);

    const resultJulien = await luckyDraw(player[2]);
    console.log(resultJulien);

  } catch (error) {
    console.error(error.message);
  }
}

getResults();
