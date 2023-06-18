import { Request, Response } from 'express';
import StatistiquesManagementService from '../service/statistiques.management';



const statistiquesManagementService = new StatistiquesManagementService();

export async function getSuccessfulOrdersCountByPeriod(req: Request, res: Response): Promise<void> {
  const { periodType, month, year, id } = req.body;

  try {
    //const periodType = "annee";
    //const month = 4;
    //const year = 2022;
    //const id = 4;
    const successfulOrdersCount = await statistiquesManagementService.getSuccessfulOrdersCountByPeriod(periodType, month, year, id);
    res.status(200).json({ count: successfulOrdersCount });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function getFailedOrdersCountByPeriod(req: Request, res: Response): Promise<void> {
  const { periodType, month, year, id } = req.body;

  try {
    //const periodType = "annee";
    //const month = 4;
    //const year = 2022;
    //const id = 4;
    const failedOrdersCount = await statistiquesManagementService.getFailedOrdersCountByPeriod(periodType, month, year, id);
    res.status(200).json({ count: failedOrdersCount });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function getSuccessfulPaymentCountByPeriod(req: Request, res: Response): Promise<void> {
  const { periodType, month, year, id } = req.body;

  try {
    /*const periodType = "annee";
    const month = 4;
    const year = 2022;
    const id = 4;*/
    const successfulPaymentCount = await statistiquesManagementService.getSuccessfulPaymentCountByPeriod(periodType, month, year, id);
    res.status(200).json({ count: successfulPaymentCount });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function getFailedPaymentCountByPeriod(req: Request, res: Response): Promise<void> {
  const { periodType, month, year, id } = req.body;

  try {
    /*const periodType = "annee";
    const month = 4;
    const year = 2022;
    const id = 4;*/
    const failedPaymentCount = await statistiquesManagementService.getFailedPaymentCountByPeriod(periodType, month, year, id);
    res.status(200).json({ count: failedPaymentCount });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function getRepairedPannesCountByPeriodAndUser(req: Request, res: Response): Promise<void> {
  const { periodType, month, year, userId } = req.body;

  try {
    //const periodType = "annee";
    //const month = 4;
    //const year = 2023;
    //const userId = 4;
    const repairedPannesCount = await statistiquesManagementService.getRepairedPannesCountByPeriodAndUser(periodType, month, year, userId);
    res.status(200).json({ count: repairedPannesCount });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function getRevenuesByBoisson(req: Request, res: Response): Promise<void> {
  const { boissonId } = req.body;

  try {
    //const boissonId = 1;
    const revenues = await statistiquesManagementService.getRevenuesByBoisson(boissonId);
    res.status(200).json({ revenues });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}

export async function getDistributeursEtatsEnTempsReel(req: Request, res: Response): Promise<void> {
  const { id } = req.body;
  try {
    //const id = 4;
    const distributeursEtats = await statistiquesManagementService.getDistributeursEtatsEnTempsReel(id);
    res.status(200).json({ distributeursEtats });
} catch (err:any) {
  res.status(500).json({ message: err.message });
}
}


export async function calculateDistributorUtilizationRate(req: Request, res: Response): Promise<void> {
  const { id } = req.body;
  try{
    //const id = 4;
    const distributorUtilizationRate = await statistiquesManagementService.calculateDistributorUtilizationRate(id);
    res.status(200).json({ distributorUtilizationRate });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
}
