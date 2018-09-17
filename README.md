# Key Takeaways
1. Application platforms like Pivotal Cloud Foundry provide excellent, automated Operating System
and Middleware CVE patching. But, your application dependency trees are a significant security vulnerability
risk.  
1. Snyk provides developer and operator friendly tools for identifying application security vulnerabilities.
1. For Node.js, Snyk can automatically apply security patches during 
development(snyk wizard) or during deployment(cf push).
1. For IT Operators, Snyk can go one step further and fail the deployment(cf push) of vulnerable applications. This 
feature supports Java and Node.

# Installation
* All build and deploy commands live in `pwsBuildDeploy.sh`. 
This is a polyglot demo that builds spring-boot 1.x-2.x, node, react and struts 1.x based projects
* You will need to have node and maven installed to build the demo projects
* The `manifest.yml` file can be used to do a normal `cf push` of all built demo projects. This demo 
will work on any PCF environment that has the node, staticfile and java buildpack.
* You may need to edit environment variable entries in `manifest.yml`. This
demo does not use SCS or any other service registry. All microservice endpoints are wired up via env entries
in the manifest.
* You may need to edit environment variable entries in `./web-gui/src/config.json`. The web gui has web 
links to your snyk dashboard and cloud foundry apps manager. The default setting for snyk 
dashboard is: `https://app.snyk.io/org/pivotal-demo/`. The default setting for apps manager 
is: `https://console.run.pivotal.io/`

# Setup
1. Setup [Github integration](https://app.snyk.io/org/pivotal-demo/integrations) and make sure that all 6 projects are listed in your Dashboard. 
1. [OPTIONAL] Repeat previous step for PWS or Cloud Foundry integration. This will allow you to show vulnerabilities of
deployed apps, independent of SCM scanning. Very useful for platform operators.
1. Before running the demo script, build and deploy all projects using `./pwsBuildDeploy.sh` or similar commands.
1. Open web-gui URL and verify that clicking on the snyk image takes you to the correct snyk dashboard. 
1. In web-gui URL make sure that the pivotal cloud foundry image takes you to the correct apps manager console
1. Install the [snyk cli](https://snyk.io/docs/using-snyk)
1. Verify the snyk cli works by running `snyk test backend-banking-legacy`. You should see some interesting vulnerabilities.

# Demo Script - Short
1. Open the web-gui and Sign-On using any User ID. No password is needed. If the user id starts with '1' the super special
struts 1.x microservice will be invoked. Otherwise, it's a spring-boot 1.x endopoint.
1. Briefly explain that each account summary box is a JSON response from a different microservice. The account summary
descriptions will tell you which apps are spring boot 1.x, 2.x or struts 1.x. There is a node web gateway that makes 3 async HTTP GET calls
and combines the results for the web gui.
1. Click any `Details` button. This will log you out, essentially resetting the GUI.
1. Click on the `Architecture` button. Explain the web-gui -> bff -> microservice based architecture. Key frameworks
in use for each service are listed in the diagram. Re-emphasize the different vulnerability challenges
with modern apps because of deep npm and maven dependency trees. These issues exist even when the app is super simple.
1. Click on the Snyk image. It will open a new tab window and take you to the snyk dashboard. Explain the various 
vulnerabilities in the applications. 
1. Explain that Snyk can scan both source code repos(github) and deployed apps in cloud foundry spaces. 

# Demo Script - Extended
1. If you have more time, go a little deeper into how Snyk can help you not only see but address vulnerabilities.
1. Open a terminal window and `cd snyk-demo`
1. Run `snyk test backend-banking-legacy`. Explain that the CLI shows the same data as the dashboard.
1. Run `cd web-gateway` then `snyk wizard`. Explain how Snyk can automitically remediate some issues with node based apps.
1. Run `snyk test`. If there are still HIGH issues, run `snyk wizard` and `snyk test` again. Explain how Snyk 
automatically remediated all HIGH issues.
1. Run `gulp test`. Explain that the integration test still passes. **REQUIRES LOCAL RUNNING: `backend-banking`, 
`backend-investments` and `backend-linesofcredit`**
1. Set `SNYK_TOKEN` environment variable `SNYK_TOKEN=YOUR_API_TOKEN`. To retrieve your token in Snyk Dashboard click on: 
Account Settings -> API token -> Show 
1. Set your SNYK_TOKEN enviornment variable for the `backend-banking-legacy` app: `cf set-env fnb-backend-banking-legacy SNYK_TOKEN $SNYK_TOKEN`
1. Run `cf push -f ./manifest-special.yml`. This will attempt to push `backend-banking-legacy` by using the [Snyk java buildpack](https://github.com/AH7/java-buildpack).
This push should fail b/c of HIGH level vulnerabilities. 
1. Explain how the CLI and snyk buildpacks can be used in CI pipelines to protect production.

# Architecture 
![Demo Architecture](fake-bank-architecture.png) 

# Screenshots
### Web GUI Login 
![Web GUI Login](web-gui-login.png)

### Web GUI Dashboard
![Web GUI Dashboard](web-gui-dashboard.png) 
### Snyk Dashboard
![Snyk Dashboard](snyk-dashboard.png) 

# Troubleshooting Tips
### web-gateway
* If `gulp test` fails run `npm i -g gulp-cli`
* To reset your node_modules, delete `node_modules` folder and run `npm install`
* It helps to git revert `package.json` and `package-lock.json` in between demo runs.
This will add back vulnerabilities that get fixed on `snyk wizard`
### backend-banking-legacy
* `mvn clean install` fails, install/configure [apache maven](https://maven.apache.org/download.cgi)
### web-gui
* `npm start` fails, install [react-scripts](https://www.npmjs.com/package/react-scripts) 

# Run Locally
* **backend-banking-legacy** - OPTIONAL: Deploy backend-banking-legacy.war to tomcat. Runs on PORT:8080
* **backend-banking** - Run BankingApplication.java. Runs on PORT:8083
* **backend-investments** - Run InvestmentsApplication.java. Runs on PORT:8081
* **backend-linesofcredit** - Run LinesOfCreditApplication.java. Runs on PORT:8082
* **web-gateway** - `node app.js`. Runs on PORT: 3001
* **web-gui** - `npm start`. Runs on PORT: 3000
