import express from 'express';
import { createAccount, deleteAccount, modifyAccount,getAccounts,getProfil } from '../controllers/account.controller';
import Authorization from './../middlewares/auth';

const router = express.Router();


/**

@route POST api/getAccounts
@desc get All Accounts
@access Admin
*/
router.get('/getAccounts/:role',Authorization(['ADM']), getAccounts);

/**

@route POST api/createAccount
@desc Create a new Account
@access Admin
*/
router.post('/createAccount/:role',Authorization(['ADM','SADM']), createAccount);
/**

@route DELETE api/deleteAccount/:id
@desc Delete a Account by id
@access Admin
*/
router.delete('/deleteAccount/:role/:id',Authorization(['ADM','SADM']), deleteAccount);
/**

@route PUT api/modifyAccount/:id
@desc Modify a Account by id
@access Admin
*/
router.put('/modifyAccount/:role/:id',Authorization(['ADM','AC','AM','decideur']), modifyAccount);


/**

@route POST api/getProfil
@desc get profil
*/
router.get('/getProfil/',Authorization(['SADM','ADM','AC','AM','decideur']),getProfil);

export default router;