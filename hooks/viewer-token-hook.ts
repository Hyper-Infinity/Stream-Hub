import { toast } from "sonner";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode"
import { createViewerToken } from "@/actions/ViewerToken";

export const useViewerToken = (hostId: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [indentity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostId);
                setToken(viewerToken);

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {name : string} ;
                const name = decodedToken.name;
                const identity = decodedToken.iss;
                if(identity) {
                    setIdentity(identity);
                }
                if(name) {
                    setName(name);
                }
                // toast("Token Created Successfuly! 🎊🎊", {duration: 1500});
            } catch(e) {
                toast("Something Went Wrong! 😬😬", {duration: 1500});
            }
        }
        createToken();
    }, [hostId])

    return {
        token, 
        name, 
        indentity
    }
}