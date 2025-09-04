let books = [
{id:1,book:"Clean Code",author:"Robert C. Martin",name:"Sandeep",return:"26/05/2025"},
{id:2,book:"Atomic Habits",author:"James Clear",name:"Martin",return:"25/05/2025"},
{id:3,book:"The Alchemist",author:"Paulo Coelho",name:"Nidhin",return:"28/05/2025"}

];



let container = document.getElementById("container");


function deleted(listid)
{
    let element = document.getElementById(listid);
    container.removeChild(element);
}




function library(id,book1,author1,name1,date1)
{
    let list = document.createElement("li");
    list.classList.add("list");
    list.id="list"+id;
    

    let book = document.createElement("h1");
    book.textContent="BOOK: "+book1;
    book.classList.add("kk");
    list.appendChild(book);

    let author = document.createElement("h2");
    author.textContent="AUTHOR: "+author1;
    author.classList.add("kk");
    list.appendChild(author);

    let name = document.createElement("h3");
    name.textContent="BORROWED BY: "+name1;
    name.classList.add("kk");
    list.appendChild(name);

    let date = document.createElement("h4");
    date.textContent="RETURN DATE: "+date1;
    date.classList.add("kk");
    list.appendChild(date);

    let button = document.createElement("button");
    button.textContent="Remove";
    button.classList.add("btn","btn-secondary");
    list.appendChild(button);
    button.onclick=function()
    {
        deleted(list.id)
    };
    

    container.appendChild(list);
}


for (let item of books)
{
    library(item.id,item.book,item.author,item.name,item.return);
};

