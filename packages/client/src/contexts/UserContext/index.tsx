import React, {createContext} from 'react'
import {initialUserState, userReducer} from "./reducers";
import {IUserState} from "./types";
import { trpc } from '../../trpc';

interface UserContextInterface {
    state: IUserState
    dispatch: React.Dispatch<any>
}

export const UserContext = createContext<UserContextInterface>({
    state: initialUserState,
    dispatch: () => undefined
})

interface ProviderProps {
    children: JSX.Element | JSX.Element[] | React.ReactNode
}

export const UserContextProvider: React.FC<ProviderProps> = (props: ProviderProps) => {
    const [state, dispatch] = React.useReducer(userReducer, initialUserState)
    const { children } = props
    const value = { state, dispatch }

    const checkUserLoggedIn = trpc.getMe.useQuery()
    
    React.useEffect(() => {
        if (!state.isAuth) {
            checkUserLoggedIn.refetch().then((res) => {
                if (!res.error) {
                    console.log()
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data?.data.user })
                }
            })
        }
    }, [state])


    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    )
}