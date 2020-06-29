const express = require('express'); 

const app = express(); 

const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db'); 


const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const contactRouter = require('./routes/contacts');

app.use(express.json()); 

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);

app.get('/', (req, res) => {
    res.send('Contact keeper app!'); 
}); 

connectDB();

app.get('/', (req, res) => {
    res.send('Contact keeper!'); 
}); 

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
}); 