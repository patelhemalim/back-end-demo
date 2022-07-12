let movies = require('./db.json');
let globalID=11;
module.exports = {
    getMovies: (req, res) =>{
        res.status(200).send(movies)
    },
    deleteMovie:(req,res)=>{
        let index=movies.findIndex(elem=>elem.id===+req.params.id)
            movies.splice(index,1);
            res.status(200).send(movies)
    },
    createMovie:(req,res)=>{
        //console.log(req.body)
        const{title,rating,imageURL}=req.body;
        let newMovie={
            id:globalID,
            title:title,
            rating:+rating,
            imageURL
        }
        movies.push(newMovie);
        globalID++;
        res.status(200).send(movies)
    },
    updateMovie:(req,res)=>{
        const{type}=req.body;
        //console.log(req,body)
        let index=movies.findIndex(elem=>elem.id===+req.params.id)
        if(type==='minus'&& movies[index].rating>1){
            movies[index].rating-=1;
            res.status(200).send(movies);
        }else if (type==='plus'&& movies[index].rating<5){
            movies[index].rating+=1;
            res.status(200).send(movies);
        }else {
            res.status(400).send('No more stars')
        }
    }    
}
