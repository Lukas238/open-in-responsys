# open-in-responsys

CLI node app that let you to open an online htm/html file in Responsys editor or view window using a local file as path map.


## Installation

In a CLI window run this command:
```
npm install orsys -g
```

>**Note**: You must install this package globally to be able to use it anywhere.


## Setup

1. Go to a folder where you already downloaded from Responsys some html files.
	```
	cd C:\Work\campaigns\Campaign1
	```
2. Create a ```orsys.json``` file on folder **Capaign1** and add a ```root``` property with the actual Responsys path to the same folder online.
	```
	{
		"root" : "2017\campaigns1"
	}
	```
	
	
## How to use

>**Note**: You must be already loggedin in Responsys.

### From CLI
Open a CLI windows in the file folder and run this command:

#### For edit
```
orsys filename.htm -e
```

#### For View
```
orsys filename.htm
```

### From Contextual menu
Rigth click any htm/html file to open the contextual menu, and click on ```Responsys\Edit``` to open this file responsys online counterpart.


### TIPS

If your directory tree is a partial match for Responsys directory tree, then you can use a single ```orsys.json``` file in the directory tree root.

#### Example

##### Responsys Dir Tree
```
contentlibrary
 \--- 2015
 \--- 2016
 \--- 2017
		\--- campaign1
		\--- campaign2
		\--- campaign3
```

##### Local Dir Tree
```
C:
 \--- Work
       \--- campaigns		
			\--- campaign1
				shell.htm
			\--- campaign2
			\--- campaign3
			orsys.json  ==> {"root: "2017"}
```


Open ```shell.htm``` will be parsed as ```contentlibrary/2017/campaign1^shell.htm```.


