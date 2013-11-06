/*******************************************************************************
 * @license
 * Copyright (c) 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *	   Jennifer Winer - Extension to HTML5 Outlining
 *******************************************************************************/

/*global window Tautologistics orion self */

//This is a copy of the HTML outline plugin coded as a web worker plugin

window.onload = function(){
	function parseDOM(contents) {
		var domResult;
		var handler;
		var options;
		
		options = {
			includeLocation:  true,
			ignoreWhitespace: true
		};
		
		handler = new Tautologistics.NodeHtmlParser.HtmlBuilder(
			function(error, dom) {
				if (error) {
					return null;
				}
			},
			
			options
		);

		var parser = new Tautologistics.NodeHtmlParser.Parser(handler, options);
		parser.parseComplete(contents);
		return  handler.dom;
	}
	
	function isHeading(node){
		var match;
		
		match = /^h[1-6]$/.exec(node.name);
		
		if(match)
			return true;
			
		else
			return false;
	}
	
	function isSectioningContent(node){
		if(node.name === "article" || node.name === "aside"
			|| node.name === "nav" || node.name === "section")
			return true;
			
		else
			return false;
	}
	
	function isSectioningRoot(node){
		if(node.name === "blockquote" || node.name === "body"
			|| node.name === "details" || node.name === "dialog"
			|| node.name === "fieldset" || node.name === "figure"
			|| node.name === "td")
			return true;
			
		else
			return false;
	}
	
	function enter(node){
		
	}
	
	function exit(node){
			/**
			 * When exiting an element, if that element is the element at the top of the stack
			 * (AKA - The element being exited is a heading content element or an element with a hidden attribute.)
			 * Pop that element from the stack.
			 */
	}

	// NOTE: The DOM already ignores all hidden nodes, omitting them from the final outline
	function preOrderTraversal(root, enter, exit) {
		var stack = [];
		var node;
		
		node = root;
		
		start: while (node) {
//			enter(node);
		/**
		 * If the top of the stack is a heading content element or an element with a hidden attribute
		 * 		Do nothing.
		 * 
		 * if(stack.length > 0 ){
		 	if(isHeading(stack[stack.length - 1]) || isHidden(stack[stack.length - 1])){
		 		// DO NOTHING???
		 	}
		 }
		 */
		
		/**
		 * When entering an element with a hidden attribute
		 * Push the element being entered onto the stack. (This causes the algorithm to skip that element and any descendants of the element.)
		 * 
		 * if(isHidden(node))
		  		stack.push(node);
		 */
		
		/**
		 * When entering a sectioning content element or a sectioning root element
		 * 
		 * If current outline target is not null, and the current section has no heading, 
		 * 		create an implied heading and let that be the heading for the current section.
		 * 
		 * If current outline target is not null, push current outline target onto the stack.
		 * 
		 * Let current outline target be the element that is being entered.
		 * 
		 * Let current section be a newly created section for the current outline target element.
		 * 
		 * Associate current outline target with current section.
		 * 
		 * Let there be a new outline for the new current outline target, initialized with 
		 * 		just the new current section as the only section in the outline.
		 * 
		 * 
		 	if(isSectioningContent(node) || isSectioningRoot(node)){
		 		if(root !== null && root.current_section.heading === null)
		 			root.current_section.heading = new ImpliedHeading();
		 			
	 			if(root !== null)
	 				stack.push(root)
	 				
 				root = node;
 				root.current_section = new Section();
 				
 				root.outline = new Outline();
 				root.outline.add(root.current_section);
		 	}
		 */
		
		/**
		 * When entering a heading content element *** INCOMPLETE *** 
		 * 
		 * If the current section has no heading, let the element being entered be the heading for the current section.
		 * 
		 * Otherwise, if the element being entered has a rank equal to or higher than the heading of the last section of the outline of the current outline target,
		 * 		or if the heading of the last section of the outline of the
		 * 		current outline target is an implied heading, then create a new section and append it to the outline of the
		 * 		current outline target element, so that this new section is the new last section of that outline. Let
		 * 		current section be that new section. Let the element being entered be the new heading for the current section.
		 * 
		 * Otherwise, run these substeps:
		 * 		Let candidate section be current section.
		 * 
		 * 		Heading loop: If the element being entered has a rank lower than the rank of the heading 
		 * 			of the candidate section, then create a new section, and append it to candidate section. 
		 * 			(This does not change which section is the last section in the outline.) Let current section be this
		 * 			new section. Let the element being entered be the new heading for the current section. Abort these substeps.
		 * 
		 * 		
		 * 
		 * 		Let candidate section be new candidate section.
		 * 
		 * 		Return to the step labeled heading loop.
		 * 
		 * 		Push the element being entered onto the stack. (This causes the algorithm to skip any descendants of the element.)
		 * 
		 * 		[Recall that h1 has the highest rank, and h6 has the lowest rank.]
		 * 
		 * 
		 * if(isHeading(node)){
		 	if(current secion had NO HEADING)
		 		// heading for this section = node
		 	else if((headingRank(node) >= headingRank(root.outline.last_section) || (root.outline.last_section === implied heading){
		 		root.outline.add(new Section)
		 		current_section = root.outline[root.outline.length - 1];
		 		current_section.setHeading(node);
		 	}
		 	else{
		 		candidate_section = current_section;
		 		// HEADING LOOP
		 		if(headingRank(node) < headingRank(candidate_selection)){
		 			candidate_section.add(new Section)
		 			current_section = candidate_selection[candidate_selection.length - 1];
		 			current_section.heading = node;
		 			//break out of else!
		 		}
		 		
		 		//Let new candidate section be the section that contains candidate section in the outline of current outline target.
		 		
		 		return to // HEADING LOOP
		 	}
		 	
		 	stack.push(node);
		 }
		 */
		

			if (node.firstChild) {
				node = node.firstChild;
				continue start;
			}
			while (node) {
//				exit(node);
			
			/**
			 * When exiting an element, if that element is the element at the top of the stack
			 * (AKA - The element being exited is a heading content element or an element with a hidden attribute.)
			 * Pop that element from the stack.
			 * 
			 * if(stack[stack.length -1] === node)
					stack.pop();
					
					OR
					
				if(isHeading(stack[stack.length - 1]) || isHidden(stack[stack.length - 1]))
					stack.pop();
			 */
			
			/**
			 * When exiting a sectioning content element, if the stack is not empty
			 * If the current section has no heading, create an implied heading and let that be the heading for the current section.
			 * 
			 * Pop the top element from the stack, and let the current outline target be that element.
			 * 
			 * Let current section be the last section in the outline of the current outline target element.
			 * 
			 * Append the outline of the sectioning content element being exited to the current section. 
			 * (This does not change which section is the last section in the outline.)
			 * 
			 * if(isSectioningContent(node) && stack.length > 0){
			 	if(root.current_section.heading === null){
			 		root.current_section.heading = new Implied Heading();
			 	}
			 	
			 	root = stack.pop();
			 	root.current_section = root.outline[root.outline.length];
			 	
			 	root.current_section.add(node.outline)
			 }
			 */
			
			/**
			 * When exiting a sectioning root element, if the stack is not empty Run these steps:
			 * 
			 * If the current section has no heading, create an implied heading and let that be the heading for the current section.
			 * 
			 * Pop the top element from the stack, and let the current outline target be that element.
			 * 
			 * Let current section be the last section in the outline of the current outline target element.
			 * 
			 * Finding the deepest child: If current section has no child sections, stop these steps.
			 * 
			 * Let current section be the last child section of the current current section.
			 * 
			 * Go back to the substep labeled finding the deepest child.
			 * 
			 * 
			 * if(isSectioningRoot(node) && stack.length > 0){
			 	if(root.current_section.heading === null){
			 		root.current_section.heading = new Implied Heading();
			 	}
			 	
		 		root = stack.pop();
		 		root.current_section = root.outline[root.outline.length];
		 		
		 		getDeepestChild: 
				root.current_section = getLastChildSection(root.current_section); // make sure that you get the last child section	
		 		
		 		// find the deepest child (if it has no children skip all next steps)
		 		// Let current section be the last child section of the current current section.
		 		//Go back to the substep labeled finding the deepest child.
			 }
			 */
			
			/**
			 * When exiting a sectioning content element or a sectioning root element
			 * The current outline target is the element being exited, and it is the sectioning content element 
			 * 		or a sectioning root element at the root of the subtree for which an outline is being generated.
			 * 
			 * If the current section has no heading, create an implied heading and let that be the heading for the current section.
			 * 
			 * Skip to the next step in the overall set of steps. (The walk is over.)
			 * 
			 * if(isSectioningContent(node) || isSectioningRoot(node)){
			 	root = node;
			 	
			 	if(current section had NO HEADING)
			 		// create implied heading + let it be the heading for the current section
			 		
		 		return root;
			 }
			 */
				
				//In addition, whenever the walk exits a node, after doing the steps above, if the node is not associated with a section yet, associate the node with the section current section.


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
	
	function buildOutline(contents) {
		var dom;
		var root;
		var outline;
		
		dom = parseDOM(contents);
		if(!dom)
			return null;
		
		// get sectioning content element or sectioning root element that you want to generate an outline for
		// FIXME change so that it can start at any sectioning root!!!
		
		root = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagName("body", dom);
		if(root.length === 0)
			return null;
			
		outline = preOrderTraversal(root);
		
		/**
		 * SEE: http://www.w3.org/html/wg/drafts/html/master/sections.html#outlines
		 */

		// get outline
		return [{label: JSON.stringify(root), line: 1}];
	}
	
	
	
	var outlineService = {
		/**
		 * Orion 4.0 compliant
		 */
		computeOutline: function(editorContext, options){
			return editorContext.getText().then(buildOutline);
		},
		
		/**
		 * Orion 3.0 compliant
		 */
		getOutline: function(contents, title) {
			return buildOutline(contents);
		}
	};
	
	
	var headers = {
		name: "HTML5 Semantic Outliner",
		version: "0.2.0",
		description: "Produces an HTML5 outline"
	};
	
	var serviceProperties = {
		name: "HTML5 Semantic Outline",
		id: "orion.edit.outliner.html5.semantic",
		contentType: ["text/html"]
	};
	
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.outliner", outlineService, serviceProperties);
	provider.connect();
};



//	/**
//	 * Returns whether this HTML node should be omitted from the outline.
//	 * @param {Object} node The HTML element
//	 * @param {Boolean} filter if true the tree should be filtered to only show most relevant entries
//	 * @return {boolean} true if the element should be skipped, and false otherwise
//	 */
//	function skip(node, filter) {
//		//skip nodes with no name
//		if (!node.name) {
//			return true;
//		}
//	
//		//if user wants a full tree, do no further filtering
//		if (!filter) {
//			return false;
//		}
//		//skip formatting elements
//		if (node.name === "b" || node.name === "i" || node.name === "em") {
//			return true;
//		}
//	
//		//skip paragraphs and other blocks of formatted text
//		if (node.name === "p" || node.name === "tt" || node.name === "code" || node.name === "blockquote") {
//			return true;
//		}
//	
//		//skip anchors
//		if (node.name === "a") {
//			return true;
//		}
//	
//		//include the element if we have no reason to skip it
//		return false;
//	}
//	
//	/**
//	 * Converts an HTML dom element into a label
//	 * @param {Object} element The HTML element
//	 * @return {String} A human readable label
//	 */
//	
//	function domToLabel(node) {
//		var label = node.name;
//		//include id if present
//		var match = /id=['"]\S*["']/.exec(node.raw);
//		if (match) {
//			label = label + " " + match[0];
//		}
//		//include class if present
//		match = /class=['"]\S*["']/.exec(node.raw);
//		if (match) {
//			label = label + " " + match[0];
//		}
//		return label;
//	}
//	
//	/**
//	 * Converts an HTML DOM node into an outline element
//	 * @param {Object} An HTML DOM node as returned by the Tautologistics HTML parser
//	 * @param {Boolean} filter if true the tree should be filtered to only show most relevant entries
//	 * @return {Object} A node in the outline tree
//	 */
//	
//	function domToOutline(dom, filter) {
//		//end recursion
//		if (!dom) {
//			return null;
//		}
//		var outline = [];
//		for (var ifunction parseHTML(contents){
			var handler = new Tautologistics.NodeHtmlParser.HtmlBuilder(
				function (error, dom){
					if(error)
						return null;
				},	
				{includeLocation: true}
			);
				
			var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
			parser.parseComplete(contents);
			return handler.dom;
		}
		
		var outline = [];
			
		var html = "<a>text a</a><b id='x'>text b</b><c class='y'>text c</c><d id='z' class='w'><e>text e</e></d><g class='g h i'>hhh</g><yy>hellow</yy><yy id='secondyy'>world</yy><d id='z'>  </d>";
		var dom = parseHTML(html);
		
		var id = Tautologistics.NodeHtmlParser.DomUtils.getElementById("x", dom);
		outline.push({label: id, line: 1});
		
		var classes = Tautologistics.NodeHtmlParser.DomUtils.getElements({ class: "y" }, dom);
		outline.push({label: classes, line: 1});
		
		var multiclass = Tautologistics.NodeHtmlParser.DomUtils.getElements({ class: function (value) { return(value && value.indexOf("h") > -1); } }, dom);
		outline.push({label: multiclass, line: 1});
				
		var name = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagName("a", dom);
		outline.push({label: name, line: 1});
		
		var text = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagType("text", dom);
		outline.push({label: text, line: 1});
		
		var nested = Tautologistics.NodeHtmlParser.DomUtils.getElements({ tag_name: "d", id: "z", class: "w" }, dom);
		nested = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagName("e", nested);
		outline.push({label: nested, line: 1});
		
		nested = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagType("text", nested);
		outline.push({label: nested, line: 1});
		
		var duplicates = Tautologistics.NodeHtmlParser.DomUtils.getElementsByTagName("yy", dom);
		outline.push({label: duplicates, line: 1});
		
		var single = Tautologistics.NodeHtmlParser.DomUtils.getElements( { tag_name: "yy", id: "secondyy" }, dom);
		outline.push({label: single, line: 1}); 
		
		var single = Tautologistics.NodeHtmlParser.DomUtils.getElements({ tag_name: "d" }, dom);								
		outline.push({label: single, line: 1});

		document.write(html.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "\n" + JSON.stringify(outline, null, '\t').replace(/</g, "&lt;").replace(/>/g, "&gt;"));
 = 0; i < dom.length; i++) {
//			var node = dom[i];
//			if (!skip(node, filter)) {
//				var element = {
//					label: domToLabel(node),
//					children: domToOutline(node.children, filter),
//					line: node.location.line
//				};
//				outline.push(element);
//			}
//		}
//		return outline;
//	}
//	
//	/**
//	 * Returns the DOM node corresponding to the HTML body, 
//	 * or null if no such node could be found.
//	 */
//	function findBody(dom) {
//		//recursively walk the dom looking for a body element
//		for (var i = 0; i < dom.length; i++) {
//			if (dom[i].name === "body") {
//				return dom[i].children;
//			}
//			if (dom[i].children) {
//				var result = findBody(dom[i].children);
//				if (result) {
//					return result;
//				}
//			}
//		}
//		return null;
//	}