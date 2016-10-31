function createAlert(type, text) {
  var alert = '<div id="myAlert" class="alert ' + type + ' fade in" role="alert">' +
    text + '</div>';

  return $(alert);
}
