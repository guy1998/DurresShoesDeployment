const url = 'http://localhost:8003/login/login'

const verifyCredentials = (username, password, notification)=>{
    if(username && password)
        return true;
    else if(!username || !password){
        notification.add((username ? 'Password ' : 'Username ') + " is missing!", { variant: "error" });
        return false;
    }
}

export const login = async (username, password, notification, navigation)=>{
    const verified = verifyCredentials(username, password, notification);
    if(verified){
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
            credentials: "include"
        });
        if(response.status === 200){
            navigation("/app/dashboard");
        } else {
            const message = await response.json();
            notification.add(message, { variant: "error" });
        }
    }
}