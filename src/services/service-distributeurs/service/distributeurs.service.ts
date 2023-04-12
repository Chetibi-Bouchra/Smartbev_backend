import distributeur from "../../../models/distributeur";
import models from "../../../models/sequelize";

  type DistributeurModel = typeof models.distributeur
  type BoissonModel = typeof models.boisson

const distributeursService = {
    getByID : async(id : string) : Promise<DistributeurModel> => {
        try {
            const distributeur : DistributeurModel = await models.distributeur.findByPk(id)
            return distributeur
        } catch(err) {
            throw err
        }

    },


    getAll :async () : Promise<DistributeurModel[]>=> {
        try {
            const distributeurs : DistributeurModel[] = await models.distributeur.findAll()
            return distributeurs
        } catch(err) {
            throw err
        }

    }, 

    getAllByClientID :async (id_client : string) : Promise<DistributeurModel[]> => {
        try {
            const distributeurs : DistributeurModel[] = await models.distributeur.findAll({where : {id_client : id_client}})
            return distributeurs
        } catch(err) {
            throw err
        }

        
    },

    add :async (info : any) : Promise<DistributeurModel>=> {
        try {
            const distributeur : DistributeurModel = await models.distributeur.create(info)
            return distributeur
        } catch(err) {
            throw err
        }

        
    }, 
    update : async (info : any, distributeur : DistributeurModel) : Promise<DistributeurModel>=> {
        try {
            distributeur = await distributeur.update(info)
            return distributeur
        } catch(err) {
            throw err
        }


    }, 

    delete :  async(distributeur : DistributeurModel) => {
        try {
            await distributeur.destroy();
        } catch(err) {
            throw err
        }
        
    },

    getBoissonsByID :async (id : string) => {
        try {
            const boissons : BoissonModel [] = models.boisson.findAll({where : {numero_serie_distributeur : id}})
            return boissons
        } catch (err) {
            throw err
        }
        

    }
}

export default distributeursService