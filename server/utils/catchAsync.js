/**
 * Wrapper function to catch errors in async Express route handlers
 * and forward them to the error handling middleware
 * @param {Function} fn - The async route handler function
 * @returns {Function} - Express middleware function
 */
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};