jQuery(function($) {

  var option_custom_delay_save;

  /**
   * Do save options to storage.
   */
  function _saveOptions(option, sTime) {
    var msTime = Math.max(0, parseInt(sTime)) * 1000;
    chrome.runtime.sendMessage(null, {
      action: 'setOptions',
      data: {
        ms_between_reloads: msTime,
        is_random: (option == 'random')
      }
    }, function(response) {
      if (response.success) {
        $('.status-success').removeClass('fade-out');
        $('#option-' + option + ' .status-success')
          .addClass('fade-out');
      }
    });
  }

  $('input[name=option-custom]')
    .on('focus', function(event) {
      $(this).select();
    })
    .on('blur', function(event) {
      $(this).trigger('submit');
    })
    .on('keypress', function(event) {
      if (event.which == 13) { // ENTER key pressed
        $(this).trigger('submit');
      }
    })
    .on('submit', function(event) {
      var value = $(this).val();
      if ($.isNumeric(value)) {
        value = Math.ceil(value);
        if (
          value >= parseInt($(this).attr('min')) &&
          value <= parseInt($(this).attr('max'))
        ) {
          $(this).val(value);
          option_custom_delay_save = setTimeout(function(_v) {
            $('#option-custom input[name=option]').prop('checked', true);
            _saveOptions('custom', _v);
          }, 100, value);
        }
      }
    });

  $('input[name=option]')
    .on('click', function(event) {
      var value = $(this).val();
      if (value == 'custom') {
        $('input[name=option-custom]').focus();
        event.preventDefault();
      } else {
        $('input[name=option-custom]').val('');
        clearTimeout(option_custom_delay_save);
        if (value == 'random') {
          _saveOptions('random', 1);
        } else {
          _saveOptions(value, value);
        }
      }
    });

  $('.status-success')
    .on('animationend', function(event) {
      $(this).removeClass('fade-out');
    });

  /**
   * Restore options on page load.
   */
  chrome.runtime.sendMessage(null, {
    'action': 'getOptions'
  }, function(response) {
    var sTime = Math.round(response.ms_between_reloads / 1000);
    var option = (response.is_random ? 'random' : sTime);
    var $option = $('#option-' + option);
    if (!$option.length) {
      $option = $('#option-custom');
      $('input[name=option-custom]', $option).val(sTime);
    }
    $('input[name=option]', $option).prop('checked', true);
  });

});
