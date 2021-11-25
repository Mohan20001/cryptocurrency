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


drawGraph();
        

    });
}

function coinIfo(coin_name) {
    document.getElementById('btc').innerText=coin_name;
}

function strFormate(str) {
    return (parseFloat(str)).toLocaleString(undefined, {minimumFractionDigits: 1});
}


     function drawGraph(sparkLineData) {
       

// presantation of sparkline data/////////////////////////////////////////////////
am5.ready(function() {
    
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  
  // Generate random data
  var value = 100;
  
  function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 1000);
    firstDate.setHours(0, 0, 0, 0);
  
    for (var i = 0; i < 50; i++) {
      var newDate = new Date(firstDate);
      newDate.setSeconds(newDate.getSeconds() + i);
  
      value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10;
  
      chartData.push({
        date: newDate.getTime(),
        value: value
      });
    }
    console.log(chartData[0]);
    return chartData;
  }
  
  var data = generateChartData();
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  }));
  
  var easing = am5.ease.linear;
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0.5,
    groupData: false,
    extraMax:0.1, // this adds some space in front
    extraMin:-0.1,  // this removes some space form th beginning so that the line would not be cut off
    baseInterval: {
      timeUnit: "second",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })
  }));
  
  // tell that the last data item must create bullet
  data[data.length - 1].bullet = true;
  series.data.setAll(data);
  
  
  // Create animating bullet by adding two circles in a bullet container and
  // animating radius and opacity of one of them.
  series.bullets.push(function(root, series, dataItem) {  
    // only create sprite if bullet == true in data context
    if (dataItem.dataContext.bullet) {    
      var container = am5.Container.new(root, {});
      var circle0 = container.children.push(am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xff0000)
      }));
      var circle1 = container.children.push(am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xff0000)
      }));
  
      circle1.animate({
        key: "radius",
        to: 20,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity
      });
      circle1.animate({
        key: "opacity",
        to: 0,
        from: 1,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity
      });
  
      return am5.Bullet.new(root, {
        locationX:undefined,
        sprite: container
      })
    }
  })
  
  
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    xAxis: xAxis
  }));
  cursor.lineY.set("visible", false);
  
  
  // Update data every second
  setInterval(function () {
    addData();
  }, 5000)
  
  
  function addData() {
    var lastDataItem = series.dataItems[series.dataItems.length - 1];
  
    var lastValue = lastDataItem.get("valueY");
    var newValue = value + ((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
    var lastDate = new Date(lastDataItem.get("valueX"));
    var time = am5.time.add(new Date(lastDate), "second", 1).getTime();
    series.data.removeIndex(0);
    series.data.push({
      date: time,
      value: newValue
    })
  
    var newDataItem = series.dataItems[series.dataItems.length - 1];
    newDataItem.animate({
      key: "valueYWorking",
      to: newValue,
      from: lastValue,
      duration: 600,
      easing: easing
    });
  
    // use the bullet of last data item so that a new sprite is not created
    newDataItem.bullets = [];
    newDataItem.bullets[0] = lastDataItem.bullets[0];
    newDataItem.bullets[0].get("sprite").dataItem = newDataItem;
    // reset bullets
    lastDataItem.dataContext.bullet = false;
    lastDataItem.bullets = [];
  
  
    var animation = newDataItem.animate({
      key: "locationX",
      to: 0.5,
      from: -0.5,
      duration: 600
    });
    if (animation) {
      var tooltip = xAxis.get("tooltip");
      if (tooltip && !tooltip.isHidden()) {
        animation.events.on("stopped", function () {
          xAxis.updateTooltip();
        })
      }
    }
  }
  
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
  
  }); // end am5.ready()

}
