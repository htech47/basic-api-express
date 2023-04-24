const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors= require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// app.use(cors);
const port = 3030;
const api_key = 'your_api_key_here';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Bob' }
    ];

app.get('/', (req, res)=>{
  res.send({message: "welcome to my backend"})
})
app.get('/api/data', (req, res) => {
  const api_key_client = req.headers['api-key'];
  if (api_key_client && api_key_client === api_key) {
    // fetch your data here and send it back as a response
    res.send(data);
  } else {
    res.status(401).send({ message: 'Unauthorized access' });
  }
});
app.get('/api/data/:id', (req, res) => {
  const api_key_client = req.headers['api-key'];
  if (api_key_client && api_key_client === api_key) {
    // fetch your data here and send it back as a response
    const { id } = req.params;
    // console.log(id)
    res.send(data[id-1]);
  } else {
    res.status(401).send({ message: 'Unauthorized access' });
  }
});

app.listen(port, () => {
  console.log('Server is running on port '+port);
});
