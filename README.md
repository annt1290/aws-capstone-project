[![CircleCI](https://dl.circleci.com/status-badge/img/gh/annt1290/aws-capstone-project/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/annt1290/aws-capstone-project/tree/main)

# aws-capstone-project

Udacity AWS Devops - Capstone project

This is a [Next.js](https://nextjs.org/) project with rolling deployment to [EKS](https://aws.amazon.com/eks/) using [CircleCI](https://circleci.com/).

Pipeline:
```
Lint --> Build and push image --> Deploy --> Test
```

## Work Local

### Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run Docker Local

Build image:

```bash
docker build --build-arg VERSION_HASH="$(git rev-parse --short HEAD)" -t next-app .
```

Start container:

```bash
docker run --rm -it -p 3000:3000 --name next-app next-app
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy to AWS EKS via CircleCI

### Create EKS cluster

Using EKSCTL utility:

```bash
eksctl create cluster -f eks-cluster.yml
```

The command above will create an EKS cluster "next-app" in the "us-east-2" region (see [eks-cluster.yml](eks-cluster.yml) config file) with two [CloudFormation](https://aws.amazon.com/cloudformation/) stacks:

- **eksctl-next-app-cluster** for the cluster
- **eksctl-next-app-nodegroup-managed-ng-1** for the initial nodegroup

### Create ECR Repository

Create an ECR Repository named "next-app" to manage images built in the project.

### Configure Environment Variables on CircleCI

Set the following environment variables on CircleCI > Project Settings:

- `AWS_ACCESS_KEY_ID`: IAM user credentials.
- `AWS_SECRET_ACCESS_KEY`: IAM user credentials.
- `AWS_DEFAULT_REGION`: AWS default region, for pushing image and deploying app.
- `AWS_ECR_REGISTRY_ID`: The 12 digit AWS id associated with the ECR account.

## Project files

- [Dockerfile](Dockerfile): A multi-stage builds Dockerfile for next.js app.
- [eks-cluster.yml](eks-cluster.yml): EKS cluster config file. Include cluster name, region and node groups definition.
- [k8s/deployment.yml](k8s/deployment.yml): Kubernetes deployment config file. Include deployment strategy and containers spec.
- [k8s/service.yml](k8s/service.yml): Kubernetes service config file. Include spec for the load balancer.
- [.circleci/config.yml](.circleci/config.yml): CircleCI config file. It uses [aws-eks](https://circleci.com/developer/orbs/orb/circleci/aws-eks), [aws-ecr](https://circleci.com/developer/orbs/orb/circleci/aws-ecr), and [kubernetes](https://circleci.com/developer/orbs/orb/circleci/kubernetes) orbs to build the jobs.
- Other files: Next.js source code.