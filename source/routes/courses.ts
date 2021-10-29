import express from 'express';
import controller from '../controller/courses';

const router = express.Router();

router.post('/home', controller.sessions);
router.get('/home', controller.sessions);
router.post('/sessions', controller.sessions);
router.post('/participants', controller.participants);



export = router;