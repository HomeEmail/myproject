// Listen for ALL links at the top level of the document. For
// testing purposes, we're not going to worry about LOCAL vs.
// EXTERNAL links - we'll just demonstrate the feature.
$(document).observe('click', function(event) {
	
	 	
  var element = Event.element(event);
	//alert(element.tagName + " really 2");
	
	
	var sTarget = element.readAttribute('target');
	if(sTarget == "_new") return;
	
  if ('AREA' == element.tagName) {
  	event.preventDefault();
  	if(!!element.readAttribute('href')){location.href = (element.readAttribute('href'));}
  }
  
  if ('A' == element.tagName) {
		event.preventDefault();
		location.href = (element.readAttribute('href'));
  }
  
  if ('panel' == element.getAttribute("type")){
		event.preventDefault();
	  location.href = (element.readAttribute('href'));
  }
});