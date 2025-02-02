'use server'

// import { TOrder } from "@/types/TOrder";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateOrder = async (data: any) => {
    const url = process.env.BACKEND_URL
    const res = await fetch(`${url}/orders`, {
        method: "POST",
        headers: {
            'content-Type':'application/json'
        },
        body:JSON.stringify(data),cache:'no-cache'
    })
    const orderRes = await res.json()
    console.log('create res',orderRes);
    
    return orderRes
};

export default CreateOrder;