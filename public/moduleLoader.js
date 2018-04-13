function moduleLoader(moduleName, containerId, callback) {
  var path = moduleName + '/' + moduleName;
  loadHTML(path + '.html', containerId);
  loadScript(path + '.js', callback);
  loadCSS(path + '.css');
}

function loadScript(url, callback) {
  var head = document.getElementsByTagName("head")[0],
    script = document.createElement("script"),
    done = false;

  script.src = url;
  script.onload = script.onreadystatechange = function () {
    if (!done && (!this.readyState ||
      this.readyState == "loaded" || this.readyState == "complete")) {
      done = true;
      callback && callback();

      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
    }
  };
  head.appendChild(script);
}

function get(url, callback) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = () => callback(req);
}

function loadHTML(url, id) {
  get(url, (req) => $id(id).innerHTML = req.responseText)
}

function loadCSS(url) {
  get(url, (req) => {
    var style = document.createElement('style');
    style.innerHTML = req.responseText;
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style, ref);
  })
}

function $id(id) {
  return document.getElementById(id);
}

