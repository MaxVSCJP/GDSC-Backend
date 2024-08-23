const express = require("express");
const mongoose = require("mongoose");
const Books = require("../Models/BookModel"); 


exports.AddBook = (req, res) => {
    const {Title, Author, Publish, Genre, Copies} = req.body;
    let newBook = new Books({
        Title: Title,
        Author: Author,
        Publish: Publish,
        Genre: Genre,
        NumberOfCopies: Copies
    });
    newBook.save()
        .then((data) => {
            console.log(data);
            res.status(201);
            res.json(JSON.stringify({Status: "Successful"}));
        })
        .catch((err) => {
            console.log(err + "Failed to Add Book");
            res.json(JSON.stringify({Status: "Failed"}));
        });

}


exports.DeleteBook = (req, res) => {
    const {Title} = req.body;
    Books.deleteOne({Title: Title})
        .then((result) => {
            
            if (result.deletedCount === 0){
                res.status(404).send();
            }
            else{
                res.status(204).send();

            }
        })
        .catch((err) => {
            console.log(err + "Failed to Delete Book");
            res.status(500).send();
        });
    
}


exports.SearchBook = (req, res) => {
    Books.find({Title: {$regex: req.params.title, $options: "i"}})
    .then(books =>{
        console.log(books);
        res.json(JSON.stringify({
            Status: "Successful",
            books}));
    })
    .catch(err => {
        console.log(err);
        res.json(JSON.stringify({Status: "Failed"}));
    });
}


exports.EditCopy = (req, res) => {
    const {Title, Copies} = req.body;
    Books.updateOne({Title: Title}, {NumberOfCopies: Copies})
        .then((result) => {
            if (result.matchedCount === 0){
                res.status(404).send();
            }
            else{
                res.status(204).send();
            }
        })
        .catch((err) => {
            console.log(err + "Failed to Delete Book");
            res.status(500).send();
        });
    
}