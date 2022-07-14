import { Patient } from "../models/Professional.js";

let professionals_controller = {};

professionals_controller.create_user = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const creation_data = {
      active: true,
      created_at: new Date(),
      plan: "basic",
      patients: [],
    };

    await Professionals.create({
      name,
      email,
      password,
      ...creation_data,
    });
    return res
      .status(201)
      .json({ message: `user ${name} created sucessfull! `, status: 201 });
  } catch (err) {
    return next(err);
  }
};

professionals_controller.post_login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    await ProfessionalsSchema.create({ name, password });
    return res
      .status(201)
      .json({ message: `user ${name} created sucessfull! `, status: 201 });
  } catch (err) {
    return next(err);
  }
};

export { professionals_controller };
