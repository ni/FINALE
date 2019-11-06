The path of the folder to be viewed is the input to directory_json.vi which produces a json object that is stored in lib/file.js.

The method directoryTreeView() in aimara.ts creates the root node and calls populateTree to create child nodes. drawTree() renders the tree.

The 'Search' input tag calls the method updateTreeViewAndSearchResults() which filters the directory on press of Enter. The filtered tree is rendered on a separate div whose visibility is toggled when search field is empty.

Name of the file or folder is obtained on click and passed on to divLog, the same can later be passed to display FP/BD of the file.