# FINALE

FINALE is a lightweight WebApp to view G code. FINALE stands for FINALE Is Not A LabVIEW Editor.

This solves many use cases like:
  - Code sharing: Sharing code with a person with no LV license necessitates printing/taking screenshot.
  - Viewing VIs saved in incompatible version.
  - Viewing G code being used with TestStand.

# Contents

- Features
- Setting up FINALE for your code

# Features

  - A left pane to display project hierarchy.
  - Search functionality for faster access to VIs.
  - Support for viewing Multi Frame Structures like Case Structures, Event Structures, Disable Structures and Stacked Structures.
  - Navigation to SubVIs and Dynamic Dispatch SubVIs.
  - Context help for SubVIs and most of the primitive nodes.

Note: FINALE is not supported and this is mostly internal tooling that we are exposing. This is more of a 'hack' that we built, this is not polished code/design.

# Setting up FINALE for your code

FINALE has two parts, the HTML Generator and the WebApp. The HTML Generator converts G code to metadata in the form of JSONs, images etc. These are input to the WebApp which opens a web-based viewer for the files converted. 
## Prerequisites: 
- LabVIEW
- Browser: Google Chrome 
- [npm](https://www.npmjs.com/get-npm)
- [npm http-server](https://www.npmjs.com/package/http-server)
>Note: If there are errors with the npm http-server, try installing at this version:
>
>`npm install –g http-server@0.9.0`

The WebApp is developed using NPM. Run the following commands to produce binaries under a "build" directory.
```sh
git clone https://github.com/ni/finale && cd finale
npm install
npm run build-webapp
```

## Running FINALE:
Follow these instructions to run FINALE:
- Once you have the repository built and set up according to the above commands, proceed to the next step.

- ### Converting G code to JSON: 
   - Navigate to "buid/HTMLGenerator/".

   - Open Main.vi and enter values for the following:
     - Source directory/files: Path to the source G code file(s) or folders.
     - Destination Directory: Path to the destination directory. To view the files using the WebApp, make sure your destination is set to "<Path/to/FINALE/repo>/build/src".
     - Run Main.vi and click "Convert".
   ![Main.vi](./docs/Main.vi.png)
     > Note: If you require certain files/projects to be preloaded for converting  the files, open GeneratorUI-Advanced.vi and enter values for the following:
         > - Top level output path: <Path/to/FINALE/repo>/build/src
         > - Files to Preload: Array of files you want to preload. If this is  left empty it is equivalent to running Main.vi.
         > - File(s)/Folder to convert: Path to the source G code file(s) or  folders.
         > - Destination Folder (relative to output path): This is an optional  terminal to specify an output path for the converted files. This must  be relative to the Top level output path.

- ### Launching the WebApp:
   - On cmd or powershell, navigate to the "build" directory in the repo and start the npm http-server:
   >`http-server` 
   - The above command will list the URLs at which the converted G source files can be viewed.
   - FINALE should now be ready to use!

# Contributing to the project

Contributions to FINALE are welcome from all!

For more details, see [Contributing.md](./Contributing.md)