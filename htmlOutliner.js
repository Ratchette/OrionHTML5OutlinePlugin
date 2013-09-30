window.onload = function(){
	function parseHTML(contents){
		var handler = new Tautologistics.NodeHtmlParser.HtmlBuilder(
			function (error, dom){
				if(error)
					return null;
			},	
			{includeLocation: true, ignoreWhitespace: true}
		);
			
		var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
		parser.parseComplete(contents);
		return handler.dom;
	}

	var headers = {
		name: "HTML5 Outliner Plugin",
		version: "0.1",
		desrciption: "Produces an HTML5 outline for a document"
	};
	var serviceProperties = {
		contentType: ["text/html"],
		name: "HTML5 Outline",
		id: "orion.outliner.html5.outliner"
	};
	
	var serviceImpl = {
		getOutline: function(contents, title){
			var outline = [];
			var dom = parseHTML(document.getElementsByTagName('html')[0].innerHTML);
					
			// the algorithm stuff
					
			var outlineTarget = null;
			var section = null;
			var stack = [];	
			
			var root = null;
		
			dom.forEach(function(child){
				if(child.name === "body"){
					root = child;
				}
			});
			
			if(root === null){
				root = dom;
			}
					
			return outline;
		}
	};
	
	var provider = new eclipse.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.outliner", serviceImpl, serviceProperties);
	provider.connect();
};


// the algorithm that I should be following
/*
function (root, enter, exit) {
  var node = root;
  
  start: while (node) {
    enter(node);
    
    if (node.firstChild) {
      node = node.firstChild;
      continue start;
    }
    
    while (node) {
      exit(node);
      if (node === root) {
        node = null;
      } else if (node.nextSibling) {
        node = node.nextSibling;
        continue start;
      } else {
        node = node.parentNode;
      }
    }
  }
}

*/