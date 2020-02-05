//Weather Widget
window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 23,cityid: '2988507',appid: '70267adf048c3af84eefa635e0ba930f',units: 'metric',containerid: 'openweathermap-widget-23',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();

//Chart Line
window.onload = function () {
    
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Votre activité "
        },
        axisY:{
            includeZero: false,
            title: "Nombre de connexions",
		suffix: ""
        },
        data: [{        
            type: "line",       
            dataPoints: [
                {label: "Janvier", y: 110 },
                {label: "Fevrier", y: 134},
                {label: "Mars", y: 150 },
                {label: "Avril", y: 140 },
                {label: "Mai", y: 125, indexLabel: "Min",markerColor: "red", markerType: "cross" },
                {label: "Juin", y: 130 },
                {label: "Juillet", y: 155 },
                {label: "Aout", y: 160 },
                {label: "Septembre", y: 165 , indexLabel: "Max",markerColor: "DarkSlateGrey", markerType: "triangle" },
                {label: "Octobre", y: 150 },
                {label: "Novembre", y: 153 },
                {label: "Decembre", y:  150}
            ]
        }]
    });
    chart.render();
    
}

