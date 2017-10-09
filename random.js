randomFont = function (element) {
  var apiKey = 'YOUR-API-KEY-HERE';
  var init = function () {

    var request = new XMLHttpRequest();
    request.open('GET', ' https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        var font = data.items[random(data.items.length)];
        WebFont.load({
          google: {
            families: [font.family + ':' + font.variants[random(font.variants.length)]]
          }
        });
        document.querySelector(element).style.fontFamily = font.family;
      } else {
        console.log('Error getting list.', JSON.parse(request.responseText));
      }
    };
    request.send();
	};
  // give me a random number
  var random = function(to) {
    return Math.floor(Math.random() * to);
  };

  // we have lift off
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('onload', init(), false);
  }
};
