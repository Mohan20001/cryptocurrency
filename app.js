var baseUrl='https://api.coinranking.com/v2/coins';
var proxyUrl='https://cors-anywhere.herokuapp.com/';
var apiKey='coinranking1fd6c143d8d9f8a6a7902f9d09d4d80faacec1854234e6c3';


fetch(`${proxyUrl}${baseUrl}`,{
    method:"GET",
    headers:{
        'Content-Type':'application/json',
        'x-access-token': `${apiKey}`,
        'Access-Control-Allow-Origin':'*'
    }
})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});
