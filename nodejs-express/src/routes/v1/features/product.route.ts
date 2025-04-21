import { Router } from "express";
import { Controller } from "~/controllers/features/product.controller";
import validateRequest from "~/middlewares/validateRequest";
import { CreateProductModelValidation } from "~/validations/product.validation";

const router = Router();

router.post("/", validateRequest(CreateProductModelValidation), Controller.create);
router.get("/", Controller.getAll);

export default router;