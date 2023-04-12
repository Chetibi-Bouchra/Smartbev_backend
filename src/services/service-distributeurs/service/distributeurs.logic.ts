import distributeursService from './distributeurs.service';

import models from "../../../models/sequelize";
import { error } from 'console';

  type DistributeurModel = typeof models.distributeur
  type UtilisateurModel = typeof models.utilisateur



const distributeursLogic= {
    getOneByClient :async (id : string, user_id : string) : Promise<DistributeurModel>=> {
        try {
            //find client of user
           const user : UtilisateurModel = await models.utilisateur.findByPk(user_id, {
            attributes: ['id_client']
          })
           
           //distributeurs du client
           const distributeur = await distributeursService.getByID(id)
           if(!distributeur ||user.id_client != distributeur.id_client) {
                return null
           } else {
                return distributeur
            }

        }catch (error) {
                throw error 
            }
    },

    getAllByClient :async (user_id : string) : Promise<DistributeurModel[]> => {
        
        try {
            const user : UtilisateurModel = await models.utilisateur.findByPk(user_id, {
                attributes: ['id_client']
              })
           //distributeurs du client
           const distributeurs = await distributeursService.getAllByClientID(user.id_client)
           return distributeurs
        } catch (error) {
            throw error 
        }
        
    },

    delete : async(id : string) => {
        const distributeur : DistributeurModel = await distributeursService.getByID(id)
        if(!distributeur) {
            throw new Error(`Distributeur with id ${id} does not exist.`);
        } else {
             //un distributeur peut être supprimé seulement s'il n'est pas affecté à aucun client
            if(!distributeur.id_client) {
                distributeursService.delete(distributeur)
            } else {
                throw new Error(`Failed deletion : Distributeur ${id} already belongs to a client`);
            }
        }
       
    },



    updateClient :async (id_dist : string, info : any) => {
        const distributeur : DistributeurModel = await distributeursService.getByID(id_dist)
        if(!distributeur) {
            throw new Error(`Distributeur with id ${id_dist} does not exist.`);
        } else {
            if(!distributeur.id_client) {
                try{
                   return  distributeursService.update({id_client : info.id_client}, distributeur)
                } catch (error){
                    throw error
                }
            }
            else {
                throw new Error(`Distributeur ${id_dist} already belongs to a client ${distributeur.id_client}`);
            }
        }
    },


    update :async (info : any, num_serie : string, user_id? : string) => {
        
        const { date_installation_distributeur, localisation_statique_distributeur, etat_distributeur} = info;
        try {
            
            const distributeur : DistributeurModel = await distributeursService.getByID(num_serie)
            if(!distributeur) {
                throw new Error("Distributeur not found")
            }


            if(user_id) {
                const user : UtilisateurModel = await models.utilisateur.findByPk(user_id, {
                    attributes: ['id_client']
                  })
                  
                if(user.id_client != distributeur.id_client) {
                    throw new Error("Distributeur not found")
                    
                }
            }

            return  distributeursService.update(
                {   date_installation_distributeur: date_installation_distributeur ?? distributeur.date_installation_distributeur,
                    localisation_statique_distributeur: localisation_statique_distributeur ?? distributeur.localisation_statique_distributeur,
                    etat_distributeur: etat_distributeur ?? distributeur.etat_distributeur }, 
                distributeur)

        } catch(error : any) {
            throw error
        }
    },




}


export default distributeursLogic