(function() {

  var reloaders = {};

  /**
   * On runtime message listener.
   */
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.action) {

      case 'getOptions':
        chrome.storage.local.get(['ms_between_reloads', 'is_random'], function(result) {
          if (result.ms_between_reloads == undefined) {
            result = _parseLegacyOptionsFromLocalStorage();
          }
          sendResponse(result);
        });
        return true;

      case 'setOptions':
        chrome.storage.local.set({
          'ms_between_reloads': (message.data.ms_between_reloads || 0),
          'is_random': (message.data.is_random || false),
        }, function() {
          sendResponse({
            'success': true
          });
        });
        return true;

      case 'getReloader':
        _getActiveTabId(function(tabId) {
          if (reloaders[tabId] instanceof Object) {
            sendResponse({
              ms_between_reloads: reloaders[tabId].ms_between_reloads,
              is_random: reloaders[tabId].is_random
            });
          } else {
            sendResponse({
              ms_between_reloads: 0,
              is_random: false
            });
          }
        });
        return true;

      case 'setReloader':
        message.data = message.data || {};
        _getActiveTabId(function(tabId) {
          _setReloader(tabId, (message.data.ms_between_reloads || 0), (message.data.is_random || false));
          sendResponse({
            'success': true
          });
        });
        return true;

      case 'toggleReloader':
        _getActiveTabId(function(tabId) {
          if (reloaders[tabId] instanceof Object && reloaders[tabId].ms_between_reloads > 0) {
            // If there is already a reloader setup for this tab, cancel it.
            _setReloader(tabId, 0, false);
            sendResponse({
              'success': true
            });
          } else {
            // Else setup a new reloader with default options.
            chrome.storage.local.get(['ms_between_reloads', 'is_random'], function(result) {
              _setReloader(tabId, (result.ms_between_reloads || 0), (result.is_random || false));
              sendResponse({
                'success': true
              });
            });
          }
        });
        return true;

      case 'delayReloader':
        _getActiveTabId(function(tabId) {
          _delayReloader(tabId);
          sendResponse({
            'success': true
          });
        });
        return true;
    }
  });

  /**
   * On tab updated listener.
   */
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (reloaders[tabId] instanceof Object && reloaders[tabId].ms_between_reloads > 0) {
      switch (changeInfo.status) {

        case 'loading':
          if (changeInfo.url) {
            // URL has changed - presumably by navigation, cancel any reloader set.
            _setReloader(tabId, 0, false);
          } else {
            // Clear any reload timer (in case the user manually reloaded the page).
            _clearReloadTimer(tabId);
          }
          break;

        case 'complete':
          // Reset all timers after reload completed.
          _setReloader(tabId, reloaders[tabId].ms_between_reloads, reloaders[tabId].is_random);
          break;
      }
    }
  });

  /**
   * On tab removed listener.
   */
  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    if (reloaders[tabId] instanceof Object) {
      // Clear any existing reload timer before setting new one.
      _clearReloadTimer(tabId);
      // Clear any existing auto badge refresh before setting new one.
      _clearBadgeTimer(tabId);
      // Delete reloader entry for tab.
      delete reloaders[tabId];
    }
  });

  /**
   * Parse legacy options from version<1.2, which are stored in localStorage object.
   *
   * Stored items include:
   *  (String) localStorage["ms_between_load"]
   *    - number of milliseconds as string value
   *  (String) localStorage["is_random"]
   *    - one of ["true", "false"]
   */
  function _parseLegacyOptionsFromLocalStorage() {
    return {
      ms_between_reloads: parseInt(localStorage.ms_between_load || 0),
      is_random: (localStorage.is_random == 'true'),
    };
  }

  /**
   * Delay next reload for tab.
   */
  function _setReloader(tabId, msTime, isRandom) {
    msTime = msTime || 0;
    isRandom = isRandom || false;
    if (isRandom) {
      msTime = Math.max(5, Math.ceil(Math.random() * 1800)) * 1000;
    }

    if (reloaders[tabId] instanceof Object) {
      // Clear any existing reload timer before setting new one.
      _clearReloadTimer(tabId);
      // Clear any existing auto badge refresh before setting new one.
      _clearBadgeTimer(tabId);
    }

    // Declare new reloader.
    reloaders[tabId] = {
      ms_between_reloads: msTime,
      is_random: isRandom,
      ms_to_next_reload: msTime,
      reloadTimer: null,
      badgeTimer: null,
    };

    if (msTime > 0) {

      // Setup tab reload timer.
      reloaders[tabId].reloadTimer = setTimeout(function(_i) {
        chrome.tabs.reload(_i);
      }, reloaders[tabId].ms_to_next_reload, tabId);

      // Setup auto badge refresh.
      reloaders[tabId].badgeTimer = setInterval(function(_i) {
        reloaders[_i].ms_to_next_reload -= 1000;
        _refreshBadgeText(_i);
      }, 1000, tabId);
    }

    // Refresh badge now.
    _refreshBadgeText(tabId);
  }

  /**
   * Delay next reload for tab.
   */
  function _delayReloader(tabId) {
    if (reloaders[tabId] instanceof Object && reloaders[tabId].ms_between_reloads > 0) {

      // Calculate new timeout to next reload.
      reloaders[tabId].ms_to_next_reload = Math.max(reloaders[tabId].ms_to_next_reload, Math.min(60 * 1000, reloaders[tabId].ms_between_reloads));

      // Clear any existing reload timer before setting new one.
      _clearReloadTimer(tabId);

      // Setup tab reload timer.
      reloaders[tabId].reloadTimer = window.setTimeout(function(_i) {
        chrome.tabs.reload(_i);
      }, reloaders[tabId].ms_to_next_reload, tabId);

      // Refresh badge now.
      _refreshBadgeText(tabId);
    }
  }

  /**
   * Clear any existing reload timer for tab.
   */
  function _clearReloadTimer(tabId) {
    if (reloaders[tabId] instanceof Object && reloaders[tabId].reloadTimer) {
      clearTimeout(reloaders[tabId].reloadTimer);
      reloaders[tabId].reloadTimer = null;
    }
  }

  /**
   * Clear any existing auto badge refresh for tab.
   */
  function _clearBadgeTimer(tabId) {
    if (reloaders[tabId] instanceof Object && reloaders[tabId].badgeTimer) {
      clearInterval(reloaders[tabId].badgeTimer);
      reloaders[tabId].badgeTimer = null;
    }
  }

  /**
   * Get tab ID of active tab.
   */
  function _getActiveTabId(callback) {
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function(tabs) {
      callback((tabs[0] && tabs[0].id) || undefined);
    });
  }

  /**
   * Refresh badge text for tab.
   */
  function _refreshBadgeText(tabId) {
    var badgeText = '';
    if (reloaders[tabId] instanceof Object && reloaders[tabId].ms_to_next_reload > 0) {

      // Calculate timing.
      var seconds_to_next_reload = Math.floor(reloaders[tabId].ms_to_next_reload / 1000);
      var secs = seconds_to_next_reload % 60;
      var mins = Math.floor((seconds_to_next_reload / 60) % 60);
      var hours = Math.floor((seconds_to_next_reload / (60 * 60)) % 24);
      var days = Math.floor(seconds_to_next_reload / (60 * 60 * 24));

      // Format display text.
      // The banner fits about 4.5 characters (depending on the character's width)
      if (days > 999) {
        badgeText = '∞'; // it will take long...
      } else if (days > 0) {
        badgeText = String(days) + 'd';
      } else if (hours > 0) {
        badgeText = String(hours) + 'h';
      } else if (mins > 9) {
        badgeText = String(mins) + 'm';
      } else {
        if (secs < 10) {
          secs = '0' + String(secs);
        }
        badgeText = String(mins) + ':' + String(secs);
      }
    }

    // Do update.
    chrome.browserAction.setBadgeText({
      text: badgeText,
      tabId: tabId
    });
  }

})();
