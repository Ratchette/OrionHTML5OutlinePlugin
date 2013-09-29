window.onload = function(){
	var headers = {
		name: "HTML5 Outliner Plugin",
		version: "0.1",
		desrciption: "Provides an outline for an HTML document"
	};
	
	var serviceImpl = {
		getOutline: function(contents, title){
			
			var outline = [];
		    var lines = contents.split(/\r?\n/);
			    
		    for (var i=0; i < lines.length; i++) {
		      var line = lines[i];
		      var match = /\s<\s*(.+?)\s*>/.exec(line);
		      if (match) {
				outline.push({
		           label: match[1],
		           line: i+1  // lines are numbered from 1
		        });
		      }
		    }
		    return outline;

			/* enter code for the outline here*/
		}
	};
	
	var serviceProperties = {
		contentType: ["text/html"],
		name: "HTML5 Outline",
		id: "orion.outliner.html5.outliner"
	};
	
	var provider = new eclipse.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.outliner", serviceImpl, serviceProperties);
	provider.connect();
};



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
      if (node == root) {
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