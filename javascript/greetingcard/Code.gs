
function doGet(e){
  var params = e.parameter;
  var html = HtmlService.createTemplateFromFile('greetingcard');
  html.params = params;
  return html.evaluate();
}
