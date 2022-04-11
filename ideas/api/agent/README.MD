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
