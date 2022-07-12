require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  return res.json({ test: 'connected' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
