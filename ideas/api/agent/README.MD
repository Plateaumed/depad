### Depad Agent

#### Start Depad Server?

-- coming soon --

#### Start Depad Daemon?

-- coming soon --

#### Create a Deployment

This creates a deployment for the first time and runs the deployment afterwards.

```bash
depad deployment create --name <deployment name> --config-file <deployment config file>
depad create --name <deployment name> --config-file <deployment config file>
```

Example:

```bash
depad deployment create --name mercy-hospital-deployment --config-file mercy.deployment.yml
depad create --name mercy-hospital-deployment --config-file mercy.deployment.yml
```

##### Implementation

- Create the root directory for the deployment
- Copy the deployment config file to the root directory
- Register the deployment in the deployment registry
- Output the `docker-compose.yml` file with depad-chosen resources like networks, ports and volumes
- Register chosen ports in the port registry
- run: docker-compose up -d

#### Start a Deployment

This starts a deployment or a service within that deployment.

```bash
depad deployment start <deployment name or ID> [options]
depad start <deployment name or ID> [options]
```

Example:

```bash
depad deployment start mercy-hospital-deployment
depad start mercy-hospital-deployment
```

##### Options

- --service | -s: the names or IDs of the services to start, separated by spaces

##### Implementation

- If no service is specified:
  - run: docker-compose start
- If at least one service is specified:
  - run: docker-compose start <service>

#### Stop a Deployment

This stops a deployment or a service within that deployment.

```bash
depad deployment stop <deployment name or ID> [options]
depad stop <deployment name or ID> [options]
```

Example:

```bash
depad deployment stop mercy-hospital-deployment
depad stop mercy-hospital-deployment
```

##### Options

- --service | -s: the names or IDs of the services to stop, separated by spaces
- --force | -F: force the deployment (or a service) to stop

##### Implementation

- If no service is specified:
  - run: docker-compose stop
- If at least one service is specified:
  - run: docker-compose stop <service>
- If --force is specified but no service is specified:
  - run: docker-compose kill
- If --force is specified and at least one service is specified:
  - run: docker-compose kill <service>

#### Restart a Deployment

This restarts a deployment or a service within that deployment.

```bash
depad deployment restart <deployment name or ID> [options]
depad restart <deployment name or ID> [options]
```

Example:

```bash
depad deployment restart mercy-hospital-deployment
depad restart mercy-hospital-deployment
```

##### Options

- --service | -s: the names or IDs of the services to restart, separated by spaces

##### Implementation

- If no service is specified:
  - run: docker-compose restart
- If at least one service is specified:
  - run: docker-compose restart <service>
  
#### Update a Deployment
  
-- coming soon --
  
#### Destroy a Deployment
  
This destroys a deployment and, in the process, frees up all resources (ports, volumes, networks) that were reserved for it.

```bash
depad deployment destroy <deployment name or ID>
depad destroy <deployment name or ID>
```

Example:

```bash
depad deployment destroy mercy-hospital-deployment
depad destroy mercy-hospital-deployment
```

##### Implementation

- run: docker-compose down --rmi all --volumes
  - I'm not sure about the --rmi all because we don't want to delete images that are being used by other containers of other services in other deployments
- Remove chosen ports from the port registry
- Delete deployment from deployment registry
- Delete root folder created when the deployment was initially created

#### List Deployments
  
This list the deployments on the host machine. By default only running deployments are listed.

```bash
depad deployment list [options]
depad list [options]
```

Example:

```bash
depad deployment list --all
depad list --where state=stopped
```
  
##### Options

- --all: list all deployments, whether running or not
- --where: specifies the condition deployments must meet to be part of the result list

#### Inspect Deployments
  
This shows resources and configs being used by a deployment.
  
```bash
depad deployment inspect <deployment name or ID>
depad inspect <deployment name or ID>
```

Example:

```bash
depad deployment inspect mercy-hospital-deployment
depad inspect mercy-hospital-deployment
```

##### Implementation

- consider docker-compose ps

#### Log Deployments
  
This fetches log info being output by/from a deployment.
  
```bash
depad deployment log <deployment name or ID>
depad log <deployment name or ID>
```

Example:

```bash
depad deployment log mercy-hospital-deployment
depad log mercy-hospital-deployment
```

##### Implementation

- run: docker-compose logs -f

#### Check Health of Deployments
  
This fetches the health status of a deployment.
  
```bash
depad deployment health <deployment name or ID>
depad health <deployment name or ID>
```

Example:

```bash
depad deployment health mercy-hospital-deployment
depad health mercy-hospital-deployment
```

##### Implementation

- run: docker-compose ps --all --services
- Iterate through the rows to see if there's any container that is not running (state != "Up (healthy)")

#### Collecting Metrics/Stats for a Deployment
  
-- TODO: see Prometheus --

#### See Config History of Deployments
  
This fetches the history of configurations from which the deployment was created.
  
```bash
depad deployment history <deployment name or ID>
depad history <deployment name or ID>
```

Example:

```bash
depad deployment history mercy-hospital-deployment
depad history mercy-hospital-deployment
```

##### Implementation

- One possible implementation could be to store the `diffs` of the deployment configs similar to how git would have done it

#### Rollback a Deployment
  
This rolls back the deployment to a version that was created from a previous configuration. By default it rolls back using the immediate previous deployment configuration but you can specify which configuration to use or how many steps backward to go.
  
```bash
depad deployment rollback <deployment name or ID> [options]
depad rollback <deployment name or ID> [options]
```

Example:

```bash
depad deployment rollback mercy-hospital-deployment
depad rollback mercy-hospital-deployment
depad rollback mercy-hospital-deployment --config-id 00fac456bb3
depad rollback mercy-hospital-deployment --steps-back 3
```
  
##### Options

- --config-id: the ID of the configuration to use
  - you can get this by running: depad history
- --steps-back: a positive integer specifying how many steps back in the deployment history to go

#### Scaling a Deployment
  
-- coming soon --
  
#### Secrets and Environment Variables
  
While you can specify environment variables in the config file using the `{{env.XXX}}` notation, you shouldn't do that. Instead, create those variables in your deployment. Whenever services are started depad will pass all (or the needed) environment variables to them automatically.
  
NOTE: The `{{env.XXX}}` syntax may change.
  
Environment variables in depad are always encripted.
  
```bash
depad env <deployment name or ID> [options]
```
  
##### Options

- --set | -s: create an environment variable
- --env-file: specify an env file from which environment variables will be created
- --rm: remove/delete an environment variable

Example:

```bash
depad env mercy-hospital-deployment --set var=VALUE
depad env mercy-hospital-deployment --set var="VALUE WITH SPACES"
depad env mercy-hospital-deployment --env-file file.env
```
  
To see all env variables (without their values):

```bash
depad env mercy-hospital-deployment
```
  
To remove an env variable:

```bash
depad env mercy-hospital-deployment --rm var
```

##### Implementation

- In the generated docker-compose.yml file, each service is going to have:
  - env_file: .env
- In the root directory of the deployment depad creates a `enc.env` file and writes the env vars there, ensuring that their values are encripted.
- During encription of env vars use the deployment ID as the salt.
- When starting the deployment (or a service in the deployment) depad will have the decripted form of the `enc.env` file in a just-in-time generated file named `.env`
- After the deployment (or the service) is started, depad deletes the `.env` file
- This is not the best and definitely not the safest implementation but it's one that ensures that when a safer implementation is found, the current behaviours it encourages (e.g. not specifying env vars in the config file) can still be maintained.

#### Create a Workflow
  
```bash
depad workflow create --name <workflow name> --config-file <workflow config file>
```

Example:

```bash
depad workflow create --name app-setup-workflow --config-file workflow.yml
```
