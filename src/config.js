export const PORT = process.env.PORT || 3231
export const production  = 'https://seldon-dashboard.herokuapp.com/';
export const development = `http://localhost:${PORT}/`;
export const URL = (process.env.NODE_ENV ? production : development);