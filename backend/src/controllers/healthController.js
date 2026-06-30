const getHealth = (req, res) => {
  res.status(200).json({ message: 'Elric AI Backend is healthy!' });
};

export { getHealth };
