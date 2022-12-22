const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

const ShareService = require('./src/services/ShareService');
const portfolioRoutes = require('./src/routes/PortfolioRoutes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/portfolio', portfolioRoutes);

app.get('/', (req,res) => {
    res.send({ message: 'Hello World!'} );
});

ShareService.handleSharePrices();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
