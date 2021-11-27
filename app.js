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

    

}



if (navigator.onLine) {
    fetchData(url);
}else{
    alert("offline");
}

function hi(params) {
    console.log('hi');
}
async function hello(e) {
  document.getElementById('myChart').style.display="block";
  document.querySelector('.board').style.display="grid";
    // console.log(e.querySelector(".name").getAttribute('id'));
    let c=e.querySelector(".name").getAttribute('id');
   await fetch(`https://api.coingecko.com/api/v3/coins/${c.toLowerCase()}?tickers=false&market_data=true&community_data=true&sparkline=true`)
    .then(res => res.json()).then(data => {
        console.log(data)
        document.getElementById('btc').innerText=data.name +" ("+data.symbol+")";
        document.getElementById('c-img').setAttribute('src', data.image.large);
        document.getElementById('c-price').innerText= "$"+strFormate( data.market_data.current_price.usd);
        document.getElementById('c-mcap').innerText="$"+strFormate( data.market_data.current_price.usd);
        document.getElementById('c-diluted').innerText="$"+strFormate( data.market_data.fully_diluted_valuation.usd);
        document.getElementById('c-label').innerText=data.symbol.toUpperCase();
        document.getElementById('ath').innerText="$"+strFormate( data.market_data.ath.usd)
        document.getElementById('c-ath-change-per').innerText=data.market_data.ath_change_percentage.usd+" % "


        //full data
        document.getElementById('c-rank').innerText= data.market_cap_rank;
        document.getElementById('c-mcap-c').innerText="$"+strFormate( data.market_data.current_price.usd);
        document.getElementById('full-dileted-valua').innerText="$"+strFormate( data.market_data.fully_diluted_valuation.usd);
  //trade
  document.getElementById('c-24h-high').innerText="$"+strFormate( data.market_data.high_24h.usd);
  document.getElementById('c-24h-low').innerText="$"+strFormate( data.market_data.low_24h.usd);
//available supply
  document.getElementById('c-total-supply').innerText="$"+strFormate( data.market_data.total_supply);
document.getElementById('c-stat').innerText=data.symbol.toUpperCase();
let c_per=document.getElementById('c-per');
c_per.innerText=data.market_data.price_change_percentage_24h+" % ";
rankColor(c_per);

let inpt1=document.getElementById('convert-coin-price');

let inpt2=document.getElementById('converted-price');

inpt1.onkeyup=()=>{
  if(inpt1.value != ""){
  inpt2.value=parseFloat(inpt1.value)*parseFloat(data.market_data.current_price.usd);
  }
}


inpt2.onkeyup=()=>{
  if(inpt2.value != ""){
  inpt1.value=parseFloat(inpt2.value)/parseFloat(data.market_data.current_price.usd);
  }
}

// drawGraph();
// for (let index = 0; index < data.market_data.sparkline_7d.price.length; index++) {
//   labels.push('');
// }
// drawChart(data.market_data.sparkline_7d.price,labels);
responsiveDayChat(data.id, 1);


        
// console.log(data.market_data.sparkline_7d.price);
    });
}

function coinIfo(coin_name) {
    document.getElementById('btc').innerText=coin_name;
}

function strFormate(str) {
    return (parseFloat(str)).toLocaleString(undefined, {minimumFractionDigits: 1});
}





//setup
const labels = [];


function responsiveDayChat(coin, days=7) {
  
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}/market_chart?vs_currency=usd&days=${days}`).then(res=>res.json())
  .then(data=>{
    
    let d=data.prices.map(el=>el[0]);
    
    drawChart(data.prices.map(el=>el[1]), data.prices.map(el=>el[0]));
    // console.log(d);
    
  });
}


async function drawChart(dataArray, nameLabels) {
  

const data = {
  labels: nameLabels,
  datasets: [{
    label: 'Today price Flow',
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
    legend: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {

      title: {
        display: false,
        text: (ctx) => 'Tooltip position mode: ' + ctx.chart.options.plugins.tooltip.position,
      },
    }
  }
  
};

// canv.clear();
// === include 'setup' then 'config' above ===
let chartSheet=document.getElementById('myChart')
const myChart = new Chart(
  chartSheet,
  config
  );
  }


function rankColor(str) {
  if (str.innerText.includes("-")) {
      str.style.color="red";
  }else{
    str.style.color="#25C10B";
  }
  
}