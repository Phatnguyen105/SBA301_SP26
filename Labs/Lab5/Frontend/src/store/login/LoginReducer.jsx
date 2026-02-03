/**
 * Login Reducer
 * Quản lý state của form đăng nhập và xử lý các action
 */

export const LOGIN_ACTIONS = {
  // Form field actions
  SET_USERNAME: 'SET_USERNAME',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_FIELD_ERROR: 'SET_FIELD_ERROR',
  CLEAR_FIELD_ERRORS: 'CLEAR_FIELD_ERRORS',
  
  // Login process actions
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  
  // Reset actions
  RESET_FORM: 'RESET_FORM',
};

export const initialLoginState = {
  // Form fields
  username: '',
  password: '',
  
  // Validation errors
  fieldErrors: {
    username: '',
    password: '',
  },
  
  // Login process state
  isLoading: false,
  loginError: null,
  isSubmitted: false,
};

/**
 * Login Reducer
 * @param {Object} state - Current state
 * @param {Object} action - Action object with type and payload
 * @returns {Object} New state
 */
export function loginReducer(state, action) {
  switch (action.type) {
    // Form field updates
    case LOGIN_ACTIONS.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
        fieldErrors: {
          ...state.fieldErrors,
          username: '', // Clear error when user starts typing
        },
      };

    case LOGIN_ACTIONS.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
        fieldErrors: {
          ...state.fieldErrors,
          password: '', // Clear error when user starts typing
        },
      };

    // Validation error handling
    case LOGIN_ACTIONS.SET_FIELD_ERROR:
      return {
        ...state,
        fieldErrors: action.payload,
      };

    case LOGIN_ACTIONS.CLEAR_FIELD_ERRORS:
      return {
        ...state,
        fieldErrors: {
          username: '',
          password: '',
        },
      };

    // Login process actions
    case LOGIN_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        loginError: null,
        isSubmitted: true,
      };

    case LOGIN_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loginError: null,
        isSubmitted: false,
        // Form sẽ được reset sau khi navigate
      };

    case LOGIN_ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        loginError: action.payload,
        isSubmitted: false,
      };

    // Reset form
    case LOGIN_ACTIONS.RESET_FORM:
      return initialLoginState;

    default:
      return state;
  }
}
