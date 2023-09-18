const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;


// Wetter 
//Axios
const axios = require('axios');

// Verwende CORS-Middleware
app.use(cors());


// Wetter API
    // Import des fetch Befehls (Übernommen aus der Dokumentation zum Paket Node-Fetch)
    // Einbindung in "require"-Abschnitt
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    // Unsere neue GET-Methode
    app.get('/wetter/:city', async function (req, res) {
      // Abfrage der API (HTTP)
      const city = req.params.city;
      const result = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + encodeURI(city) + "&appid=94f71069f647fb7800be2f7f846f4db0" + "&units=metric");
      // Parsen der JSON Informationen (Erzeugt ein Promise Objekt)
      const data = await result.json()
  
      // Rückgabe der abgefragten Wetterdaten
      res.json(data)
      })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
