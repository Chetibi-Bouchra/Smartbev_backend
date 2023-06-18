import express from 'express';
import {
  getSuccessfulOrdersCountByPeriod,
  getFailedOrdersCountByPeriod,
  getSuccessfulPaymentCountByPeriod,
  getFailedPaymentCountByPeriod,
  getRepairedPannesCountByPeriodAndUser,
  getRevenuesByBoisson,
  getDistributeursEtatsEnTempsReel,
  calculateDistributorUtilizationRate
} from '../controllers/statistiques.controller';

const router = express.Router();

router.get('/successful-orders-count', getSuccessfulOrdersCountByPeriod);
router.get('/failed-orders-count', getFailedOrdersCountByPeriod);
router.get('/successful-payment-count', getSuccessfulPaymentCountByPeriod);
router.get('/failed-payment-count', getFailedPaymentCountByPeriod);
router.get('/repaired-pannes-count', getRepairedPannesCountByPeriodAndUser);
router.get('/revenues-by-boisson', getRevenuesByBoisson);
router.get('/distributeurs-etats-en-temps-reel', getDistributeursEtatsEnTempsReel);
router.get('/calculate-distributor-utilization-rate', calculateDistributorUtilizationRate);

export default router;
