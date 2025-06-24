# Astrotype Deployment Guide

This guide will walk you through deploying your Astrotype blog to the web using GitHub Pages.

## Part 1: GitHub Repository Setup

1.  **Create a new GitHub Repository:**
    *   Go to [GitHub](https://github.com) and click the `+` icon in the top right, then select "New repository".
    *   Give your repository a name (e.g., `my-astrotype-blog`).
    *   Choose whether you want it to be public or private.
    *   Click "Create repository".

2.  **Push Your Code to the Repository:**
    *   In your local project folder, initialize Git and connect it to your new repository.
    *   Open your terminal and run the following commands, replacing `YOUR_USERNAME` and `YOUR_REPOSITORY` with your details.

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    git push -u origin main
    ```

## Part 2: Deployment with GitHub Actions

We will use GitHub Actions to automatically build and deploy your site to GitHub Pages whenever you push a new commit to the `main` branch.

1.  **Create the Workflow File:**
    *   In your project, create a new folder structure: `.github/workflows`.
    *   Inside the `workflows` folder, create a new file named `deploy.yml`.

2.  **Add Workflow Content:**
    *   Copy and paste the following content into your `deploy.yml` file:

    ```yaml
    name: Deploy to GitHub Pages

    on:
      push:
        branches:
          - main
      # Allows you to run this workflow manually from the Actions tab
      workflow_dispatch:

    # Allow one concurrent deployment
    concurrency:
      group: 'pages'
      cancel-in-progress: true

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v4
          - name: Setup Node.js
            uses: actions/setup-node@v4
            with:
              node-version: '20'
              cache: 'npm'
          - name: Install Dependencies
            run: npm install
          - name: Build
            run: npm run build
          - name: Setup Pages
            uses: actions/configure-pages@v4
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: ./out

      deploy:
        needs: build
        permissions:
          pages: write
          id-token: write
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        steps:
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```

3.  **Enable GitHub Pages:**
    *   Go to your repository on GitHub and click on the "Settings" tab.
    *   In the left sidebar, click on "Pages".
    *   Under "Build and deployment", for the "Source" option, select **GitHub Actions**.

4.  **Commit and Push:**
    *   Commit the new `.github/workflows/deploy.yml` file and push it to your `main` branch.

    ```bash
    git add .
    git commit -m "Add deployment workflow for GitHub Pages"
    git push
    ```

    GitHub Actions will now automatically build and deploy your site. You can monitor the progress in the "Actions" tab of your repository. Once completed, your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY`.

## Part 3: Using a Custom Domain

1.  **Get a Domain Name:**
    *   If you don't already have one, purchase a domain name from a registrar like Google Domains, Namecheap, or GoDaddy.

2.  **Configure Custom Domain in GitHub:**
    *   Go to your repository's "Settings" > "Pages".
    *   Under "Custom domain", enter your domain name (e.g., `www.yourdomain.com` or `blog.yourdomain.com`) and click "Save".
    *   GitHub will display the DNS records you need to configure with your domain registrar.

3.  **Configure DNS with Your Registrar:**
    *   Log in to your domain registrar's website.
    *   Go to the DNS management section for your domain.
    *   You will need to add one of the following record types:
        *   **For a subdomain (like `www.yourdomain.com` or `blog.yourdomain.com`):** Add a `CNAME` record. The "name" or "host" should be your subdomain (`www` or `blog`), and the "value" or "points to" should be `YOUR_USERNAME.github.io`.
        *   **For an apex domain (like `yourdomain.com`):** Add `A` records. The "name" or "host" is `@`. You need to create four separate `A` records pointing to the following IP addresses for GitHub Pages:
            ```
            185.199.108.153
            185.199.109.153
            185.199.110.153
            185.199.111.153
            ```
    *   Save your changes. DNS changes can take some time to propagate (from a few minutes to 48 hours).

Once propagation is complete, your Astrotype blog will be accessible at your custom domain. GitHub will also automatically provision an SSL certificate for your site.
