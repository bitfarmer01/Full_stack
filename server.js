const express=require('express')
const connectDB=require('./config/db')


const app=express(); 
//Connect the Database 
connectDB();

// init middleware
app.use(express.json({extended:false}))


app.get('/',(req,res)=>res.send('API running'))
// define routes
app.use('/api/users',require('./config/routes/api/users')); 
app.use('/api/post',require('./config/routes/api/post'));
app.use('/api/profile',require('./config/routes/api/profile'));
app.use('/api/auth',require('./config/routes/api/auth'));

const PORT =process.env.PORT|| 5000; 
app.listen(PORT,() => console.log(`Server started on Port ${PORT}`));