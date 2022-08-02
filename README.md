[] TODO: CircleCI Status Badge

# aws-capstone-project

Udacity AWS Devops - Capstone project

This is a [Next.js](https://nextjs.org/) project with rolling deployment to [EKS](https://aws.amazon.com/eks/) using [CircleCI](https://circleci.com/).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run Docker Local

Build image:

```bash
docker build --build-arg VERSION_HASH="$(git rev-parse --short HEAD)" -t next-app .
```

Start container:

```bash
docker run --rm -it -p 3000:3000 --name next-app next-app
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
