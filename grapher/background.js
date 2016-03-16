chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {
    innerBounds: {
      top: 50,
      left: 150,
      width: 1140,
      height: 720
    }
  });
})
