export const PORT = process.env.REACT_APP_PORT || 3231
export const production  = 'https://seldon-dashboard.herokuapp.com/';
export const development = `http://localhost:${PORT}/`;
export const URL = (process.env.REACT_APP_NODE_ENV ? production : development);