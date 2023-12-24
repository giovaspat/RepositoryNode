var figlet = require("figlet");

function queenSong(songName) {
  console.log(`${songName}`);

  figlet(songName, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
  
}

module.exports = queenSong;
