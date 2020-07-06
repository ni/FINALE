# FINALE

FINALE is a lightweight WebApp to view [LabVIEW](https://www.ni.com/en-in/shop/labview.html) code. FINALE stands for FINALE Is Not A LabVIEW Editor.

This solves many use cases like:
  - Code sharing: Sharing LabVIEW code with a person who does not have LabVIEW installed.
  - Viewing LabVIEW code without launching LabVIEW.
  - Viewing LabVIEW code saved in incompatible version.
  - Viewing LabVIEW code that is being used with TestStand.

# Contents

- Features
- Setting up FINALE for your code

# Features

  - A left pane to display project hierarchy.
  - Search functionality to find things of interest quickly.
  - Support for viewing the following file types:
    - VI
    - CTL
    - LVClass
    - LLB
    - LVProj
    - Polymorphic VI
  - Support for viewing Multi Frame Structures like:
    - Case Structures
    - Event Structures
    - Diagram Disable Structures
    - Stacked Sequence Structures
  - Navigation to SubVIs and Dynamic Dispatch SubVIs.

Note: FINALE is not supported by National Instruments and this is mostly internal tooling that we are exposing. This is a work in progress, and is not yet feature complete.

# Setting up FINALE for your code

FINALE has two parts, the HTML Generator and the WebApp. The HTML Generator converts LabVIEW code to the FINALE format (a composition of JSON documents, images, etc., which is understood by the WebApp). These are input to the WebApp which opens a web-based viewer for the files converted. 
## Prerequisites: 
- LabVIEW: Required only for converting the files.
- Browser: Google Chrome/Firefox (Does not have complete support in Edge)
- Python 3+ : For CLI tool.
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

- ### Converting LabVIEW code to FINALE format
  This can be done in two ways:

    - #### Running the Converter VI: 
      - Navigate to "build/HTMLGenerator/".

      - Open Main.vi and enter values for the following:
        - Source directory/files: Path to the source LabVIEW code file(s) or folder.
          >Note: When converting a folder containing LV projects, the converted folder in the WebApp does not have information about the projects. This is expected behaviour.
        - Destination Directory: Path to the destination directory. To view the files using the WebApp, make sure your destination is set to "<Path/to/FINALE/repo>/build/src".
        - Run Main.vi and click "Convert".
      ![Main.vi](./docs/Main.vi.png)
      ##### Converting multiple projects:
        - Open GenerateUI-Advanced.vi at "build/HTMLGenerator/" and enter values for the following:
           - Top level output path: <Path/to/FINALE/repo>/build/src
           - Files to Preload: Array of files you want to preload.
           - File(s)/Folder to convert: Path to the source LabVIEW code file(s) or  folders.
           - Destination Folder (relative to output path): This is an optional field to specify an output path for the converted files. This must be relative to the Top level output path.
           > Note: "Files to Preload" and "Destination Folder (relative to output path)" are optional. If left empty, it is equivalent to running Main.vi. This VI can be used to convert single projects as well.

    - #### Using CLI:
      Prerequisite: PathLib module (https://pypi.org/project/pathlib/)

      - On cmd or PowerShell, navigate to "<Path/to/FINALE/repo>/build/HTMLGenerator".
      - Run command:
      > `python converter.py <path to JSON file>"`
      - The JSON file mentioned above should be of the structure:
        ```json
          {
            "topPath": "Absolute path where you want the FINALE format to be stored",
            "configurations": [
              {
                "inputPath": "Absolute path of the source files/directory that needs to be converted",
                "outputPath": "Relative path to `topPath` so that the output of the converter can be redirected to this path instead of the `topPath`",
                "preloadFiles": "File/Project that needs to be preloaded to load up the actual files that need to be converted"
              },
              {
                "inputPath": "...",
                "outputPath": "...",
                "preloadFiles": "..."
              }
            ]
          }
        ```
      >  - Add more elements to the "configurations" array to convert multiple projects.
      >  - "topPath" and "inputPath" (in "configurations" array) are required keys, the other keys "outputPath" and "preloadFiles" are optional.


- ### Using the WebApp:
  The WebApp reads the FINALE format stored in the "build" directory. To launch the WebApp:
  - On cmd or PowerShell, navigate to the "build" directory in the repo and start the npm http-server:
  >`http-server [-p PORTNUMBER]`
  - The above command launches the server at the displayed address where the FINALE format files can be viewed.
  - FINALE should now be ready to use!
  - #### Adding more converted files
    If more converted files/folders need to be added at this point,
    - Convert the new projects to a different location using Main.vi. (Main.vi first deletes the destination directory.)
    - Copy these FINALE format files "<Path/to/FINALE/repo>/build/src". Make sure to rename the new file.json so that the existing file.json does not get replaced.
    - Create a config.txt file that lists these .json files. The paths should be relative to the root of the server, that is, the "build" directory.
      For example, if their are 3 FINALE format files (foo + foo.json), (bar + bar.json) and (baz + baz.json), and "foo" and "bar" need to be viewed, config.txt should list these .json files like so:
    ```sh
      /src/foo.json
      /src/bar.json
    ```

# Contributing to the project

Contributions to FINALE are welcome from all!

For more details, see [Contributing.md](./Contributing.md)
