const express = require('express');
const app = express();
const db = require('./db/config')
const cors = require('cors')
const userRoutes = require('./routes/userRoute')
const candidateRoute= require('./routes/candidateRoute')

app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);
app.use('/candidate',candidateRoute);
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`>> Listening on PORT::${PORT}`);
  });