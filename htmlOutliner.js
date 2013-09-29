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
			
			var html = "<a>text a</a><b id='x'>text b</b><c class='y'>text c</c><d id='z' class='w'><e>text e</e></d><g class='g h i'>hhh</g><yy>hellow</yy><yy id='secondyy'>world</yy>";
			var dom = parseHTML(html);
			
			var id = Tautologistics.NodeHtmlParser.DomUtils.getElementById("x", dom);
			outline.push({label: JSON.stringify(id, null, '\t'), line: 1});
			
			var classes = Tautologistics.NodeHtmlParser.DomUtils.getElements({ class: "y" }, dom);
			outline.push({label: JSON.stringify(classes, null, '\t'), line: 1});
			
			var multiclass = Tautologistics.NodeHtmlParser.DomUtils.getElements({ class: function (value) { return(value && value.indexOf("h") > -1); } }, dom);
			outline.push({label: JSON.stringify(multiclass, null, '\t'), line: 1});
					
			var name = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagName("a", dom);
			outline.push({label: JSON.stringify(name, null, '\t'), line: 1});
			
			var text = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagType("text", dom);
			outline.push({label: JSON.stringify(text, null, '\t'), line: 1});
			
			var nested = Tautologistics.NodeHtmlParser.DomUtils.getElements({ tag_name: "d", id: "z", class: "w" }, dom);
			nested = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagName("e", nested);
			outline.push({label: JSON.stringify(nested, null, '\t'), line: 1});
			
			nested = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagType("text", nested);
			outline.push({label: JSON.stringify(nested, null, '\t'), line: 1});
			
			
			var duplicates = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagName("yy", dom);
			outline.push({label: JSON.stringify(duplicates, null, '\t'), line: 1});
			
			var single = Tautologistics.NodeHtmlParser.DomUtils.getElements( { tag_name: "yy", id: "secondyy" }, dom);
			outline.push({label: JSON.stringify(single, null, '\t'), line: 1});

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
/*
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
 */