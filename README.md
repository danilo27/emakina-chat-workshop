Kroz terminal/CMD pozicionirajte se u folder public/js i pokrenite komande:
- npm install
- npm install -g browserify
- browserify main.js > bundle.js

Svu logiku pisati u main.js fajlu. Nakon svake promene koda, potrebno je ponovo pokrenuti gore pomenutu komandu (browserify main.js > bundle.js), kako bi se izgenerisao novi bundle.js fajl.
Otvorite public/index.html fajl u browser-u.

TODO:
1. Konektujte se na socket.io server https://emakina-chat-workshop-full.herokuapp.com/
2. Kreirajte event-ove za slanje i primanje tekstualnih poruka. 
    1. Za slanje poruka, server sluša na ‘chatMessage’ event-ove. 
    2. Sa druge strane, kada server šalje poruke, emituje se event sa id-em ‘message’.
3. Kreirajte event za primanje slika. Server emituje event sa id-em ‘image’.
4. Kreirajte event za primanje glasovnih (audio) poruka. Server emituje event sa id-em ‘voice’.

Uputstva:

Server salje podatke u sledecem formatu:
 
 ``` 
 function formatMessage(username, text, object) {
  return {
    username,
    text,
    object,
    time: moment().format('h:mm a')
  };
}
```
* Username osobe koja salje poruku
* Text 
    * U slucaju tekstualne poruke ovo je sama poruka
    * U slucaju slike, ovo je URL slike
* Object - arraybuffer objekat za audio poruke

Za sve zadatke, iskoristite outputMessage funkciju koja kreira message div sa informacijama o korisniku i vremenu slanja poruke:
![image](https://user-images.githubusercontent.com/23297948/136877967-552b0a6c-69a5-4629-a8ea-65c1a87bee04.png)

https://github.com/danilo27/emakina-chat-workshop
