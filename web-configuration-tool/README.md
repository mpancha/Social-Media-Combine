Web configuration Container
==========================

Automatic WebApp Configuration
------------------------------
Different web frameworks incorporate differents methods of specifying application configuration parameters. Automatic WebApp configuration allows users to provide configuration parameters of the App using simple WebUI. 

- Deploys a web configuration app to collect App's configuration parameters.
- Automatically generates the angular schema form for App's configuration paramters from the configuration files.
- Allows users to configure App parameters using Web UI before deployment.

1. nodejs server
  - Runs nodejs server on 8080
2. Angular schema form
   - Automatically generates schema form from yaml
   - Performs form validation on client side
3. express, data-file-parser and fs module
  - fs module to generate configuration files
  - data-file-parser module to parse yaml file

To Do
=====
1. Identify config file type and fix /post to write config file based on type (remove the hack).
2. Automatic identification of config files.
3. Make reconfig using Docker API in vagrant as well (similar to docker provider).
4. Certificates for Docker secure API.
5. Build new image for webconfig and push to docker hub (ncsudlilibraries/combine_webconfig)
