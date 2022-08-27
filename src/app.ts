import express from 'express'
import cookieParser from 'cookie-parser';
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import productRoute from './routes/productRoute'
import userRoute from './routes/userRoute'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import bodyParser from 'body-parser';

dotenv.config({ path: '.env' })
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express configuration
app.set('port', process.env.PORT || 4000)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routes
app.use('/api/', productRoute)
app.use('/api/',userRoute)

// Custom API error handler
app.use(apiErrorHandler)



export default app
