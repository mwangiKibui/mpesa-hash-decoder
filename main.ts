import dotenv from 'dotenv';
dotenv.config();

type Algos = 'Sha256';

interface result {
    msisdn: String,
    hashed: String
}

interface apiResponse {
    success: Boolean,
    message: String,
    data: dataResponse
}

interface dataResponse {
    _id:String,
    telco:String,
    phone:String,
    sha256Hash:String
}


export function fetchHashed(algo:Algos,msisdn:String):Promise<result>{
    return new Promise(async (resolve,_) => {
        try{
            if(process.env.FETCH_HASHED_URL){
                let result = await fetch(process.env.FETCH_HASHED_URL,{
                    method:"POST",
                    body:JSON.stringify({
                        phone:msisdn,
                        algo
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
        
                let apiResponse:apiResponse = await result.json();
    
                // check if it was successful or not.
                if(apiResponse.success){
                    resolve ({
                        msisdn:apiResponse.data.phone,
                        hashed:apiResponse.data.sha256Hash
                    });
                }else{
                    // send sms to creator right away.
                    resolve ({
                        msisdn:msisdn,
                        hashed:""
                    });
                }
            }else{ //no environment variable set.
                resolve ({
                    msisdn:msisdn,
                    hashed:""
                });
            }
        }catch(error:any){
            // send sms to creator right away.
            // reject(error.message ? error.message : "An error occurred fetching hashed");
            resolve ({
                msisdn:msisdn,
                hashed:""
            });
        }
    })
}

export function decodeMsisdn(algo:Algos,hashedValue:String):Promise<result>{
    return new Promise(async (resolve,_) => {
        try {
            if(process.env.DECODE_MSISDN_URL){
                let result = await fetch(process.env.DECODE_MSISDN_URL,{
                    method:"POST",
                    body:JSON.stringify({
                        hashedPhone:hashedValue,
                        algo
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
        
                let apiResponse:apiResponse = await result.json();
    
                if(apiResponse.success){
                    resolve({
                        msisdn:apiResponse.data.phone,
                        hashed:apiResponse.data.sha256Hash
                    });
                }else{
                    // return to the client empty response.
                    // todo: send an sms to me.
                    resolve({
                        msisdn:"",
                        hashed:hashedValue
                    });
                }
            }else{ // no environment variable set
                resolve ({
                    msisdn:"",
                    hashed:hashedValue
                });
            }
        }catch(error:any){
            
            // return to the client empty response.
            // todo: send an sms to me.
            
            // reject(error.message ? error.message : "An error occurred decoding MSISN");
            resolve({
                msisdn:"",
                hashed:hashedValue
            });
        }
    });
};
