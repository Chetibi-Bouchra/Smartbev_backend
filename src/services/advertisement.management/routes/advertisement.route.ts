import express from 'express';

import { createAdvertisement,
    getAllAdvertisements,
    getAdvertisementById,
    updateAdvertisement,
    deleteAdvertisement,
    createAdvertiser,
    getAllAdvertisers,
    getAdvertiserById,
    updateAdvertiser,
    deleteAdvertiser,
    handleImageUpload } from '../controllers/advertisement.controller';

import Authorization from './../middlewares/auth';

const router = express.Router();

// Create a new advertiser
router.post('/createAdvertiser/',Authorization(['AC']),createAdvertiser);

// Get all advertisers
router.get('/getAllAdvertisers/',Authorization(['AC']),getAllAdvertisers);

// Get an advertiser by ID
router.get('/getAdvertiserById/:id',Authorization(['AC']),getAdvertiserById);

// Update an advertiser by ID
router.post('/updateAdvertiser/:id',Authorization(['AC']),updateAdvertiser);

// Delete an advertiser by ID
router.get('/deleteAdvertiser/:id',Authorization(['AC']),deleteAdvertiser);

// Create a new advertisement
router.post('/createAdvertisement/',Authorization(['AC']),createAdvertisement);

// Get all advertisements
router.get('/getAllAdvertisements/',Authorization(['AC']),getAllAdvertisements);

// Get an advertisement by ID
router.get('/getAdvertisementById/:id',Authorization(['AC']),getAdvertisementById);

// Update an advertisement by ID
router.post('/updateAdvertisement/:id',Authorization(['AC']),updateAdvertisement);

// Delete an advertisement by ID
router.get('/deleteAdvertisement/:id',Authorization(['AC']),deleteAdvertisement);

// Handle image upload
router.post('/handleImageUpload',Authorization(['AC']),handleImageUpload);


export default router;
