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

How to Run
----------
1. Clone the repo and prepare

   ```
   git clone http://github.com/mpancha/Social-Media-Combine
   cd Social-Media-Combine/web-configuration-tool
   npm install;bower install
   ```
2. Create ../lentil/lentil_config.yml and ../sfm/sfm_config.txt files.

   ```
  cp ../lentil/lentil_example_config.yml ../lentil/lentil_config.yml
  cp ../sfm/sfm_example_config.txt ../sfm/sfm_config.txt
  ```
4. Run application

  ```
./start_web_config.sh
  ```
5. Visit http://localhost:8080

