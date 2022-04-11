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
