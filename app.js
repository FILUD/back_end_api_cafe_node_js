const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Cafe Bakery API!');
});

const authRoutes = require('./src/routes/authRountes');
app.use('/api/auth', authRoutes);
app.use('/api', require('./src/routes/user')); 
app.use('/api', require('./src/routes/categoryRoutes')); 
app.use('/api', require('./src/routes/productRoutes')); 
app.use('/api', require('./src/routes/inventoryRoutes')); 



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Coffee running on http://localhost:${PORT}`);
});