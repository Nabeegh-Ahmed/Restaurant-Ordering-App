import { IUserState } from "./types";
import { Actions } from "./types";

export const initialUserState: IUserState = {
    isAuth: false,
    user: null,
    error: '',
    loading: false,
}

export const userReducer = (state: IUserState, action: Actions): IUserState => {
    switch (action.type) {
        case "LOGIN_REQUEST": {
            return {
                ...state,
                error: "",
                loading: true
            }
        }
        
        case "USER_LOGGED_IN": {
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    email: action.payload.email,
                }
            }
        }

        case "LOGIN_SUCCESS": {
            const { id, email } = action.payload
            return {
                ...state,
                isAuth: true,
                loading: false,
                error: '',
                user: {
                    id: id,
                    email: email,
                },
            }
        }

        case "LOGIN_FAIL": {
            const { error } = action.payload || ""
            console.log(error)
            return {
                ...state,
                isAuth: false,
                user: null,
                error: action.payload?.error,
                loading: false
            }
        }

        case "LOGOUT": {
            return {
                ...state,
                isAuth: false,
                user: null,
                loading: false,
                error: ''
            }
        }

        case "REGISTER_REQUEST": {
            return {
                ...state,
                loading: true
            }
        }

        case "REGISTER_SUCCESS": {
            const { id, email } = action.payload
            return {
                ...state,
                isAuth: true,
                loading: false,
                error: '',
                user: {
                    id: id,
                    email: email,
                }
            }
        }

        case "REGISTER_FAIL": {
            return {
                ...state,
                isAuth: false,
                user: null,
                error: action.payload.error,
                loading: false
            }
        }

        default: {
            return state
        }
    }
}