# ICEMEME
A site for sharing the coldest memes

## Development
Follow these instructions to set up your development environment.

#### Getting Started
1. Ensure you have the following installed on your system:
    - `git`
    - `nodejs`
    - `yarn` ([install instructions](https://yarnpkg.com/lang/en/docs/install/))


2. Clone the repository and `cd` into it:

        -- ssh
        $ git clone git@github.com:seng513-w19-group11/icememe.git
        -- or --
        -- https
        $ git clone https://github.com/seng513-w19-group11/icememe.git

        -- then
        $ cd icememe/


3. We'll be using [Git Flow (check it out!)](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) to manage workflow and branching. If you want to use the [git extension library](https://github.com/nvie/gitflow/wiki/Installation), now's a good time to initialize it. Follow the following bash history to set the branch names and prefixes:

        $ git flow init

        Which branch should be used for bringing forth production releases?
        - master
        Branch name for production releases: [master]
        Branch name for "next release" development: [develop]

        How to name your supporting branch prefixes?
        Feature branches? [] feature/
        Bugfix branches? [] bugfix/
        Release branches? [] release/
        Hotfix branches? [] hotfix/
        Support branches? [] support/
        Version tag prefix? [] v
        Hooks and filters directory? [/tmp/icememerepo/icememe/.git/hooks]


4. Run yarn to install the dependencies:

        $ yarn


#### Setting up PostgreSQL
It's important for your local development environment to match that of our production environment on Heroku. It's also important for us to be able to modify data and schema in a local database rather than a shared one where we'd be causing problems for each other.

5. Follow the Heroku PostgreSQL [local setup](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup) instructions. Follow the instructions that apply to all systems and those that apply for your system. Make sure to try the test commands to make sure things are working as they should at every step.


#### Environment Variables
Configuration is done via environment variables that can be different in different systems/deployments, but the code always get these values the same way: via the `process.env` object.

6. Create a `.env` file at the project root by copying `.env.example`:

        $ cp .env.example .env

    It will be ignored by git (it's in `.gitignore`).

7. Put the `DATABASE_URL` value (from setting up PostgreSQL locally) that works for you in it.

8. Generating public/private key pairs for signing JWT
	1. Go to: http://travistidwell.com/jsencrypt/demo/
	2. Key Size: **512 bit**
	3. Click on **Generate New Keys**
	4. Open the `.env.example` file
	5. Copy and paste the following lines from `.env.example` into your `.env` file: `PRIVATE_KEY` `PUBLIC_KEY` `ISSUER` `SUBJECT` `AUDIENCE` `EXPIRES_IN` `ALGORITHM`
	6. Leave the values for `ISSUER` `SUBJECT` `AUDIENCE` `EXPIRES_IN` `ALGORITHM` as they are
	7. Copy the private key from `iii` and paste it where the `PRIVATE_KEY=` in your `.env` file, do the same for the public key
		a. When you paste in the keys, you will need to make adjustments to the strings, because they will be on separate lines


```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQC
+9FiJCtty4mOb
qOMWT2f6eNf+Jl
5M4sQ6
-----END RSA PRIVATE KEY-----"
```

Should be changed to


```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQC\n+9FiJCtty4mOb\nqOMWT2f6eNf+Jl\n5M4sQ6\n-----END RSA PRIVATE KEY-----"
```

*NOTICE*: the **\n** appended to where the newlines appeared above


In development, these environment variables will be available in the `process.env` object, in both the client and server.

> Note!
>
> If you introduce a new environment variable necessary to run the app, make sure to add an entry to `.env.example`, either with an acceptable default, or an empty value.
>
> E.g.:
>
>       DATABASE_URL=postgres://$(whoami)
>       MY_CRYPTO_SECRET=


#### Running Migrations
9. We will use knex to add and run migrations to our database. We will do this using the knex CLI, which can be used with yarn. The repository should already contain a knexfile.js, which uses your DATABASE_URL environment variable to connect to your database. In the project root directory, simply run the following to migrate the database to the latest version:

        $ yarn run knex migrate:latest


#### Running the App
There's two ways to run the app: in development mode or production mode.

10. Run the app in development mode:

        $ yarn dev

    This runs two servers:

    - The `quasar dev` server that serves the front-end to your browser (usually on port `8080`, which is where you should go to see the app). It provides error reporting, hot-module-replacement, and other font-end development tools.

    - The `nodemon` server that runs the back-end. It monitors the back-end server source files (like `src/server/main.js`) and restarts the server when they change.


11. To run the app in production mode you need to build it first. Then run it in another step:

        $ yarn build
        $ yarn start

    This mode builds the app into a set of static files at `dist/spa/`. Then the back-end server is used to serve these front-end static files *and* act normally as the back-end server.


## Deployment
Our app will be deployed on Heroku. Kurtis has his GitHub Student Developer Pack connected to Heroku to provide the PostgreSQL add-on.

Visit it at https://infinite-river-96657.herokuapp.com/

Some things to note:

- Deployments to production must come from the `master` branch. This means we need to move changes through our Git Flow branching model to master (via a release) before deploying.
- This also means development and testing need to be done on our local machines. If you want to test on a phone, you can try connecting over a local network (e.g. `http://local.pc.ip.address:8080/`) or with a tool like [ngrok](https://ngrok.com/) (ngrok free will only work when running in production mode, as it only allows reverse-proxy to one port number).

## Design

### URL Design

- Main Page `/`
- Registration `sign-up/?next="/m/123id/title-slug"`
- Upload `/new`
- Meme with comments,votes `/m/123id/title-slug`
- Personal page `/u/123userid/user-name-slug`
- Settings `/settings`
- Login (dialog?)
