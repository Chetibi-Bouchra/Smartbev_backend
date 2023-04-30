/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from 'express';

import AccountManagmentService from './../service/account.management';

interface User {
    id: string;
    role: string;
  }
  
declare global {
    namespace Express {
      interface Request {
        user: User;
      }
    }
}

const createAccount = async (req: Request, res: Response) => {

	try {

		const { role } = req.params;
		const createrId = req.user.id;
		const createrRole = req.user.role;
		// call the servise function to create the account
		const result = await AccountManagmentService.createAccount(req.body,role,createrId,createrRole);
		// send the response back to the client
		res.status(200);
		return res.json({ success: true, data: result });
	
	} catch (err:any) {
		
		console.error(`Error creating account: ${err.message}`);
		res.status(500);
		return res.json({ success: false, error: err.message });
	
	}

};

const deleteAccount = async (req: Request, res: Response) => {

	try {

		const DeleterRole = req.user.role;
		const { id,role } = req.params;
		// call the controller function to delete the account
		await AccountManagmentService.deleteAccount(id,role,DeleterRole);
		// send the response back to the client
		res.status(200).json({ success: true });
	
	} catch (err:any) {

		console.error(`Error deleting account: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	
	}

};

const modifyAccount = async (req: Request, res: Response) => {

	try {

		//const modifierId = req.user.id;
		const modifierRole = req.user.role;

		const { id,role } = req.params;
		// call the controller function to modify the commercial account
		const result = await AccountManagmentService.modifyAccount(id, req.body,role,modifierRole);
		// send the response back to the client
		res.status(200).json({ success: true, data: result });
	
	} catch (err:any) {

		console.error(`Error modifying account: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	
	}

};



const getAccounts = async (req: Request, res: Response) => {
	try {
		const role = req.params.role;
		if (!role) {
			throw new Error('Missing role parameter');
		}
		const getRole = req.user.role;
		const accounts = await AccountManagmentService.getAccounts(role, getRole);
		res.status(200).json({ success: true, data: accounts });
	} catch (err:any) {
		console.error(`Error getting accounts: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	}
};


const getProfil = async (req: Request, res: Response) => {
	try {
		const id = req.user.id;
		const account = await AccountManagmentService.getProfile(id);
		res.status(200).json({ success: true, data: account });
	} catch (err:any) {
		console.error(`Error getting account: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	}
};
  

const createClientAccount = async (req: Request, res: Response) => {

	try {
		const createrId = req.user.id;
		const createrRole = req.user.role;
		// call the servise function to create the client account
		const result = await AccountManagmentService.createClientAccount(req.body,createrId,createrRole);
		// send the response back to the client
		res.status(200);
		return res.json({ success: true, data: result });
	
	} catch (err:any) {
		
		console.error(`Error creating account: ${err.message}`);
		res.status(500);
		return res.json({ success: false, error: err.message });
	
	}

};

const createConsommateurAccount = async (req: Request, res: Response) => {

	try {
		
		// call the servise function to create the consommateur account
		const result = await AccountManagmentService.createConsommateurAccount(req.body);
		// send the response
		res.status(200);
		return res.json({ success: true, data: result });
	
	} catch (err:any) {
		
		console.error(`Error creating account: ${err.message}`);
		res.status(500);
		return res.json({ success: false, error: err.message });
	
	}

};

export {
	createAccount,
	deleteAccount,
	modifyAccount,
	getAccounts,
	getProfil,
	createClientAccount,
	createConsommateurAccount
};
