const axios = require('axios');
// const opportunityController = require('../controller/opportunityController');
const opportunity = require('../models/opportunityModel');

class Api{

    static async getListOfWonOpportunitiesByPosition(indice){
        const response = (await axios.get("https://api.pipedrive.com/v1/deals?status=won&api_token=1e5f94a5e12dbb1e75b5a4b1a974a045f53c67e6")).data.data[indice];
        return response;
    }
    static async getListOfWonOpportunities(){
        const response = (await axios.get("https://api.pipedrive.com/v1/deals?status=won&api_token=1e5f94a5e12dbb1e75b5a4b1a974a045f53c67e6")).data.data;
        return response;
    }
}

// Api.getListOfWonOpportunities().then(v => {console.log(v)});

class PipedriveService{ 
    
    static async startIntegration(){
        
        const listOfOpportunities = await Api.getListOfWonOpportunities();
        const listOfOpportunitiesWithDealId = listOfOpportunities.map(opp => {
            const id_deal = opp.id;
            opp['id_deal'] = id_deal;
            delete opp['id']
            return opp
        });
        const oppotunitiesToSave = listOfOpportunitiesWithDealId.map(async opportunityInResponse => {
            const newOpportunity = new opportunity(opportunityInResponse);
            return newOpportunity.save((error)=>{
                if (error) {
                    return false;
                }
                return true;
            })            
        });
        const saveds = await Promise.all(oppotunitiesToSave)
        const savedWihSucesscful = saveds.filter(saved => saved).length
        const savedWithError = saveds.filter(saved => !saved).length
        return `${savedWihSucesscful} novos registros adicionados.\n${savedWithError} registros não adicionados, verifique a causa com o adminsitrador.`
    }
}
PipedriveService.startIntegration().then(v => {console.log(v)});