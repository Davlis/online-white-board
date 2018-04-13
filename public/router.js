var root = null;
var useHash = true;
var hash = '#!';
var router = new Navigo(root, useHash, hash);

router.on({
  'custom': () => { loadHTML('./custom/custom.html', 'view'); },
  'board': () => { loadHTML('./board/board.html', 'view'); loadScript('./board/board.js'); },
  'menu': () => { loadHTML('./menu/menu.html', 'view'); }
});

router.on(() => { loadHTML('./menu/menu.html', 'view'); });
router.notFound((query) => { console.log('Route not found, moving to menu'); loadHTML('./menu/menu.html', 'view');});
router.resolve();

function navigate(url) {
  router.navigate(url);
}

function $id(id) {
  return document.getElementById(id);
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