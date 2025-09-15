export const COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products'
};

export const USER_STATUSES = {
  ACTIVE: 'active',
  DELETED: 'deleted'
};

export const MESSAGES = {
  USER_REGISTER_SUCCESS: 'User registered successfully',
  USER_EXISTS: 'User already exists',
  MISSING_REQUIRED_FIELDS: 'Missing required fields',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  INVALID_CREDENTIALS: 'Invalid credentials',
  TOKEN_REFRESH_SUCCESS: 'Token refreshed successfully',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  PRODUCT_CREATE_SUCCESS: 'Product created successfully',
  PRODUCTS_GET_SUCCESS: 'Products retrieved successfully',
  PRODUCT_UPDATE_SUCCESS: 'Product updated successfully',
  PRODUCT_DELETE_SUCCESS: 'Product deleted successfully',
  NOT_FOUND: 'Not Found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  HEALTH_OK: 'OK'
};

export default {
  COLLECTIONS,
  USER_STATUSES,
  MESSAGES
};
