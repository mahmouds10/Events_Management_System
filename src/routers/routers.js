import { Router } from 'express';
import authRouter from "../modules/auth/auth.routes.js";
import eventRouter from "../modules/events/events.routes.js";
import bookingRouter from "../modules/booking/booking.routes.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/events', eventRouter);
router.use('/book', bookingRouter);

export default router;