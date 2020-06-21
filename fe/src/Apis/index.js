const BASE_URL = "https://techventcs.com/api";
// const BASE_URL = "http://localhost:3200";
// Admin
export const ADMIN_LOGIN_URL = `${BASE_URL}/admin/signin`;
export const ALL_RESTURANTS_URL = `${BASE_URL}/admin/restaurants`;
export const RESTURANT_APPROVE = `${BASE_URL}/admin/restaurant`;

// Resturant
export const RESTURANT_LOGIN_URL = `${BASE_URL}/restaurant/signin`;
export const RESTURANT_SIGNUP_URL = `${BASE_URL}/restaurant/signup`;
export const RESTURANT_ADD_DEAL = `${BASE_URL}/restaurant/deal`;
export const RESTURANT_ADD_INFO = `${BASE_URL}/restaurant/add-info`;
export const RESTURANT_GET_ALL_DEALS = `${BASE_URL}/restaurant/deals`;
export const RESTURANT_GET_ALL_ORDERS = `${BASE_URL}/restaurant/orders`;
export const RESTURANT_ORDER_DELIVER = `${BASE_URL}/restaurant/order/delivered`;
export const RESTURANT_ORDER_REJECT = `${BASE_URL}/restaurant/order/mark`;
export const RESTURANT_EDIT_INFO = `${BASE_URL}/restaurant/info`;
export const RESTURANT_REVIEWS = `${BASE_URL}/restaurant/reviews`;

// Customer
export const CUSTOMER_LOGIN_URL = `${BASE_URL}/customer/signin`;
export const CUSTOMER_SIGNUP_URL = `${BASE_URL}/customer/signup`;
export const CUSTOMER_NEARBY_RESTAURANT = `${BASE_URL}/customer/nearby-restaurant`;
export const CUSTOMER_ORDERS_URL = `${BASE_URL}/customer/orders`;
export const CUSTOMER_ORDER_RECEVIED_URL = `${BASE_URL}/customer/order/received`;
export const CUSTOMER_PLACE_ORDER_URL = `${BASE_URL}/customer/place-order`;
export const CUSTOMER_RESTURANT_DEALS_URL = `${BASE_URL}/customer/restaurant-deals`;
export const CUSTOMER_RESTURANT_REVIEW = `${BASE_URL}/customer/restaurant-review`;
export const GET_CUSTOMER_RESTURANT_REVIEWS = `${BASE_URL}/customer/restaurant-reviews/`;

export const FILE_UPLOAD = `${BASE_URL}/file-upload`;
