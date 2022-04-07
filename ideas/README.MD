# Depad (Deployment Admin)

## Goals

- The primary goal is to automate deployments on host machines. A `deployment` in this context is a group of services working together to deliver a cohesive experience to their target users. A `service` is one or more containers built from the same docker image serving the same kind of request. Depad should be able to run different deployments on the same host, even if they consist of identical services (created from identical docker images), while guaranteeing that each deployment is adequately isolated from the others in terms of networking, file system, ports, etc.

## Requirements

- Having established access or connection to a host machine it should be possible to manage deployments on that machine quite easily.
- It may also be necessary to expose a public endpoint to which HTPPS requests can be sent in order to manage deployments on the host. This would make it possible to plug depad into existing CI/CD pipelines.
- Deployments must be repeatable. It should be possible to perform a deployment a number of times, the same way every time. This can be achieved by having deployments represented in config files as specs, templates, etc.
- Deployments must be reviewable. This can be achieved by having deployments represented in config files (as mentioned above) and committed to source control.
- It therefore follows that deployments may (must?) be versioned.
- A single host machine can have multiple deployments (whether of the same application of not). It is therefore necessary to be able to identify individual deployments, perhaps by the use of an ID and/or a unique name.
- Deployments should be possible via remote connection to host machines.
- In addition to creating deployments, it should be possible to update, delete/destroy, stop and restart deployments.
- It may be possible to interact with a specified service within a deployment. Such an interaction could be (but not limited to) stopping, restarting, updating a service.
- It should be possible to update a specified service across different deployments. For instance, it should be possible to update every MySQL service to another version across multiple deployments. A possible implementation is introducing the concept of `classes`, where a `class` is used to group different deployments together. A `tag` or a `label` could also be used.
- Updating a deployment (or services within the deployment) should be done with as little downtime as possible. This may be achieved by automatically creating a proxy to the deployment that can map an endpoint to different instances of that deployment (or to different instances of a service within that deployment). This way updates without downtimes can be implemented by starting a new instance of the deployment (or a new instance of a service within that deployment) and eventually routing traffic away from the old instance to the new one. This is a very rough thought, and definitely needs to be discussed and refined.
- Considering the fact that services will need free ports to run on, port management must be implemented. For instance, multiple instances of PostgreSQL may need to run in multiple deployments on the same host machine. They obviously cannot all run on port `5432`. Available ports must be assigned to them automatically (without human intervention) and a mapping of services to ports should be maintained. We want to maintain this registry/map (of services to ports) so that when we need to restart a service we can do that in a way that ensures other services that depend on it continue to successfully connect to it.
- It should be possible to perform health checks on deployments and services automatically, periodically.
- It may be necessary to specify how much system resources a deployment can consume. This doesn't have to be a hard requirement and is definitely one we should talk about.
- A single deployment may span multiple host machines. This doesn't have to be a hard requirement currently and may not be implemented immediately.

## Concepts

- Deployment: A deployment in this context is a group of services working together to deliver a cohesive experience to their target users.
- Deployment Config: This is a document specification that represents steps that need to be followed (e.g. scripts that need to be run, services that need to be started, etc.) in order to create, update or delete a deployment.
- Depad Agent: This is a tool that can run as a script, server and/or daemon on a host machine via which deployments on that host will be managed.
- Depad Cluster: This is a collection of depad agents that have been grouped into a cluster.
- Depad Cluster Manager: This is a tool that can manage a depad cluster. As a use case, imagine we want to run different deployments of PlateauMed on 10 servers that we manage. Each server would need the depad agent installed on it. To create a new deployment of PlateauMed we would have to always decide on which of these 10 hosts we need the deployment running. If we group the hosts into a cluster then we only need to send the deployment config to the cluster manager. The cluster manager will be responsible for deciding which of its hosts it will redirect that deployment config to. This is very helpful in maintaining complete automation of deployment even as we add more servers to our rack.
- Workflow: Our current deployment process also involves setup and the installation of dependencies. Since these actions don't deal with container management we can separate them out to their own process. We can call this process a workflow.

## Port Management

This section discusses how depad handles the assignment and management of random ports to services with the goal of avoiding port collisions with already-open ports.
- Depad will use a service like `portfinder` (or `portastic`) to find random open ports.
- Generally speaking, depad will consider ports `3000` to `65499`
- During deployment creation, only a range of 100 ports will be considered. For the first deployment this will be between 3000 to 3099; for the second, between 3100 to 3199. And so on. The current index/cursor (3000, 3100, 3200, etc) has to be remembered and updated after every deployment creation. After considering ports 65400 to 65499, it cycles back to 3000 to 3099 for the next deployment creation.
- Ports assigned to a deployment are also stored by depad to ensure they never get used even while the deployment is not running. Those ports remain in the registry until the deployment gets destroyed.
- The grouping of available ports into hundreds before randomly selecting ports to use is to reduce the chance of randomly picked open ports belonging to deployments (or services) that may not be running at that point in time.
- If a group of 100 ports cannot yield enough available ports then the next group of 100 ports should be considered. This process should be repeated until sufficient number of available ports are found.

## APIs

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
