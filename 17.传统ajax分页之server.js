const express = require('express');
const path = require('path');

const app = express();
//托管静态资源
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"./18.传统ajax分页.html"));
});

app.get("/blog",(req,res) => {
    let blogs = require("./blog.json");
    let page = req.query.page || 1;
    let pagesize = req.query.pagesize;
    let start = ( page - 1 ) * pagesize;
    let end = start + +pagesize;
    console.log(start,end);
    let blog = blogs.slice(start,end);
    //获取总的记录数
    let total = blogs.length;
    //获取总的页数
    let pagenum = Math.ceil(total / pagesize);
    res.json({
        blog,
        total,
        pagenum,
        page
    });
});

app.listen(5000,() => {
    console.log("5000 ok");
});
