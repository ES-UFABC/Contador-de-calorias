import { useAuth } from "../../context/AuthProvider/useAuth"

export const ProtectedLayout = ({children}:{children:JSX.Element}) =>{
    const auth = useAuth()

    if(!auth.userName){
        return <h1>You do not have access</h1>;
    }

    return children
}