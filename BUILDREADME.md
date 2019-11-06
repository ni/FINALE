# FINALE

Finale is a lightweight web app to view GCode. This hinders many work flows e.g.

  - Code sharing : Sharing code with a person with no LV license necessitates printing/taking screenshot.
  - VIs saved in incompatible version.
  - G code being used with TestStand.

# Contents

- Features
- Prerequisites
- Installation
- Troubleshooting

# Features

  - A side view to display product hierarchy
  - Search functionality for faster access to VIs
  - Access to support for multi frame structures like case structures, event structures, disable structures and stacked structures.

FINALE uses a number of open source projects to work properly:

* Typescript
* Twitter Bootstrap
* interact
* jQuery
* Karma
* Jasmine

# Prerequisites

 - LabView (if you need to view your own files)
 - Python
 - Google Chrome 61/ Firefox 54( – behind the dom.moduleScripts.enabled setting in about:config) /Edge 16 / Safari 10.1

# Instructions of use

1. Download the build [FINALE.1.0.zip](https://nitalk.jiveon.com/servlet/JiveServlet/download/467230-18-396763/build.zip) .
2. Unzip the folder
3. (If you have labView) Run Main.vi at ./GToJson/Main.vi with the required VI path you want in the browser parameter
3. Open folder at cmd
4. type:
```sh
python -m simplehttpserver # for python2.7
python -m http.server # for python3
```
5. Open browser at provided url.

# Troubleshooting
