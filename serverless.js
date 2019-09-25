const path = require("path");
const { spawnSync } = require("child_process");
const { Component } = require("@serverless/core");

class PythonRequirementsLayer extends Component {
  async default({ dockerizePip, requirements }) {
    const layer = await this.load("@serverless/aws-lambda-layer");

    this.context.status(`Deploying Python Layer`);

    this.context.debug(`running pip`);
    let stdout, stderr;
    if (dockerizePip) {
      ({ stdout, stderr } = spawnSync("docker", [
        "run",
        "--rm",
        "-i",
        "-v",
        `${process.cwd()}:/var/task`,
        "lambci/lambda:build-python3.7",
        "pip",
        "install",
        "-r",
        requirements,
        "--target",
        "/var/task/vendor"
      ]));
    } else {
      ({ stdout, stderr } = spawnSync("pip", [
        "install",
        "-r",
        requirements,
        "--target",
        "./vendor"
      ]));
    }
    this.context.debug(stdout);
    this.context.debug(stderr);

    return await layer({
      code: "./vendor",
      runtimes: ["python3.7"],
      prefix: "python"
    });
  }

  async remove() {
    const layer = await this.load("@serverless/aws-lambda-layer");

    this.context.status(`Removing Python Layer`);

    await layer.remove();
  }
}

module.exports = PythonRequirementsLayer;
