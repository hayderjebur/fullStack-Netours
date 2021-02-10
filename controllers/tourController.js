const Tour = require('../models/tourModel');

//Get all tours
exports.getAllTours = async (req, res) => {
  const tours = await Tour.find({});
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours
    }
  });
};

//Get tour by ID
exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};
//Post Create Tour
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fails',
      msg: err
    });
  }
};

//PUT update tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

//Delete tour
exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: {
      tour: 'Tour deleted'
    }
  });
};
