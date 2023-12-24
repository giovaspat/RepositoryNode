import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const message = new Uint8Array(Buffer.from("Questo file di testo si chiama capriola.txt"));
writeFile("capriola.txt", message, (err) => {
  if (err) throw err;
  console.log("Il file è stato scritto con successo");
});