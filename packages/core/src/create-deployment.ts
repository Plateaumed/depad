import * as YAML from "yaml";

export const createDeployment = (name: string, config: string) => {
    const yamlObject = YAML.parse(config);
}
