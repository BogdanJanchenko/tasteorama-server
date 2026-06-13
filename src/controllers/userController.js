export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites,
    });
  } catch (err) {
    next(err);
  }
};
