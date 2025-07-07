const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");

const connectDB = require("./app/config/db");
const router = require("./app/router/routing");
const authRouter = require("./app/router/auth.Routes");
const employeeRouter = require("./app/router/employee.Routes");
const cuisineMenuCatRouter = require("./app/router/cuisine&MenuCat.Routes");
const restaurantRouter = require("./app/router/restaurant.Routes");
const menuRouter = require("./app/router/menu.Routes");
const userRouter = require("./app/router/apiRutes/user.Routes");
const restaurantApiRouter = require("./app/router/apiRutes/restaurant.Routes");
const cartRouter = require("./app/router/apiRutes/cart.Routes");
const orderRouter = require("./app/router/apiRutes/order.Routes");

const rateLimitMiddleware = require('./app/middleware/rateLimit')
const swaggerJsdoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')
const SwaggerOptions=require('./swagger.json')
const swaggerDocument=swaggerJsdoc(SwaggerOptions)
 

// Connect to database
connectDB();

// Initialize app
const app = express();
// app.use(morgan('dev'))
// Middleware
app.use(cors({
   origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
 
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))


//Admin-Routes
app.use(router);
app.use(authRouter);
app.use(employeeRouter);
app.use(cuisineMenuCatRouter);
app.use(restaurantRouter);
app.use(menuRouter);

//Api-Routes
app.use('/api/auth',userRouter)
app.use('/api',restaurantApiRouter)
app.use('/api',cartRouter)
app.use('/api',orderRouter)


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
