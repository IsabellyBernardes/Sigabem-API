const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 3000;
//tanto na API quanto na aplicação web para permitir que eles troquem dados sem problemas
const cors = require('cors');
app.use(cors());


// Inicializa o Firebase
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://<your-database-name>.firebaseio.com"
});

const db = admin.database();

app.get('/data', (req, res) => {
  const ref = db.ref('sensorData');
  ref.once('value', (snapshot) => {
    const data = snapshot.val();
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
