# Depad

Deployment management toolset for PlateauMed.

# Architecture

-- coming soon --

# Setting up the Codebase

To set up the codebase for local development follow the steps below.

• Ensure core development tools like [git](https://git-scm.com/) and [Node](https://nodejs.org/en/) are set up on your machine

• Install [lerna](https://lerna.js.org/)

```sh
npm i -g lerna
```

• Clone the git repository

```sh
git clone https://github.com/Plateaumed/depad.git
```

• In the root directory install project dependencies

```sh
cd depad && npm i && lerna bootstrap
```

# Installing Depad

You can install Depad either from `npm` or from your local codebase.

• After [setting up the codebase](#setting-up-the-codebase) on your local machine, you can install the Depad CLI tool by running

```sh
lerna run install:dev --scope=@depad/cli
```

• Alternatively, you can install the Depad CLI tool from npm

```sh
npm i -g @depad/cli
```

• Get the Depad API server up and running on a specified port

```sh
depad start -p 3000
```

• To stop the Depad API server use the usual `Ctrl` + `C` command on the terminal.

• With the Depad API up and running you can now run other Depad commands in another terminal. For instance, to get version:

```sh
depad version
```

# Tests

• To run tests in all packages

```sh
lerna run test
```

• To run tests in a specified package (for instance, in the `@depad/cli` package)

```sh
lerna run test --scope=@depad/cli
```
