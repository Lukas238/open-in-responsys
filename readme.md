# orsys

Use local htm/html filename and path as a quick shortcut to open the online matching file on the edit or view preview window in [Responsys].

## Options

 Usage: orsys [options] <file>


  Options:

    -e, --edit                        Open the file on an edit windows in Responsys.
    -b, --browser <browserName>       Define the browser to be used to open the file (ex.: "chrome", "firefox").
    -i, --initialize [ResponsysRoot]  Creates "orsys.json" configuration file in the current folder.
    -a, --win-contextmenu-add         Add Responsys contextual menu. Win only.
    -r, --win-contextmenu-remove      Remove Responsys contextual menu. Win only.
    -h, --help                        Output usage information


## Install

```
npm install orsys -g
```
>**Note**: You must install this package globally to be able to use it anywhere from the CLI.

### Contextual menu (Windows only)

To add or remove the contextual menu in windows, use this commands:

- Add contextual menu
	```
	orsys -a
	```
- Remove contextual menu
	```
	orsys -r
	```



## Configuration

The tool expect an ```orsys.json``` configuration file, next -or in a parent folder- to the files you want to open in Responsys, with the online path for the the local files you want to open.

Use this command to create the config file:
```
orsys -i [responsys root folder]
``` 

> If empty the tool will default to **"contentlibrary"**.


## How to use

>**Note**: You must be already loggedin in Responsys in the default browser.

There are tree ways to use [orsys].

### 1. From the command line
Open a CLI windows in the file folder and run one of the following commands:

- View:
	```
	orsys C:\work\filename.htm
	```
- Edit: 
	```
	orsys -e C:\work\filename.htm
	```
	
### 2. From contextual menu (Windows only)

Rigth click any htm/html file to open the contextual menu, and click on ```Responsys\Edit``` to open this file responsys online counterpart.

![Contextual menu](docs/contextual_menu.png)


### 3. [VSCode] custom task

Confugure a custom task in [VSCode] to launch the current open file in Responsys.

Here is an example task file that add the tasks **rsysedit** and **rsysview**.
```
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "taskName": "rsysedit",
            "type": "shell",
            "command": "orsys -e ${file}",
            "presentation": {
                "reveal": "never"
            }
        },
        {
            "taskName": "rsysview",
            "type": "shell",
            "command": "orsys ${file}",
            "presentation": {
                "reveal": "never"
            }
        }
    ]
}
```

## Example use case

Take as reference this **loca** folders tree:

```
C:.
+---Work
    \---campaigns        
        +---campaign1
        |    \---shell.htm
        +---campaign2
        |    \---shell.htm
        \---- campaign3
            \---shell.htm
```

And this Responsys **online** folders tree:

```
contentlibrary
    +---2015
    +---2016
    \---2017
        +--- campaign1
		|    \----shell.htm
        +---campaign2
		|    \----shell.htm
        \---campaign3
		     \----shell.htm
```


We want to map all the local folders under **C:\Work\campaigns\\** relative to the online Responsys path **contentlibrary\2017**.

So, our RSYS _root_ folder will be: **contentlibrary/2017**.

To create the corresponding config file, open a CLI windows on **C:\Work\campaigns** and use this command:
```
C:\Work\campaigns>orsys -i contentlibrary\2017
```

[orsys]: https://github.com/Lukas238/orsys
[VSCode]: https://code.visualstudio.com/
[Responsys]: https://www.oracle.com/marketingcloud/products/cross-channel-orchestration/