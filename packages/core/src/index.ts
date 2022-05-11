import Docker from "dockerode";
export * from "./create-deployment";

const docker = new Docker();

console.log(">>>>>>>>>>>> list containers running on this host machine")

docker.listContainers().then((containers: Docker.ContainerInfo[]) => {
    containers.forEach((container: Docker.ContainerInfo) => {
        console.log(container.Id);
        console.log(container.Image);
        console.log(container.State);
        console.log(container.Status);
    })
})

export const hello = () => ">>>>>>>>>> in package @depad/core";

// @depad/reg - responsible to registering (and unregistering) everything
// @depad/diag - constantly checks the state of deployments (identifies broken deployments)
