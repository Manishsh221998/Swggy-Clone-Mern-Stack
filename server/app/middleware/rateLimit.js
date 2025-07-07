const rateLimit=require('express-rate-limit')

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 minute
  max: 100, // Allow only 5 requests per IP per minute
  message: "You have exceeded your 100 requests per minute limit.",
  standardHeaders: true, // Use `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers (optional)
});


module.exports=rateLimitMiddleware