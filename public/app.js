const express = require('express');
const finance = require('financejs');
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post('/calculate', (req, res) => {
  const { rate, compoundings, principal, periods } = req.body;
  const financeCalculator = new finance();
  const result = financeCalculator.CI(rate, compoundings, principal, periods);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});