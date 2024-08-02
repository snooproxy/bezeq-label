function getParameterByName(key) {
  key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + key + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setParameterByName(key, value) {
  baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
  urlQueryString = document.location.search;
  var newParam = key + '=' + encodeURIComponent(value),
  params = '?' + newParam;

  // If the "search" string exists, then build params from it
  if (urlQueryString) {
    keyRegex = new RegExp('([\?&])' + key + '[^&]*');
    // If param exists already, update it
    if (urlQueryString.match(keyRegex) !== null) {
      params = urlQueryString.replace(keyRegex, "$1" + newParam);
    } else { // Otherwise, add it to end of query string
      params = urlQueryString + '&' + newParam;
    }
  }
  window.history.replaceState({}, "", baseUrl + params);
}

// define the dial
var dial = d3.select(".dial")
    .attr("width", "38mm")
    .attr("height", "38mm");

// define the dial color
dial.append("rect")
    .attr("x","0mm")
    .attr("y","0mm")
    .attr("width","38mm")
    .attr("height","38mm")
    .attr("fill","#0020c4");

// define the actual circle for making the boundary visible and cutting easier
dial.append("circle")
    .attr("cx", "19mm")
    .attr("cy", "19mm")
    .attr("r", "19mm")
    .attr("stroke", "#ccc")
    .attr("stroke-width", "0.1mm")
    .attr("fill", "none");

// add the bezeq logo svg that i have modified
dial.append("svg:image")
    .attr("x", "-86mm")
    .attr("y", "3mm")
    .attr("width", "175mm")
    .attr("height", "15mm")
    .attr("xlink:href", "images/Bezeq_first_logo-svg-modified.svg")

// add the white box for the phone number
dial.append("rect")
    .attr("x", "4mm")
    .attr("y", "22mm")
    .attr("width", "30mm")
    .attr("height", "6mm")
    .attr("fill", "#fff")

// add area number
dial.append("text")
    .attr("class", "exch")
    .attr("x", "7.5mm")
    .attr("y", "26.5mm")
    .text(getParameterByName("e"));

// add phone number
dial.append("text")
    .attr("class", "num")
    .attr("x", "22mm")
    .attr("y", "26.5mm")
    .text(`${getParameterByName("n")}--`);

function updateExchange() {
  var exchange = document.getElementById("exchange").value + "-";
  dial.select(".exch").text(exchange);
  setParameterByName("e", exchange);
}

function updateNumber() {
  var exchange = document.getElementById("number").value;
  dial.select(".num").text(exchange);
  setParameterByName("n", exchange);
}

// document.getElementById("exchange").value = getParameterByName("e");
// document.getElementById("number").value = getParameterByName("n");
