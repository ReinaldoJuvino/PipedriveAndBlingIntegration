const axios = require('axios');
const opportunity = require('../models/opportunityModel');

class Api{
    static async getListOfWonOpportunities(){
        const response = (await axios.get("https://api.pipedrive.com/v1/deals?status=won&api_token=1e5f94a5e12dbb1e75b5a4b1a974a045f53c67e6")).data.data;
        return response;
    }
}

class PipedriveService{ 
    
    static async startIntegration(){
        
        const listOfOpportunities = await Api.getListOfWonOpportunities();
        const listOfOpportunitiesWithDealId = listOfOpportunities.map(opportunityDeal => {
            const id_deal = opportunityDeal.id;
            opportunityDeal['id_deal'] = id_deal;
            delete opportunityDeal['id']
            return opportunityDeal
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
        const savedWihSucessfully = saveds.filter(saved => saved).length
        const savedWithError = saveds.filter(saved => !saved).length
        return `${savedWihSucessfully} novos registros adicionados.\n${savedWithError} registros não adicionados, verifique a causa com o adminsitrador.`
    }
}
PipedriveService.startIntegration().then(v => {console.log(v)});