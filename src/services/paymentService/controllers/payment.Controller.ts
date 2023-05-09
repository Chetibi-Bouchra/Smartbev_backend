/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from 'express';
import PaymentService from '../payment';

class PaymentController {

	/**

		Create Stripe account endpoint that creates a new Stripe account.
		@param {Object} req - The HTTP request object.
		@param {Object} res - The HTTP response object.
		@returns {Promise<void>} - A Promise that resolves with the newly created account object or rejects with an error.
		@throws {Error} - Throws an error if the Stripe API key is invalid or if there is an error creating the account.
	*/
	static createAccount = async (req : Request, res : Response) => {
		try {
			const { email, country , clientId,fName,lName,dob,phoneNumber } = req.body;
			const account = await PaymentService.createAccount(email, country,clientId,fName,lName,dob,phoneNumber);
			res.status(200).json({ success: true, data: account });
		} catch (error) {
			res.status(500).json({ success: false, error: error.message });
		}
	};

	static createPaymentIntent = async (req : Request, res : Response) => {
		try {
			
			const paymentIntent = await PaymentService.createPaymentIntent(req.body);
			res.status(200).json({ paymentIntent });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to create payment intent' });
		}
	};


	static  handleWebhook = async (req, res) =>  {
		try {
			const signature = req.headers['stripe-signature'] as string;			
			await PaymentService.handleWebhook(req.body,signature);
			res.status(200).send();
		} catch (err) {
			console.error(`Error handling webhook: ${err}`);
			res.status(400).json({status:'fail' , message:`Webhook Error: ${err.message}}`});
		}
	};

	
	static refund = async (req, res) =>{
		try {
			const { paymentId, amount,reason } = req.body;
			const result = await PaymentService.refundPayment(paymentId, amount,reason);
			res.status(200);
			res.json(result);

		}
		catch (err) {
			res.status(400).json({status:'fail' , message:`Webhook Error: ${err.message}}`});
		}
	};


	static getPayments = async (req: Request, res: Response) => {
		try {
			const idConsumer = req.params.idConsumer;
	
			const paiements = await PaymentService.getPayments(idConsumer);
	
			res.status(200).json(paiements);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};







}

  
export default PaymentController ;
