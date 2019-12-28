# FINALE

FINALE is a lightweight web app to view GCode. FINALE stands for FINALE Is Not A LabVIEW Editor.

This solves many use cases like:
  - Code sharing : Sharing code with a person with no LV license necessitates printing/taking screenshot.
  - Viewing VIs saved in incompatible version.
  - Viewing G code being used with TestStand.

# Contents

- Features
- Setting up FINALE for your code

# Features

  - A side view to display product hierarchy.
  - Search functionality for faster access to VIs.
  - Access to support for multi frame structures like case structures, event structures, disable structures and stacked structures.
  - Navigation to SubVIs and Dynamic Dispatch SubVIs.
  - Context help for SubVIs and most of the function nodes.

Note: FINALE is not supported and this is mostly internal tooling that we are exposing. This is more of a 'hack' that we built, this is not polished code/design.

# Setting up FINALE for your code

The web app is developed using npm package manager. Run the following commands to produce a built deployment under a 'build' directory.
```sh
git clone https://github.com/ni/finale && cd finale
npm install
npm run build-webapp
```
