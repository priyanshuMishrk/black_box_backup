const cron = require('node-cron');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Schedule a cron job
const job = cron.schedule('* * * * *', () => {
    
}, {
  scheduled: true, // Whether the job is active after initialization
  timezone: "Asia/Kolkata" // Optional: Set a timezone
});

// Export the job
module.exports = job;