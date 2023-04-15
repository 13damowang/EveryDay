(function() {

  var doingToggleReloader = false;
  var doingDelayReloader = false;

  var _toggleReloader = function() {
    if (!doingDelayReloader) {
      doingToggleReloader = true;
      chrome.runtime.sendMessage(null, {
        'action': 'toggleReloader'
      }, function(response) {
        if (response.success) {
          doingToggleReloader = false;
        }
      });
    }
  };

  var _delayReloader = function() {
    if (!doingToggleReloader) {
      doingDelayReloader = true;
      chrome.runtime.sendMessage(null, {
        'action': 'delayReloader'
      }, function(response) {
        if (response.success) {
          doingDelayReloader = false;
        }
      });
    }
  };

  window.addEventListener('keydown', function(event) {
    var ctrl = event.ctrlKey;
    var alt = event.altKey;
    var meta = event.metaKey;
    var shift = event.shiftKey;
    if (!shift && event.modifiers) {
      shift = !!(event.modifiers & 4);
    }
    // HotKey = Ctrl+Alt+R or Ctrl+Alt+F5
    if ((ctrl || meta) && alt && (event.keyCode === 82 || event.keyCode === 116)) {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      _toggleReloader();
    }
  });
  window.addEventListener('keyup', _delayReloader);
  window.addEventListener('mouseup', _delayReloader);

})();
