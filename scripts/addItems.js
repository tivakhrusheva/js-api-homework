const API_URL = 'https://d5dqmrec9704nqgi2oe3.apigw.yandexcloud.net';


export const addItemToBackend = async (userId, itemName, itemN, itemPrice, itemUrl) => {
    console.log("function addItemToBackend launched..")
    const data = {
                "userId": userId,
                "itemName": itemName,
                "itemN": itemN,
                "itemPrice": itemPrice,
                "itemUrl": itemUrl
         }
    const endpoint = 'https://d5dqmrec9704nqgi2oe3.apigw.yandexcloud.net/add_item';
    //const endpoint = API_URL + "/add_item'"

    fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
         // oherwise 'Access to fetch at '..' from origin '..' has been blocked by CORS policy:
         // Response to preflight request doesn't pass access control check: It does not have HTTP ok status.'
        body: JSON.stringify(data),
        headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
                    "Access-Control-Max-Age": "86400"
                }
    })
    .then(response => console.log(response))
    .then((resp) => resp.json())
    .then(function(response) {
        location.href = "cart-page.html";
        return response;
    })
    .catch(err => {
        console.log("Error in fetch", err);
        location.href = "cart-page.html";
    });
};
