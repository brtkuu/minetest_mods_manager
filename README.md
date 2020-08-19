# Minetest mod manager

Manager tthat enables the user to **search**, **download** and **configure** mod/txp/game in a Minetest server using ContentDB API. Helpful when the game is run in headless mode on a server without a GUI.

## Technologies

Project is created with:

-   Node v12.16.1
-   yargs 15.3.1
-   axios 0.19.2
-   node-downloader-helper 1.0.12
-   extract-zip 2.0.0

## Setup

First you have to get your own access API token then create new file token.txt in minetest folder and copy token to this file. Here you can find information how to generate API token: https://content.minetest.net/help/api/

```bash
$ npm install -g minetest-mod-manager
```

## Commands

**To run any of commands you have to be in directory with minetest files**

-   #### _Search_

    With this command you can search packages using query, type and others.

    ```bash
       $ minetest-manager search -q <querry> -t <type> -h <hide>
    ```

    query - search query
    type - package type (mod, txp, game)
    hide - hide content based on [Content Flags](https://content.minetest.net/help/content_flags/).

-   #### _Download_

    With this command you can download package using author username and package name from ContentDB.

    ```bash
      $ minetest-manager downld -u <author name> -n <package name> -t <package type>
    ```

    author name - author of package
    name - package name
    type - package type

-   #### _Edit world config_

    With this command you can enable or disable options for a given world name

    ```bash
        $ minetest-manager editconf -w <world> -n <mod_name> -e <enabel> -d <disable>
    ```

    world - world name
    mod name - mod name witch you want to change
    enable - set mod on true
    disabel - set mod on false

## Features

-   Create GUI

## Author

    Bartosz Posert
