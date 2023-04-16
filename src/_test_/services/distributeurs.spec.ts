import models from '../../models/sequelize';
import distributeursService from '../../services/service-distributeurs/service/distributeurs.service';
import distributeursLogic from '../../services/service-distributeurs/service/distributeurs.logic';


describe('Service de gestion de distributeurs', () => {

    describe("Recuperer un distributeur par son identifiant", () => {
        it("Retourne un objet distributeur quand elle reçoit un identifiant", async () => {
            const num_serie = '1RE45'
            const expectedDistributeur = {numero_serie_distributeur : num_serie}
            const findByPkSpy = spyOn(models.distributeur, 'findByPk').and.returnValue(expectedDistributeur)

            const result = await distributeursService.getByID(num_serie)
            expect(findByPkSpy).toHaveBeenCalledWith(num_serie)
            expect(result).toEqual(expectedDistributeur)
        });

        it("Retourne un distributeur si seulement s'il appartient au client de l'utilisateur",async () => {
            const num_serie = '1RE45ER';
            const user_id = 'AM6709';
            const client = 'client8';

            const expectedDistributeur = {numero_serie_distributeur : num_serie, id_client : client}


            //mock : user
            spyOn(models.utilisateur, 'findByPk').and.returnValue(Promise.resolve({id_client : client}))

            //mock : distributeur
            spyOn(distributeursService, 'getByID').and.returnValue(Promise.resolve(expectedDistributeur));

            //Appel de la méthode à tester
            const result = await distributeursLogic.getOneByClient(num_serie, user_id);

            //Assertions 
            expect(result).toEqual(expectedDistributeur);
            expect(models.utilisateur.findByPk).toHaveBeenCalledWith(user_id, {
                attributes: ['id_client']
              })
            expect(distributeursService.getByID).toHaveBeenCalledWith(num_serie);

        })

        it("Retourne null si le distributeur n'appartient pas au même client que l'utilisateur",async () => {
            const num_serie = '1RE45ER';
            const user_id = 'AM6709';

            const expectedDistributeur = {numero_serie_distributeur : num_serie, id_client : "client6"}

            //mock : use
            spyOn(models.utilisateur, 'findByPk').and.returnValue(Promise.resolve({id_client : "client24"}))

            //mock : distributeur
            spyOn(distributeursService, 'getByID').and.returnValue(Promise.resolve(expectedDistributeur));

            //Appel de la méthode à tester
            const result = await distributeursLogic.getOneByClient(num_serie, user_id);

            //Assertions 
            expect(result).toEqual(null);
            expect(models.utilisateur.findByPk).toHaveBeenCalledWith(user_id, {
                attributes: ['id_client']
              })
            expect(distributeursService.getByID).toHaveBeenCalledWith(num_serie);
        })

    }) 




    describe("Recuperer la liste des distributeurs", () => {
        it("Retourne la liste des distributeurs appartenant au client de l'utilisateur s'il existe",async () => {
            const user_id = 'AM6709';
            const client = '2';
            const expectedDistributeurs = [
                { id: '1', id_client: client },
                { id: '2', id_client: client },
                { id: '3', id_client: client }
              ];

            //mocks : 
            spyOn(models.utilisateur, 'findByPk').and.returnValue(Promise.resolve({id_client : client}))
            spyOn(distributeursService, 'getAllByClientID').and.returnValue(Promise.resolve(expectedDistributeurs));

            const result = await distributeursLogic.getAllByClient(user_id);

            expect(result).toEqual(expectedDistributeurs)
            expect(models.utilisateur.findByPk).toHaveBeenCalledWith(user_id, {
                attributes: ['id_client']
              })
            expect(distributeursService.getAllByClientID).toHaveBeenCalledWith(client);
        })

        it("Retourne une liste vide si aucun distributeur appartient au client de l'utilisateur",async () => {

            const user_id = 'AC340F';
            const client = 'client7';

            //mocks : 
            spyOn(models.utilisateur, 'findByPk').and.returnValue(Promise.resolve({id_client : client}))
            spyOn(distributeursService, 'getAllByClientID').and.returnValue(Promise.resolve([]));

            const result = await distributeursLogic.getAllByClient(user_id);

            expect(result).toEqual([])
            expect(models.utilisateur.findByPk).toHaveBeenCalledWith(user_id, {
                attributes: ['id_client']
              })
            expect(distributeursService.getAllByClientID).toHaveBeenCalledWith(client);
        })

    
    })


    describe("Creer une nouvelle ressource de type distributeur",() => {
        let Mock
        beforeEach(()=> {
            const exist : string = "1245"
            Mock = spyOn(models.distributeur, 'create').and.callFake((info : any) => {
                if(info.numero_serie_distributeur == exist || !info.numero_serie_distributeur) {
                    return Promise.resolve(null)
                } else {
                    return Promise.resolve({
                        numero_serie_distributeur : info.numero_serie_distributeur
                      });
                }
            })

        })

        afterEach(()=> {
            models.distributeur.create.calls.reset()
        })



        it("crée un nouveau distributeur et retourne l'objet",async () => {
            const info = {
                numero_serie_distributeur : '1246'
            }
            const result = await distributeursService.add(info)
            expect(models.distributeur.create).toHaveBeenCalledWith(info);
            expect(result).toBeDefined();
            expect(result).toEqual(info)
        })

        
        it("retourne null si le numero de serie est déjà utilisé",async () => {
            const info = {
                numero_serie_distributeur : '1245'
            }
            const result = await distributeursService.add(info)
            expect(models.distributeur.create).toHaveBeenCalledWith(info);
            expect(result).toBeDefined();
            expect(result).toEqual(null)

        })

        it("retourne null si aucun numero de serie est fourni",async () => {
             const info = {
                numero_serie_distributeur : ''
            }
            const result = await distributeursService.add(info)
            expect(models.distributeur.create).toHaveBeenCalledWith(info);
            expect(result).toBeDefined();
            expect(result).toEqual(null)

        })
    })


    describe("Supprimer un distributeur portant l'identifiant id",() => {


        it("Supprime un distributeur s'il exist - method : distributeurLogic.Delete",async () => {
            const num_serie : string = "12FR45"

            const distributeur = {numero_serie_distributeur : num_serie, id_client : ""}

            spyOn(distributeursService, 'getByID').and.returnValue(Promise.resolve(distributeur));
            spyOn(distributeursService, 'delete').and.returnValue(Promise.resolve());

            await distributeursLogic.delete(num_serie);
            
            expect(distributeursService.getByID).toHaveBeenCalledWith(num_serie);
            expect(distributeursService.delete).toHaveBeenCalledWith(distributeur);
        })

        it("Lance une erreur si le distributeur n'existe pas- method : distributeurLogic.Delete",async () => {

            const num_serie : string = "12FR45"
            spyOn(distributeursService, 'getByID').and.returnValue(Promise.resolve(null))

            await expectAsync(distributeursLogic.delete(num_serie)).toBeRejectedWithError(`Distributeur with id ${num_serie} does not exist.`)
            
        })

        it("Lance une erreur si le distributeur est déjà affecté à un client - method : distributeurLogic.Delete",async () => {
            const num_serie : string = "12FR45"

            const distributeur = {numero_serie_distributeur : num_serie, id_client : "client_34"}

            spyOn(distributeursService, "getByID").and.returnValue(Promise.resolve(distributeur))
            await expectAsync(distributeursLogic.delete(num_serie)).toBeRejectedWithError(`Failed deletion : Distributeur ${num_serie} already belongs to a client`);
        })

    })


    describe("Affecter un distributeur à un client", ()=> {

        it("Affecte un Distributeur existant à un client existant sachant que le champs id_client dans distributeur est null et retourne le distributeur",async () => {
            const num_serie : string = '3498UR45'
            let id_client : number = 0
            const distributeur = {numero_serie_distributeur : num_serie, id_client : id_client}

           spyOn(distributeursService, "getByID").and.returnValue(Promise.resolve(distributeur));

           distributeur.id_client = id_client
           spyOn(distributeursService, "update").and.returnValue(Promise.resolve(distributeur));

           const result = await distributeursLogic.updateClient(num_serie, {id_client : id_client});

           expect(distributeursService.getByID).toHaveBeenCalledWith(num_serie);
           expect(distributeursService.update).toHaveBeenCalledWith({id_client : id_client}, distributeur);
           expect(result).toEqual(distributeur);
            

        }),

        it("Lance une error si le distributeur est déjà affecté à un client",async () => {
            const num_serie : string = '3498UR45'
            const id_client : string = "client567"
            const distributeur = {numero_serie_distributeur : num_serie, id_client : id_client}

           spyOn(distributeursService, "getByID").and.returnValue(Promise.resolve(distributeur));

           
           await expectAsync(distributeursLogic.updateClient(num_serie, id_client)).toBeRejectedWithError(`Distributeur ${num_serie} already belongs to a client ${id_client}`);

           expect(distributeursService.getByID).toHaveBeenCalledWith(num_serie);

        }),


        it("Lance une error s'il y a un problème avec la m à j de la bdd",async () => {
            const num_serie : string = '3498UR45'
            const id_client : string = 'client67'
            const distributeur = {numero_serie_distributeur : num_serie, id_client : null}
            
            spyOn(distributeursService, "getByID").and.returnValue(Promise.resolve(distributeur));

            spyOn(distributeursService, "update").and.returnValue(Promise.reject(new Error("Error during update")));

            await expectAsync(distributeursLogic.updateClient(num_serie, id_client)).toBeRejectedWithError(`Error during update`);
        })

    })


    }
)

