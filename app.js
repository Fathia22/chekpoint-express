const express = require('express');
const { join } = require('path');
const path = require('path');
const app = express();
const PORT =process.env.PORT || 3000;

// Custom middleware to check time of request
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hourOfDay = date.getHours();
  console.log(dayOfWeek);
  console.log(hourOfDay)
  if (dayOfWeek >= 0 && dayOfWeek < 7 && hourOfDay >= 9 && hourOfDay < 21) {
    next();
  } else {
    res.status(404).send('The web application is only available during working hours (Monday to Friday, from 9 to 17)');
  }
};

// Use the workingHoursMiddleware for all requests
app.use(workingHoursMiddleware);

// Define routes for the Home, Our Services, and Contact Us pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
//res.render('home', { pageTitle: 'Home' });
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
  //res.render('services', { pageTitle: 'Our Services' });
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
  //res.render('contact', { pageTitle: 'Contact Us' });
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });