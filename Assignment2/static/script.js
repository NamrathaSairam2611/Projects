function clearInput() {
  document.getElementById("symbol").value = "";
  document.getElementById("tab-content").style.display = "none";
  document.getElementById("api-response-error").style.display = "none";
}

let previousInput = "";

function submitForm(event) {
  event.preventDefault();

  const currentInput = document.getElementById("symbol").value;

  if (previousInput.length === 0) {
    getTabData("company", event);
  } else if (previousInput !== currentInput) {
    getTabData("company", event);
  } else if (
    previousInput === currentInput &&
    document.getElementById("tab-content")?.style.display == "none"
  ) {
    getTabData("company", event);
  }
  previousInput = currentInput;
}

function getTabData(tabName, event) {
  event.preventDefault();

  let symbol = document.getElementById("symbol").value;

  if (symbol.trim() === "") {
    document.getElementById("empty-text-validation-alert").style.display =
      "block";
    document.getElementById(
      "empty-text-validation-alert"
    ).innerHTML = ` <div class="empty-text-validation-alert-content"> <span class="exclamation-mark" >&#33;</span
    <p style="font-family: 'Heebo', sans-serif;">Please fill out this field.</p>
    <div>`;
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `${tabName}_summary?symbol=${symbol}`, true);

  xhr.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded;charset=UTF-8"
  );

  xhr.send(symbol);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 && xhr.responseText !== "None") {
        let response = xhr.responseText;
        document.getElementById("tab-content").style.display = "block";
        document.getElementById("api-response-error").style.display = "none";
        if (tabName == "company") {
          showCompanyContent(JSON.parse(response));
        } else if (tabName === "stock") {
          showStockSummaryContent(JSON.parse(response));
        } else if (tabName === "charts") {
          showChartsContent(JSON.parse(response));
        } else if (tabName === "news") {
          showNewsContent(JSON.parse(response));
        }
      } else {
        document.getElementById("api-response-error").style.display = "block";
        document.getElementById("tab-content").style.display = "none";
      }
    }
  };

  return false;
}

function showHideTabStyles(tab) {
  var tabs = document.getElementsByClassName("tab-item");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  document.getElementById(`${tab}-tab`).classList.add("active");
}

function showCompanyContent(response) {
  showHideTabStyles("company");
  document.getElementById("company-table-content").style.display = "block";
  document.getElementById("stock-content").style.display = "none";
  document.getElementById("charts-content").style.display = "none";
  document.getElementById("news-content").style.display = "none";
  document.getElementById("stock-image").style.display = "block";
  document.getElementById("stock-image").src = response?.logo;
  document.getElementById("company-name").textContent = response.name;
  document.getElementById("ticker-symbol").textContent = response.symbol;
  document.getElementById("stock-exchange-code").textContent =
    response.exchange;
  document.getElementById("company-ipo-code").textContent = response.ipo;
  document.getElementById("category").textContent = response.category;
  // }
}
function showStockSummaryContent(response) {
  showHideTabStyles("stock");
  document.getElementById("company-table-content").style.display = "none";
  document.getElementById("stock-content").style.display = "block";
  document.getElementById("charts-content").style.display = "none";
  document.getElementById("news-content").style.display = "none";
  document.getElementsByClassName("stock-image")[0].style.display = "none";
  document.getElementById("trading_day").textContent = response.trading_day;
  if (response.change > 0) {
    document.getElementById(
      "change"
    ).innerHTML = `${response.change}   <img src="images/GreenArrowUp.png" class="green-arrow-image"/> `;
  } else if (response.change < 0) {
    document.getElementById(
      "change"
    ).innerHTML = `${response.change}   <img src="images/RedArrowDown.png" class="green-arrow-image"/> `;
  }

  if (response.change_percent > 0) {
    document.getElementById(
      "change_percent"
    ).innerHTML = `${response.change_percent}   <img src="images/GreenArrowUp.png" class="red-arrow-image"/> `;
  } else if (response.change_percent < 0) {
    document.getElementById(
      "change_percent"
    ).innerHTML = `${response.change_percent}   <img src="images/RedArrowDown.png" class="red-arrow-image"/> `;
  }

  document.getElementById("ticker-symbol-stock").textContent = response.symbol;
  document.getElementById("previous_closing_price").textContent =
    response.previous_closing_price;
  document.getElementById("opening_price").textContent = response.opening_price;
  document.getElementById("high_price").textContent = response.high_price;
  document.getElementById("low_price").textContent = response.low_price;
  document.getElementById("strong_sell").textContent = response.strong_sell;
  document.getElementById("sell").textContent = response.sell;
  document.getElementById("hold").textContent = response.hold;
  document.getElementById("buy").textContent = response.buy;
  document.getElementById("strong_buy").textContent = response.strong_buy;
}

function news_data(response) {
  return `<div class="news-container">
  <img src="${response.image}" class="news-image"/>
  <div class="news-text-container">
  <p class="news-headline">${response.headline} </p>
  <p class="news-date">${response.datetime} </p>
  <a class="news-url" href="${response.url}">See Original Post</a>
  
  </div>
  `;
}

function showNewsContent(response_list) {
  showHideTabStyles("news");
  document.getElementById("company-table-content").style.display = "none";
  document.getElementById("stock-content").style.display = "none";
  document.getElementById("charts-content").style.display = "none";
  document.getElementById("news-content").style.display = "block";
  document.getElementsByClassName("stock-image")[0].style.display = "none";

  document.getElementById("news-content").innerHTML = "";

  for (i = 0; i < Math.min(5, response_list.length); i++) {
    document.getElementById("news-content").innerHTML += news_data(
      response_list[i]
    );
  }
}

function showChartsContent(response) {
  showHideTabStyles("charts");
  document.getElementById("company-table-content").style.display = "none";
  document.getElementById("stock-content").style.display = "none";
  document.getElementById("charts-content").style.display = "block";
  document.getElementById("news-content").style.display = "none";
  document.getElementsByClassName("stock-image")[0].style.display = "none";

  var symbol = document.getElementById("symbol").value;
  var current_date = new Date()
    .toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  return (async () => {
    // Create the chart

    Highcharts.stockChart("charts-content", {
      chart: {
        height: "55%",

        events: {
          load: function () {
            const subtitleElement = this.subtitle.element;
            subtitleElement.addEventListener("click", function (event) {
              event.preventDefault();
              window.open("https://polygon.io/", "_blank");
            });
          },
        },
      },
      rangeSelector: {
        inputEnabled: false,
        buttons: [
          {
            type: "day",
            count: 7,
            text: "7d",
          },
          {
            type: "day",
            count: 15,
            text: "15d",
          },
          {
            type: "month",
            count: 1,
            text: "1m",
          },
          {
            type: "month",
            count: 3,
            text: "3m",
          },
          {
            type: "month",
            count: 6,
            text: "6m",
          },
        ],
        selected: 0,
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ["downloadPNG", "separator", "viewFullscreen"],
          },
        },
      },

      navigation: {
        buttonOptions: {
          align: "right",
          verticalAlign: "top",
          y: 10,
        },
      },

      title: {
        useHTML: true,
        text:
          '<p style="font-family: Noto Sans Nandinagari, sans-serif; font-size: 16px; font-weight: bold;">Stock Price ' +
          symbol.toUpperCase() +
          " " +
          current_date +
          "</p>",
      },
      subtitle: {
        text: '<a href="https://polygon.io/" target="_blank" style="text-decoration:underline; color: #8b71ab;">Source: Polygon.io</a>',
      },

      yAxis: [
        {
          labels: {
            align: "left",
            x: 3,
          },
          title: {
            useHtml: true,
            text: '<p style="font-family: Noto Sans Nandinagari, sans-serif;">Volume</p>',
          },

          height: "100%", // Adjusted height for stock price
          lineWidth: 2,
        },
        {
          labels: {
            align: "right",
            x: -3,
          },
          title: {
            useHtml: true,
            text: '<p style="font-family: Noto Sans Nandinagari, sans-serif;">Stock Price</p>',
          },

          height: "100%",
          offset: 0,
          lineWidth: 2,
          opposite: false,
        },
      ],

      tooltip: {
        split: true,
      },

      series: [
        {
          name: "Stock Price",
          data: response.stock_list,
          type: "area",
          threshold: null,
          tooltip: {
            valueDecimals: 2,
          },
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [
                1,
                Highcharts.color(Highcharts.getOptions().colors[0])
                  .setOpacity(0)
                  .get("rgba"),
              ],
            ],
          },
          yAxis: 0, // Reference the first yAxis for stock price
        },
        {
          type: "column",
          name: "Volume",
          data: response.volume_list,
          yAxis: 1, // Reference the second yAxis for volume
          pointWidth: 5,
          grouping: false,
          color: "#000000",
        },
      ],
    });
  })();
}
