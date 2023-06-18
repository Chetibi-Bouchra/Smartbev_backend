
import Models from '../../../models/sequelize'
import { Sequelize, Op, fn, col } from 'sequelize';




// Initialize the models
const Commande = Models.commande;
const Paiement = Models.paiement;
const Panne = Models.panne;
const Boisson = Models.boisson;
const Distributeur = Models.distributeur;
const Utilisateur  = Models.utilisateur;






class StatistiquesManagementService {

  

    async getSuccessfulOrdersCountByPeriod(periodType: string, month: number, year: number, id : number): Promise<number> {
        let startDate: Date;
        let endDate: Date;

    if (periodType === 'mois') {
         //Si par exemple, on donne 06 pour mois (le mois de juin) on soustrait 1 car les mois sont indexés de 0 à 11 pour cette fonction
      startDate = new Date(year, month - 1, 1);
      //En passant 0 pour jour, celà signifie le dernier jour du mois précédent
      endDate = new Date(year, month, 0);
    } else if (periodType === 'annee') {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
    } else if (periodType === 'semaine') {
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);

      const firstDayOfWeek = this.getFirstDayOfWeek(firstDayOfMonth);
      const lastDayOfWeek = this.getLastDayOfWeek(lastDayOfMonth);

      startDate = firstDayOfWeek;
      endDate = lastDayOfWeek;
      
    } else {
      throw new Error('Période invalide. Veuillez spécifier le mois , l annee ou la semaine.');
    }

    //Récupérer le client concerné 
    const client = await Utilisateur.findOne({
      where: {
        id_utilisateur: id,
      },
    });

    if (!client) {
      throw new Error('Client introuvable.');
    }

    //Récupérer les distributeurs du client
    const distributeurs = await Distributeur.findAll({
      where: {
        id_client: client.id_client,
      }
    })

    const numerosSerieDistributeurs = distributeurs.map((distributeur) => distributeur.numero_serie_distributeur);


    
        // Implémentation pour le nombre de commandes réussies par période
        const successfulOrdersCount = await Commande.count({
          where: {
            etat_cmd: 'Completed',
            time_cmd: {
                [Op.between]: [startDate, endDate],
              },
            numero_serie_distributeur: {
                [Op.in]: numerosSerieDistributeurs,
              },
          },
        });

        console.log(successfulOrdersCount);
    
        return successfulOrdersCount;
      }

      


    async getFailedOrdersCountByPeriod(periodType: string, month: number, year: number, id: number): Promise<number> {

        let startDate: Date;
        let endDate: Date;
    
        if (periodType === 'mois') {
          startDate = new Date(year, month - 1, 1);
          endDate = new Date(year, month, 0);
        } else if (periodType === 'annee') {
          startDate = new Date(year, 0, 1);
          endDate = new Date(year, 11, 31);
        } else if (periodType === 'semaine') {
          const firstDayOfMonth = new Date(year, month - 1, 1);
          const lastDayOfMonth = new Date(year, month, 0);
    
          const firstDayOfWeek = this.getFirstDayOfWeek(firstDayOfMonth);
          const lastDayOfWeek = this.getLastDayOfWeek(lastDayOfMonth);
    
          startDate = firstDayOfWeek;
          endDate = lastDayOfWeek;
        } else {
          throw new Error('Période invalide. Veuillez spécifier le mois , l annee ou la semaine.');
        }

        const client = await Utilisateur.findOne({
          where: {
            id_utilisateur: id,
          },
        });
    
        if (!client) {
          throw new Error('Client introuvable.');
        }
    
        //Récupérer les distributeurs du client
        const distributeurs = await Distributeur.findAll({
          where: {
            id_client: client.id_client,
          }
        })
    
        const numerosSerieDistributeurs = distributeurs.map((distributeur) => distributeur.numero_serie_distributeur);

        // Implémentation pour le nombre de commandes défaillantes par période
        const failedOrdersCount = await Commande.count({
          where: {
            etat_cmd: 'Failed',
            time_cmd: {
                [Op.between]: [startDate, endDate],
              },
            numero_serie_distributeur: {
                [Op.in]: numerosSerieDistributeurs,
              },
          },
        });
    
        return failedOrdersCount;
      }

      async getSuccessfulPaymentCountByPeriod(periodType: string, month: number, year: number, id: number): Promise<number> {
        let startDate: Date;
        let endDate: Date;

    if (periodType === 'mois') {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else if (periodType === 'annee') {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
    } else if (periodType === 'semaine') {
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);

      const firstDayOfWeek = this.getFirstDayOfWeek(firstDayOfMonth);
      const lastDayOfWeek = this.getLastDayOfWeek(lastDayOfMonth);

      startDate = firstDayOfWeek;
      endDate = lastDayOfWeek;
    } else {
      throw new Error('Période invalide. Veuillez spécifier le mois , l annee ou la semaine..');
    }

    //Récupérer le client concerné 
    const client = await Utilisateur.findOne({
      where: {
        id_utilisateur: id,
      },
    });

    if (!client) {
      throw new Error('Client introuvable.');
    }

    //Récupérer les distributeurs du client
    const distributeurs = await Distributeur.findAll({
      where: {
        id_client: client.id_client,
      }
    })

    const numerosSerieDistributeurs = distributeurs.map((distributeur) => distributeur.numero_serie_distributeur);

    const commandes = await Commande.findAll({
      where: {
        numero_serie_distributeur: {
          [Op.in]: numerosSerieDistributeurs,
        },
      }
    })

    const numerosCommandes = commandes.map((commande) => commande.id_cmd);
        // Implémentation pour le nombre de commandes réussies par période
        const successfulPaymentCount = await Paiement.count({
          where: {
            status: 'Completed',
            date_paiement: {
                [Op.between]: [startDate, endDate],
              },
            id_cmd: {
              [Op.in]: numerosCommandes,
            }
          },
        });
    
        return successfulPaymentCount;
      }


      async getFailedPaymentCountByPeriod(periodType: string, month: number, year: number, id: number): Promise<number> {
        let startDate: Date;
        let endDate: Date;

    if (periodType === 'mois') {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else if (periodType === 'annee') {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
    } else if (periodType === 'semaine') {
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);

      const firstDayOfWeek = this.getFirstDayOfWeek(firstDayOfMonth);
      const lastDayOfWeek = this.getLastDayOfWeek(lastDayOfMonth);

      startDate = firstDayOfWeek;
      endDate = lastDayOfWeek;
    } else {
      throw new Error('Période invalide. Veuillez spécifier le mois , l annee ou la semaine.');
    }
    //Récupérer le client concerné 
    const client = await Utilisateur.findOne({
      where: {
        id_utilisateur: id,
      },
    });

    if (!client) {
      throw new Error('Client introuvable.');
    }

    //Récupérer les distributeurs du client
    const distributeurs = await Distributeur.findAll({
      where: {
        id_client: client.id_client,
      }
    })

    const numerosSerieDistributeurs = distributeurs.map((distributeur) => distributeur.numero_serie_distributeur);

    const commandes = await Commande.findAll({
      where: {
        numero_serie_distributeur: {
          [Op.in]: numerosSerieDistributeurs,
        },
      }
    })

    const numerosCommandes = commandes.map((commande) => commande.id_cmd);
        // Implémentation pour le nombre de commandes réussies par période
        const FailedPaymentCount = await Paiement.count({
          where: {
            status: 'Failed',
            date_paiement: {
                [Op.between]: [startDate, endDate],
              },
            id_cmd: {
                [Op.in]: numerosCommandes,
              }
          },
        });
    
        return FailedPaymentCount;
      }


    async getRepairedPannesCountByPeriodAndUser(periodType: string, month: number, year: number, userId: number): Promise<number> {
        let startDate: Date;
        let endDate: Date;
    
        if (periodType === 'mois') {
          startDate = new Date(year, month - 1, 1);
          endDate = new Date(year, month, 0);
        } else if (periodType === 'annee') {
          startDate = new Date(year, 0, 1);
          endDate = new Date(year, 11, 31);
        } else if (periodType === 'semaine') {
          const firstDayOfMonth = new Date(year, month - 1, 1);
          const lastDayOfMonth = new Date(year, month, 0);
    
          const firstDayOfWeek = this.getFirstDayOfWeek(firstDayOfMonth);
          const lastDayOfWeek = this.getLastDayOfWeek(lastDayOfMonth);
    
          startDate = firstDayOfWeek;
          endDate = lastDayOfWeek;
        } else {
          throw new Error('Période invalide. Veuillez spécifier le mois , l annee ou la semaine.');
        }
    
        const repairedPannesCount = await Panne.count({
          where: {
            etat_panne: 'Reparee',
            date_panne: {
              [Op.between]: [startDate, endDate],
            },
            id_utilisateur: userId,
          },
        });
    
        return repairedPannesCount;
      }

      //Retourne les revenus selon le type de la boisson. Il suffit de fournir le nom de la boisson
      async getRevenuesByBoisson(boissonId: number): Promise<number> {
          const commandes = await Commande.findAll({
            where: {
              id_boisson: boissonId,
              etat_cmd: 'Completed',
            },
            attributes: [[fn('SUM',col('prix_cmd')), 'totalRevenues']],
            raw: true,
          });
      
          if (commandes.length > 0 && commandes[0].totalRevenues) {
            return commandes[0].totalRevenues;
          }
      
        return 0;
      }
      


      private getFirstDayOfWeek(date: Date): Date {
        const dayOfWeek = date.getDay();
        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
        return firstDayOfWeek;
      }

      private getLastDayOfWeek(date: Date): Date {
        const dayOfWeek = date.getDay();
        const lastDayOfWeek = new Date(date);
        lastDayOfWeek.setDate(date.getDate() + (6 - dayOfWeek));
        return lastDayOfWeek;
      }

      //Renvoie un tableau permettant d'avoir une vue globale sur les distributeurs et leur temps réel
      async getDistributeursEtatsEnTempsReel(id: number): Promise<{ etat_distributeur: string, nombre: number }[]> {

        const client = await Utilisateur.findOne({
          where: {
            id_utilisateur: id,
          },
        });

        const distributeurs = await Distributeur.findAll({
          where: {
            id_client: client.id_client,
          },
          attributes: ['etat_distributeur', [fn('COUNT', col('numero_serie_distributeur')), 'nombre']],
          group: ['etat_distributeur'],
        });
    
        return distributeurs.map((distributeur) => ({
          etat_distributeur: distributeur.etat_distributeur,
          nombre: distributeur.getDataValue('nombre'),
        }));
      }
      

      async calculateDistributorUtilizationRate(id: number): Promise<{ numeroSerieDistributeur: string; tauxUtilisation: number }[]> {
        // Récupérer le client
        
        const client = await Utilisateur.findOne({
          where: {
            id_utilisateur: id,
          },
        });

        if (!client) {
          throw new Error('Client introuvable.');
        }
    
        //Récupérer les distributeurs du client
        const distributeurs = await Distributeur.findAll({
          where: {
            id_client: client.id_client,
          }
        })
       
              
        // Récupérer les distributeurs du client
        const numerosSerieDistributeurs = distributeurs.map((distributeur) => distributeur.numero_serie_distributeur);
        console.log(numerosSerieDistributeurs);
      
        // Récupérer le nombre total de commandes du client
        const totalCommandes = await Commande.count({
          where: {
            numero_serie_distributeur: {
              [Op.in]: numerosSerieDistributeurs,
            },
          },
        });
      
        
        // Calculer le taux d'utilisation pour chaque distributeur
  const tauxUtilisationDistributeurs = await Promise.all(
    distributeurs.map(async (distributeur) => {
      const nombreCommandesDistributeur = await Commande.count({
        where: {
          numero_serie_distributeur: distributeur.numero_serie_distributeur,
        },
      });

      const tauxUtilisation = ((nombreCommandesDistributeur / totalCommandes) * 100).toFixed(2);

      return {
        numeroSerieDistributeur: distributeur.numero_serie_distributeur,
        tauxUtilisation,
      };
    })
  );

  return tauxUtilisationDistributeurs;
      }
       
      

}
  
export default StatistiquesManagementService;