

# Dreamvortex - Text-based game

- DreamVortex - Game Application
  - [Description](#description)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Testing](#testing)
  - [Game API Class](#game-api-class)
  - [Endpoints](#endpoints)
  - [Credits](#credits)

## Description


## Tech Stack

This application was developed with the support of the following tools:

- Programming languages: [JavaScript](https://www.javascript.com)
- Libraries/Frameworks: [Express](https://expressjs.com), [React](https://react.dev), [Node.js](https://nodejs.org/en), [Bootstrap](https://getbootstrap.com), [Sequelize](https://sequelize.org/docs/v6/getting-started/)
- Database storage and management: [PostgreSQL](https://www.postgresql.org)


## Installation

### Package installation

To install all the packages on both the frontend and backend, run:

```shell
$ node run client
```

### Database

This application was developed using PostgreSQL database. To connect to the database, you'll need to create a [Sequelize](https://sequelize.org/docs/v6/getting-started/) instance. This can be achieved by renaming the .env-example file in the server directory to .env. Then, you'll provide the connection parameters within each variable of the .env file. The config.js file, located in server/config, will read these variables and construct the Sequelize URI for you.

Database variables:

POSTGRES_URL
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE

## Front-end API class

The frontend interacts with the backend server through the wrapper class API located in client/src/helpers/GameAPI.js. B

There are two ways to configure the API URL:

- Manual Change: You can directly modify the URL within the GameAPI class

- Environment Variable: Create a .env file in the client directory and define a variable named REACT_APP_API_URL 

After package installation and database connection, to set the application live, run the following command from the server directory: 

```shell
$ npm start
```
## Testing

Sequelize relies on environment variables stored in a .env file to build the connection string (URI) for your database. To prevent accidental data loss, it's highly recommended to define a separate database name specifically for testing purposes in your .env file.  Creating a "database_test name" that is different from the non-testing database name in the .env file avoids overwriting your local development database with the test database data.

## Game API class

The frontend interacts with the backend server through the wrapper class GameAPI located in client/src/helpers/GameAPI.js. Rename the second .env-example located in the client directory to .env. and define the base application URL that will connect to the back-end to the variable REACT_APP_API_URL.

There are two ways to configure the API URL:

- Manual Change: You can directly modify the URL within the GameAPI class

- Environment Variable: Create a .env file in the client directory and define a variable named REACT_APP_API_URL 

## Endpoints

### GET

api/setting
```
{
	"settings": [
			{
				"name": "forest",
				"background_pic": "images/settings/forest2.png",
				"character": "hooded_figure"
			},
			{
				"name": "desert",
				"background_pic": "images/settings/desert.gif",
				"character": "snake"
			},
	    		{...}
		    ]
}
```

api/setting/id
```
{
	"setting": {
		"name": "forest",
		"background_pic": "images/settings/forest2.png",
		"character": "hooded_figure",
		"dialogues": [
			{
				"id": "F1",
				"text": "As the sun dips below the horizon, casting long shadows through ancient trees, you find yourself deep within a dense forest. The air is thick with an otherworldly aura, and the silence is broken only by the rustle of leaves underfoot...",
				"opening_text": true,
				"ending_text": false,
				"transition_to_setting": null,
				"current_setting_name": "forest",
				"choices": [
						{
							"id": "F-CB",
							"choice_text": "Embark on a mystical journey deeper into the unknown forest.",
							"final_choice": false,
							"dialogue_id_from": "F1",
							"dialogue_id_to": "F2B"
						},
						{
							"id": "F-CA",
							"choice_text": "Seek guidance from whispers in towering trees.",
							"final_choice": false,
							"dialogue_id_from": "F1",
							"dialogue_id_to": "F2A"
						}
						{
							"id": "F2A",
							"text": "You have chosen the path less traveled. The forest responds to your curiosity. Yet, challenges....",
						}
 						{...}
					]
			},
		{...}
		]
}
```

api/player
```
	{
	"players": [
			{
				"player_id": "player_1",
				"createdAt": "2024-02-28T00:51:11.445Z",
				"updatedAt": "2024-02-28T00:51:11.445Z"
			},
			{
				"player_id": "player_2",
				"createdAt": "2024-02-28T03:00:34.478Z",
				"updatedAt": "2024-02-28T03:00:34.478Z"
			},
			{
				"player_id": "player_3",
				"createdAt": "2024-02-29T17:39:59.389Z",
	   			...
				
			},
			{...}
		]
	}
```

api/player/id
```
{
	"player": {
		"player_id": "player_1",
		"createdAt": "2024-02-28T00:51:11.445Z",
		"updatedAt": "2024-02-28T00:51:11.445Z",
		"saved_game": [
			{
				"id": 18,
				"act": 2,
				"setting": "city",
				"createdAt": "2024-02-28T00:51:16.369Z",
				"updatedAt": "2024-02-28T00:52:06.217Z",
				"player_id": "player_1",
				"dialogue_id": "C1",
				"concluded_settings": [
    
					{
						"setting_name": "prologue"
					},
					{
						"setting_name": "forest"
					}
				]
			}
		]
	}
}
```

api/gameslot
```
{
	"game_slots": [
			{
				"id": 3,
				"act": 2,
				"setting": "city",
				"createdAt": "2024-02-28T00:51:16.369Z",
				"updatedAt": "2024-02-28T00:52:06.217Z",
				"player_id": "player_1",
				"dialogue_id": "C1"
			},
			{
				"id": 5,
				"act": 1,
				"setting": "desert",
				"createdAt": "2024-02-28T03:00:40.798Z",
				"updatedAt": "2024-02-28T03:01:04.760Z",
				"player_id": "player_2",
				"dialogue_id": "D1"
			},
	  		{...}
                     ]
}
```

api/gameslot/id
```
{
	"game": {
		"id": 3,
		"act": 2,
		"setting": "city",
		"createdAt": "2024-02-28T00:51:16.369Z",
		"updatedAt": "2024-02-28T00:52:06.217Z",
		"player_id": "player_1",
		"dialogue_id": "C1",
		"concluded_settings": [
  
			{
				"setting_name": "prologue"
			},
			{
				"setting_name": "forest"
			}
		]
	}
}
```

api/progress
```
{
	"progress": [
			{
				"id": 1,
				"createdAt": "2024-02-28T00:51:32.526Z",
				"updatedAt": "2024-02-28T00:51:32.526Z",
				"saved_game_id": 3,
				"setting_name": "prologue"
			},
			{
				"id": 2,
				"createdAt": "2024-02-28T00:52:05.404Z",
				"updatedAt": "2024-02-28T00:52:05.404Z",
				"saved_game_id": 3,
				"setting_name": "forest"
			},
			{...},
		]
}
```

## Credits

### Audio:

- Chiptune sound: https://pixabay.com/sound-effects/collect-ring-15982/
- Opening sequence music (Morbid Curiosity): https://freemusicarchive.org/music/rhapsody/single/a-morbid-curiosity-chiptune-version/

### Images:

- City (main menu): https://mrwallpaper.com/wallpapers/interactive-cityscape-sunset-wi846llj22rz7sa9.html
- Ocean: https://gifdb.com/gif/sunrise-ocean-pixel-fxxn1c95tqe1wzbo.html
- Forest: https://dribbble.com/shots/6866155-Some-trees
- Desert: https://www.deviantart.com/camilaxiao/art/Pixel-Art-Desert-Landscape-890087305
- Sky: https://gifer.com/en/Ir4 
- Urban: https://www.pinterest.com/pin/313985405260907273/




POSTGRES_URL
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
