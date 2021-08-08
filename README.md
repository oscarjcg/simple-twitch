# SimpleTwitch (En desarrollo)



**Web (En desarrollo)**: https://simple-twitch-angular.firebaseapp.com/

<p align="center">
<img style="padding: 2px;" src="images/1.png" alt="Image 1"
	title="Preview" width="500"/>
</p>
<p align="center">
<img style="padding: 2px;" src="images/2.png" alt="Image 2  "
	title="Preview" width="500"/>
</p>

**Descripción:** Versión simplificada de [Twitch](https://www.twitch.tv/directory) (Plataforma de live streaming centrada en juegos)

**Características**:
* Discover: Lista de recomendaciones (Categorias y canales)
* Browse: Lista de categorias y canales
* Categoria: Juego 
* Canal: 
    * Video: Video de Youtube
    * Chat: Comentarios 
* Backend: 
    * Github: https://github.com/oscarjcg/backend-simple-twitch

**Entorno de desarrollo**:
* **Sistema operativo:** Windows 10 64 bits
* **Angular:**  8.2.10
* **Angular CLI:** 8.3.9
* **Node:** 12.11.1
* **bootstrap** 3.4.1

**Docker**:
* Run container with shell
    * `docker compose run --rm -p 3001:3000 personal-web-react bash`
* Inside container install packages and exit
	* `npm install`
	* `exit`
* Run docker compose and it will start npm start (http://localhost:3001)
    * `docker compose up`
* Delete container (not image and node_modules)
    * `docker compose down`