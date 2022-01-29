const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {

    //Пишем ответ на "/" запрос
    if(req.url === "/") {
        //Устанавливаем хедер ответа где указываем Content-type
        res.writeHead(200, {'Content-Type': 'text/html'})

        //Заносим в переменную содержимое нашего html файла
        const mainMarkup = fs.readFileSync(path.join(__dirname, 'views', 'MainPage', 'index.html'), 'utf-8', (err, data) => {
            if(err) throw new Error(err)
            return data
        })

        //Заносим в переменную содержимое файла стилей (style.css)
        const mainStyles = fs.readFileSync(path.join(__dirname, "views", "MainPage", "style.css"), 'utf-8', (err, content) => {
            if(err) throw new Error(err)
            return content
        })

        //подготавливаем нашу строку где в конце уберем последние два закрывающих тега </body></html>
        //для того что бы внести наши стили
        const prepareMarkup = mainMarkup.split('</body>/n</html>').toString()
        
        //и наконец составляем одну цельную строку с разметкой и вносим стили в тег <style>,
        //после чего добавляем обратно закрывающие теги </body></html>
        res.end(
        prepareMarkup + `<style>${mainStyles}</style>` + "</body></html>"
        )
    }
})

server.listen(3000, () => {
    console.log("server has run")
})