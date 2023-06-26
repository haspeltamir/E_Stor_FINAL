const BASE_URL = 'http://localhost:3000';

export const DEVICES_URL = BASE_URL + '/api/devices';
export const DEVICES_TAGS_URL = DEVICES_URL + '/tags';
export const DEVICES_BY_SEARCH_URL = DEVICES_URL + '/search/';
export const DEVICES_BY_TAG_URL = DEVICES_URL + '/tag/';
export const DEVICES_BY_ID_URL = DEVICES_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';

export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
