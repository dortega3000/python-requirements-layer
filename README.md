# python-requirements-layer

&nbsp;

A serverless component to package python dependencies as a layer

&nbsp;

1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)

&nbsp;


### 1. Install

```console
$ npm install -g serverless
```

### 2. Create

```console
$ mkdir python-project && cd python-project
```

The directory should look something like this:


```
|- serverless.yml
|- requirements.txt
|- .env         # your AWS api keys
```

the `.env` file should look like this

```
AWS_ACCESS_KEY_ID=XXX
AWS_SECRET_ACCESS_KEY=XXX
```

### 3. Configure

Configure your `serverless.yml` as follows:

```yml
# serverless.yml

name: python-deps
stage: dev

pythonLayer:
  component: '@serverless/python-requirements-layer'
  inputs:
    requirements: requirements.txt # optional
    dockerizePip: true # false by default, runs pip inside of docker
  component: "@serverless/schedule"
```

### 4. Deploy

```console
$ serverless
```

&nbsp;

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.

