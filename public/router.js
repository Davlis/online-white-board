var root = null;
var useHash = true;
var hash = '#!';
var router = new Navigo(root, useHash, hash);

router.on({
  'custom': () => { moduleLoader('custom', 'view'); },
  'board': () => { moduleLoader('board', 'view'); },
  'menu': () => { moduleLoader('menu', 'view'); }
});
router.on(() => { moduleLoader('menu', 'view'); });
router.notFound((query) => { 
  console.log('Route not found, moving to menu'); 
  moduleLoader('menu', 'view'); 
});
router.resolve();

function navigate(url) {
  router.navigate(url);
}
