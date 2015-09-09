The FIT Stack - Flybase / Interface / Thin Servers
-----

The FIT Stack allows for building rapid MVPs, it's set up so you can choose a full-stack version with Node.js as the backend, or the client-side version which is frontend only.

The frontend code is the same for both, the full-stack just features the ability to also talk to the Node.js backend when needed.

We've decided to make it easier to choose how to start by letting you choose to go the full-stack method, if you need a node.js backend to work with or just grab the client-side if you want to work with a client-side only system.

The choice is yours, and the possibilities are endless!

## Branches

* [full-stack (with node)](https://github.com/flybaseio/fit-stack/tree/full-stack), this is set up so you can build your FIT Stack app with integration between frontend via Angular.js and backend via Node.js. This lets you quickly build out your MVP.
* [client-side only](https://github.com/flybaseio/fit-stack/tree/client-side), this is a client-side only implementation using Angular.js and Flybase. You can then host your site on static hosting services such as Github Pages without need of a server, since Flybase handles all of the backend.

## Getting Started

You can perform a git clone of any specific branch using the following command:

```
git clone https://github.com/flybaseio/fit-stack -b client-side --single-branch mynewproject
```

This will clone the `client-side` branch of the FIT stack to a new folder called `mynewproject` and from there you can build your new apps.

Similarly, replacing `client-side` with `full-stack` will clone the `full-stack` branch.

We use this framework to build our apps, including the flybase.io dashboard, so this is a framework we put a lot of work into.

***

You can [read this article](http://mvpin30.com/2015/06/29/fit-stack/) on [MVPin30](http://mvpin30.com) for a description of the FIT Stack and it's benefits and uses.

We make heavy use of the FIT Stack here at Flybase, and wanted to share it with you.
