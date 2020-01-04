const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Route Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(element => element.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour
        }
      });
    }
  );
};

const updataTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updata tour here>'
    }
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: '<updata tour here>'
    }
  });
};

// Users Handlers

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'not ready yet'
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'not ready yet'
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'not ready yet'
  });
};
const updataUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'not ready yet'
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'not ready yet'
  });
};

//Route Tours
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updataTour)
  .delete(deleteTour);

// Routes Users
app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updataUser)
  .delete(deleteUser);

//Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server runing on port ${PORT}`);
});
