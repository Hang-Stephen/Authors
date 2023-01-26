const Author = require('../models/author.model');

module.exports.createAuthor = (request, response) => {
    Author.create(request.body)
        .then(newAuthor => response.json(newAuthor))
        .catch(err => response.status(400).json({message: "An error has occured", error:err}));

        
}

module.exports.findAllAuthors = (request, response) => {
    Author.find({})
    .then((allAuthors) => response.json(allAuthors))
    .catch((err) => response.status(400).json(err))
}

module.exports.findOneAuthor = (request, response) => {
    Author.findOne({_id: request.params.id})
        .then((oneAuthor)=> {
            console.log(oneAuthor);
            response.json(oneAuthor);
        })
}

module.exports.findOneAndUpdate = (request, response) => {
    Author.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
    .then(updatedAuthor => response.json(updatedAuthor))
    .catch((err) => response.status(400).json({message: "An error has occured", error:err}))
}

module.exports.deleteAuthor = (request, response) => {
    Author.deleteOne({_id: request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch((err) => console.log(err))
}