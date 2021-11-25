let url=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`;

function fetchData(path) {
    
    fetch(path)
    .then(res => res.json())
.then(data => {
    console.log(data[0]);
     data.forEach(element => {
        createComponent(element.market_cap_rank, element.name,strFormate(element.market_cap/1000000000), strFormate(element.current_price),strFormate(element.price_change_percentage_24h), element.image, element.id);
    });
})
.catch(err => console.log(err));


 function createComponent(coinRank, coinName,coinMcap, coinPrice, coinPercentage, srcUrl, coin_id) {
    let ls=document.querySelector('.list-of-coins');
    
    let a=document.createElement('a');
    a.href="#board";

    let item=document.createElement('div');
    item.className="item";
    
    let rank=document.createElement('div');
    rank.className="rank";
    rank.innerText=coinRank;
    
    let name=document.createElement('div');
    name.className="name";
    name.innerText=coinName;
    name.setAttribute('id', coin_id)
    
    let imag=document.createElement('img');
    imag.src=srcUrl;
    // document.body.style.cursor="url('"+srcUrl +", pointer')";
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
     
    a.appendChild(item);
    ls.appendChild(a);
    item.setAttribute('onclick', 'hello(this)');
}


function rankColor(str) {
    if (str.innerText.includes("-")) {
        str.style.color="red";
    }
    
}
    

}



if (navigator.onLine) {
    fetchData(url);
}else{
    alert("offline");
}

function hi(params) {
    console.log('hi');
}

function hello(e) {
    console.log(e.querySelector(".name").getAttribute('id'));
    let c=e.querySelector(".name").getAttribute('id');
    fetch(`https://api.coingecko.com/api/v3/coins/${c.toLowerCase()}?tickers=false&market_data=true&community_data=true&sparkline=true`)
    .then(res => res.json()).then(data => {
        console.log(data)
        document.getElementById('btc').innerText=data.name +" ("+data.symbol+")";
        document.getElementById('c-img').setAttribute('src', data.image.large);
        document.getElementById('c-price').innerText= "$"+strFormate( data.market_data.current_price.usd);
        document.getElementById('c-mcap').innerText="$"+strFormate( data.market_data.current_price.usd);
        document.getElementById('c-diluted').innerText="$"+strFormate( data.market_data.fully_diluted_valuation.usd);

        //full data
        document.getElementById('c-rank').innerText= data.market_cap_rank;
        document.getElementById('c-mcap-c').innerText="$"+strFormate( data.market_data.current_price.usd);
        document.getElementById('full-dileted-valua').innerText="$"+strFormate( data.market_data.fully_diluted_valuation.usd);
  //trade
  document.getElementById('c-24h-high').innerText="$"+strFormate( data.market_data.high_24h.usd);
  document.getElementById('c-24h-low').innerText="$"+strFormate( data.market_data.low_24h.usd);
//available supply
  document.getElementById('c-total-supply').innerText="$"+strFormate( data.market_data.total_supply);


// drawGraph();
drawChart(data.market_data.sparkline_7d.price,labels);

        

    });
}

function coinIfo(coin_name) {
    document.getElementById('btc').innerText=coin_name;
}

function strFormate(str) {
    return (parseFloat(str)).toLocaleString(undefined, {minimumFractionDigits: 1});
}





//setup
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'june',
  'july',
  'september',
  'octomber',
  'navamber',
  'december'
  
  
];





function drawChart(dataArray, nameLabels) {
  
  
  
const data = {
  labels: nameLabels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
    //data: [500, 10, 5, 2, 20, 3000, 45,300,600.89],
    data: dataArray,
  }]
};

//config
const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {
     
      title: {
        display: true,
        text: '7Days price',
        padding: {
          top: 30,
          bottom: 30
      }
    }
  }
  }
};

// canv.clear();
// === include 'setup' then 'config' above ===

const myChart = new Chart(
  document.getElementById('myChart'),
  config
  );
}

