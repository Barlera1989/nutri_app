import { Professionals } from "../models/Professional.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

let professionals_controller = {};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}

professionals_controller.test_route = async (req, res, next) => {
  try {
    const token = generateAccessToken({ username: "teste" });
    console.log(token);
    return res.status(201).json({ message: `ok `, status: 201 });
  } catch (err) {
    return next(err);
  }
};

professionals_controller.test_token = async (req, res, next) => {
  try {
    return res.status(201).json({ message: `ok `, status: 201 });
  } catch (err) {
    return next(err);
  }
};

professionals_controller.create_user = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let hashedPassword;

    const creation_data = {
      active: true,
      created_at: new Date(),
      session: {
        token: "",
        expires: new Date(),
      },
      plan: "basic",
      patients: [],
    };

    //check repeated emails...

    bcrypt.genSalt(10, async function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        await Professionals.create({
          name,
          email,
          password: hash,
          ...creation_data,
        });
      });
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
    const { email, password } = req.body;

    const requested_user = await Professionals.findOne({ email });

    if (!requested_user) {
      return res.status(403).json({ message: `Wrong email`, status: 403 });
    }

    bcrypt.compare(password, requested_user.password, function (err, result) {
      console.log(result);
      if (!result) {
        return res.status(403).json({ message: `Wrong password`, status: 403 });
      }
    });

    await Professionals.updateOne(
      { email },
      {
        $set: {
          session: {
            token: generateAccessToken(email),
            expires: new Date(new Date() - -1000 * 60 * 60 * 24),
          },
        },
      }
    );

    const retrieve_user = await Professionals.findOne({ email });

    return res
      .status(200)
      .json({ message: "logged succesful!", data: retrieve_user, status: 200 });
  } catch (err) {
    return next(err);
  }
};

professionals_controller.create_patient = async (req, res, next) => {
  try {
    const { name } = req.body;
    //must logged in to create!

    const patient_data = {
      name: name,
      email: "",
      password: "null",
      active: true,
      created_at: new Date(),
      prescriptions: [],
      notes: [],
      daily_meal: [],
      medical_records: [],
    };

    await Professionals.updateOne(
      { email: "teste@teste.com" },
      { $push: { patients: patient_data } }
    );

    return res
      .status(201)
      .json({ message: `patient ${name} created!`, status: 201 });
  } catch (err) {
    return next(err);
  }
};

professionals_controller.create_daily_meal = async (req, res, next) => {
  try {
    const meals = req.body;

    Professionals.findOne({ email: "teste@teste.com" }, [
      { $set: { "daily_meal.0": "teste" } },
    ]);

    return res.status(201).json({ message: `meal created!`, status: 201 });
  } catch (err) {
    return next(err);
  }
};

professionals_controller.edit_or_create_meals = async (req, res, next) => {
  try {
    const meals = req.body;
    let meal_id;

    const verify_existing_meals = Professionals.findOne(
      { email: "teste@teste.com" },
      { daily_meal: 1 }
    );
    if (verify_existing_meals.length === 0) {
      meal_id = 1;
    } else {
      meal_id = req.query.meal_id;
    }

    return res
      .status(201)
      .json({ message: `patient ${name} created!`, status: 201 });
  } catch (err) {
    return next(err);
  }
};

export { professionals_controller };
