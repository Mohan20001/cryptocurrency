

fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`)
.then(res => res.json())
.then(data => {
    console.log(data[0]);
     data.forEach(element => {
        createComponent(element.market_cap_rank, element.name,Math.ceil(element.market_cap/1000000000), element.current_price,Math.floor(element.price_change_percentage_24h), element.image);
    });
})
.catch(err => console.log(err));


 function createComponent(coinRank, coinName,coinMcap, coinPrice, coinPercentage, srcUrl) {
    let ls=document.querySelector('.list-of-coins');
    
    let item=document.createElement('div');
    item.className="item";

    let rank=document.createElement('div');
    rank.className="rank";
    rank.innerText=coinRank;
      
    let name=document.createElement('div');
    name.className="name";
    name.innerText=coinName;

    let imag=document.createElement('img');
    imag.src=srcUrl;
    name.appendChild(imag);

    
    

    let mcap=document.createElement('div');
    mcap.className="cap";
    mcap.innerText="$"+coinMcap+"B";

    let price=document.createElement('div');
    price.className="price";
    price.innerText="$"+coinPrice;

    let span=document.createElement('span');
    span.innerText=coinPercentage+"%";
   rankColor(span)
    price.appendChild(span);

    item.appendChild(rank);
    item.appendChild(name);
    item.appendChild(mcap);
    item.appendChild(price);

    ls.appendChild(item);
}


function rankColor(str) {
    if (str.innerText.includes("-")) {
        str.style.color="red";
    }
 }

