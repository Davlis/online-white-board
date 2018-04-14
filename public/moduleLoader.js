function moduleLoader(moduleName, containerId, callback) {
  var path = moduleName + '/' + moduleName;
  loadHTML(path + '.html', containerId);
  loadScript(path + '.js', callback);
  loadCSS(path + '.css');
}
