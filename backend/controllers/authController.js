

export const register = async (req, res) => {
  try {
    const { name, email } = req.body;
    // TODO: hook up Prisma/User model and hash passwords
    return res.status(201).json({ message: 'User registered (placeholder)', user: { name, email } });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to register', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    // TODO: validate credentials and return JWT/session
    return res.status(200).json({ message: 'Logged in (placeholder)', token: 'placeholder-token', email });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const logout = async (req, res) => {
  return res.status(200).json({ message: 'Logged out (placeholder)' });
};

export const me = async (req, res) => {
  // In a real app, extract user from session / JWT
  return res.status(200).json({ message: 'Profile (placeholder)', user: null });
};
