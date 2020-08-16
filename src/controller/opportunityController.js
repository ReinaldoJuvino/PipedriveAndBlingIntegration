const opportunity = require('../models/opportunityModel')

module.exports = {

    async index(request, response){
        await opportunity.find()
            .then(opportunities => response.json(opportunities))
            .catch(err => response.status(400).json(`Error ${err}`))
    }, 
    add(request, response){
        const body = request.body;
        console.log(body);
        const newOpportunity = new opportunity(body);
        
        newOpportunity.save((error)=>{
            if (error) {
                res.status(500).json({ msg: 'Sorry, internal server errors' });
                return;
            }
            return response.json({mensagem: "Saved"})
        })
    }
}
