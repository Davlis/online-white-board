function moduleLoader(moduleName, containerId, callback) {
  loadHTML(moduleName + '/' + moduleName + '.html', containerId);
  loadScript(moduleName + '/' + moduleName + '.js', callback);
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

function loadHTML(url, id) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = () => {
    $id(id).innerHTML = req.responseText;
  };
}

function $id(id) {
  return document.getElementById(id);
}

