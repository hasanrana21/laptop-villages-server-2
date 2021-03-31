const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config()

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


  
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7tlf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("laptopVillage-ass10").collection("electronicProducts");

  app.post('/addCardDetails', (req, res) => {
    const newCard = (req.body);
    console.log('adding new card', newCard)
    productsCollection.insertOne(newCard)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/cards', (req, res) => {
    productsCollection.find()
    .toArray((err, items) => {
      res.send(items)
    })
  })



});





app.get('/', (req, res) => {
  res.send('Hello World!!Server is Ready For Work!')
})

app.listen(5000)