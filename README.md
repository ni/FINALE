# FINALE

FINALE is a lightweight web app to view GCode. FINALE stands for FINALE Is Not A LabVIEW Editor.

# Contents

- Features
- Setting up FINALE for your code

# Features

  - A side view to display product hierarchy.
  - Search functionality for faster access to VIs.
  - Access to support for multi frame structures like case structures, event structures, disable structures and stacked structures.
  - Navigation to SubVIs and Dynamic Dispatch SubVIs.
  - Context help for SubVIs and most of the function nodes.

# Setting up FINALE for your code

The web app is developed using npm package manager. Run the following commands to produce a built deployment under a 'build' directory.
```sh
git clone https://github.com/ni/finale
npm install
npm run clean
npm run build-webapp
```