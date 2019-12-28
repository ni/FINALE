# Contributing to FINALE

Contributions to FINALE are welcome from all!

FINALE is managed via [git](https://git-scm.com), with the canonical upstream
repository hosted on [GitHub](https://github.com/ni/finale).

FINALE follows a pull-request model for development.  If you wish to
contribute, you will need to create a GitHub account, fork this project, push a
branch with your changes to your project, and then submit a pull request.

See [GitHub's official documentation](https://help.github.com/articles/using-pull-requests) for more details.

# Setting Up Development Environment

Please ensure you have the following software installed:

- Git
- Supported browsers: Google Chrome 61, Firefox 54, Edge 16, Safari 10.1
- LabVIEW
- npm
- tslint
- Web server: Apache, wamp, etc.

# Building code

The web app is developed using npm package manager. Run the following commands to produce a built deployment under a 'build' directory.
```sh
git clone https://github.com/ni/finale
npm install
npm run clean
npm run build-webapp
```

# Testing

> TODO: Include details about manual testing.
 
For testing Jasmine and Karma are used on typescript. All the tests are located in testAssests.

```sh
npm install
npm test
```
> TODO: Elaborate on testing.

# Developer Certificate of Origin (DCO)

   Developer's Certificate of Origin 1.1

   By making a contribution to this project, I certify that:

   (a) The contribution was created in whole or in part by me and I
       have the right to submit it under the open source license
       indicated in the file; or

   (b) The contribution is based upon previous work that, to the best
       of my knowledge, is covered under an appropriate open source
       license and I have the right under that license to submit that
       work with modifications, whether created in whole or in part
       by me, under the same open source license (unless I am
       permitted to submit under a different license), as indicated
       in the file; or

   (c) The contribution was provided directly to me by some other
       person who certified (a), (b) or (c) and I have not modified
       it.

   (d) I understand and agree that this project and the contribution
       are public and that a record of the contribution (including all
       personal information I submit with it, including my sign-off) is
       maintained indefinitely and may be redistributed consistent with
       this project or the open source license(s) involved.

(taken from [developercertificate.org](http://developercertificate.org))

See [LICENSE](https://github.com/ni/nidevlabs/blob/master/LICENSE)
for details about how FINALE is licensed.